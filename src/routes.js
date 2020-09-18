const { readdir, stat } = require("fs").promises;
const del = require("delete").promise;

/**
 * @typedef {Object} API
 * @prop {Function} ls - List all projects
 * @prop {Function} check - Run all plugins check against projects
 * @prop {Function} fix - Ask for a project being fixed
 * @prop {Function} rm - Remove a project
 */
/**
 * @typedef {Object} VintonPlugin
 * @prop {string} name - Unique name of this plugin
 * @prop {Function} check - Function to check a project
 * @prop {Function} [fix] - Function to fix a project
 */
/**
 * Get all routes
 * @param {string} root - Root directory
 * @param {Object<VintonPlugin>} plugins - Set of plugins
 * @return {API}
 */
module.exports = (root, plugins) => ({
    /**
     * List
     * @return {Promise<Array<string>>}
     */
    async ls ({ onlyDir }) {
        const children = await readdir(root);

        if (onlyDir === undefined) {
            return children;
        }

        const stats = await Promise.all(children.map(name => stat(name)));
        return children.filter((_, index) => stats[index].isDirectory());
    },

    /**
     * Check
     * @return {Promise<Array<string>>}
     */
    async check ({ name }) {
        const promises = Object.keys(plugins)
            .map(pluginName => (async () => {
                const result = await plugins?.[pluginName]?.check(name);
                return (Array.isArray(result) ? result : [result])
                    .filter(alert => alert)
                    .map(({ message, priority, isFixable }) => ({
                        name: pluginName,
                        message: message.toString(),
                        priority: priority.valueOf(),
                        isFixable: Boolean(isFixable),
                    }));
            })());
        const results = await Promise.all(promises);
        return results
            .flat()
            .sort((a, b) => a.priority - b.priority);
    },

    /**
     * Fix
     * @return {Promise}
     */
    fix ({ plugin, name, message }) {
        return plugins[plugin]?.fix?.(name, message);
    },

    /**
     * Remove
     * @return {Promise}
     */
    rm: ({ name }) => del(name),
});
