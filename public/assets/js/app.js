/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/sha1-file/index.js":
/*!*****************************************!*\
  !*** ./node_modules/sha1-file/index.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = __webpack_require__(/*! crypto */ "crypto")
var fs = __webpack_require__(/*! fs */ "fs")

module.exports = function (filename, callback) {
  var sum = crypto.createHash('sha1')
  if (callback && typeof callback === 'function') {
    var fileStream = fs.createReadStream(filename)
    fileStream.on('error', function (err) {
      return callback(err, null)
    })
    fileStream.on('data', function (chunk) {
      try {
        sum.update(chunk)
      } catch (ex) {
        return callback(ex, null)
      }
    })
    fileStream.on('end', function () {
      return callback(null, sum.digest('hex'))
    })
  } else {
    sum.update(fs.readFileSync(filename))
    return sum.digest('hex')
  }
}


/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xiv_GameLauncher__ = __webpack_require__(/*! ./xiv/GameLauncher */ "./src/js/xiv/GameLauncher.js");
// Initialize Game Launcher logic

__WEBPACK_IMPORTED_MODULE_0__xiv_GameLauncher__["a" /* default */].init();

/***/ }),

/***/ "./src/js/xiv/GameFiles.js":
/*!*********************************!*\
  !*** ./src/js/xiv/GameFiles.js ***!
  \*********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Settings__ = __webpack_require__(/*! ./Settings */ "./src/js/xiv/Settings.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Settings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Settings__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var sha1File = __webpack_require__(/*! sha1-file */ "./node_modules/sha1-file/index.js");
var filesystem = __webpack_require__(/*! fs */ "fs");

var GameFiles = function () {
    function GameFiles() {
        _classCallCheck(this, GameFiles);
    }

    _createClass(GameFiles, [{
        key: 'hash',
        value: function hash() {
            return "ffxivboot.exe/" + this.getSizeAndHash('/boot/ffxivboot.exe') + ",ffxivlauncher.exe/" + this.getSizeAndHash('/boot/ffxivlauncher.exe') + ",ffxivupdater.exe/" + this.getSizeAndHash('/boot/ffxivupdater.exe');
        }
    }, {
        key: 'version',
        value: function version() {
            var filename = __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.GamePath + '/game/ffxivgame.ver',
                buffer = filesystem.readFileSync(filename);

            return buffer.toString();
        }
    }, {
        key: 'getSizeAndHash',
        value: function getSizeAndHash(filename) {
            filename = __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.GamePath + filename;
            var hash = sha1File(filename);
            var length = filesystem.statSync(filename).size;
            return length + '/' + hash;
        }
    }]);

    return GameFiles;
}();

/* harmony default export */ __webpack_exports__["a"] = (new GameFiles());

/***/ }),

/***/ "./src/js/xiv/GameLauncher.js":
/*!************************************!*\
  !*** ./src/js/xiv/GameLauncher.js ***!
  \************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Settings__ = __webpack_require__(/*! ./Settings */ "./src/js/xiv/Settings.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Settings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Settings__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Login__ = __webpack_require__(/*! ./Login */ "./src/js/xiv/Login.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var GameLauncher = function () {
    function GameLauncher() {
        _classCallCheck(this, GameLauncher);
    }

    _createClass(GameLauncher, [{
        key: 'init',
        value: function init() {
            var _this = this;

            document.getElementById('GameLauncher.Login').onclick = function (event) {
                _this.requestLogin();
            };

            document.getElementById('GameLauncher.Bypass').onclick = function (event) {
                var sid = document.getElementById('bypass').value.trim();
                _this.launchGame(sid);
            };
        }
    }, {
        key: 'requestLogin',
        value: function requestLogin() {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_1__Login__["a" /* default */].go(function (response) {
                console.log('LOGIN COMPLETE');
                console.log('USER SID == ' + response.userRealSid);
                console.log('LIVE GAME VERSION == ' + response.latestGameVersion);

                return;

                _this2.launchGame(response.userRealSid);
            });
        }
    }, {
        key: 'launchGame',
        value: function launchGame(userSid) {
            console.log('Launching game with: ' + userSid);

            var gameFilename = __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.GamePath + __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.Dx11Path;
            var gameArguments = ['DEV.TestSID=' + userSid, 'DEV.MaxEntitledExpansionID=2', 'language=1'];

            var child = __webpack_require__(/*! child_process */ "child_process").execFile;
            child(gameFilename, gameArguments, function (err, data) {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log('running');

                // todo - do something here? Close the launcher? Hide in background?
            });
        }
    }]);

    return GameLauncher;
}();

/* harmony default export */ __webpack_exports__["a"] = (new GameLauncher());

/***/ }),

/***/ "./src/js/xiv/Login.js":
/*!*****************************!*\
  !*** ./src/js/xiv/Login.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameFiles__ = __webpack_require__(/*! ./GameFiles */ "./src/js/xiv/GameFiles.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__XIVRequest__ = __webpack_require__(/*! ./XIVRequest */ "./src/js/xiv/XIVRequest.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Login = function () {
    function Login() {
        _classCallCheck(this, Login);

        this.username = false;
        this.password = false;
        this.otp = false;
    }

    _createClass(Login, [{
        key: 'go',
        value: function go(callback) {
            console.log('Attempting login ...');
            this.username = document.getElementById('username').value.trim();
            this.password = document.getElementById('password').value.trim();
            this.otp = document.getElementById('otp').value.trim();

            // ask for the real USER_SID
            this.getRealUserSid(callback);
        }
    }, {
        key: 'getRealUserSid',
        value: function getRealUserSid(callback) {
            console.log('get the REAL user sid');

            this.getSudoUserSid(function (SUDO_USER_ID) {
                console.log('Build version + hash');
                var localGameVersion = __WEBPACK_IMPORTED_MODULE_0__GameFiles__["a" /* default */].version(),
                    localGameHash = __WEBPACK_IMPORTED_MODULE_0__GameFiles__["a" /* default */].hash();

                console.log('localGameVersion == ' + localGameVersion);
                console.log('localGameHash == ' + localGameHash);

                console.log('request the real users id ');
                __WEBPACK_IMPORTED_MODULE_1__XIVRequest__["a" /* default */].getRealUserSid(SUDO_USER_ID, localGameVersion, localGameHash, callback);
            });
        }
    }, {
        key: 'getSudoUserSid',
        value: function getSudoUserSid(callback) {
            var _this = this;

            console.log('get the SUDO user sid');

            // get temp id for form
            this.getTempUserSid(function (TEMP_USER_ID) {
                // login to get  fake user id
                __WEBPACK_IMPORTED_MODULE_1__XIVRequest__["a" /* default */].getFakeUserSid(TEMP_USER_ID, _this.username, _this.password, _this.otp, callback);
            });
        }
    }, {
        key: 'getTempUserSid',
        value: function getTempUserSid(callback) {
            console.log('get the TEMP user sid');

            __WEBPACK_IMPORTED_MODULE_1__XIVRequest__["a" /* default */].getTempUserSid(callback);
        }
    }]);

    return Login;
}();

/* harmony default export */ __webpack_exports__["a"] = (new Login());

/***/ }),

/***/ "./src/js/xiv/Settings.js":
/*!********************************!*\
  !*** ./src/js/xiv/Settings.js ***!
  \********************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

//const sha1File = require('sha1-file');
//const filesystem = require('fs');

/**
 * FFXIV Custom Launcher Settings
 */
