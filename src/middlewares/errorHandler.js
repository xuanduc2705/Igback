const asyncHandler = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      res
        .status(res.statusCode < 400 ? 400 : res.statusCode || 500)
        .send({ msg: "Error" });
    }
  };
};
export default asyncHandler;
