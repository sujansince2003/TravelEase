module.exports = (fn) => {
  return (req, res, next) => {
    // This line of code gets rid of the catch block.
    fn(req, res, next).catch(next);
  };
};
