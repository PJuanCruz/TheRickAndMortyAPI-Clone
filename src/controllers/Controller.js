class Controller {
  constructor() {}

  catcher = (fn) => (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
}

export default Controller;
