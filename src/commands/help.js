const version = require("./version");

module.exports = () => `${version()}

    Usage
        $ vinton
        $ vinton <command>

    When run without arguments, Vinton will start on the current directory.

    Commands
        version:    Show the current version.
        help:       Display this help message.
        init:       Initialize your workspace with an empty vinton config file.
        add:        Install a plugin and add it in the config file.
        remove:     Uninstall a plugin and remove it from the config file.
`;
