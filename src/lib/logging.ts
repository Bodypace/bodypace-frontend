const enable = true;

const logger = {
  debug: enable ? console.debug : () => {},
};

export default logger;
