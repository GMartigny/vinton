const glob = require("glob");

const commons = [
    {
        file: ".gitignore",
        priority: 3,
    },
    {
        file: "license",
        priority: 2,
    },
    {
        file: "readme",
        priority: 1,
    },
    {
        file: "src",
        priority: 3,
    },
    {
        file: "test",
        priority: 3,
    },
];

module.exports = {
    check: async (name) => {
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
            .map(({ file, priority }) => ({
                name: "common-file",
                message: `Missing ${file}`,
                priority,
                fixable: false,
            }));
    },
};
