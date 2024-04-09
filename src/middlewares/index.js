import express from "express";
class Controller {
  constructor() {
    this.router = express.Router();
  }

  get(path, handler) {
    this.router.get(path, this.asyncHandler(handler));
  }

  post(path, handler) {
    this.router.post(path, this.asyncHandler(handler));
  }

  asyncHandler(callback) {
    return async (req, res, next) => {
      try {
        await callback(req, res, next);
      } catch (error) {
        res
          .status(res.statusCode < 400 ? 400 : res.statusCode || 500)
          .send({ msg: "Error" });
      }
    };
  }
}
export default Controller;
