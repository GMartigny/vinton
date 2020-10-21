const { writeFile } = require("fs").promises;
const { resolve } = require("path");
const { cosmiconfig } = require("cosmiconfig");
const execa = require("execa");

module.exports = async (logger, plugins) => {
    const folder = process.cwd();
    const filename = ".vintonrc";
    const path = resolve(folder, filename);

    logger("Removing plugins ...");
    await execa("npm", ["remove", "-g", ...plugins]);

    const explorer = cosmiconfig("vinton");
    const { config } = await explorer.search();

    plugins.forEach((plugin) => {
        if (config?.plugins.includes) {
            config.plugins.splice(config.plugins.indexOf(plugin), 1);
        }
    });

    await writeFile(path, JSON.stringify(config, null, 4));

    return "Done !";
};
