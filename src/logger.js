export default class Logger {
    constructor(uselogs) {
        this.uselogs = uselogs;
    }

    log = (msg, emoji = '🍕', colour = 'white') => {
        if(this.uselogs) console.log(`%s %c${msg}`, emoji, `color: ${colour}`);
    }

    success = (msg) => {
        if(this.uselogs) console.log(`%s ${msg}`, '✔️');
    }

    warn = (msg) => {
        if(this.uselogs) console.log(`%s ${msg}`, '⚠️');
    }
}