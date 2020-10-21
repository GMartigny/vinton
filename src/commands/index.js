const version = require("./version");
const help = require("./help");
const init = require("./init");
const add = require("./add");
const remove = require("./remove");

module.exports = {
    version,

    help,

    init,

    add,
    install: add,

    remove,
    rm: remove,
    uninstall: remove,
};