module.exports = {
    // Square-Enix specific options
    se: {
        GamePath: 'C:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV - A Realm Reborn',
        Dx9Path: '\\game\\ffxiv.exe',
        Dx11Path: '\\game\\ffxiv_dx11.exe',

        UserAgent: 'SQEXAuthor/2.0.0(Windows 6.2; ja-jp; 9e75ab3012)',

        LoginGameVersionRequest: {
            Host: 'patch-gamever.ffxiv.com',
            Port: 443,
            Path: '/http/win32/ffxivneo_release_game/{GAMEVER}/{USER_SID}',
            ContentType: 'application/x-www-form-urlencoded',
            Referer: 'https://ffxiv-login.square-enix.com/oauth/ffxivarr/login/top?lng=en&rgn=3'
        },

        LoginOAuthFormRequest: {
            Host: 'ffxiv-login.square-enix.com',
            Port: 443,
            Path: '/oauth/ffxivarr/login/top?lng=en&rgn=3&isft=0&issteam=0',
            Method: 'POST'
        },

        LoginOAuthActionRequest: {
            Host: 'ffxiv-login.square-enix.com',
            Port: 443,
            Path: '/oauth/ffxivarr/login/login.send',
            Method: 'POST',
            ContentType: 'application/x-www-form-urlencoded',
            Referer: 'https://ffxiv-login.square-enix.com/oauth/ffxivarr/login/top?lng=en&rgn=3&isft=0&issteam=0'
        }
    },

    // the numbers of these are important
    languages: {
        0: 'Japanese',
        1: 'English',
        2: 'German',
        3: 'French'
    },

    // the numbers of these are important
    expansions: {
        0: 'A Realm Reborn',
        1: 'Heavensward',
        2: 'Stormblood'
    }
};

/***/ }),

/***/ "./src/js/xiv/XIVRequest.js":
/*!**********************************!*\
  !*** ./src/js/xiv/XIVRequest.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Settings__ = __webpack_require__(/*! ./Settings */ "./src/js/xiv/Settings.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Settings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Settings__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var https = __webpack_require__(/*! https */ "https");

// i don't know if this is needed, the patch-gamever server needs https ssl certificate verification
Object({"NODE_ENV":"development"}).NODE_TLS_REJECT_UNAUTHORIZED = "0";

var Request = function () {
    function Request() {
        _classCallCheck(this, Request);
    }

    _createClass(Request, [{
        key: "action",
        value: function action(options, postdata, callback) {
            // request object
            var req = https.request(options, function (response) {
                var body = '';
                response.on('data', function (chunk) {
                    body += chunk;
                });
                response.on('end', function () {
                    callback({
                        headers: response.headers,
                        body: body
                    });
                });
                response.on('error', function (error) {
                    console.log('RESPONSE_ERROR', error);
                });
            });

            req.on('error', function (error) {
                console.log('REQUEST_ERROR', error);
            });

            // if any post data, attach it
            if (postdata) {
                req.write(postdata);
            }

            req.end();
        }

        /**
         * Get the users temp session id for the login form.
         */

    }, {
        key: "getTempUserSid",
        value: function getTempUserSid(callback) {
            // options
            var options = {
                host: __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginOAuthFormRequest.Host,
                port: __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginOAuthFormRequest.Port,
                path: __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginOAuthFormRequest.Path,
                method: __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginOAuthFormRequest.Method,
                rejectUnauthorized: false,
                requestCert: true,
                agent: false,
                headers: {
                    'User-Agent': __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.UserAgent
                }
            };

            this.action(options, false, function (response) {
                var line = response.body.split("\n").filter(function (line) {
                    return line.indexOf('_STORED_') > -1;
                })[0];

                if (!line) {
                    console.error('GET_TEMP_USER_SID_FAIL', 'No _STORED_ input on html form.');
                    return;
                }

                var id = line.replace('<input type="hidden" name="_STORED_" value="', '').replace('">', '').trim();
                console.log('getTempUserSid == ' + id);
                callback(id);
            });
        }

        /**
         * Get the users fake session id for a game-version check
         */

    }, {
        key: "getFakeUserSid",
        value: function getFakeUserSid(tempUserId, username, password, otp, callback) {
            var QueryString = __webpack_require__(/*! querystring */ "querystring");
            var postdata = QueryString.stringify({
                '_STORED_': tempUserId,
                'sqexid': username,
                'password': password,
                'otppw': otp
            });

            // options
            var options = {
                host: __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginOAuthActionRequest.Host,
                port: __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginOAuthActionRequest.Port,
                path: __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginOAuthActionRequest.Path,
                method: __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginOAuthActionRequest.Method,
                rejectUnauthorized: false,
                requestCert: true,
                agent: false,
                headers: {
                    'User-Agent': __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.UserAgent,
                    'Content-Type': __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginOAuthActionRequest.ContentType,
                    'Content-Length': postdata.length,
                    'Referer': __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginOAuthActionRequest.Referer
                }
            };

            this.action(options, postdata, function (response) {
                var line = response.body.split("\n").filter(function (line) {
                    return line.indexOf('login=auth,ok,sid') > -1;
                })[0];

                if (!line) {
                    console.error('GET_FAKE_USER_SID_FAIL', 'No "login=auth,ok,sid" input on html form.');
                    return;
                }

                var id = line.replace('window.external.user("login=auth,ok,sid,', '').replace(',terms,1,region,2,etmadd,0,playable,1,ps3pkg,0,maxex,2,product,1");', '').trim();
                console.log('getFakeUserSid == ' + id);
                callback(id);
            });
        }
    }, {
        key: "getRealUserSid",
        value: function getRealUserSid(tempUserId, localGameVersion, localGameHash, callback) {
            var path = __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginGameVersionRequest.Path;
            path = path.replace('{GAMEVER}', localGameVersion);
            path = path.replace('{USER_SID}', tempUserId);

            console.log('path = ' + path);

            // options
            var options = {
                host: __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginGameVersionRequest.Host,
                port: __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginGameVersionRequest.Port,
                path: path,
                method: __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginGameVersionRequest.Method,
                rejectUnauthorized: false,
                requestCert: true,
                agent: false,
                headers: {
                    'X-Hash-Check': 'X-Hash-Check',
                    'User-Agent': __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.UserAgent,
                    'Content-Type': __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginGameVersionRequest.ContentType,
                    'Content-Length': localGameHash.length,
                    'Referer': __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginGameVersionRequest.Referer
                }
            };

            this.action(options, localGameHash, function (response) {
                console.log(response);
                callback({
                    latestGameVersion: response.headers['x-latest-version'],
                    userRealSid: response.headers['x-patch-unique-id']
                });
            });
        }
    }]);

    return Request;
}();

