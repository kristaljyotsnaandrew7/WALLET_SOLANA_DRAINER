const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logDirectory = path.join(__dirname, '../logs');
        this.ensureLogDirectory();
        this.levels = {
            INFO: 'INFO',
            WARN: 'WARN',
            ERROR: 'ERROR',
            DEBUG: 'DEBUG',
            FATAL: 'FATAL'
        };
    }

    ensureLogDirectory() {
        if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory, { recursive: true });
        }
    }

    write(level, message, context = {}) {
        const timestamp = new Date().toISOString();
        const contextString = Object.keys(context).length ? JSON.stringify(context) : '';
        const logEntry = `[${timestamp}] [${level}] ${message} ${contextString}\n`;

        const dateString = new Date().toISOString().split('T')[0];
        const logFile = path.join(this.logDirectory, `app-${dateString}.log`);

        try {
            fs.appendFileSync(logFile, logEntry);
        } catch (error) {
            console.error('Failed to write to log file', error);
        }

        if (process.env.NODE_ENV !== 'production' || level === this.levels.ERROR) {
            const color = this.getColor(level);
            console.log(`${color}[${timestamp}] [${level}] ${message}\x1b[0m`, context);
        }
    }

    getColor(level) {
        switch (level) {
            case 'INFO': return '\x1b[36m';
            case 'WARN': return '\x1b[33m';
            case 'ERROR': return '\x1b[31m';
            case 'FATAL': return '\x1b[41m\x1b[37m';
            case 'DEBUG': return '\x1b[32m';
            default: return '\x1b[37m';
        }
    }

    info(message, context) {
        this.write(this.levels.INFO, message, context);
    }

    warn(message, context) {
        this.write(this.levels.WARN, message, context);
    }

    error(message, error) {
        const context = error instanceof Error ? { stack: error.stack, message: error.message } : error;
        this.write(this.levels.ERROR, message, context);
    }

    debug(message, context) {
        this.write(this.levels.DEBUG, message, context);
    }

    fatal(message, context) {
        this.write(this.levels.FATAL, message, context);
        process.exit(1);
    }
}

module.exports = new Logger();
