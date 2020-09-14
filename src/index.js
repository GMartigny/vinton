#!/usr/bin/env node

const { cosmiconfig } = require("cosmiconfig");
const open = require("open");
const getRoutes = require("./routes");
const startServer = require("./start-server");

const explorer = cosmiconfig("vinton");

(async () => {
    const port = 1805;
    const startingDir = process.cwd();

    const result = await explorer.search();
    const { plugins } = result?.config;
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const pluginsImport = plugins.map(name => require(name));
    const pluginsMap = {};
    pluginsImport
        .filter(plugin => plugin?.name && plugin.check)
        .forEach(plugin => pluginsMap[plugin.name] = plugin);
    const routes = getRoutes(startingDir, pluginsMap);

    const arg = process.argv[2];
    if (arg?.length) {
        console.log(await pluginsMap[arg]?.check(...process.argv.slice(3)));
        // console.log(await routes[arg](...process.argv.slice(3)));
    }
    else {
        startServer(port, routes);
        open(`http://localhost:${port}`);
    }
})();
