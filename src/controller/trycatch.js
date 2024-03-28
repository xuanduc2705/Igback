const tryCatch = ({ handle }) => {
  async (req, res) => {
    try {
      {
        handle;
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
};
module.exports = tryCatch;
