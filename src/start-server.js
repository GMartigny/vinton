const { resolve } = require("path");
const express = require("express");

module.exports = (port, routes) => {
    const app = express();

    app.use("/", express.static(resolve(__dirname, "../dist")));

    Object.keys(routes).forEach((path) => {
        app.get(`/${path}`, async (request, response) => {
            const result = await routes[path](request.query);
            response.send(JSON.stringify(result));
        });
    });

    app.listen(port);
};
