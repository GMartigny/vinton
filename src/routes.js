const { readdir, stat } = require("fs").promises;
const del = require("delete").promise;

/**
 * @typedef {Object} API
 * @prop {Function} ls -
 * @prop {Function} check -
 * @prop {Function} rm -
 */
/**
 * @typedef {Object} VintonPlugin
 * @prop {Promise<Array<string>>} check -
 * @prop {Promise} [fix] -
 */
/**
 * Get all routes
 * @param {string} root -
 * @param {Object<VintonPlugin>} plugins -
 * @return {API}
 */
module.exports = (root, plugins) => ({
    /**
     * List
     * @return {Promise<Array<string>>}
     */
    async ls ({ onlyDir }) {
        const children = (await readdir(root)).map(name => ({
            name,
        }));

        if (onlyDir === undefined) {
            return children;
        }

        const stats = await Promise.all(children.map(({ name }) => stat(name)));
        return children.filter((_, index) => stats[index].isDirectory());
    },

    /**
     * Check
     * @return {Promise<Array<string>>}
     */
    async check ({ name }) {
        const promises = Object.keys(plugins)
            .map(id => (async () => {
                const result = await plugins[id]?.check(name);
                return (Array.isArray(result) ? result : [result])
                    .filter(check => check)
                    .map(check => ({
                        id,
                        ...check,
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
    fix ({ plugin, name }) {
        return plugins[plugin]?.fix?.(name);
    },

    /**
     * Remove
     * @return {Promise}
     */
    rm: ({ name }) => del(name),
});
