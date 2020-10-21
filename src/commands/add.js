const { writeFile } = require("fs").promises;
const { resolve } = require("path");
const { cosmiconfig } = require("cosmiconfig");
const execa = require("execa");

module.exports = async (logger, plugins) => {
    const folder = process.cwd();
    const filename = ".vintonrc";
    const path = resolve(folder, filename);

    logger("Installing plugins ...");
    await execa("npm", ["install", "-g", ...plugins]);

    const explorer = cosmiconfig("vinton");
    const { config } = await explorer.search();

    config.plugins = [...new Set((config.plugins || []).concat(plugins))].sort();

    await writeFile(path, JSON.stringify(config, null, 4));

    return "Done !";
};
