const performanceMiddleware = () => next => action => {
  if (typeof document !== 'undefined') {
    performance.mark(`${action.type}_start`);
    const nextAction = next(action);
    performance.mark(`${action.type}_end`);
    performance.measure(`${action.type}`, `${action.type}_start`, `${action.type}_end`);
    return nextAction;
  }

  next(action);
};

export default performanceMiddleware;
