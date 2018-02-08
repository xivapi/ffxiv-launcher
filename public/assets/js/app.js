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
        }
    }, {
        key: 'requestLogin',
        value: function requestLogin() {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_1__Login__["a" /* default */].go(function (response) {
                console.log('LOGIN COMPLETE');
                console.log('USER SID == ' + response.userRealSid);
                console.log('LIVE GAME VERSION == ' + response.latestGameVersion);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTVlMDZhZWFiYTQwOTgzODVmMWIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NoYTEtZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvR2FtZUZpbGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvR2FtZUxhdW5jaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvTG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3hpdi9TZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMveGl2L1hJVlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJxdWVyeXN0cmluZ1wiIl0sIm5hbWVzIjpbIkdhbWVMYXVuY2hlciIsImluaXQiLCJzaGExRmlsZSIsInJlcXVpcmUiLCJmaWxlc3lzdGVtIiwiR2FtZUZpbGVzIiwiZ2V0U2l6ZUFuZEhhc2giLCJmaWxlbmFtZSIsIlNldHRpbmdzIiwic2UiLCJHYW1lUGF0aCIsImJ1ZmZlciIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiaGFzaCIsImxlbmd0aCIsInN0YXRTeW5jIiwic2l6ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvbmNsaWNrIiwicmVxdWVzdExvZ2luIiwiTG9naW4iLCJnbyIsImNvbnNvbGUiLCJsb2ciLCJyZXNwb25zZSIsInVzZXJSZWFsU2lkIiwibGF0ZXN0R2FtZVZlcnNpb24iLCJsYXVuY2hHYW1lIiwidXNlclNpZCIsImdhbWVGaWxlbmFtZSIsIkR4MTFQYXRoIiwiZ2FtZUFyZ3VtZW50cyIsImNoaWxkIiwiZXhlY0ZpbGUiLCJlcnIiLCJkYXRhIiwiZXJyb3IiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwib3RwIiwiY2FsbGJhY2siLCJ2YWx1ZSIsInRyaW0iLCJnZXRSZWFsVXNlclNpZCIsImdldFN1ZG9Vc2VyU2lkIiwibG9jYWxHYW1lVmVyc2lvbiIsInZlcnNpb24iLCJsb2NhbEdhbWVIYXNoIiwiWElWUmVxdWVzdCIsIlNVRE9fVVNFUl9JRCIsImdldFRlbXBVc2VyU2lkIiwiZ2V0RmFrZVVzZXJTaWQiLCJURU1QX1VTRVJfSUQiLCJtb2R1bGUiLCJleHBvcnRzIiwiRHg5UGF0aCIsIlVzZXJBZ2VudCIsIkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0IiwiSG9zdCIsIlBvcnQiLCJQYXRoIiwiQ29udGVudFR5cGUiLCJSZWZlcmVyIiwiTG9naW5PQXV0aEZvcm1SZXF1ZXN0IiwiTWV0aG9kIiwiTG9naW5PQXV0aEFjdGlvblJlcXVlc3QiLCJsYW5ndWFnZXMiLCJleHBhbnNpb25zIiwiaHR0cHMiLCJOT0RFX1RMU19SRUpFQ1RfVU5BVVRIT1JJWkVEIiwiUmVxdWVzdCIsIm9wdGlvbnMiLCJwb3N0ZGF0YSIsInJlcSIsInJlcXVlc3QiLCJib2R5Iiwib24iLCJjaHVuayIsImhlYWRlcnMiLCJ3cml0ZSIsImVuZCIsImhvc3QiLCJwb3J0IiwicGF0aCIsIm1ldGhvZCIsInJlamVjdFVuYXV0aG9yaXplZCIsInJlcXVlc3RDZXJ0IiwiYWdlbnQiLCJhY3Rpb24iLCJsaW5lIiwic3BsaXQiLCJmaWx0ZXIiLCJpbmRleE9mIiwiaWQiLCJyZXBsYWNlIiwidGVtcFVzZXJJZCIsIlF1ZXJ5U3RyaW5nIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFBQTtBQUNBO0FBQ0Esa0VBQUFBLENBQWFDLElBQWIsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0EsSUFBTUMsV0FBVyxtQkFBQUMsQ0FBUSxvREFBUixDQUFqQjtBQUNBLElBQU1DLGFBQWEsbUJBQUFELENBQVEsY0FBUixDQUFuQjs7SUFFTUUsUzs7Ozs7OzsrQkFHRjtBQUNJLG1CQUFPLG1CQUFtQixLQUFLQyxjQUFMLENBQW9CLHFCQUFwQixDQUFuQixHQUNBLHFCQURBLEdBQ3VCLEtBQUtBLGNBQUwsQ0FBb0IseUJBQXBCLENBRHZCLEdBRUEsb0JBRkEsR0FFc0IsS0FBS0EsY0FBTCxDQUFvQix3QkFBcEIsQ0FGN0I7QUFHSDs7O2tDQUdEO0FBQ0ksZ0JBQUlDLFdBQVcsaURBQUFDLENBQVNDLEVBQVQsQ0FBWUMsUUFBWixHQUF1QixxQkFBdEM7QUFBQSxnQkFDSUMsU0FBU1AsV0FBV1EsWUFBWCxDQUF3QkwsUUFBeEIsQ0FEYjs7QUFHQSxtQkFBT0ksT0FBT0UsUUFBUCxFQUFQO0FBQ0g7Ozt1Q0FFY04sUSxFQUNmO0FBQ0lBLHVCQUFXLGlEQUFBQyxDQUFTQyxFQUFULENBQVlDLFFBQVosR0FBdUJILFFBQWxDO0FBQ0EsZ0JBQUlPLE9BQU9aLFNBQVNLLFFBQVQsQ0FBWDtBQUNBLGdCQUFJUSxTQUFTWCxXQUFXWSxRQUFYLENBQW9CVCxRQUFwQixFQUE4QlUsSUFBM0M7QUFDQSxtQkFBT0YsU0FBUyxHQUFULEdBQWVELElBQXRCO0FBQ0g7Ozs7OztBQUdMLHlEQUFlLElBQUlULFNBQUosRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUNBOztJQUVNTCxZOzs7Ozs7OytCQUdGO0FBQUE7O0FBQ0lrQixxQkFBU0MsY0FBVCxDQUF3QixvQkFBeEIsRUFBOENDLE9BQTlDLEdBQXdELGlCQUFTO0FBQzdELHNCQUFLQyxZQUFMO0FBQ0gsYUFGRDtBQUdIOzs7dUNBR0Q7QUFBQTs7QUFDSUMsWUFBQSx1REFBQUEsQ0FBTUMsRUFBTixDQUFTLG9CQUFZO0FBQ2pCQyx3QkFBUUMsR0FBUixDQUFZLGdCQUFaO0FBQ0FELHdCQUFRQyxHQUFSLENBQVksaUJBQWdCQyxTQUFTQyxXQUFyQztBQUNBSCx3QkFBUUMsR0FBUixDQUFZLDBCQUF5QkMsU0FBU0UsaUJBQTlDOztBQUVBLHVCQUFLQyxVQUFMLENBQWdCSCxTQUFTQyxXQUF6QjtBQUNILGFBTkQ7QUFPSDs7O21DQUVVRyxPLEVBQ1g7QUFDSU4sb0JBQVFDLEdBQVIsQ0FBWSwwQkFBeUJLLE9BQXJDOztBQUVBLGdCQUFNQyxlQUFlLGlEQUFBdkIsQ0FBU0MsRUFBVCxDQUFZQyxRQUFaLEdBQXVCLGlEQUFBRixDQUFTQyxFQUFULENBQVl1QixRQUF4RDtBQUNBLGdCQUFNQyxnQkFBZ0IsQ0FDbEIsaUJBQWlCSCxPQURDLEVBRWxCLDhCQUZrQixFQUdsQixZQUhrQixDQUF0Qjs7QUFPQSxnQkFBTUksUUFBUSxtQkFBQS9CLENBQVEsb0NBQVIsRUFBeUJnQyxRQUF2QztBQUNBRCxrQkFBTUgsWUFBTixFQUFvQkUsYUFBcEIsRUFBbUMsVUFBU0csR0FBVCxFQUFjQyxJQUFkLEVBQW9CO0FBQ25ELG9CQUFHRCxHQUFILEVBQU87QUFDSlosNEJBQVFjLEtBQVIsQ0FBY0YsR0FBZDtBQUNBO0FBQ0Y7O0FBRURaLHdCQUFRQyxHQUFSLENBQVksU0FBWjs7QUFFQTtBQUNILGFBVEQ7QUFVSDs7Ozs7O0FBR0wseURBQWUsSUFBSXpCLFlBQUosRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRBO0FBQ0E7O0lBRU1zQixLO0FBRUYscUJBQ0E7QUFBQTs7QUFDSSxhQUFLaUIsUUFBTCxHQUFnQixLQUFoQjtBQUNBLGFBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxhQUFLQyxHQUFMLEdBQVcsS0FBWDtBQUVIOzs7OzJCQUVFQyxRLEVBQ0g7QUFDSWxCLG9CQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDQSxpQkFBS2MsUUFBTCxHQUFnQnJCLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0N3QixLQUFwQyxDQUEwQ0MsSUFBMUMsRUFBaEI7QUFDQSxpQkFBS0osUUFBTCxHQUFnQnRCLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0N3QixLQUFwQyxDQUEwQ0MsSUFBMUMsRUFBaEI7QUFDQSxpQkFBS0gsR0FBTCxHQUFXdkIsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixFQUErQndCLEtBQS9CLENBQXFDQyxJQUFyQyxFQUFYOztBQUVBO0FBQ0EsaUJBQUtDLGNBQUwsQ0FBb0JILFFBQXBCO0FBQ0g7Ozt1Q0FFY0EsUSxFQUNmO0FBQ0lsQixvQkFBUUMsR0FBUixDQUFZLHVCQUFaOztBQUVBLGlCQUFLcUIsY0FBTCxDQUFvQix3QkFBZ0I7QUFDaEN0Qix3QkFBUUMsR0FBUixDQUFZLHNCQUFaO0FBQ0Esb0JBQUlzQixtQkFBbUIsMkRBQUExQyxDQUFVMkMsT0FBVixFQUF2QjtBQUFBLG9CQUNJQyxnQkFBZ0IsMkRBQUE1QyxDQUFVUyxJQUFWLEVBRHBCOztBQUdBVSx3QkFBUUMsR0FBUixDQUFZLHlCQUF3QnNCLGdCQUFwQztBQUNBdkIsd0JBQVFDLEdBQVIsQ0FBWSxzQkFBcUJ3QixhQUFqQzs7QUFFQXpCLHdCQUFRQyxHQUFSLENBQVksNEJBQVo7QUFDQXlCLGdCQUFBLDREQUFBQSxDQUFXTCxjQUFYLENBQ0lNLFlBREosRUFFSUosZ0JBRkosRUFHSUUsYUFISixFQUlJUCxRQUpKO0FBTUgsYUFmRDtBQWdCSDs7O3VDQUVjQSxRLEVBQ2Y7QUFBQTs7QUFDSWxCLG9CQUFRQyxHQUFSLENBQVksdUJBQVo7O0FBRUE7QUFDQSxpQkFBSzJCLGNBQUwsQ0FBb0Isd0JBQWdCO0FBQ2hDO0FBQ0FGLGdCQUFBLDREQUFBQSxDQUFXRyxjQUFYLENBQ0lDLFlBREosRUFFSSxNQUFLZixRQUZULEVBR0ksTUFBS0MsUUFIVCxFQUlJLE1BQUtDLEdBSlQsRUFLSUMsUUFMSjtBQU9ILGFBVEQ7QUFVSDs7O3VDQUVjQSxRLEVBQ2Y7QUFDSWxCLG9CQUFRQyxHQUFSLENBQVksdUJBQVo7O0FBRUF5QixZQUFBLDREQUFBQSxDQUFXRSxjQUFYLENBQTBCVixRQUExQjtBQUNIOzs7Ozs7QUFHTCx5REFBZSxJQUFJcEIsS0FBSixFQUFmLEU7Ozs7Ozs7Ozs7OztBQ3ZFQTtBQUNBOztBQUVBOzs7QUFHQWlDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYjtBQUNBL0MsUUFBSTtBQUNBQyxrQkFBVSx5RUFEVjtBQUVBK0MsaUJBQVMsbUJBRlQ7QUFHQXpCLGtCQUFVLHdCQUhWOztBQUtBMEIsbUJBQVcsa0RBTFg7O0FBT0FDLGlDQUF5QjtBQUNyQkMsa0JBQU0seUJBRGU7QUFFckJDLGtCQUFNLEdBRmU7QUFHckJDLGtCQUFNLHdEQUhlO0FBSXJCQyx5QkFBYSxtQ0FKUTtBQUtyQkMscUJBQVM7QUFMWSxTQVB6Qjs7QUFlQUMsK0JBQXVCO0FBQ25CTCxrQkFBTSw2QkFEYTtBQUVuQkMsa0JBQU0sR0FGYTtBQUduQkMsa0JBQU0seURBSGE7QUFJbkJJLG9CQUFRO0FBSlcsU0FmdkI7O0FBc0JBQyxpQ0FBeUI7QUFDckJQLGtCQUFNLDZCQURlO0FBRXJCQyxrQkFBTSxHQUZlO0FBR3JCQyxrQkFBTSxrQ0FIZTtBQUlyQkksb0JBQVEsTUFKYTtBQUtyQkgseUJBQWEsbUNBTFE7QUFNckJDLHFCQUFTO0FBTlk7QUF0QnpCLEtBRlM7O0FBa0NiO0FBQ0FJLGVBQVc7QUFDUCxXQUFHLFVBREk7QUFFUCxXQUFHLFNBRkk7QUFHUCxXQUFHLFFBSEk7QUFJUCxXQUFHO0FBSkksS0FuQ0U7O0FBMENiO0FBQ0FDLGdCQUFZO0FBQ1IsV0FBRyxnQkFESztBQUVSLFdBQUcsYUFGSztBQUdSLFdBQUc7QUFISztBQTNDQyxDQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQSxJQUFNQyxRQUFRLG1CQUFBbkUsQ0FBUSxvQkFBUixDQUFkOztBQUVBO0FBQ0EsbUNBQVlvRSw0QkFBWixHQUEyQyxHQUEzQzs7SUFFTUMsTzs7Ozs7OzsrQkFFS0MsTyxFQUFTQyxRLEVBQVVoQyxRLEVBQzFCO0FBQ0k7QUFDQSxnQkFBSWlDLE1BQU1MLE1BQU1NLE9BQU4sQ0FBY0gsT0FBZCxFQUF1QixVQUFVL0MsUUFBVixFQUFvQjtBQUNqRCxvQkFBSW1ELE9BQU8sRUFBWDtBQUNBbkQseUJBQVNvRCxFQUFULENBQVksTUFBWixFQUFvQixVQUFVQyxLQUFWLEVBQWlCO0FBQ2pDRiw0QkFBUUUsS0FBUjtBQUNILGlCQUZEO0FBR0FyRCx5QkFBU29ELEVBQVQsQ0FBWSxLQUFaLEVBQW1CLFlBQVk7QUFDM0JwQyw2QkFBUztBQUNMc0MsaUNBQVN0RCxTQUFTc0QsT0FEYjtBQUVMSCw4QkFBTUE7QUFGRCxxQkFBVDtBQUlILGlCQUxEO0FBTUFuRCx5QkFBU29ELEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFVBQVV4QyxLQUFWLEVBQWlCO0FBQ2xDZCw0QkFBUUMsR0FBUixDQUNJLGdCQURKLEVBQ3NCYSxLQUR0QjtBQUdILGlCQUpEO0FBS0gsYUFoQlMsQ0FBVjs7QUFrQkFxQyxnQkFBSUcsRUFBSixDQUFPLE9BQVAsRUFBZ0IsVUFBVXhDLEtBQVYsRUFBaUI7QUFDN0JkLHdCQUFRQyxHQUFSLENBQ0ksZUFESixFQUNxQmEsS0FEckI7QUFHSCxhQUpEOztBQU1BO0FBQ0EsZ0JBQUlvQyxRQUFKLEVBQWM7QUFDVkMsb0JBQUlNLEtBQUosQ0FBVVAsUUFBVjtBQUNIOztBQUVEQyxnQkFBSU8sR0FBSjtBQUNIOztBQUVEOzs7Ozs7dUNBR2V4QyxRLEVBQ2Y7QUFDSTtBQUNBLGdCQUFJK0IsVUFBVTtBQUNWVSxzQkFBTSxpREFBQTNFLENBQVNDLEVBQVQsQ0FBWXdELHFCQUFaLENBQWtDTCxJQUQ5QjtBQUVWd0Isc0JBQU0saURBQUE1RSxDQUFTQyxFQUFULENBQVl3RCxxQkFBWixDQUFrQ0osSUFGOUI7QUFHVndCLHNCQUFNLGlEQUFBN0UsQ0FBU0MsRUFBVCxDQUFZd0QscUJBQVosQ0FBa0NILElBSDlCO0FBSVZ3Qix3QkFBUSxpREFBQTlFLENBQVNDLEVBQVQsQ0FBWXdELHFCQUFaLENBQWtDQyxNQUpoQztBQUtWcUIsb0NBQW9CLEtBTFY7QUFNVkMsNkJBQWEsSUFOSDtBQU9WQyx1QkFBTyxLQVBHO0FBUVZULHlCQUFTO0FBQ0wsa0NBQWMsaURBQUF4RSxDQUFTQyxFQUFULENBQVlpRDtBQURyQjtBQVJDLGFBQWQ7O0FBYUEsaUJBQUtnQyxNQUFMLENBQVlqQixPQUFaLEVBQXFCLEtBQXJCLEVBQTRCLG9CQUFZO0FBQ3BDLG9CQUFJa0IsT0FBT2pFLFNBQVNtRCxJQUFULENBQWNlLEtBQWQsQ0FBb0IsSUFBcEIsRUFBMEJDLE1BQTFCLENBQWlDO0FBQUEsMkJBQVFGLEtBQUtHLE9BQUwsQ0FBYSxVQUFiLElBQTJCLENBQUMsQ0FBcEM7QUFBQSxpQkFBakMsRUFBd0UsQ0FBeEUsQ0FBWDs7QUFFQSxvQkFBSSxDQUFDSCxJQUFMLEVBQVc7QUFDUG5FLDRCQUFRYyxLQUFSLENBQWMsd0JBQWQsRUFBd0MsaUNBQXhDO0FBQ0E7QUFDSDs7QUFFRCxvQkFBSXlELEtBQUtKLEtBQUtLLE9BQUwsQ0FBYSw4Q0FBYixFQUE2RCxFQUE3RCxFQUFpRUEsT0FBakUsQ0FBeUUsSUFBekUsRUFBK0UsRUFBL0UsRUFBbUZwRCxJQUFuRixFQUFUO0FBQ0FwQix3QkFBUUMsR0FBUixDQUFZLHVCQUFzQnNFLEVBQWxDO0FBQ0FyRCx5QkFBU3FELEVBQVQ7QUFDSCxhQVhEO0FBWUg7O0FBRUQ7Ozs7Ozt1Q0FHZUUsVSxFQUFZMUQsUSxFQUFVQyxRLEVBQVVDLEcsRUFBS0MsUSxFQUNwRDtBQUNJLGdCQUFNd0QsY0FBYyxtQkFBQS9GLENBQVEsZ0NBQVIsQ0FBcEI7QUFDQSxnQkFBTXVFLFdBQVd3QixZQUFZQyxTQUFaLENBQXNCO0FBQ25DLDRCQUFZRixVQUR1QjtBQUVuQywwQkFBVTFELFFBRnlCO0FBR25DLDRCQUFZQyxRQUh1QjtBQUluQyx5QkFBU0M7QUFKMEIsYUFBdEIsQ0FBakI7O0FBT0E7QUFDQSxnQkFBSWdDLFVBQVU7QUFDVlUsc0JBQU0saURBQUEzRSxDQUFTQyxFQUFULENBQVkwRCx1QkFBWixDQUFvQ1AsSUFEaEM7QUFFVndCLHNCQUFNLGlEQUFBNUUsQ0FBU0MsRUFBVCxDQUFZMEQsdUJBQVosQ0FBb0NOLElBRmhDO0FBR1Z3QixzQkFBTSxpREFBQTdFLENBQVNDLEVBQVQsQ0FBWTBELHVCQUFaLENBQW9DTCxJQUhoQztBQUlWd0Isd0JBQVEsaURBQUE5RSxDQUFTQyxFQUFULENBQVkwRCx1QkFBWixDQUFvQ0QsTUFKbEM7QUFLVnFCLG9DQUFvQixLQUxWO0FBTVZDLDZCQUFhLElBTkg7QUFPVkMsdUJBQU8sS0FQRztBQVFWVCx5QkFBUztBQUNMLGtDQUFjLGlEQUFBeEUsQ0FBU0MsRUFBVCxDQUFZaUQsU0FEckI7QUFFTCxvQ0FBZ0IsaURBQUFsRCxDQUFTQyxFQUFULENBQVkwRCx1QkFBWixDQUFvQ0osV0FGL0M7QUFHTCxzQ0FBa0JXLFNBQVMzRCxNQUh0QjtBQUlMLCtCQUFXLGlEQUFBUCxDQUFTQyxFQUFULENBQVkwRCx1QkFBWixDQUFvQ0g7QUFKMUM7QUFSQyxhQUFkOztBQWdCQSxpQkFBSzBCLE1BQUwsQ0FBWWpCLE9BQVosRUFBcUJDLFFBQXJCLEVBQStCLG9CQUFZO0FBQ3ZDLG9CQUFJaUIsT0FBT2pFLFNBQVNtRCxJQUFULENBQWNlLEtBQWQsQ0FBb0IsSUFBcEIsRUFBMEJDLE1BQTFCLENBQWlDO0FBQUEsMkJBQVFGLEtBQUtHLE9BQUwsQ0FBYSxtQkFBYixJQUFvQyxDQUFDLENBQTdDO0FBQUEsaUJBQWpDLEVBQWlGLENBQWpGLENBQVg7O0FBRUEsb0JBQUksQ0FBQ0gsSUFBTCxFQUFXO0FBQ1BuRSw0QkFBUWMsS0FBUixDQUFjLHdCQUFkLEVBQXdDLDRDQUF4QztBQUNBO0FBQ0g7O0FBRUQsb0JBQUl5RCxLQUFLSixLQUFLSyxPQUFMLENBQWEsMENBQWIsRUFBeUQsRUFBekQsRUFBNkRBLE9BQTdELENBQXFFLHFFQUFyRSxFQUE0SSxFQUE1SSxFQUFnSnBELElBQWhKLEVBQVQ7QUFDQXBCLHdCQUFRQyxHQUFSLENBQVksdUJBQXNCc0UsRUFBbEM7QUFDQXJELHlCQUFTcUQsRUFBVDtBQUNILGFBWEQ7QUFZSDs7O3VDQUVjRSxVLEVBQVlsRCxnQixFQUFrQkUsYSxFQUFlUCxRLEVBQzVEO0FBQ0ksZ0JBQUkyQyxPQUFPLGlEQUFBN0UsQ0FBU0MsRUFBVCxDQUFZa0QsdUJBQVosQ0FBb0NHLElBQS9DO0FBQ0F1QixtQkFBT0EsS0FBS1csT0FBTCxDQUFhLFdBQWIsRUFBMEJqRCxnQkFBMUIsQ0FBUDtBQUNBc0MsbUJBQU9BLEtBQUtXLE9BQUwsQ0FBYSxZQUFiLEVBQTJCQyxVQUEzQixDQUFQOztBQUVBekUsb0JBQVFDLEdBQVIsQ0FBWSxZQUFZNEQsSUFBeEI7O0FBRUE7QUFDQSxnQkFBSVosVUFBVTtBQUNWVSxzQkFBTSxpREFBQTNFLENBQVNDLEVBQVQsQ0FBWWtELHVCQUFaLENBQW9DQyxJQURoQztBQUVWd0Isc0JBQU0saURBQUE1RSxDQUFTQyxFQUFULENBQVlrRCx1QkFBWixDQUFvQ0UsSUFGaEM7QUFHVndCLHNCQUFNQSxJQUhJO0FBSVZDLHdCQUFRLGlEQUFBOUUsQ0FBU0MsRUFBVCxDQUFZa0QsdUJBQVosQ0FBb0NPLE1BSmxDO0FBS1ZxQixvQ0FBb0IsS0FMVjtBQU1WQyw2QkFBYSxJQU5IO0FBT1ZDLHVCQUFPLEtBUEc7QUFRVlQseUJBQVM7QUFDTCxvQ0FBZ0IsY0FEWDtBQUVMLGtDQUFjLGlEQUFBeEUsQ0FBU0MsRUFBVCxDQUFZaUQsU0FGckI7QUFHTCxvQ0FBZ0IsaURBQUFsRCxDQUFTQyxFQUFULENBQVlrRCx1QkFBWixDQUFvQ0ksV0FIL0M7QUFJTCxzQ0FBa0JkLGNBQWNsQyxNQUozQjtBQUtMLCtCQUFXLGlEQUFBUCxDQUFTQyxFQUFULENBQVlrRCx1QkFBWixDQUFvQ0s7QUFMMUM7QUFSQyxhQUFkOztBQWlCQSxpQkFBSzBCLE1BQUwsQ0FBWWpCLE9BQVosRUFBcUJ4QixhQUFyQixFQUFvQyxvQkFBWTtBQUM1Q3pCLHdCQUFRQyxHQUFSLENBQVlDLFFBQVo7QUFDQ2dCLHlCQUFTO0FBQ05kLHVDQUFtQkYsU0FBU3NELE9BQVQsQ0FBaUIsa0JBQWpCLENBRGI7QUFFTnJELGlDQUFhRCxTQUFTc0QsT0FBVCxDQUFpQixtQkFBakI7QUFGUCxpQkFBVDtBQUlKLGFBTkQ7QUFPSDs7Ozs7O0FBR0wseURBQWUsSUFBSVIsT0FBSixFQUFmLEU7Ozs7Ozs7Ozs7OztBQzVKQSwwQzs7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7O0FDQUEsd0MiLCJmaWxlIjoianMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2FwcC5qc1wiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxNWUwNmFlYWJhNDA5ODM4NWYxYiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpXHJcbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZpbGVuYW1lLCBjYWxsYmFjaykge1xyXG4gIHZhciBzdW0gPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMScpXHJcbiAgaWYgKGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgdmFyIGZpbGVTdHJlYW0gPSBmcy5jcmVhdGVSZWFkU3RyZWFtKGZpbGVuYW1lKVxyXG4gICAgZmlsZVN0cmVhbS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIG51bGwpXHJcbiAgICB9KVxyXG4gICAgZmlsZVN0cmVhbS5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHN1bS51cGRhdGUoY2h1bmspXHJcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGV4LCBudWxsKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgZmlsZVN0cmVhbS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgc3VtLmRpZ2VzdCgnaGV4JykpXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBzdW0udXBkYXRlKGZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSkpXHJcbiAgICByZXR1cm4gc3VtLmRpZ2VzdCgnaGV4JylcclxuICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2hhMS1maWxlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9zaGExLWZpbGUvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSW5pdGlhbGl6ZSBHYW1lIExhdW5jaGVyIGxvZ2ljXHJcbmltcG9ydCBHYW1lTGF1bmNoZXIgZnJvbSAnLi94aXYvR2FtZUxhdW5jaGVyJztcclxuR2FtZUxhdW5jaGVyLmluaXQoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyIsImltcG9ydCBTZXR0aW5ncyBmcm9tICcuL1NldHRpbmdzJztcclxuY29uc3Qgc2hhMUZpbGUgPSByZXF1aXJlKCdzaGExLWZpbGUnKTtcclxuY29uc3QgZmlsZXN5c3RlbSA9IHJlcXVpcmUoJ2ZzJyk7XHJcblxyXG5jbGFzcyBHYW1lRmlsZXNcclxue1xyXG4gICAgaGFzaCgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiZmZ4aXZib290LmV4ZS9cIiArIHRoaXMuZ2V0U2l6ZUFuZEhhc2goJy9ib290L2ZmeGl2Ym9vdC5leGUnKSArXHJcbiAgICAgICAgICAgICAgIFwiLGZmeGl2bGF1bmNoZXIuZXhlL1wiKyB0aGlzLmdldFNpemVBbmRIYXNoKCcvYm9vdC9mZnhpdmxhdW5jaGVyLmV4ZScpICtcclxuICAgICAgICAgICAgICAgXCIsZmZ4aXZ1cGRhdGVyLmV4ZS9cIisgdGhpcy5nZXRTaXplQW5kSGFzaCgnL2Jvb3QvZmZ4aXZ1cGRhdGVyLmV4ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHZlcnNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBmaWxlbmFtZSA9IFNldHRpbmdzLnNlLkdhbWVQYXRoICsgJy9nYW1lL2ZmeGl2Z2FtZS52ZXInLFxyXG4gICAgICAgICAgICBidWZmZXIgPSBmaWxlc3lzdGVtLnJlYWRGaWxlU3luYyhmaWxlbmFtZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBidWZmZXIudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTaXplQW5kSGFzaChmaWxlbmFtZSlcclxuICAgIHtcclxuICAgICAgICBmaWxlbmFtZSA9IFNldHRpbmdzLnNlLkdhbWVQYXRoICsgZmlsZW5hbWU7XHJcbiAgICAgICAgbGV0IGhhc2ggPSBzaGExRmlsZShmaWxlbmFtZSk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IGZpbGVzeXN0ZW0uc3RhdFN5bmMoZmlsZW5hbWUpLnNpemU7XHJcbiAgICAgICAgcmV0dXJuIGxlbmd0aCArICcvJyArIGhhc2g7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBHYW1lRmlsZXMoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMveGl2L0dhbWVGaWxlcy5qcyIsImltcG9ydCBTZXR0aW5ncyBmcm9tICcuL1NldHRpbmdzJztcclxuaW1wb3J0IExvZ2luIGZyb20gJy4vTG9naW4nO1xyXG5cclxuY2xhc3MgR2FtZUxhdW5jaGVyXHJcbntcclxuICAgIGluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdHYW1lTGF1bmNoZXIuTG9naW4nKS5vbmNsaWNrID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RMb2dpbigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdExvZ2luKClcclxuICAgIHtcclxuICAgICAgICBMb2dpbi5nbyhyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMT0dJTiBDT01QTEVURScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVVNFUiBTSUQgPT0gJysgcmVzcG9uc2UudXNlclJlYWxTaWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTElWRSBHQU1FIFZFUlNJT04gPT0gJysgcmVzcG9uc2UubGF0ZXN0R2FtZVZlcnNpb24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sYXVuY2hHYW1lKHJlc3BvbnNlLnVzZXJSZWFsU2lkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsYXVuY2hHYW1lKHVzZXJTaWQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0xhdW5jaGluZyBnYW1lIHdpdGg6ICcrIHVzZXJTaWQpO1xyXG5cclxuICAgICAgICBjb25zdCBnYW1lRmlsZW5hbWUgPSBTZXR0aW5ncy5zZS5HYW1lUGF0aCArIFNldHRpbmdzLnNlLkR4MTFQYXRoO1xyXG4gICAgICAgIGNvbnN0IGdhbWVBcmd1bWVudHMgPSBbXHJcbiAgICAgICAgICAgICdERVYuVGVzdFNJRD0nICsgdXNlclNpZCxcclxuICAgICAgICAgICAgJ0RFVi5NYXhFbnRpdGxlZEV4cGFuc2lvbklEPTInLFxyXG4gICAgICAgICAgICAnbGFuZ3VhZ2U9MSdcclxuICAgICAgICBdO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGQgPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJykuZXhlY0ZpbGU7XHJcbiAgICAgICAgY2hpbGQoZ2FtZUZpbGVuYW1lLCBnYW1lQXJndW1lbnRzLCBmdW5jdGlvbihlcnIsIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYoZXJyKXtcclxuICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nJyk7XHJcblxyXG4gICAgICAgICAgICAvLyB0b2RvIC0gZG8gc29tZXRoaW5nIGhlcmU/IENsb3NlIHRoZSBsYXVuY2hlcj8gSGlkZSBpbiBiYWNrZ3JvdW5kP1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgR2FtZUxhdW5jaGVyKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3hpdi9HYW1lTGF1bmNoZXIuanMiLCJpbXBvcnQgR2FtZUZpbGVzIGZyb20gJy4vR2FtZUZpbGVzJztcclxuaW1wb3J0IFhJVlJlcXVlc3QgZnJvbSAnLi9YSVZSZXF1ZXN0JztcclxuXHJcbmNsYXNzIExvZ2luXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub3RwID0gZmFsc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdvKGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBdHRlbXB0aW5nIGxvZ2luIC4uLicpO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZCcpLnZhbHVlLnRyaW0oKTtcclxuICAgICAgICB0aGlzLm90cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdHAnKS52YWx1ZS50cmltKCk7XHJcblxyXG4gICAgICAgIC8vIGFzayBmb3IgdGhlIHJlYWwgVVNFUl9TSURcclxuICAgICAgICB0aGlzLmdldFJlYWxVc2VyU2lkKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZWFsVXNlclNpZChjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0IHRoZSBSRUFMIHVzZXIgc2lkJyk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0U3Vkb1VzZXJTaWQoU1VET19VU0VSX0lEID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0J1aWxkIHZlcnNpb24gKyBoYXNoJyk7XHJcbiAgICAgICAgICAgIGxldCBsb2NhbEdhbWVWZXJzaW9uID0gR2FtZUZpbGVzLnZlcnNpb24oKSxcclxuICAgICAgICAgICAgICAgIGxvY2FsR2FtZUhhc2ggPSBHYW1lRmlsZXMuaGFzaCgpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvY2FsR2FtZVZlcnNpb24gPT0gJysgbG9jYWxHYW1lVmVyc2lvbik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2NhbEdhbWVIYXNoID09ICcrIGxvY2FsR2FtZUhhc2gpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgdGhlIHJlYWwgdXNlcnMgaWQgJyk7XHJcbiAgICAgICAgICAgIFhJVlJlcXVlc3QuZ2V0UmVhbFVzZXJTaWQoXHJcbiAgICAgICAgICAgICAgICBTVURPX1VTRVJfSUQsXHJcbiAgICAgICAgICAgICAgICBsb2NhbEdhbWVWZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgbG9jYWxHYW1lSGFzaCxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdWRvVXNlclNpZChjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0IHRoZSBTVURPIHVzZXIgc2lkJyk7XHJcblxyXG4gICAgICAgIC8vIGdldCB0ZW1wIGlkIGZvciBmb3JtXHJcbiAgICAgICAgdGhpcy5nZXRUZW1wVXNlclNpZChURU1QX1VTRVJfSUQgPT4ge1xyXG4gICAgICAgICAgICAvLyBsb2dpbiB0byBnZXQgIGZha2UgdXNlciBpZFxyXG4gICAgICAgICAgICBYSVZSZXF1ZXN0LmdldEZha2VVc2VyU2lkKFxyXG4gICAgICAgICAgICAgICAgVEVNUF9VU0VSX0lELFxyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMucGFzc3dvcmQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLm90cCxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUZW1wVXNlclNpZChjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0IHRoZSBURU1QIHVzZXIgc2lkJyk7XHJcblxyXG4gICAgICAgIFhJVlJlcXVlc3QuZ2V0VGVtcFVzZXJTaWQoY2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgTG9naW4oKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMveGl2L0xvZ2luLmpzIiwiLy9jb25zdCBzaGExRmlsZSA9IHJlcXVpcmUoJ3NoYTEtZmlsZScpO1xyXG4vL2NvbnN0IGZpbGVzeXN0ZW0gPSByZXF1aXJlKCdmcycpO1xyXG5cclxuLyoqXHJcbiAqIEZGWElWIEN1c3RvbSBMYXVuY2hlciBTZXR0aW5nc1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvLyBTcXVhcmUtRW5peCBzcGVjaWZpYyBvcHRpb25zXHJcbiAgICBzZToge1xyXG4gICAgICAgIEdhbWVQYXRoOiAnQzpcXFxcUHJvZ3JhbSBGaWxlcyAoeDg2KVxcXFxTcXVhcmVFbml4XFxcXEZJTkFMIEZBTlRBU1kgWElWIC0gQSBSZWFsbSBSZWJvcm4nLFxyXG4gICAgICAgIER4OVBhdGg6ICdcXFxcZ2FtZVxcXFxmZnhpdi5leGUnLFxyXG4gICAgICAgIER4MTFQYXRoOiAnXFxcXGdhbWVcXFxcZmZ4aXZfZHgxMS5leGUnLFxyXG5cclxuICAgICAgICBVc2VyQWdlbnQ6ICdTUUVYQXV0aG9yLzIuMC4wKFdpbmRvd3MgNi4yOyBqYS1qcDsgOWU3NWFiMzAxMiknLFxyXG5cclxuICAgICAgICBMb2dpbkdhbWVWZXJzaW9uUmVxdWVzdDoge1xyXG4gICAgICAgICAgICBIb3N0OiAncGF0Y2gtZ2FtZXZlci5mZnhpdi5jb20nLFxyXG4gICAgICAgICAgICBQb3J0OiA0NDMsXHJcbiAgICAgICAgICAgIFBhdGg6ICcvaHR0cC93aW4zMi9mZnhpdm5lb19yZWxlYXNlX2dhbWUve0dBTUVWRVJ9L3tVU0VSX1NJRH0nLFxyXG4gICAgICAgICAgICBDb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXHJcbiAgICAgICAgICAgIFJlZmVyZXI6ICdodHRwczovL2ZmeGl2LWxvZ2luLnNxdWFyZS1lbml4LmNvbS9vYXV0aC9mZnhpdmFyci9sb2dpbi90b3A/bG5nPWVuJnJnbj0zJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIExvZ2luT0F1dGhGb3JtUmVxdWVzdDoge1xyXG4gICAgICAgICAgICBIb3N0OiAnZmZ4aXYtbG9naW4uc3F1YXJlLWVuaXguY29tJyxcclxuICAgICAgICAgICAgUG9ydDogNDQzLFxyXG4gICAgICAgICAgICBQYXRoOiAnL29hdXRoL2ZmeGl2YXJyL2xvZ2luL3RvcD9sbmc9ZW4mcmduPTMmaXNmdD0wJmlzc3RlYW09MCcsXHJcbiAgICAgICAgICAgIE1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIExvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0OiB7XHJcbiAgICAgICAgICAgIEhvc3Q6ICdmZnhpdi1sb2dpbi5zcXVhcmUtZW5peC5jb20nLFxyXG4gICAgICAgICAgICBQb3J0OiA0NDMsXHJcbiAgICAgICAgICAgIFBhdGg6ICcvb2F1dGgvZmZ4aXZhcnIvbG9naW4vbG9naW4uc2VuZCcsXHJcbiAgICAgICAgICAgIE1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBDb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXHJcbiAgICAgICAgICAgIFJlZmVyZXI6ICdodHRwczovL2ZmeGl2LWxvZ2luLnNxdWFyZS1lbml4LmNvbS9vYXV0aC9mZnhpdmFyci9sb2dpbi90b3A/bG5nPWVuJnJnbj0zJmlzZnQ9MCZpc3N0ZWFtPTAnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB0aGUgbnVtYmVycyBvZiB0aGVzZSBhcmUgaW1wb3J0YW50XHJcbiAgICBsYW5ndWFnZXM6IHtcclxuICAgICAgICAwOiAnSmFwYW5lc2UnLFxyXG4gICAgICAgIDE6ICdFbmdsaXNoJyxcclxuICAgICAgICAyOiAnR2VybWFuJyxcclxuICAgICAgICAzOiAnRnJlbmNoJyxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdGhlIG51bWJlcnMgb2YgdGhlc2UgYXJlIGltcG9ydGFudFxyXG4gICAgZXhwYW5zaW9uczoge1xyXG4gICAgICAgIDA6ICdBIFJlYWxtIFJlYm9ybicsXHJcbiAgICAgICAgMTogJ0hlYXZlbnN3YXJkJyxcclxuICAgICAgICAyOiAnU3Rvcm1ibG9vZCdcclxuICAgIH1cclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMveGl2L1NldHRpbmdzLmpzIiwiaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vU2V0dGluZ3MnO1xyXG5jb25zdCBodHRwcyA9IHJlcXVpcmUoXCJodHRwc1wiKTtcclxuXHJcbi8vIGkgZG9uJ3Qga25vdyBpZiB0aGlzIGlzIG5lZWRlZCwgdGhlIHBhdGNoLWdhbWV2ZXIgc2VydmVyIG5lZWRzIGh0dHBzIHNzbCBjZXJ0aWZpY2F0ZSB2ZXJpZmljYXRpb25cclxucHJvY2Vzcy5lbnYuTk9ERV9UTFNfUkVKRUNUX1VOQVVUSE9SSVpFRCA9IFwiMFwiO1xyXG5cclxuY2xhc3MgUmVxdWVzdFxyXG57XHJcbiAgICBhY3Rpb24ob3B0aW9ucywgcG9zdGRhdGEsIGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICAgICAgbGV0IHJlcSA9IGh0dHBzLnJlcXVlc3Qob3B0aW9ucywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGxldCBib2R5ID0gJyc7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XHJcbiAgICAgICAgICAgICAgICBib2R5ICs9IGNodW5rO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGJvZHksXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVzcG9uc2Uub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgICAgICAnUkVTUE9OU0VfRVJST1InLCBlcnJvclxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgICdSRVFVRVNUX0VSUk9SJywgZXJyb3JcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gaWYgYW55IHBvc3QgZGF0YSwgYXR0YWNoIGl0XHJcbiAgICAgICAgaWYgKHBvc3RkYXRhKSB7XHJcbiAgICAgICAgICAgIHJlcS53cml0ZShwb3N0ZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXEuZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHVzZXJzIHRlbXAgc2Vzc2lvbiBpZCBmb3IgdGhlIGxvZ2luIGZvcm0uXHJcbiAgICAgKi9cclxuICAgIGdldFRlbXBVc2VyU2lkKGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIC8vIG9wdGlvbnNcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaG9zdDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEZvcm1SZXF1ZXN0Lkhvc3QsXHJcbiAgICAgICAgICAgIHBvcnQ6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhGb3JtUmVxdWVzdC5Qb3J0LFxyXG4gICAgICAgICAgICBwYXRoOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoRm9ybVJlcXVlc3QuUGF0aCxcclxuICAgICAgICAgICAgbWV0aG9kOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoRm9ybVJlcXVlc3QuTWV0aG9kLFxyXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXF1ZXN0Q2VydDogdHJ1ZSxcclxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnVXNlci1BZ2VudCc6IFNldHRpbmdzLnNlLlVzZXJBZ2VudCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFjdGlvbihvcHRpb25zLCBmYWxzZSwgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGluZSA9IHJlc3BvbnNlLmJvZHkuc3BsaXQoXCJcXG5cIikuZmlsdGVyKGxpbmUgPT4gbGluZS5pbmRleE9mKCdfU1RPUkVEXycpID4gLTEpWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdHRVRfVEVNUF9VU0VSX1NJRF9GQUlMJywgJ05vIF9TVE9SRURfIGlucHV0IG9uIGh0bWwgZm9ybS4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGlkID0gbGluZS5yZXBsYWNlKCc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJfU1RPUkVEX1wiIHZhbHVlPVwiJywgJycpLnJlcGxhY2UoJ1wiPicsICcnKS50cmltKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRUZW1wVXNlclNpZCA9PSAnKyBpZCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgdXNlcnMgZmFrZSBzZXNzaW9uIGlkIGZvciBhIGdhbWUtdmVyc2lvbiBjaGVja1xyXG4gICAgICovXHJcbiAgICBnZXRGYWtlVXNlclNpZCh0ZW1wVXNlcklkLCB1c2VybmFtZSwgcGFzc3dvcmQsIG90cCwgY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgUXVlcnlTdHJpbmcgPSByZXF1aXJlKCdxdWVyeXN0cmluZycpO1xyXG4gICAgICAgIGNvbnN0IHBvc3RkYXRhID0gUXVlcnlTdHJpbmcuc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgJ19TVE9SRURfJzogdGVtcFVzZXJJZCxcclxuICAgICAgICAgICAgJ3NxZXhpZCc6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAncGFzc3dvcmQnOiBwYXNzd29yZCxcclxuICAgICAgICAgICAgJ290cHB3Jzogb3RwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIG9wdGlvbnNcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaG9zdDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuSG9zdCxcclxuICAgICAgICAgICAgcG9ydDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuUG9ydCxcclxuICAgICAgICAgICAgcGF0aDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuUGF0aCxcclxuICAgICAgICAgICAgbWV0aG9kOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoQWN0aW9uUmVxdWVzdC5NZXRob2QsXHJcbiAgICAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlcXVlc3RDZXJ0OiB0cnVlLFxyXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdVc2VyLUFnZW50JzogU2V0dGluZ3Muc2UuVXNlckFnZW50LFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0LkNvbnRlbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogcG9zdGRhdGEubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgJ1JlZmVyZXInOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoQWN0aW9uUmVxdWVzdC5SZWZlcmVyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3Rpb24ob3B0aW9ucywgcG9zdGRhdGEsIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpbmUgPSByZXNwb25zZS5ib2R5LnNwbGl0KFwiXFxuXCIpLmZpbHRlcihsaW5lID0+IGxpbmUuaW5kZXhPZignbG9naW49YXV0aCxvayxzaWQnKSA+IC0xKVswXTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGluZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignR0VUX0ZBS0VfVVNFUl9TSURfRkFJTCcsICdObyBcImxvZ2luPWF1dGgsb2ssc2lkXCIgaW5wdXQgb24gaHRtbCBmb3JtLicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaWQgPSBsaW5lLnJlcGxhY2UoJ3dpbmRvdy5leHRlcm5hbC51c2VyKFwibG9naW49YXV0aCxvayxzaWQsJywgJycpLnJlcGxhY2UoJyx0ZXJtcywxLHJlZ2lvbiwyLGV0bWFkZCwwLHBsYXlhYmxlLDEscHMzcGtnLDAsbWF4ZXgsMixwcm9kdWN0LDFcIik7JywgJycpLnRyaW0oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEZha2VVc2VyU2lkID09ICcrIGlkKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlYWxVc2VyU2lkKHRlbXBVc2VySWQsIGxvY2FsR2FtZVZlcnNpb24sIGxvY2FsR2FtZUhhc2gsIGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoID0gU2V0dGluZ3Muc2UuTG9naW5HYW1lVmVyc2lvblJlcXVlc3QuUGF0aDtcclxuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKCd7R0FNRVZFUn0nLCBsb2NhbEdhbWVWZXJzaW9uKTtcclxuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKCd7VVNFUl9TSUR9JywgdGVtcFVzZXJJZCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXRoID0gJyArIHBhdGgpO1xyXG5cclxuICAgICAgICAvLyBvcHRpb25zXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGhvc3Q6IFNldHRpbmdzLnNlLkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0Lkhvc3QsXHJcbiAgICAgICAgICAgIHBvcnQ6IFNldHRpbmdzLnNlLkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0LlBvcnQsXHJcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXHJcbiAgICAgICAgICAgIG1ldGhvZDogU2V0dGluZ3Muc2UuTG9naW5HYW1lVmVyc2lvblJlcXVlc3QuTWV0aG9kLFxyXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXF1ZXN0Q2VydDogdHJ1ZSxcclxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnWC1IYXNoLUNoZWNrJzogJ1gtSGFzaC1DaGVjaycsXHJcbiAgICAgICAgICAgICAgICAnVXNlci1BZ2VudCc6IFNldHRpbmdzLnNlLlVzZXJBZ2VudCxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiBTZXR0aW5ncy5zZS5Mb2dpbkdhbWVWZXJzaW9uUmVxdWVzdC5Db250ZW50VHlwZSxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LUxlbmd0aCc6IGxvY2FsR2FtZUhhc2gubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgJ1JlZmVyZXInOiBTZXR0aW5ncy5zZS5Mb2dpbkdhbWVWZXJzaW9uUmVxdWVzdC5SZWZlcmVyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3Rpb24ob3B0aW9ucywgbG9jYWxHYW1lSGFzaCwgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICBsYXRlc3RHYW1lVmVyc2lvbjogcmVzcG9uc2UuaGVhZGVyc1sneC1sYXRlc3QtdmVyc2lvbiddLFxyXG4gICAgICAgICAgICAgICAgdXNlclJlYWxTaWQ6IHJlc3BvbnNlLmhlYWRlcnNbJ3gtcGF0Y2gtdW5pcXVlLWlkJ11cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBSZXF1ZXN0KCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3hpdi9YSVZSZXF1ZXN0LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIlxuLy8gbW9kdWxlIGlkID0gY2hpbGRfcHJvY2Vzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjcnlwdG9cIlxuLy8gbW9kdWxlIGlkID0gY3J5cHRvXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gZnNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwc1wiXG4vLyBtb2R1bGUgaWQgPSBodHRwc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJxdWVyeXN0cmluZ1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInF1ZXJ5c3RyaW5nXCJcbi8vIG1vZHVsZSBpZCA9IHF1ZXJ5c3RyaW5nXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=