(function(source){
                    const require = function(filename) {
                        const fn = source[filename]
                        const modules = {
                            exports: {}
                        }
                        fn(require, source, modules.exports)
                        return modules.exports;
                    }
                    require('./src/index.js')
                })({'./src/index.js': function(require, modules, exports) {"use strict";

var _Holle = require("./Holle.js");

document.write((0, _Holle.Holle)());},'./Holle.js': function(require, modules, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Holle = void 0;

var _util = require("./util.js");

var _test = require("./test.js");

var Holle = function Holle() {
  return 'hello jame ' + (0, _util.getName)() + (0, _test.getTxt)();
};

exports.Holle = Holle;},'./util.js': function(require, modules, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getName = void 0;

var getName = function getName() {
  return 'zhang sna';
};

exports.getName = getName;},'./test.js': function(require, modules, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTxt = void 0;

var getTxt = function getTxt() {
  return 'this is test';
};

exports.getTxt = getTxt;},})