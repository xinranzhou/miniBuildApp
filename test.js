const fs = require('fs');
const { getAST, getDependencies, transform } = require('./lib/parse')
const path = require('path')

const ast = getAST(path.join(process.cwd(), './src/Holle.js'))
// const deps = getDependencies(ast)
const code  = transform(ast)
console.log(code)