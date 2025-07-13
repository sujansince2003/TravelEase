const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const allowedDomains = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'protonmail.com',
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name!!!'],
    validate: {
      validator: function (val) {
        // Must contain at least two words, each made of alphabetic letters only
        return /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/.test(val.trim());
      },
      message:
        'Please enter your full name (first and last), using alphabets only.',
    },
  },

  email: {
    type: String,
    required: [true, 'A user must have an Email!'],
    unique: true,
    lowercase: true,
    validate: [
      {
        validator: validator.isEmail,
        message: 'Use a valid Email!',
      },
      {
        validator: function (val) {
          if (!val) return false;

          const [username, domain] = val.split('@');
          if (!domain || !allowedDomains.includes(domain.toLowerCase())) {
            return false;
          }

          // Disallow usernames that are only digits
          if (/^\d+$/.test(username)) {
            return false;
          }

          if (username.length < 6) {
            return false;
          }

          return true;
        },
        message:
          'Please use a valid Email Address with at least 6 characters long and not all digits!',
      },
    ],
  },

  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'guide'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Provide a password!'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm the password'],
    validate: {
      // This only works on Create and Save!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // Run this if password was modified!!
  if (!this.isModified('password')) return next();

  // Match the password with cost of 10
  this.password = await bcrypt.hash(this.password, 10);

  // Delete the password confirm field!!
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candiatePassword,
  userPassword,
) {
  return await bcrypt.compare(candiatePassword, userPassword);
};

userSchema.pre(/^find/, function (next) {
  // This points to the current query that is there. It simply runs before any query with .find()
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimeStamp;
  }

  // False means no change in data
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log(resetToken, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
