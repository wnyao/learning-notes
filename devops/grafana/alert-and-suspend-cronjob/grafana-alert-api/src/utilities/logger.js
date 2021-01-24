class logger {
  debug(message) {
    const date = new Date().toUTCString();
    console.log(`[${date}] DEBUG: ${message}`);
  }

  info(message) {
    const date = new Date().toUTCString();
    console.log(`[${date}] INFO: ${message}`);
  }

  error(message) {
    const date = new Date().toUTCString();
    console.log(`[${date}] ERROR: ${message}`);
  }
}

module.exports = {
  logger: new logger(),
};
