const { resolve } = require("path");
const { readFile } = require("fs").promises;

/**
 *
 * @type {VintonPlugin}
 */
module.exports = {
    check: async (name) => {
        const path = resolve(process.cwd(), name, "license");

        let license;
        try {
            license = (await readFile(path)).toString();
        }
        catch {
            return false;
        }

        const year = +license.match(/Copyright.+(\d{4})/i)?.[1];

        if (year) {
            const currentYear = new Date().getFullYear();

            if (year !== currentYear) {
                return {
                    message: "Copyright year is not up-to-date",
                    priority: 2,
                };
            }
        }

        return false;
    },
};
