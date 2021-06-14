const fs = require('fs');
const path = require('path');
const Compiler = require('./compiler');
const config = require(path.join(process.cwd(), './init.config.js'), 'utf8');
const compilerIns =  new Compiler(config)

compilerIns.run()