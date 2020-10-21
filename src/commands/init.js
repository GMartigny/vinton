const { writeFile } = require("fs").promises;
const { resolve } = require("path");

module.exports = async () => {
    const folder = process.cwd();
    const filename = ".vintonrc";
    const path = resolve(folder, filename);

    const content = JSON.stringify({
        plugins: [],
    }, null, 4);

    try {
        await writeFile(path, content, {
            flag: "wx",
        });
    }
    catch (error) {
        if (error.code === "EEXIST") {
            throw new Error(`Folder ${folder} already has a ${filename} file.`);
        }
    }

    return `Write empty config file at ${path}`;
};
