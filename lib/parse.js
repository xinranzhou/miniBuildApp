const fs = require('fs');
const traverse = require('babel-traverse').default;
const { transformFromAst, parseSync } = require('@babel/core');

module.exports = {
    getAST(path) {
        const source = fs.readFileSync(path, 'utf8');
        return code = parseSync(source, {
            sourceType: 'module',
        })
    },
    getDependencies(ast) {
        const deps = [];
        traverse(ast, {
            ImportDeclaration: ({ node  }) => {
                deps.push(node.source.value);
            }
        })
        return deps;
    },
    transform(ast) {
        const { code }  = transformFromAst(ast, null, {
            presets: ['@babel/preset-env'],
        });
        return code
    }   
}