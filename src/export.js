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
    NONE: 4,
};

/**
 * @class
 */
class Check {
    /**
     * Check constructor
     * @param {string} message -
     * @param {number} priority -
     * @param {boolean} isFixable -
     */
    constructor (message, priority = priorities.INFOS, isFixable = false) {
        this.message = message;
        this.priority = priority;
        this.isFixable = isFixable;
    }
}

module.exports = {
    priorities,
    Check,
};
