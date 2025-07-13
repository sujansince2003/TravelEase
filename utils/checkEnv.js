function checkEnvVars(requiredVars) {
  const missing = requiredVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error('Missing environment variables:');
    missing.forEach((key) => console.error(`   - ${key}`));
    console.error('Please check your config.env file.');
    process.exit(1); // Stop the server
  }
}

module.exports = checkEnvVars;
