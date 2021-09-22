const fs = require('fs');
const path = require('path');

const exportScriptsDir = path.resolve('export');

module.exports = {
    getMigration: function (sequelize, env) {
        return (filename) => {
            const scriptPath = path.join(exportScriptsDir, env, filename);
            const sql = fs.readFileSync(scriptPath, { encoding: "UTF8" });
            return sequelize.query(sql);
        };
    },
    getRange: function (start, end) {
        const arr = Array.from(new Array(end), (val, index) => index + 1);
        return arr.filter(item => item >= start);
    }
};
