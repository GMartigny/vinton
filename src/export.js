/**
 * @typedef {Object} Priorities
 * @prop {number} OK -
 * @prop {number} URGENT -
 * @prop {number} WARNING -
 * @prop {number} INFOS -
 * @prop {number} NONE -
 */
/**
 * Enumeration of priorities
 * @type {Priorities}
 */
const priorities = {
    OK: 0,
    URGENT: 1,
    WARNING: 2,
    INFOS: 3,
    NONE: undefined,
};

/**
 * Vinton's plugin
 * @class
 */
class Plugin {
    /**
     * Plugin constructor
     * @param {Function} check - Run check
     * @param {Function} [fix] - Fix alert raised by check
     */
    constructor (check, fix) {
        this.check = check;
        this.fix = fix;
    }
}

/**
 * Alert raised by Vinton's plugins
 * @class
 */
class Alert {
    /**
     * Alert constructor
     * @param {string} message - Informative and complete message of the issue
     * @param {number} [priority=priorities.INFOS] - How important is the issue deemed
     * @param {Function} [isFixable=false] - Should Vinton display a fix button
     */
    constructor (message, priority = priorities.INFOS, isFixable = false) {
        this.message = message;
        this.priority = priority;
        this.isFixable = isFixable;
    }
}

module.exports = {
    priorities,
    Plugin,
    Alert,
};
