class Controller {
  constructor(callback) {
    this.callback = callback;
  }

  asyncHandler() {
    return async (req, res, next) => {
      try {
        await this.callback(req, res, next);
      } catch (error) {
        res
          .status(res.statusCode < 400 ? 400 : res.statusCode || 500)
          .send({ msg: "Error" });
      }
    };
  }
}

export default Controller;