/* harmony default export */ __webpack_exports__["a"] = (new Request());

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODhhYzlhM2JmMTMyNGQ3MDc1NWIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NoYTEtZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvR2FtZUZpbGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvR2FtZUxhdW5jaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvTG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3hpdi9TZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMveGl2L1hJVlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJxdWVyeXN0cmluZ1wiIl0sIm5hbWVzIjpbIkdhbWVMYXVuY2hlciIsImluaXQiLCJzaGExRmlsZSIsInJlcXVpcmUiLCJmaWxlc3lzdGVtIiwiR2FtZUZpbGVzIiwiZ2V0U2l6ZUFuZEhhc2giLCJmaWxlbmFtZSIsIlNldHRpbmdzIiwic2UiLCJHYW1lUGF0aCIsImJ1ZmZlciIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiaGFzaCIsImxlbmd0aCIsInN0YXRTeW5jIiwic2l6ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvbmNsaWNrIiwicmVxdWVzdExvZ2luIiwic2lkIiwidmFsdWUiLCJ0cmltIiwibGF1bmNoR2FtZSIsIkxvZ2luIiwiZ28iLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJ1c2VyUmVhbFNpZCIsImxhdGVzdEdhbWVWZXJzaW9uIiwidXNlclNpZCIsImdhbWVGaWxlbmFtZSIsIkR4MTFQYXRoIiwiZ2FtZUFyZ3VtZW50cyIsImNoaWxkIiwiZXhlY0ZpbGUiLCJlcnIiLCJkYXRhIiwiZXJyb3IiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwib3RwIiwiY2FsbGJhY2siLCJnZXRSZWFsVXNlclNpZCIsImdldFN1ZG9Vc2VyU2lkIiwibG9jYWxHYW1lVmVyc2lvbiIsInZlcnNpb24iLCJsb2NhbEdhbWVIYXNoIiwiWElWUmVxdWVzdCIsIlNVRE9fVVNFUl9JRCIsImdldFRlbXBVc2VyU2lkIiwiZ2V0RmFrZVVzZXJTaWQiLCJURU1QX1VTRVJfSUQiLCJtb2R1bGUiLCJleHBvcnRzIiwiRHg5UGF0aCIsIlVzZXJBZ2VudCIsIkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0IiwiSG9zdCIsIlBvcnQiLCJQYXRoIiwiQ29udGVudFR5cGUiLCJSZWZlcmVyIiwiTG9naW5PQXV0aEZvcm1SZXF1ZXN0IiwiTWV0aG9kIiwiTG9naW5PQXV0aEFjdGlvblJlcXVlc3QiLCJsYW5ndWFnZXMiLCJleHBhbnNpb25zIiwiaHR0cHMiLCJOT0RFX1RMU19SRUpFQ1RfVU5BVVRIT1JJWkVEIiwiUmVxdWVzdCIsIm9wdGlvbnMiLCJwb3N0ZGF0YSIsInJlcSIsInJlcXVlc3QiLCJib2R5Iiwib24iLCJjaHVuayIsImhlYWRlcnMiLCJ3cml0ZSIsImVuZCIsImhvc3QiLCJwb3J0IiwicGF0aCIsIm1ldGhvZCIsInJlamVjdFVuYXV0aG9yaXplZCIsInJlcXVlc3RDZXJ0IiwiYWdlbnQiLCJhY3Rpb24iLCJsaW5lIiwic3BsaXQiLCJmaWx0ZXIiLCJpbmRleE9mIiwiaWQiLCJyZXBsYWNlIiwidGVtcFVzZXJJZCIsIlF1ZXJ5U3RyaW5nIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFBQTtBQUNBO0FBQ0Esa0VBQUFBLENBQWFDLElBQWIsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0EsSUFBTUMsV0FBVyxtQkFBQUMsQ0FBUSxvREFBUixDQUFqQjtBQUNBLElBQU1DLGFBQWEsbUJBQUFELENBQVEsY0FBUixDQUFuQjs7SUFFTUUsUzs7Ozs7OzsrQkFHRjtBQUNJLG1CQUFPLG1CQUFtQixLQUFLQyxjQUFMLENBQW9CLHFCQUFwQixDQUFuQixHQUNBLHFCQURBLEdBQ3VCLEtBQUtBLGNBQUwsQ0FBb0IseUJBQXBCLENBRHZCLEdBRUEsb0JBRkEsR0FFc0IsS0FBS0EsY0FBTCxDQUFvQix3QkFBcEIsQ0FGN0I7QUFHSDs7O2tDQUdEO0FBQ0ksZ0JBQUlDLFdBQVcsaURBQUFDLENBQVNDLEVBQVQsQ0FBWUMsUUFBWixHQUF1QixxQkFBdEM7QUFBQSxnQkFDSUMsU0FBU1AsV0FBV1EsWUFBWCxDQUF3QkwsUUFBeEIsQ0FEYjs7QUFHQSxtQkFBT0ksT0FBT0UsUUFBUCxFQUFQO0FBQ0g7Ozt1Q0FFY04sUSxFQUNmO0FBQ0lBLHVCQUFXLGlEQUFBQyxDQUFTQyxFQUFULENBQVlDLFFBQVosR0FBdUJILFFBQWxDO0FBQ0EsZ0JBQUlPLE9BQU9aLFNBQVNLLFFBQVQsQ0FBWDtBQUNBLGdCQUFJUSxTQUFTWCxXQUFXWSxRQUFYLENBQW9CVCxRQUFwQixFQUE4QlUsSUFBM0M7QUFDQSxtQkFBT0YsU0FBUyxHQUFULEdBQWVELElBQXRCO0FBQ0g7Ozs7OztBQUdMLHlEQUFlLElBQUlULFNBQUosRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUNBOztJQUVNTCxZOzs7Ozs7OytCQUdGO0FBQUE7O0FBQ0lrQixxQkFBU0MsY0FBVCxDQUF3QixvQkFBeEIsRUFBOENDLE9BQTlDLEdBQXdELGlCQUFTO0FBQzdELHNCQUFLQyxZQUFMO0FBQ0gsYUFGRDs7QUFJQUgscUJBQVNDLGNBQVQsQ0FBd0IscUJBQXhCLEVBQStDQyxPQUEvQyxHQUF5RCxpQkFBUztBQUM5RCxvQkFBTUUsTUFBTUosU0FBU0MsY0FBVCxDQUF3QixRQUF4QixFQUFrQ0ksS0FBbEMsQ0FBd0NDLElBQXhDLEVBQVo7QUFDQSxzQkFBS0MsVUFBTCxDQUFnQkgsR0FBaEI7QUFDSCxhQUhEO0FBSUg7Ozt1Q0FHRDtBQUFBOztBQUNJSSxZQUFBLHVEQUFBQSxDQUFNQyxFQUFOLENBQVMsb0JBQVk7QUFDakJDLHdCQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDQUQsd0JBQVFDLEdBQVIsQ0FBWSxpQkFBZ0JDLFNBQVNDLFdBQXJDO0FBQ0FILHdCQUFRQyxHQUFSLENBQVksMEJBQXlCQyxTQUFTRSxpQkFBOUM7O0FBRUE7O0FBRUEsdUJBQUtQLFVBQUwsQ0FBZ0JLLFNBQVNDLFdBQXpCO0FBQ0gsYUFSRDtBQVNIOzs7bUNBRVVFLE8sRUFDWDtBQUNJTCxvQkFBUUMsR0FBUixDQUFZLDBCQUF5QkksT0FBckM7O0FBRUEsZ0JBQU1DLGVBQWUsaURBQUExQixDQUFTQyxFQUFULENBQVlDLFFBQVosR0FBdUIsaURBQUFGLENBQVNDLEVBQVQsQ0FBWTBCLFFBQXhEO0FBQ0EsZ0JBQU1DLGdCQUFnQixDQUNsQixpQkFBaUJILE9BREMsRUFFbEIsOEJBRmtCLEVBR2xCLFlBSGtCLENBQXRCOztBQU9BLGdCQUFNSSxRQUFRLG1CQUFBbEMsQ0FBUSxvQ0FBUixFQUF5Qm1DLFFBQXZDO0FBQ0FELGtCQUFNSCxZQUFOLEVBQW9CRSxhQUFwQixFQUFtQyxVQUFTRyxHQUFULEVBQWNDLElBQWQsRUFBb0I7QUFDbkQsb0JBQUdELEdBQUgsRUFBTztBQUNKWCw0QkFBUWEsS0FBUixDQUFjRixHQUFkO0FBQ0E7QUFDRjs7QUFFRFgsd0JBQVFDLEdBQVIsQ0FBWSxTQUFaOztBQUVBO0FBQ0gsYUFURDtBQVVIOzs7Ozs7QUFHTCx5REFBZSxJQUFJN0IsWUFBSixFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4REE7QUFDQTs7SUFFTTBCLEs7QUFFRixxQkFDQTtBQUFBOztBQUNJLGFBQUtnQixRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLGFBQUtDLEdBQUwsR0FBVyxLQUFYO0FBRUg7Ozs7MkJBRUVDLFEsRUFDSDtBQUNJakIsb0JBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNBLGlCQUFLYSxRQUFMLEdBQWdCeEIsU0FBU0MsY0FBVCxDQUF3QixVQUF4QixFQUFvQ0ksS0FBcEMsQ0FBMENDLElBQTFDLEVBQWhCO0FBQ0EsaUJBQUttQixRQUFMLEdBQWdCekIsU0FBU0MsY0FBVCxDQUF3QixVQUF4QixFQUFvQ0ksS0FBcEMsQ0FBMENDLElBQTFDLEVBQWhCO0FBQ0EsaUJBQUtvQixHQUFMLEdBQVcxQixTQUFTQyxjQUFULENBQXdCLEtBQXhCLEVBQStCSSxLQUEvQixDQUFxQ0MsSUFBckMsRUFBWDs7QUFFQTtBQUNBLGlCQUFLc0IsY0FBTCxDQUFvQkQsUUFBcEI7QUFDSDs7O3VDQUVjQSxRLEVBQ2Y7QUFDSWpCLG9CQUFRQyxHQUFSLENBQVksdUJBQVo7O0FBRUEsaUJBQUtrQixjQUFMLENBQW9CLHdCQUFnQjtBQUNoQ25CLHdCQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDQSxvQkFBSW1CLG1CQUFtQiwyREFBQTNDLENBQVU0QyxPQUFWLEVBQXZCO0FBQUEsb0JBQ0lDLGdCQUFnQiwyREFBQTdDLENBQVVTLElBQVYsRUFEcEI7O0FBR0FjLHdCQUFRQyxHQUFSLENBQVkseUJBQXdCbUIsZ0JBQXBDO0FBQ0FwQix3QkFBUUMsR0FBUixDQUFZLHNCQUFxQnFCLGFBQWpDOztBQUVBdEIsd0JBQVFDLEdBQVIsQ0FBWSw0QkFBWjtBQUNBc0IsZ0JBQUEsNERBQUFBLENBQVdMLGNBQVgsQ0FDSU0sWUFESixFQUVJSixnQkFGSixFQUdJRSxhQUhKLEVBSUlMLFFBSko7QUFNSCxhQWZEO0FBZ0JIOzs7dUNBRWNBLFEsRUFDZjtBQUFBOztBQUNJakIsb0JBQVFDLEdBQVIsQ0FBWSx1QkFBWjs7QUFFQTtBQUNBLGlCQUFLd0IsY0FBTCxDQUFvQix3QkFBZ0I7QUFDaEM7QUFDQUYsZ0JBQUEsNERBQUFBLENBQVdHLGNBQVgsQ0FDSUMsWUFESixFQUVJLE1BQUtiLFFBRlQsRUFHSSxNQUFLQyxRQUhULEVBSUksTUFBS0MsR0FKVCxFQUtJQyxRQUxKO0FBT0gsYUFURDtBQVVIOzs7dUNBRWNBLFEsRUFDZjtBQUNJakIsb0JBQVFDLEdBQVIsQ0FBWSx1QkFBWjs7QUFFQXNCLFlBQUEsNERBQUFBLENBQVdFLGNBQVgsQ0FBMEJSLFFBQTFCO0FBQ0g7Ozs7OztBQUdMLHlEQUFlLElBQUluQixLQUFKLEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDdkVBO0FBQ0E7O0FBRUE7OztBQUdBOEIsT0FBT0MsT0FBUCxHQUFpQjtBQUNiO0FBQ0FoRCxRQUFJO0FBQ0FDLGtCQUFVLHlFQURWO0FBRUFnRCxpQkFBUyxtQkFGVDtBQUdBdkIsa0JBQVUsd0JBSFY7O0FBS0F3QixtQkFBVyxrREFMWDs7QUFPQUMsaUNBQXlCO0FBQ3JCQyxrQkFBTSx5QkFEZTtBQUVyQkMsa0JBQU0sR0FGZTtBQUdyQkMsa0JBQU0sd0RBSGU7QUFJckJDLHlCQUFhLG1DQUpRO0FBS3JCQyxxQkFBUztBQUxZLFNBUHpCOztBQWVBQywrQkFBdUI7QUFDbkJMLGtCQUFNLDZCQURhO0FBRW5CQyxrQkFBTSxHQUZhO0FBR25CQyxrQkFBTSx5REFIYTtBQUluQkksb0JBQVE7QUFKVyxTQWZ2Qjs7QUFzQkFDLGlDQUF5QjtBQUNyQlAsa0JBQU0sNkJBRGU7QUFFckJDLGtCQUFNLEdBRmU7QUFHckJDLGtCQUFNLGtDQUhlO0FBSXJCSSxvQkFBUSxNQUphO0FBS3JCSCx5QkFBYSxtQ0FMUTtBQU1yQkMscUJBQVM7QUFOWTtBQXRCekIsS0FGUzs7QUFrQ2I7QUFDQUksZUFBVztBQUNQLFdBQUcsVUFESTtBQUVQLFdBQUcsU0FGSTtBQUdQLFdBQUcsUUFISTtBQUlQLFdBQUc7QUFKSSxLQW5DRTs7QUEwQ2I7QUFDQUMsZ0JBQVk7QUFDUixXQUFHLGdCQURLO0FBRVIsV0FBRyxhQUZLO0FBR1IsV0FBRztBQUhLO0FBM0NDLENBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBLElBQU1DLFFBQVEsbUJBQUFwRSxDQUFRLG9CQUFSLENBQWQ7O0FBRUE7QUFDQSxtQ0FBWXFFLDRCQUFaLEdBQTJDLEdBQTNDOztJQUVNQyxPOzs7Ozs7OytCQUVLQyxPLEVBQVNDLFEsRUFBVTlCLFEsRUFDMUI7QUFDSTtBQUNBLGdCQUFJK0IsTUFBTUwsTUFBTU0sT0FBTixDQUFjSCxPQUFkLEVBQXVCLFVBQVU1QyxRQUFWLEVBQW9CO0FBQ2pELG9CQUFJZ0QsT0FBTyxFQUFYO0FBQ0FoRCx5QkFBU2lELEVBQVQsQ0FBWSxNQUFaLEVBQW9CLFVBQVVDLEtBQVYsRUFBaUI7QUFDakNGLDRCQUFRRSxLQUFSO0FBQ0gsaUJBRkQ7QUFHQWxELHlCQUFTaUQsRUFBVCxDQUFZLEtBQVosRUFBbUIsWUFBWTtBQUMzQmxDLDZCQUFTO0FBQ0xvQyxpQ0FBU25ELFNBQVNtRCxPQURiO0FBRUxILDhCQUFNQTtBQUZELHFCQUFUO0FBSUgsaUJBTEQ7QUFNQWhELHlCQUFTaUQsRUFBVCxDQUFZLE9BQVosRUFBcUIsVUFBVXRDLEtBQVYsRUFBaUI7QUFDbENiLDRCQUFRQyxHQUFSLENBQ0ksZ0JBREosRUFDc0JZLEtBRHRCO0FBR0gsaUJBSkQ7QUFLSCxhQWhCUyxDQUFWOztBQWtCQW1DLGdCQUFJRyxFQUFKLENBQU8sT0FBUCxFQUFnQixVQUFVdEMsS0FBVixFQUFpQjtBQUM3QmIsd0JBQVFDLEdBQVIsQ0FDSSxlQURKLEVBQ3FCWSxLQURyQjtBQUdILGFBSkQ7O0FBTUE7QUFDQSxnQkFBSWtDLFFBQUosRUFBYztBQUNWQyxvQkFBSU0sS0FBSixDQUFVUCxRQUFWO0FBQ0g7O0FBRURDLGdCQUFJTyxHQUFKO0FBQ0g7O0FBRUQ7Ozs7Ozt1Q0FHZXRDLFEsRUFDZjtBQUNJO0FBQ0EsZ0JBQUk2QixVQUFVO0FBQ1ZVLHNCQUFNLGlEQUFBNUUsQ0FBU0MsRUFBVCxDQUFZeUQscUJBQVosQ0FBa0NMLElBRDlCO0FBRVZ3QixzQkFBTSxpREFBQTdFLENBQVNDLEVBQVQsQ0FBWXlELHFCQUFaLENBQWtDSixJQUY5QjtBQUdWd0Isc0JBQU0saURBQUE5RSxDQUFTQyxFQUFULENBQVl5RCxxQkFBWixDQUFrQ0gsSUFIOUI7QUFJVndCLHdCQUFRLGlEQUFBL0UsQ0FBU0MsRUFBVCxDQUFZeUQscUJBQVosQ0FBa0NDLE1BSmhDO0FBS1ZxQixvQ0FBb0IsS0FMVjtBQU1WQyw2QkFBYSxJQU5IO0FBT1ZDLHVCQUFPLEtBUEc7QUFRVlQseUJBQVM7QUFDTCxrQ0FBYyxpREFBQXpFLENBQVNDLEVBQVQsQ0FBWWtEO0FBRHJCO0FBUkMsYUFBZDs7QUFhQSxpQkFBS2dDLE1BQUwsQ0FBWWpCLE9BQVosRUFBcUIsS0FBckIsRUFBNEIsb0JBQVk7QUFDcEMsb0JBQUlrQixPQUFPOUQsU0FBU2dELElBQVQsQ0FBY2UsS0FBZCxDQUFvQixJQUFwQixFQUEwQkMsTUFBMUIsQ0FBaUM7QUFBQSwyQkFBUUYsS0FBS0csT0FBTCxDQUFhLFVBQWIsSUFBMkIsQ0FBQyxDQUFwQztBQUFBLGlCQUFqQyxFQUF3RSxDQUF4RSxDQUFYOztBQUVBLG9CQUFJLENBQUNILElBQUwsRUFBVztBQUNQaEUsNEJBQVFhLEtBQVIsQ0FBYyx3QkFBZCxFQUF3QyxpQ0FBeEM7QUFDQTtBQUNIOztBQUVELG9CQUFJdUQsS0FBS0osS0FBS0ssT0FBTCxDQUFhLDhDQUFiLEVBQTZELEVBQTdELEVBQWlFQSxPQUFqRSxDQUF5RSxJQUF6RSxFQUErRSxFQUEvRSxFQUFtRnpFLElBQW5GLEVBQVQ7QUFDQUksd0JBQVFDLEdBQVIsQ0FBWSx1QkFBc0JtRSxFQUFsQztBQUNBbkQseUJBQVNtRCxFQUFUO0FBQ0gsYUFYRDtBQVlIOztBQUVEOzs7Ozs7dUNBR2VFLFUsRUFBWXhELFEsRUFBVUMsUSxFQUFVQyxHLEVBQUtDLFEsRUFDcEQ7QUFDSSxnQkFBTXNELGNBQWMsbUJBQUFoRyxDQUFRLGdDQUFSLENBQXBCO0FBQ0EsZ0JBQU13RSxXQUFXd0IsWUFBWUMsU0FBWixDQUFzQjtBQUNuQyw0QkFBWUYsVUFEdUI7QUFFbkMsMEJBQVV4RCxRQUZ5QjtBQUduQyw0QkFBWUMsUUFIdUI7QUFJbkMseUJBQVNDO0FBSjBCLGFBQXRCLENBQWpCOztBQU9BO0FBQ0EsZ0JBQUk4QixVQUFVO0FBQ1ZVLHNCQUFNLGlEQUFBNUUsQ0FBU0MsRUFBVCxDQUFZMkQsdUJBQVosQ0FBb0NQLElBRGhDO0FBRVZ3QixzQkFBTSxpREFBQTdFLENBQVNDLEVBQVQsQ0FBWTJELHVCQUFaLENBQW9DTixJQUZoQztBQUdWd0Isc0JBQU0saURBQUE5RSxDQUFTQyxFQUFULENBQVkyRCx1QkFBWixDQUFvQ0wsSUFIaEM7QUFJVndCLHdCQUFRLGlEQUFBL0UsQ0FBU0MsRUFBVCxDQUFZMkQsdUJBQVosQ0FBb0NELE1BSmxDO0FBS1ZxQixvQ0FBb0IsS0FMVjtBQU1WQyw2QkFBYSxJQU5IO0FBT1ZDLHVCQUFPLEtBUEc7QUFRVlQseUJBQVM7QUFDTCxrQ0FBYyxpREFBQXpFLENBQVNDLEVBQVQsQ0FBWWtELFNBRHJCO0FBRUwsb0NBQWdCLGlEQUFBbkQsQ0FBU0MsRUFBVCxDQUFZMkQsdUJBQVosQ0FBb0NKLFdBRi9DO0FBR0wsc0NBQWtCVyxTQUFTNUQsTUFIdEI7QUFJTCwrQkFBVyxpREFBQVAsQ0FBU0MsRUFBVCxDQUFZMkQsdUJBQVosQ0FBb0NIO0FBSjFDO0FBUkMsYUFBZDs7QUFnQkEsaUJBQUswQixNQUFMLENBQVlqQixPQUFaLEVBQXFCQyxRQUFyQixFQUErQixvQkFBWTtBQUN2QyxvQkFBSWlCLE9BQU85RCxTQUFTZ0QsSUFBVCxDQUFjZSxLQUFkLENBQW9CLElBQXBCLEVBQTBCQyxNQUExQixDQUFpQztBQUFBLDJCQUFRRixLQUFLRyxPQUFMLENBQWEsbUJBQWIsSUFBb0MsQ0FBQyxDQUE3QztBQUFBLGlCQUFqQyxFQUFpRixDQUFqRixDQUFYOztBQUVBLG9CQUFJLENBQUNILElBQUwsRUFBVztBQUNQaEUsNEJBQVFhLEtBQVIsQ0FBYyx3QkFBZCxFQUF3Qyw0Q0FBeEM7QUFDQTtBQUNIOztBQUVELG9CQUFJdUQsS0FBS0osS0FBS0ssT0FBTCxDQUFhLDBDQUFiLEVBQXlELEVBQXpELEVBQTZEQSxPQUE3RCxDQUFxRSxxRUFBckUsRUFBNEksRUFBNUksRUFBZ0p6RSxJQUFoSixFQUFUO0FBQ0FJLHdCQUFRQyxHQUFSLENBQVksdUJBQXNCbUUsRUFBbEM7QUFDQW5ELHlCQUFTbUQsRUFBVDtBQUNILGFBWEQ7QUFZSDs7O3VDQUVjRSxVLEVBQVlsRCxnQixFQUFrQkUsYSxFQUFlTCxRLEVBQzVEO0FBQ0ksZ0JBQUl5QyxPQUFPLGlEQUFBOUUsQ0FBU0MsRUFBVCxDQUFZbUQsdUJBQVosQ0FBb0NHLElBQS9DO0FBQ0F1QixtQkFBT0EsS0FBS1csT0FBTCxDQUFhLFdBQWIsRUFBMEJqRCxnQkFBMUIsQ0FBUDtBQUNBc0MsbUJBQU9BLEtBQUtXLE9BQUwsQ0FBYSxZQUFiLEVBQTJCQyxVQUEzQixDQUFQOztBQUVBdEUsb0JBQVFDLEdBQVIsQ0FBWSxZQUFZeUQsSUFBeEI7O0FBRUE7QUFDQSxnQkFBSVosVUFBVTtBQUNWVSxzQkFBTSxpREFBQTVFLENBQVNDLEVBQVQsQ0FBWW1ELHVCQUFaLENBQW9DQyxJQURoQztBQUVWd0Isc0JBQU0saURBQUE3RSxDQUFTQyxFQUFULENBQVltRCx1QkFBWixDQUFvQ0UsSUFGaEM7QUFHVndCLHNCQUFNQSxJQUhJO0FBSVZDLHdCQUFRLGlEQUFBL0UsQ0FBU0MsRUFBVCxDQUFZbUQsdUJBQVosQ0FBb0NPLE1BSmxDO0FBS1ZxQixvQ0FBb0IsS0FMVjtBQU1WQyw2QkFBYSxJQU5IO0FBT1ZDLHVCQUFPLEtBUEc7QUFRVlQseUJBQVM7QUFDTCxvQ0FBZ0IsY0FEWDtBQUVMLGtDQUFjLGlEQUFBekUsQ0FBU0MsRUFBVCxDQUFZa0QsU0FGckI7QUFHTCxvQ0FBZ0IsaURBQUFuRCxDQUFTQyxFQUFULENBQVltRCx1QkFBWixDQUFvQ0ksV0FIL0M7QUFJTCxzQ0FBa0JkLGNBQWNuQyxNQUozQjtBQUtMLCtCQUFXLGlEQUFBUCxDQUFTQyxFQUFULENBQVltRCx1QkFBWixDQUFvQ0s7QUFMMUM7QUFSQyxhQUFkOztBQWlCQSxpQkFBSzBCLE1BQUwsQ0FBWWpCLE9BQVosRUFBcUJ4QixhQUFyQixFQUFvQyxvQkFBWTtBQUM1Q3RCLHdCQUFRQyxHQUFSLENBQVlDLFFBQVo7QUFDQ2UseUJBQVM7QUFDTmIsdUNBQW1CRixTQUFTbUQsT0FBVCxDQUFpQixrQkFBakIsQ0FEYjtBQUVObEQsaUNBQWFELFNBQVNtRCxPQUFULENBQWlCLG1CQUFqQjtBQUZQLGlCQUFUO0FBSUosYUFORDtBQU9IOzs7Ozs7QUFHTCx5REFBZSxJQUFJUixPQUFKLEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDNUpBLDBDOzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7Ozs7QUNBQSx3QyIsImZpbGUiOiJqcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvYXBwLmpzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg4YWM5YTNiZjEzMjRkNzA3NTViIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJylcclxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZmlsZW5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgdmFyIHN1bSA9IGNyeXB0by5jcmVhdGVIYXNoKCdzaGExJylcclxuICBpZiAoY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICB2YXIgZmlsZVN0cmVhbSA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0oZmlsZW5hbWUpXHJcbiAgICBmaWxlU3RyZWFtLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgbnVsbClcclxuICAgIH0pXHJcbiAgICBmaWxlU3RyZWFtLm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgc3VtLnVwZGF0ZShjaHVuaylcclxuICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXgsIG51bGwpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBmaWxlU3RyZWFtLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBzdW0uZGlnZXN0KCdoZXgnKSlcclxuICAgIH0pXHJcbiAgfSBlbHNlIHtcclxuICAgIHN1bS51cGRhdGUoZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lKSlcclxuICAgIHJldHVybiBzdW0uZGlnZXN0KCdoZXgnKVxyXG4gIH1cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaGExLWZpbGUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3NoYTEtZmlsZS9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJbml0aWFsaXplIEdhbWUgTGF1bmNoZXIgbG9naWNcclxuaW1wb3J0IEdhbWVMYXVuY2hlciBmcm9tICcuL3hpdi9HYW1lTGF1bmNoZXInO1xyXG5HYW1lTGF1bmNoZXIuaW5pdCgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vU2V0dGluZ3MnO1xyXG5jb25zdCBzaGExRmlsZSA9IHJlcXVpcmUoJ3NoYTEtZmlsZScpO1xyXG5jb25zdCBmaWxlc3lzdGVtID0gcmVxdWlyZSgnZnMnKTtcclxuXHJcbmNsYXNzIEdhbWVGaWxlc1xyXG57XHJcbiAgICBoYXNoKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJmZnhpdmJvb3QuZXhlL1wiICsgdGhpcy5nZXRTaXplQW5kSGFzaCgnL2Jvb3QvZmZ4aXZib290LmV4ZScpICtcclxuICAgICAgICAgICAgICAgXCIsZmZ4aXZsYXVuY2hlci5leGUvXCIrIHRoaXMuZ2V0U2l6ZUFuZEhhc2goJy9ib290L2ZmeGl2bGF1bmNoZXIuZXhlJykgK1xyXG4gICAgICAgICAgICAgICBcIixmZnhpdnVwZGF0ZXIuZXhlL1wiKyB0aGlzLmdldFNpemVBbmRIYXNoKCcvYm9vdC9mZnhpdnVwZGF0ZXIuZXhlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmVyc2lvbigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGZpbGVuYW1lID0gU2V0dGluZ3Muc2UuR2FtZVBhdGggKyAnL2dhbWUvZmZ4aXZnYW1lLnZlcicsXHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IGZpbGVzeXN0ZW0ucmVhZEZpbGVTeW5jKGZpbGVuYW1lKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlci50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNpemVBbmRIYXNoKGZpbGVuYW1lKVxyXG4gICAge1xyXG4gICAgICAgIGZpbGVuYW1lID0gU2V0dGluZ3Muc2UuR2FtZVBhdGggKyBmaWxlbmFtZTtcclxuICAgICAgICBsZXQgaGFzaCA9IHNoYTFGaWxlKGZpbGVuYW1lKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gZmlsZXN5c3RlbS5zdGF0U3luYyhmaWxlbmFtZSkuc2l6ZTtcclxuICAgICAgICByZXR1cm4gbGVuZ3RoICsgJy8nICsgaGFzaDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IEdhbWVGaWxlcygpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy94aXYvR2FtZUZpbGVzLmpzIiwiaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vU2V0dGluZ3MnO1xyXG5pbXBvcnQgTG9naW4gZnJvbSAnLi9Mb2dpbic7XHJcblxyXG5jbGFzcyBHYW1lTGF1bmNoZXJcclxue1xyXG4gICAgaW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0dhbWVMYXVuY2hlci5Mb2dpbicpLm9uY2xpY2sgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdExvZ2luKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0dhbWVMYXVuY2hlci5CeXBhc3MnKS5vbmNsaWNrID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnlwYXNzJykudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxhdW5jaEdhbWUoc2lkKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RMb2dpbigpXHJcbiAgICB7XHJcbiAgICAgICAgTG9naW4uZ28ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTE9HSU4gQ09NUExFVEUnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1VTRVIgU0lEID09ICcrIHJlc3BvbnNlLnVzZXJSZWFsU2lkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xJVkUgR0FNRSBWRVJTSU9OID09ICcrIHJlc3BvbnNlLmxhdGVzdEdhbWVWZXJzaW9uKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGF1bmNoR2FtZShyZXNwb25zZS51c2VyUmVhbFNpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGF1bmNoR2FtZSh1c2VyU2lkKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdMYXVuY2hpbmcgZ2FtZSB3aXRoOiAnKyB1c2VyU2lkKTtcclxuXHJcbiAgICAgICAgY29uc3QgZ2FtZUZpbGVuYW1lID0gU2V0dGluZ3Muc2UuR2FtZVBhdGggKyBTZXR0aW5ncy5zZS5EeDExUGF0aDtcclxuICAgICAgICBjb25zdCBnYW1lQXJndW1lbnRzID0gW1xyXG4gICAgICAgICAgICAnREVWLlRlc3RTSUQ9JyArIHVzZXJTaWQsXHJcbiAgICAgICAgICAgICdERVYuTWF4RW50aXRsZWRFeHBhbnNpb25JRD0yJyxcclxuICAgICAgICAgICAgJ2xhbmd1YWdlPTEnXHJcbiAgICAgICAgXTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWNGaWxlO1xyXG4gICAgICAgIGNoaWxkKGdhbWVGaWxlbmFtZSwgZ2FtZUFyZ3VtZW50cywgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZycpO1xyXG5cclxuICAgICAgICAgICAgLy8gdG9kbyAtIGRvIHNvbWV0aGluZyBoZXJlPyBDbG9zZSB0aGUgbGF1bmNoZXI/IEhpZGUgaW4gYmFja2dyb3VuZD9cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IEdhbWVMYXVuY2hlcigpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy94aXYvR2FtZUxhdW5jaGVyLmpzIiwiaW1wb3J0IEdhbWVGaWxlcyBmcm9tICcuL0dhbWVGaWxlcyc7XHJcbmltcG9ydCBYSVZSZXF1ZXN0IGZyb20gJy4vWElWUmVxdWVzdCc7XHJcblxyXG5jbGFzcyBMb2dpblxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm90cCA9IGZhbHNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnbyhjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQXR0ZW1wdGluZyBsb2dpbiAuLi4nKTtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykudmFsdWUudHJpbSgpO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgdGhpcy5vdHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RwJykudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAvLyBhc2sgZm9yIHRoZSByZWFsIFVTRVJfU0lEXHJcbiAgICAgICAgdGhpcy5nZXRSZWFsVXNlclNpZChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVhbFVzZXJTaWQoY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldCB0aGUgUkVBTCB1c2VyIHNpZCcpO1xyXG5cclxuICAgICAgICB0aGlzLmdldFN1ZG9Vc2VyU2lkKFNVRE9fVVNFUl9JRCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCdWlsZCB2ZXJzaW9uICsgaGFzaCcpO1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxHYW1lVmVyc2lvbiA9IEdhbWVGaWxlcy52ZXJzaW9uKCksXHJcbiAgICAgICAgICAgICAgICBsb2NhbEdhbWVIYXNoID0gR2FtZUZpbGVzLmhhc2goKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2NhbEdhbWVWZXJzaW9uID09ICcrIGxvY2FsR2FtZVZlcnNpb24pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG9jYWxHYW1lSGFzaCA9PSAnKyBsb2NhbEdhbWVIYXNoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IHRoZSByZWFsIHVzZXJzIGlkICcpO1xyXG4gICAgICAgICAgICBYSVZSZXF1ZXN0LmdldFJlYWxVc2VyU2lkKFxyXG4gICAgICAgICAgICAgICAgU1VET19VU0VSX0lELFxyXG4gICAgICAgICAgICAgICAgbG9jYWxHYW1lVmVyc2lvbixcclxuICAgICAgICAgICAgICAgIGxvY2FsR2FtZUhhc2gsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3Vkb1VzZXJTaWQoY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldCB0aGUgU1VETyB1c2VyIHNpZCcpO1xyXG5cclxuICAgICAgICAvLyBnZXQgdGVtcCBpZCBmb3IgZm9ybVxyXG4gICAgICAgIHRoaXMuZ2V0VGVtcFVzZXJTaWQoVEVNUF9VU0VSX0lEID0+IHtcclxuICAgICAgICAgICAgLy8gbG9naW4gdG8gZ2V0ICBmYWtlIHVzZXIgaWRcclxuICAgICAgICAgICAgWElWUmVxdWVzdC5nZXRGYWtlVXNlclNpZChcclxuICAgICAgICAgICAgICAgIFRFTVBfVVNFUl9JRCxcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3N3b3JkLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vdHAsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGVtcFVzZXJTaWQoY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldCB0aGUgVEVNUCB1c2VyIHNpZCcpO1xyXG5cclxuICAgICAgICBYSVZSZXF1ZXN0LmdldFRlbXBVc2VyU2lkKGNhbGxiYWNrKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IExvZ2luKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3hpdi9Mb2dpbi5qcyIsIi8vY29uc3Qgc2hhMUZpbGUgPSByZXF1aXJlKCdzaGExLWZpbGUnKTtcclxuLy9jb25zdCBmaWxlc3lzdGVtID0gcmVxdWlyZSgnZnMnKTtcclxuXHJcbi8qKlxyXG4gKiBGRlhJViBDdXN0b20gTGF1bmNoZXIgU2V0dGluZ3NcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLy8gU3F1YXJlLUVuaXggc3BlY2lmaWMgb3B0aW9uc1xyXG4gICAgc2U6IHtcclxuICAgICAgICBHYW1lUGF0aDogJ0M6XFxcXFByb2dyYW0gRmlsZXMgKHg4NilcXFxcU3F1YXJlRW5peFxcXFxGSU5BTCBGQU5UQVNZIFhJViAtIEEgUmVhbG0gUmVib3JuJyxcclxuICAgICAgICBEeDlQYXRoOiAnXFxcXGdhbWVcXFxcZmZ4aXYuZXhlJyxcclxuICAgICAgICBEeDExUGF0aDogJ1xcXFxnYW1lXFxcXGZmeGl2X2R4MTEuZXhlJyxcclxuXHJcbiAgICAgICAgVXNlckFnZW50OiAnU1FFWEF1dGhvci8yLjAuMChXaW5kb3dzIDYuMjsgamEtanA7IDllNzVhYjMwMTIpJyxcclxuXHJcbiAgICAgICAgTG9naW5HYW1lVmVyc2lvblJlcXVlc3Q6IHtcclxuICAgICAgICAgICAgSG9zdDogJ3BhdGNoLWdhbWV2ZXIuZmZ4aXYuY29tJyxcclxuICAgICAgICAgICAgUG9ydDogNDQzLFxyXG4gICAgICAgICAgICBQYXRoOiAnL2h0dHAvd2luMzIvZmZ4aXZuZW9fcmVsZWFzZV9nYW1lL3tHQU1FVkVSfS97VVNFUl9TSUR9JyxcclxuICAgICAgICAgICAgQ29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICBSZWZlcmVyOiAnaHR0cHM6Ly9mZnhpdi1sb2dpbi5zcXVhcmUtZW5peC5jb20vb2F1dGgvZmZ4aXZhcnIvbG9naW4vdG9wP2xuZz1lbiZyZ249MydcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBMb2dpbk9BdXRoRm9ybVJlcXVlc3Q6IHtcclxuICAgICAgICAgICAgSG9zdDogJ2ZmeGl2LWxvZ2luLnNxdWFyZS1lbml4LmNvbScsXHJcbiAgICAgICAgICAgIFBvcnQ6IDQ0MyxcclxuICAgICAgICAgICAgUGF0aDogJy9vYXV0aC9mZnhpdmFyci9sb2dpbi90b3A/bG5nPWVuJnJnbj0zJmlzZnQ9MCZpc3N0ZWFtPTAnLFxyXG4gICAgICAgICAgICBNZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBMb2dpbk9BdXRoQWN0aW9uUmVxdWVzdDoge1xyXG4gICAgICAgICAgICBIb3N0OiAnZmZ4aXYtbG9naW4uc3F1YXJlLWVuaXguY29tJyxcclxuICAgICAgICAgICAgUG9ydDogNDQzLFxyXG4gICAgICAgICAgICBQYXRoOiAnL29hdXRoL2ZmeGl2YXJyL2xvZ2luL2xvZ2luLnNlbmQnLFxyXG4gICAgICAgICAgICBNZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgQ29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICBSZWZlcmVyOiAnaHR0cHM6Ly9mZnhpdi1sb2dpbi5zcXVhcmUtZW5peC5jb20vb2F1dGgvZmZ4aXZhcnIvbG9naW4vdG9wP2xuZz1lbiZyZ249MyZpc2Z0PTAmaXNzdGVhbT0wJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdGhlIG51bWJlcnMgb2YgdGhlc2UgYXJlIGltcG9ydGFudFxyXG4gICAgbGFuZ3VhZ2VzOiB7XHJcbiAgICAgICAgMDogJ0phcGFuZXNlJyxcclxuICAgICAgICAxOiAnRW5nbGlzaCcsXHJcbiAgICAgICAgMjogJ0dlcm1hbicsXHJcbiAgICAgICAgMzogJ0ZyZW5jaCcsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHRoZSBudW1iZXJzIG9mIHRoZXNlIGFyZSBpbXBvcnRhbnRcclxuICAgIGV4cGFuc2lvbnM6IHtcclxuICAgICAgICAwOiAnQSBSZWFsbSBSZWJvcm4nLFxyXG4gICAgICAgIDE6ICdIZWF2ZW5zd2FyZCcsXHJcbiAgICAgICAgMjogJ1N0b3JtYmxvb2QnXHJcbiAgICB9XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3hpdi9TZXR0aW5ncy5qcyIsImltcG9ydCBTZXR0aW5ncyBmcm9tICcuL1NldHRpbmdzJztcclxuY29uc3QgaHR0cHMgPSByZXF1aXJlKFwiaHR0cHNcIik7XHJcblxyXG4vLyBpIGRvbid0IGtub3cgaWYgdGhpcyBpcyBuZWVkZWQsIHRoZSBwYXRjaC1nYW1ldmVyIHNlcnZlciBuZWVkcyBodHRwcyBzc2wgY2VydGlmaWNhdGUgdmVyaWZpY2F0aW9uXHJcbnByb2Nlc3MuZW52Lk5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQgPSBcIjBcIjtcclxuXHJcbmNsYXNzIFJlcXVlc3Rcclxue1xyXG4gICAgYWN0aW9uKG9wdGlvbnMsIHBvc3RkYXRhLCBjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICAvLyByZXF1ZXN0IG9iamVjdFxyXG4gICAgICAgIGxldCByZXEgPSBodHRwcy5yZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBsZXQgYm9keSA9ICcnO1xyXG4gICAgICAgICAgICByZXNwb25zZS5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xyXG4gICAgICAgICAgICAgICAgYm9keSArPSBjaHVuaztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVycyxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBib2R5LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICAgICAgJ1JFU1BPTlNFX0VSUk9SJywgZXJyb3JcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICAnUkVRVUVTVF9FUlJPUicsIGVycm9yXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGlmIGFueSBwb3N0IGRhdGEsIGF0dGFjaCBpdFxyXG4gICAgICAgIGlmIChwb3N0ZGF0YSkge1xyXG4gICAgICAgICAgICByZXEud3JpdGUocG9zdGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxLmVuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB1c2VycyB0ZW1wIHNlc3Npb24gaWQgZm9yIHRoZSBsb2dpbiBmb3JtLlxyXG4gICAgICovXHJcbiAgICBnZXRUZW1wVXNlclNpZChjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICAvLyBvcHRpb25zXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGhvc3Q6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhGb3JtUmVxdWVzdC5Ib3N0LFxyXG4gICAgICAgICAgICBwb3J0OiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoRm9ybVJlcXVlc3QuUG9ydCxcclxuICAgICAgICAgICAgcGF0aDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEZvcm1SZXF1ZXN0LlBhdGgsXHJcbiAgICAgICAgICAgIG1ldGhvZDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEZvcm1SZXF1ZXN0Lk1ldGhvZCxcclxuICAgICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVxdWVzdENlcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIGFnZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ1VzZXItQWdlbnQnOiBTZXR0aW5ncy5zZS5Vc2VyQWdlbnQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3Rpb24ob3B0aW9ucywgZmFsc2UsIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpbmUgPSByZXNwb25zZS5ib2R5LnNwbGl0KFwiXFxuXCIpLmZpbHRlcihsaW5lID0+IGxpbmUuaW5kZXhPZignX1NUT1JFRF8nKSA+IC0xKVswXTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGluZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignR0VUX1RFTVBfVVNFUl9TSURfRkFJTCcsICdObyBfU1RPUkVEXyBpbnB1dCBvbiBodG1sIGZvcm0uJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBpZCA9IGxpbmUucmVwbGFjZSgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiX1NUT1JFRF9cIiB2YWx1ZT1cIicsICcnKS5yZXBsYWNlKCdcIj4nLCAnJykudHJpbSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0VGVtcFVzZXJTaWQgPT0gJysgaWQpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHVzZXJzIGZha2Ugc2Vzc2lvbiBpZCBmb3IgYSBnYW1lLXZlcnNpb24gY2hlY2tcclxuICAgICAqL1xyXG4gICAgZ2V0RmFrZVVzZXJTaWQodGVtcFVzZXJJZCwgdXNlcm5hbWUsIHBhc3N3b3JkLCBvdHAsIGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IFF1ZXJ5U3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcclxuICAgICAgICBjb25zdCBwb3N0ZGF0YSA9IFF1ZXJ5U3RyaW5nLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICdfU1RPUkVEXyc6IHRlbXBVc2VySWQsXHJcbiAgICAgICAgICAgICdzcWV4aWQnOiB1c2VybmFtZSxcclxuICAgICAgICAgICAgJ3Bhc3N3b3JkJzogcGFzc3dvcmQsXHJcbiAgICAgICAgICAgICdvdHBwdyc6IG90cFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBvcHRpb25zXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGhvc3Q6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0Lkhvc3QsXHJcbiAgICAgICAgICAgIHBvcnQ6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0LlBvcnQsXHJcbiAgICAgICAgICAgIHBhdGg6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0LlBhdGgsXHJcbiAgICAgICAgICAgIG1ldGhvZDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuTWV0aG9kLFxyXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXF1ZXN0Q2VydDogdHJ1ZSxcclxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnVXNlci1BZ2VudCc6IFNldHRpbmdzLnNlLlVzZXJBZ2VudCxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoQWN0aW9uUmVxdWVzdC5Db250ZW50VHlwZSxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LUxlbmd0aCc6IHBvc3RkYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICdSZWZlcmVyJzogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuUmVmZXJlclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aW9uKG9wdGlvbnMsIHBvc3RkYXRhLCByZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsaW5lID0gcmVzcG9uc2UuYm9keS5zcGxpdChcIlxcblwiKS5maWx0ZXIobGluZSA9PiBsaW5lLmluZGV4T2YoJ2xvZ2luPWF1dGgsb2ssc2lkJykgPiAtMSlbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpbmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0dFVF9GQUtFX1VTRVJfU0lEX0ZBSUwnLCAnTm8gXCJsb2dpbj1hdXRoLG9rLHNpZFwiIGlucHV0IG9uIGh0bWwgZm9ybS4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGlkID0gbGluZS5yZXBsYWNlKCd3aW5kb3cuZXh0ZXJuYWwudXNlcihcImxvZ2luPWF1dGgsb2ssc2lkLCcsICcnKS5yZXBsYWNlKCcsdGVybXMsMSxyZWdpb24sMixldG1hZGQsMCxwbGF5YWJsZSwxLHBzM3BrZywwLG1heGV4LDIscHJvZHVjdCwxXCIpOycsICcnKS50cmltKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRGYWtlVXNlclNpZCA9PSAnKyBpZCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZWFsVXNlclNpZCh0ZW1wVXNlcklkLCBsb2NhbEdhbWVWZXJzaW9uLCBsb2NhbEdhbWVIYXNoLCBjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICBsZXQgcGF0aCA9IFNldHRpbmdzLnNlLkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0LlBhdGg7XHJcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgne0dBTUVWRVJ9JywgbG9jYWxHYW1lVmVyc2lvbik7XHJcbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgne1VTRVJfU0lEfScsIHRlbXBVc2VySWQpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygncGF0aCA9ICcgKyBwYXRoKTtcclxuXHJcbiAgICAgICAgLy8gb3B0aW9uc1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBob3N0OiBTZXR0aW5ncy5zZS5Mb2dpbkdhbWVWZXJzaW9uUmVxdWVzdC5Ib3N0LFxyXG4gICAgICAgICAgICBwb3J0OiBTZXR0aW5ncy5zZS5Mb2dpbkdhbWVWZXJzaW9uUmVxdWVzdC5Qb3J0LFxyXG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxyXG4gICAgICAgICAgICBtZXRob2Q6IFNldHRpbmdzLnNlLkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0Lk1ldGhvZCxcclxuICAgICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVxdWVzdENlcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIGFnZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ1gtSGFzaC1DaGVjayc6ICdYLUhhc2gtQ2hlY2snLFxyXG4gICAgICAgICAgICAgICAgJ1VzZXItQWdlbnQnOiBTZXR0aW5ncy5zZS5Vc2VyQWdlbnQsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogU2V0dGluZ3Muc2UuTG9naW5HYW1lVmVyc2lvblJlcXVlc3QuQ29udGVudFR5cGUsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1MZW5ndGgnOiBsb2NhbEdhbWVIYXNoLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICdSZWZlcmVyJzogU2V0dGluZ3Muc2UuTG9naW5HYW1lVmVyc2lvblJlcXVlc3QuUmVmZXJlclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aW9uKG9wdGlvbnMsIGxvY2FsR2FtZUhhc2gsIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICAgICAgbGF0ZXN0R2FtZVZlcnNpb246IHJlc3BvbnNlLmhlYWRlcnNbJ3gtbGF0ZXN0LXZlcnNpb24nXSxcclxuICAgICAgICAgICAgICAgIHVzZXJSZWFsU2lkOiByZXNwb25zZS5oZWFkZXJzWyd4LXBhdGNoLXVuaXF1ZS1pZCddXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgUmVxdWVzdCgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy94aXYvWElWUmVxdWVzdC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjaGlsZF9wcm9jZXNzXCJcbi8vIG1vZHVsZSBpZCA9IGNoaWxkX3Byb2Nlc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY3J5cHRvXCJcbi8vIG1vZHVsZSBpZCA9IGNyeXB0b1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IGZzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cHNcIlxuLy8gbW9kdWxlIGlkID0gaHR0cHNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicXVlcnlzdHJpbmdcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJxdWVyeXN0cmluZ1wiXG4vLyBtb2R1bGUgaWQgPSBxdWVyeXN0cmluZ1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9