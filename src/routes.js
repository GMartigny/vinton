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
 * @param {Array<VintonPlugin>} plugins -
 * @return {API}
 */
module.exports = (root, plugins) => ({
    /**
     * List
     * @return {Promise<Array<string>>}
     */
    ls: async ({ onlyDir }) => {
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
     * check
     * @return {Promise<Array<string>>}
     */
    check: async ({ name }) => {
        const results = await Promise.all(plugins.map(({ check }) => check(name)));
        return results
            .flat()
            .filter(a => a)
            .sort((a, b) => a.priority - b.priority);
    },

    /**
     * remove
     * @return {Promise}
     */
    rm: ({ name }) => del(name),
});
