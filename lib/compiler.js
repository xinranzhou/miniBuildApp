
const path = require('path');
const fs = require('fs');
const { getAST, getDependencies, transform } = require('./parse')
const { getAbsolutePath, checkoutPutDir } = require('./util')

module.exports = class Compiler {
    constructor(options) {
        this.entry = options.entry;
        this.output = options.output;
        this.modules = [];
    }

    recursionDeps(module) {
        const  dependencies = module.dependencies;
        for (const dependency of dependencies) {
            let newModule = this.buildModule(dependency)
            this.modules.push(newModule)
            if (newModule.dependencies.length) {
                this.recursionDeps(newModule)
            }
        }
    }

    run() {
        const entryModule = this.buildModule(this.entry, true);
        this.modules.push(entryModule);
        this.modules.map(module => {
            const  dependencies = module.dependencies;
            for (const dependency of dependencies) {
                let newModule = this.buildModule(dependency)
                this.modules.push(newModule)
                this.recursionDeps(newModule)
            }
        })
        console.log( this.modules)
        
        this.emitFiles()
    }
    buildModule(filename, isEntry) {
        let ast
        if (isEntry) {
            ast = getAST(filename);
        } else {
            ast = getAST(getAbsolutePath(filename))
        }
        return {
            filename: filename,
            dependencies: getDependencies(ast),
            source: transform(ast)
        }
    }

    emitFiles() {
        const reg = /\/src\/(.*)\.js/;
        const filename = this.entry.match(reg)[1];
        
        checkoutPutDir().then(() => {
            const outputPath = path.join(this.output.path, this.output.filename.replace(/\[bundle\]/, filename));
            let source = ``;
            this.modules.map(module => {
                source += `'${module.filename}': function(require, modules, exports) {${module.source}},`
            })

            let bundle = `(function(source){
                    const require = function(filename) {
                        const fn = source[filename]
                        const modules = {
                            exports: {}
                        }
                        fn(require, source, modules.exports)
                        return modules.exports;
                    }
                    require('${this.entry}')
                })({${source}})`
            fs.writeFileSync(outputPath, bundle, 'utf8')
        })
    }
}