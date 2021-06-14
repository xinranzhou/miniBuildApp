const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const getAbsolutePath = pathname => path.join(process.cwd(), './src',pathname)

const getFileFullName = name => {
    if (!/\.js/.test(name)) {
        name = `./src/${name}.js`;
    }
    return name;
}

const checkoutPutDir = () => new Promise((resolve, reject) => {
    if (!fs.existsSync(path.join(process.cwd(), './dist'))) {
        exec(`mkdir dist`, () => {
            resolve()
        })
    }
    resolve()
})

module.exports = {
    getAbsolutePath,
    getFileFullName,
    checkoutPutDir,
}