const glob = require("glob");
const { Check, priorities } = require("../../src/export");

const commons = [
    {
        file: ".gitignore",
        priority: priorities.INFOS,
    },
    {
        file: "license",
        priority: priorities.WARNING,
    },
    {
        file: "readme",
        priority: priorities.URGENT,
    },
    {
        file: "src",
        priority: priorities.INFOS,
    },
    {
        file: "test",
        priority: priorities.INFOS,
    },
];

module.exports = {
    name: "common-files",

    async check (name) {
        const checks = await Promise.all(commons.map(({ file }) => new Promise((resolve) => {
            const path = `${name}/${file}*`;
            glob(path, {
                nosort: true,
                nocase: true,
            }, (errors, files) => {
                resolve(Boolean(files.length));
            });
        })));

        return commons
            .filter((_, index) => !checks[index])
            .map(({ file, priority }) => new Check(`Missing ${file}`, priority));
    },
};
