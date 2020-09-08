const priorities = {
    OK: 0,
    URGENT: 1,
    WARNING: 2,
    INFOS: 3,
    NONE: 4,
};

class Check {
    constructor (message, priority, isFixable = false) {
        this.message = message;
        this.priority = priority;
        this.isFixable = isFixable;
    }
}

module.exports = {
    priorities,
    Check,
};
