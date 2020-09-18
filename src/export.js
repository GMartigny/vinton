/**
 * @typedef {Object} Priorities
 * @prop {number} OK - Displayed as success, good behavior (should only be used when users expect a green light)
 * @prop {number} URGENT - Strong highlight, danger or very bad practice
 * @prop {number} WARNING - Warn the user, something is wrong
 * @prop {number} INFOS - Basic highlight, give some information
 * @prop {number} NONE - No highlight, just give some insights
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
