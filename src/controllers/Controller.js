class Controller {
  constructor() {}

  /**
   * Catches and handles Express controller errors. Wraps the provided controller
   * function in a try-catch statement to handle synchronous and asynchronous errors.
   *
   * @param {function} controller - Express controller to wrap.
   * @returns {function} - Express controller wrapped in a try-catch statement.
   */
  catcher(controller) {
    /**
     * Try-catch Express controller.
     *
     * @param {import('express').Request} req - Express request object.
     * @param {import('express').Response} res - Express response object.
     * @param {import('express').NextFunction} next - Express next object.
     * @returns {Promise<void>}
     */
    return async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }
}

export default Controller;
