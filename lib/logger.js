const bunyan = require('bunyan');

// NOTE: If we should want a "raw" Stream for the CLI, rework this with a custom format:
// https://github.com/trentm/node-bunyan/blob/master/examples/raw-stream.js

const loggers = {};
let level = bunyan.INFO;

module.exports = class Logger {

    static level(l) {
        level = l;
        Object.keys(loggers).forEach((logger) => {
            loggers[logger].level(l);
        });
    }

    static get(name) {
        if (loggers[name] === undefined) {
            loggers[name] = bunyan.createLogger({name});
            loggers[name].level(level);
        }
        return loggers[name];
    }
};