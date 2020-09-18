#!/usr/bin/env node

const { cosmiconfig } = require("cosmiconfig");
const open = require("open");
const getRoutes = require("./routes");
const startServer = require("./start-server");
const Vinton = require("./export");

const explorer = cosmiconfig("vinton");

// TODO: read args to change these
const silent = false;
const verbose = false;
const logger = (message, type = logger.types.log) => {
    if (silent) {
        return;
    }

    switch (type) {
        case logger.types.log:
            console.log(message);
            break;
        case logger.types.warn:
            console.warn(message);
            break;
        case logger.types.debug:
            if (verbose) {
                console.debug(message);
            }
            break;
    }
};
logger.types = {
    warn: "warn",
    log: "log",
    debug: "debug",
};

(async () => {
    logger("Vinton is starting ...");

    const port = 1805;
    const startingDir = process.cwd();

    const result = await explorer.search();
    const { plugins } = result?.config;
    const pluginsImport = plugins.map((name) => {
        try {
            // eslint-disable-next-line global-require, import/no-dynamic-require
            const plugin = require(name);
            logger(`Plugin [${name}] loaded with success.`, logger.types.debug);
            return typeof plugin === "function" ? plugin({
                ...Vinton,
            }) : plugin;
        }
        catch {
            logger(`Vinton can't load module [${name}].
    Try running: npm install -g ${name}`, logger.types.warn);
        }
        return null;
    });
    const pluginsMap = {};
    pluginsImport
        .filter(plugin => plugin?.check)
        .forEach(plugin => pluginsMap[plugin.name] = plugin);
    const routes = getRoutes(startingDir, pluginsMap);

    const arg = process.argv[2];
    if (arg?.length) {
        logger(await pluginsMap[arg]?.check(...process.argv.slice(3)));
        // console.log(await routes[arg](...process.argv.slice(3)));
    }
    else {
        startServer(port, routes);
        open(`http://localhost:${port}`);

        logger("Type ^C to exit.");
    }
})();
