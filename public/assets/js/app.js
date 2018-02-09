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
            var files = ['ffxivboot.exe', 'ffxivlauncher.exe', 'ffxivupdater.exe'];

            for (var i in files) {
                var sizeAndHash = this.getSizeAndHash('/boot/' + files[i]);
                files[i] = files[i] + '/' + sizeAndHash;
            }

            return files.join(',');
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
            var hash = sha1File(filename),
                length = filesystem.statSync(filename).size;
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

                _this2.launchGame(response.userRealSid);
            });
        }
    }, {
        key: 'launchGame',
        value: function launchGame(userSid) {
            var gameFilename = __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.GamePath + __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.Dx11Path;
            var gameArguments = ['DEV.TestSID=' + userSid, 'DEV.MaxEntitledExpansionID=2', 'language=1'];

            __webpack_require__(/*! child_process */ "child_process").execFile(gameFilename, gameArguments, function (err, data) {
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
            this.username = document.getElementById('username').value.trim();
            this.password = document.getElementById('password').value.trim();
            this.otp = document.getElementById('otp').value.trim();

            // ask for the real USER_SID
            this.getRealUserSid(callback);
        }
    }, {
        key: 'getRealUserSid',
        value: function getRealUserSid(callback) {
            this.getSudoUserSid(function (SUDO_USER_ID) {
                var localGameVersion = __WEBPACK_IMPORTED_MODULE_0__GameFiles__["a" /* default */].version(),
                    localGameHash = __WEBPACK_IMPORTED_MODULE_0__GameFiles__["a" /* default */].hash();

                __WEBPACK_IMPORTED_MODULE_1__XIVRequest__["a" /* default */].getRealUserSid(SUDO_USER_ID, localGameVersion, localGameHash, callback);
            });
        }
    }, {
        key: 'getSudoUserSid',
        value: function getSudoUserSid(callback) {
            var _this = this;

            // get temp id for form
            this.getTempUserSid(function (TEMP_USER_ID) {
                // login to get  fake user id
                __WEBPACK_IMPORTED_MODULE_1__XIVRequest__["a" /* default */].getFakeUserSid(TEMP_USER_ID, _this.username, _this.password, _this.otp, callback);
            });
        }
    }, {
        key: 'getTempUserSid',
        value: function getTempUserSid(callback) {
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



// i don't know if this is needed, the patch-gamever server needs https ssl certificate verification
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var Request = function () {
    function Request() {
        _classCallCheck(this, Request);
    }

    _createClass(Request, [{
        key: 'action',
        value: function action(options, postdata, callback) {
            // request object
            var req = __webpack_require__(/*! https */ "https").request(options, function (response) {
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
        key: 'getTempUserSid',
        value: function getTempUserSid(callback) {
            var _this = this;

            console.log('XIVRequest --> getTempUserSid');

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
                callback(_this.findDatInDom(response.body, '_STORED_'));
            });
        }

        /**
         * Get the users fake session id for a game-version check
         */

    }, {
        key: 'getFakeUserSid',
        value: function getFakeUserSid(tempUserId, username, password, otp, callback) {
            var _this2 = this;

            console.log('XIVRequest --> getFakeUserSid');

            var postdata = __webpack_require__(/*! querystring */ "querystring").stringify({
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
                callback(_this2.findDatInDom(response.body, 'login=auth,ok,sid'));
            });
        }

        /**
         * Get the users real session id!
         */

    }, {
        key: 'getRealUserSid',
        value: function getRealUserSid(tempUserId, localGameVersion, localGameHash, callback) {
            console.log('XIVRequest --> getRealUserSid');

            var path = __WEBPACK_IMPORTED_MODULE_0__Settings___default.a.se.LoginGameVersionRequest.Path.replace('{GAMEVER}', localGameVersion).replace('{USER_SID}', tempUserId);

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
                callback({
                    latestGameVersion: response.headers['x-latest-version'],
                    userRealSid: response.headers['x-patch-unique-id']
                });
            });
        }
    }, {
        key: 'findDatInDom',
        value: function findDatInDom(body, data) {
            var line = body.split("\n").filter(function (line) {
                return line.indexOf(data) > -1;
            })[0];

            if (!line) {
                return false;
            }

            return line.replace('<input type="hidden" name="_STORED_" value="', '').replace('window.external.user("login=auth,ok,sid,', '').replace(',terms,1,region,2,etmadd,0,playable,1,ps3pkg,0,maxex,2,product,1");', '').replace(',terms,1,region,3,etmadd,0,playable,1,ps3pkg,0,maxex,2,product,1");', '').replace('">', '').trim();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2Q5NzNhYTdjNThkODA1OGVlNDQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NoYTEtZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvR2FtZUZpbGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvR2FtZUxhdW5jaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvTG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3hpdi9TZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMveGl2L1hJVlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJxdWVyeXN0cmluZ1wiIl0sIm5hbWVzIjpbIkdhbWVMYXVuY2hlciIsImluaXQiLCJzaGExRmlsZSIsInJlcXVpcmUiLCJmaWxlc3lzdGVtIiwiR2FtZUZpbGVzIiwiZmlsZXMiLCJpIiwic2l6ZUFuZEhhc2giLCJnZXRTaXplQW5kSGFzaCIsImpvaW4iLCJmaWxlbmFtZSIsIlNldHRpbmdzIiwic2UiLCJHYW1lUGF0aCIsImJ1ZmZlciIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiaGFzaCIsImxlbmd0aCIsInN0YXRTeW5jIiwic2l6ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvbmNsaWNrIiwicmVxdWVzdExvZ2luIiwic2lkIiwidmFsdWUiLCJ0cmltIiwibGF1bmNoR2FtZSIsIkxvZ2luIiwiZ28iLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJ1c2VyUmVhbFNpZCIsImxhdGVzdEdhbWVWZXJzaW9uIiwidXNlclNpZCIsImdhbWVGaWxlbmFtZSIsIkR4MTFQYXRoIiwiZ2FtZUFyZ3VtZW50cyIsImV4ZWNGaWxlIiwiZXJyIiwiZGF0YSIsImVycm9yIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIm90cCIsImNhbGxiYWNrIiwiZ2V0UmVhbFVzZXJTaWQiLCJnZXRTdWRvVXNlclNpZCIsImxvY2FsR2FtZVZlcnNpb24iLCJ2ZXJzaW9uIiwibG9jYWxHYW1lSGFzaCIsIlhJVlJlcXVlc3QiLCJTVURPX1VTRVJfSUQiLCJnZXRUZW1wVXNlclNpZCIsImdldEZha2VVc2VyU2lkIiwiVEVNUF9VU0VSX0lEIiwibW9kdWxlIiwiZXhwb3J0cyIsIkR4OVBhdGgiLCJVc2VyQWdlbnQiLCJMb2dpbkdhbWVWZXJzaW9uUmVxdWVzdCIsIkhvc3QiLCJQb3J0IiwiUGF0aCIsIkNvbnRlbnRUeXBlIiwiUmVmZXJlciIsIkxvZ2luT0F1dGhGb3JtUmVxdWVzdCIsIk1ldGhvZCIsIkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0IiwibGFuZ3VhZ2VzIiwiZXhwYW5zaW9ucyIsIlJlcXVlc3QiLCJvcHRpb25zIiwicG9zdGRhdGEiLCJyZXEiLCJyZXF1ZXN0IiwiYm9keSIsIm9uIiwiY2h1bmsiLCJoZWFkZXJzIiwid3JpdGUiLCJlbmQiLCJob3N0IiwicG9ydCIsInBhdGgiLCJtZXRob2QiLCJyZWplY3RVbmF1dGhvcml6ZWQiLCJyZXF1ZXN0Q2VydCIsImFnZW50IiwiYWN0aW9uIiwiZmluZERhdEluRG9tIiwidGVtcFVzZXJJZCIsInN0cmluZ2lmeSIsInJlcGxhY2UiLCJsaW5lIiwic3BsaXQiLCJmaWx0ZXIiLCJpbmRleE9mIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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QyxPQUFKLEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDL0pBLDBDOzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7Ozs7QUNBQSx3QyIsImZpbGUiOiJqcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvYXBwLmpzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNkOTczYWE3YzU4ZDgwNThlZTQ0IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJylcclxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZmlsZW5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgdmFyIHN1bSA9IGNyeXB0by5jcmVhdGVIYXNoKCdzaGExJylcclxuICBpZiAoY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICB2YXIgZmlsZVN0cmVhbSA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0oZmlsZW5hbWUpXHJcbiAgICBmaWxlU3RyZWFtLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgbnVsbClcclxuICAgIH0pXHJcbiAgICBmaWxlU3RyZWFtLm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgc3VtLnVwZGF0ZShjaHVuaylcclxuICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXgsIG51bGwpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBmaWxlU3RyZWFtLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBzdW0uZGlnZXN0KCdoZXgnKSlcclxuICAgIH0pXHJcbiAgfSBlbHNlIHtcclxuICAgIHN1bS51cGRhdGUoZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lKSlcclxuICAgIHJldHVybiBzdW0uZGlnZXN0KCdoZXgnKVxyXG4gIH1cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zaGExLWZpbGUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3NoYTEtZmlsZS9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJbml0aWFsaXplIEdhbWUgTGF1bmNoZXIgbG9naWNcclxuaW1wb3J0IEdhbWVMYXVuY2hlciBmcm9tICcuL3hpdi9HYW1lTGF1bmNoZXInO1xyXG5HYW1lTGF1bmNoZXIuaW5pdCgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vU2V0dGluZ3MnO1xyXG5jb25zdCBzaGExRmlsZSA9IHJlcXVpcmUoJ3NoYTEtZmlsZScpO1xyXG5jb25zdCBmaWxlc3lzdGVtID0gcmVxdWlyZSgnZnMnKTtcclxuXHJcbmNsYXNzIEdhbWVGaWxlc1xyXG57XHJcbiAgICBoYXNoKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBmaWxlcyA9IFtcclxuICAgICAgICAgICAgJ2ZmeGl2Ym9vdC5leGUnLFxyXG4gICAgICAgICAgICAnZmZ4aXZsYXVuY2hlci5leGUnLFxyXG4gICAgICAgICAgICAnZmZ4aXZ1cGRhdGVyLmV4ZSdcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgaW4gZmlsZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZUFuZEhhc2ggPSB0aGlzLmdldFNpemVBbmRIYXNoKGAvYm9vdC8ke2ZpbGVzW2ldfWApO1xyXG4gICAgICAgICAgICBmaWxlc1tpXSA9IGAke2ZpbGVzW2ldfS8ke3NpemVBbmRIYXNofWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmlsZXMuam9pbignLCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHZlcnNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBmaWxlbmFtZSA9IFNldHRpbmdzLnNlLkdhbWVQYXRoICsgJy9nYW1lL2ZmeGl2Z2FtZS52ZXInLFxyXG4gICAgICAgICAgICBidWZmZXIgPSBmaWxlc3lzdGVtLnJlYWRGaWxlU3luYyhmaWxlbmFtZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBidWZmZXIudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTaXplQW5kSGFzaChmaWxlbmFtZSlcclxuICAgIHtcclxuICAgICAgICBmaWxlbmFtZSA9IFNldHRpbmdzLnNlLkdhbWVQYXRoICsgZmlsZW5hbWU7XHJcbiAgICAgICAgbGV0IGhhc2ggPSBzaGExRmlsZShmaWxlbmFtZSksXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IGZpbGVzeXN0ZW0uc3RhdFN5bmMoZmlsZW5hbWUpLnNpemU7XHJcbiAgICAgICAgcmV0dXJuIGxlbmd0aCArICcvJyArIGhhc2g7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBHYW1lRmlsZXMoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3hpdi9HYW1lRmlsZXMuanMiLCJpbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9TZXR0aW5ncyc7XHJcbmltcG9ydCBMb2dpbiBmcm9tICcuL0xvZ2luJztcclxuXHJcbmNsYXNzIEdhbWVMYXVuY2hlclxyXG57XHJcbiAgICBpbml0KClcclxuICAgIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnR2FtZUxhdW5jaGVyLkxvZ2luJykub25jbGljayA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0TG9naW4oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnR2FtZUxhdW5jaGVyLkJ5cGFzcycpLm9uY2xpY2sgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdieXBhc3MnKS52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgICAgIHRoaXMubGF1bmNoR2FtZShzaWQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdExvZ2luKClcclxuICAgIHtcclxuICAgICAgICBMb2dpbi5nbyhyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMT0dJTiBDT01QTEVURScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVVNFUiBTSUQgPT0gJysgcmVzcG9uc2UudXNlclJlYWxTaWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTElWRSBHQU1FIFZFUlNJT04gPT0gJysgcmVzcG9uc2UubGF0ZXN0R2FtZVZlcnNpb24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sYXVuY2hHYW1lKHJlc3BvbnNlLnVzZXJSZWFsU2lkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsYXVuY2hHYW1lKHVzZXJTaWQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZ2FtZUZpbGVuYW1lID0gU2V0dGluZ3Muc2UuR2FtZVBhdGggKyBTZXR0aW5ncy5zZS5EeDExUGF0aDtcclxuICAgICAgICBjb25zdCBnYW1lQXJndW1lbnRzID0gW1xyXG4gICAgICAgICAgICAnREVWLlRlc3RTSUQ9JyArIHVzZXJTaWQsXHJcbiAgICAgICAgICAgICdERVYuTWF4RW50aXRsZWRFeHBhbnNpb25JRD0yJyxcclxuICAgICAgICAgICAgJ2xhbmd1YWdlPTEnXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWNGaWxlKGdhbWVGaWxlbmFtZSwgZ2FtZUFyZ3VtZW50cywgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZycpO1xyXG4gICAgICAgICAgICAvLyB0b2RvIC0gZG8gc29tZXRoaW5nIGhlcmU/IENsb3NlIHRoZSBsYXVuY2hlcj8gSGlkZSBpbiBiYWNrZ3JvdW5kP1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgR2FtZUxhdW5jaGVyKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy94aXYvR2FtZUxhdW5jaGVyLmpzIiwiaW1wb3J0IEdhbWVGaWxlcyBmcm9tICcuL0dhbWVGaWxlcyc7XHJcbmltcG9ydCBYSVZSZXF1ZXN0IGZyb20gJy4vWElWUmVxdWVzdCc7XHJcblxyXG5jbGFzcyBMb2dpblxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm90cCA9IGZhbHNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnbyhjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykudmFsdWUudHJpbSgpO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgdGhpcy5vdHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RwJykudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAvLyBhc2sgZm9yIHRoZSByZWFsIFVTRVJfU0lEXHJcbiAgICAgICAgdGhpcy5nZXRSZWFsVXNlclNpZChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVhbFVzZXJTaWQoY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nZXRTdWRvVXNlclNpZChTVURPX1VTRVJfSUQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxHYW1lVmVyc2lvbiA9IEdhbWVGaWxlcy52ZXJzaW9uKCksXHJcbiAgICAgICAgICAgICAgICBsb2NhbEdhbWVIYXNoID0gR2FtZUZpbGVzLmhhc2goKTtcclxuXHJcbiAgICAgICAgICAgIFhJVlJlcXVlc3QuZ2V0UmVhbFVzZXJTaWQoXHJcbiAgICAgICAgICAgICAgICBTVURPX1VTRVJfSUQsXHJcbiAgICAgICAgICAgICAgICBsb2NhbEdhbWVWZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgbG9jYWxHYW1lSGFzaCxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdWRvVXNlclNpZChjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICAvLyBnZXQgdGVtcCBpZCBmb3IgZm9ybVxyXG4gICAgICAgIHRoaXMuZ2V0VGVtcFVzZXJTaWQoVEVNUF9VU0VSX0lEID0+IHtcclxuICAgICAgICAgICAgLy8gbG9naW4gdG8gZ2V0ICBmYWtlIHVzZXIgaWRcclxuICAgICAgICAgICAgWElWUmVxdWVzdC5nZXRGYWtlVXNlclNpZChcclxuICAgICAgICAgICAgICAgIFRFTVBfVVNFUl9JRCxcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3N3b3JkLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vdHAsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGVtcFVzZXJTaWQoY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgWElWUmVxdWVzdC5nZXRUZW1wVXNlclNpZChjYWxsYmFjayk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBMb2dpbigpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMveGl2L0xvZ2luLmpzIiwiLyoqXHJcbiAqIEZGWElWIEN1c3RvbSBMYXVuY2hlciBTZXR0aW5nc1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvLyBTcXVhcmUtRW5peCBzcGVjaWZpYyBvcHRpb25zXHJcbiAgICBzZToge1xyXG4gICAgICAgIEdhbWVQYXRoOiAnQzpcXFxcUHJvZ3JhbSBGaWxlcyAoeDg2KVxcXFxTcXVhcmVFbml4XFxcXEZJTkFMIEZBTlRBU1kgWElWIC0gQSBSZWFsbSBSZWJvcm4nLFxyXG4gICAgICAgIER4OVBhdGg6ICdcXFxcZ2FtZVxcXFxmZnhpdi5leGUnLFxyXG4gICAgICAgIER4MTFQYXRoOiAnXFxcXGdhbWVcXFxcZmZ4aXZfZHgxMS5leGUnLFxyXG4gICAgICAgIFVzZXJBZ2VudDogJ1NRRVhBdXRob3IvMi4wLjAoV2luZG93cyA2LjI7IGphLWpwOyA5ZTc1YWIzMDEyKScsXHJcbiAgICAgICAgTG9naW5HYW1lVmVyc2lvblJlcXVlc3Q6IHtcclxuICAgICAgICAgICAgSG9zdDogJ3BhdGNoLWdhbWV2ZXIuZmZ4aXYuY29tJyxcclxuICAgICAgICAgICAgUG9ydDogNDQzLFxyXG4gICAgICAgICAgICBQYXRoOiAnL2h0dHAvd2luMzIvZmZ4aXZuZW9fcmVsZWFzZV9nYW1lL3tHQU1FVkVSfS97VVNFUl9TSUR9JyxcclxuICAgICAgICAgICAgQ29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICBSZWZlcmVyOiAnaHR0cHM6Ly9mZnhpdi1sb2dpbi5zcXVhcmUtZW5peC5jb20vb2F1dGgvZmZ4aXZhcnIvbG9naW4vdG9wP2xuZz1lbiZyZ249MydcclxuICAgICAgICB9LFxyXG4gICAgICAgIExvZ2luT0F1dGhGb3JtUmVxdWVzdDoge1xyXG4gICAgICAgICAgICBIb3N0OiAnZmZ4aXYtbG9naW4uc3F1YXJlLWVuaXguY29tJyxcclxuICAgICAgICAgICAgUG9ydDogNDQzLFxyXG4gICAgICAgICAgICBQYXRoOiAnL29hdXRoL2ZmeGl2YXJyL2xvZ2luL3RvcD9sbmc9ZW4mcmduPTMmaXNmdD0wJmlzc3RlYW09MCcsXHJcbiAgICAgICAgICAgIE1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTG9naW5PQXV0aEFjdGlvblJlcXVlc3Q6IHtcclxuICAgICAgICAgICAgSG9zdDogJ2ZmeGl2LWxvZ2luLnNxdWFyZS1lbml4LmNvbScsXHJcbiAgICAgICAgICAgIFBvcnQ6IDQ0MyxcclxuICAgICAgICAgICAgUGF0aDogJy9vYXV0aC9mZnhpdmFyci9sb2dpbi9sb2dpbi5zZW5kJyxcclxuICAgICAgICAgICAgTWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIENvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgUmVmZXJlcjogJ2h0dHBzOi8vZmZ4aXYtbG9naW4uc3F1YXJlLWVuaXguY29tL29hdXRoL2ZmeGl2YXJyL2xvZ2luL3RvcD9sbmc9ZW4mcmduPTMmaXNmdD0wJmlzc3RlYW09MCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gdGhlIG51bWJlcnMgb2YgdGhlc2UgYXJlIGltcG9ydGFudFxyXG4gICAgbGFuZ3VhZ2VzOiB7XHJcbiAgICAgICAgMDogJ0phcGFuZXNlJyxcclxuICAgICAgICAxOiAnRW5nbGlzaCcsXHJcbiAgICAgICAgMjogJ0dlcm1hbicsXHJcbiAgICAgICAgMzogJ0ZyZW5jaCcsXHJcbiAgICB9LFxyXG4gICAgLy8gdGhlIG51bWJlcnMgb2YgdGhlc2UgYXJlIGltcG9ydGFudFxyXG4gICAgZXhwYW5zaW9uczoge1xyXG4gICAgICAgIDA6ICdBIFJlYWxtIFJlYm9ybicsXHJcbiAgICAgICAgMTogJ0hlYXZlbnN3YXJkJyxcclxuICAgICAgICAyOiAnU3Rvcm1ibG9vZCdcclxuICAgIH1cclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3hpdi9TZXR0aW5ncy5qcyIsImltcG9ydCBTZXR0aW5ncyBmcm9tICcuL1NldHRpbmdzJztcclxuXHJcbi8vIGkgZG9uJ3Qga25vdyBpZiB0aGlzIGlzIG5lZWRlZCwgdGhlIHBhdGNoLWdhbWV2ZXIgc2VydmVyIG5lZWRzIGh0dHBzIHNzbCBjZXJ0aWZpY2F0ZSB2ZXJpZmljYXRpb25cclxuLy8gcHJvY2Vzcy5lbnYuTk9ERV9UTFNfUkVKRUNUX1VOQVVUSE9SSVpFRCA9IFwiMFwiO1xyXG5cclxuY2xhc3MgUmVxdWVzdFxyXG57XHJcbiAgICBhY3Rpb24ob3B0aW9ucywgcG9zdGRhdGEsIGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICAgICAgbGV0IHJlcSA9IHJlcXVpcmUoXCJodHRwc1wiKS5yZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBsZXQgYm9keSA9ICcnO1xyXG4gICAgICAgICAgICByZXNwb25zZS5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xyXG4gICAgICAgICAgICAgICAgYm9keSArPSBjaHVuaztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVycyxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBib2R5LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JFU1BPTlNFX0VSUk9SJywgZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSRVFVRVNUX0VSUk9SJywgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBpZiBhbnkgcG9zdCBkYXRhLCBhdHRhY2ggaXRcclxuICAgICAgICBpZiAocG9zdGRhdGEpIHtcclxuICAgICAgICAgICAgcmVxLndyaXRlKHBvc3RkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcS5lbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgdXNlcnMgdGVtcCBzZXNzaW9uIGlkIGZvciB0aGUgbG9naW4gZm9ybS5cclxuICAgICAqL1xyXG4gICAgZ2V0VGVtcFVzZXJTaWQoY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1hJVlJlcXVlc3QgLS0+IGdldFRlbXBVc2VyU2lkJyk7XHJcblxyXG4gICAgICAgIC8vIG9wdGlvbnNcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaG9zdDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEZvcm1SZXF1ZXN0Lkhvc3QsXHJcbiAgICAgICAgICAgIHBvcnQ6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhGb3JtUmVxdWVzdC5Qb3J0LFxyXG4gICAgICAgICAgICBwYXRoOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoRm9ybVJlcXVlc3QuUGF0aCxcclxuICAgICAgICAgICAgbWV0aG9kOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoRm9ybVJlcXVlc3QuTWV0aG9kLFxyXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXF1ZXN0Q2VydDogdHJ1ZSxcclxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnVXNlci1BZ2VudCc6IFNldHRpbmdzLnNlLlVzZXJBZ2VudCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFjdGlvbihvcHRpb25zLCBmYWxzZSwgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZERhdEluRG9tKHJlc3BvbnNlLmJvZHksICdfU1RPUkVEXycpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHVzZXJzIGZha2Ugc2Vzc2lvbiBpZCBmb3IgYSBnYW1lLXZlcnNpb24gY2hlY2tcclxuICAgICAqL1xyXG4gICAgZ2V0RmFrZVVzZXJTaWQodGVtcFVzZXJJZCwgdXNlcm5hbWUsIHBhc3N3b3JkLCBvdHAsIGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdYSVZSZXF1ZXN0IC0tPiBnZXRGYWtlVXNlclNpZCcpO1xyXG5cclxuICAgICAgICBjb25zdCBwb3N0ZGF0YSA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJykuc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgJ19TVE9SRURfJzogdGVtcFVzZXJJZCxcclxuICAgICAgICAgICAgJ3NxZXhpZCc6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAncGFzc3dvcmQnOiBwYXNzd29yZCxcclxuICAgICAgICAgICAgJ290cHB3Jzogb3RwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIG9wdGlvbnNcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaG9zdDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuSG9zdCxcclxuICAgICAgICAgICAgcG9ydDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuUG9ydCxcclxuICAgICAgICAgICAgcGF0aDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuUGF0aCxcclxuICAgICAgICAgICAgbWV0aG9kOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoQWN0aW9uUmVxdWVzdC5NZXRob2QsXHJcbiAgICAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlcXVlc3RDZXJ0OiB0cnVlLFxyXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdVc2VyLUFnZW50JzogU2V0dGluZ3Muc2UuVXNlckFnZW50LFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0LkNvbnRlbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogcG9zdGRhdGEubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgJ1JlZmVyZXInOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoQWN0aW9uUmVxdWVzdC5SZWZlcmVyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3Rpb24ob3B0aW9ucywgcG9zdGRhdGEsIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmREYXRJbkRvbShyZXNwb25zZS5ib2R5LCAnbG9naW49YXV0aCxvayxzaWQnKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB1c2VycyByZWFsIHNlc3Npb24gaWQhXHJcbiAgICAgKi9cclxuICAgIGdldFJlYWxVc2VyU2lkKHRlbXBVc2VySWQsIGxvY2FsR2FtZVZlcnNpb24sIGxvY2FsR2FtZUhhc2gsIGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdYSVZSZXF1ZXN0IC0tPiBnZXRSZWFsVXNlclNpZCcpO1xyXG5cclxuICAgICAgICBsZXQgcGF0aCA9IFNldHRpbmdzLnNlLkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0LlBhdGhcclxuICAgICAgICAgICAgLnJlcGxhY2UoJ3tHQU1FVkVSfScsIGxvY2FsR2FtZVZlcnNpb24pXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7VVNFUl9TSUR9JywgdGVtcFVzZXJJZCk7XHJcblxyXG4gICAgICAgIC8vIG9wdGlvbnNcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaG9zdDogU2V0dGluZ3Muc2UuTG9naW5HYW1lVmVyc2lvblJlcXVlc3QuSG9zdCxcclxuICAgICAgICAgICAgcG9ydDogU2V0dGluZ3Muc2UuTG9naW5HYW1lVmVyc2lvblJlcXVlc3QuUG9ydCxcclxuICAgICAgICAgICAgcGF0aDogcGF0aCxcclxuICAgICAgICAgICAgbWV0aG9kOiBTZXR0aW5ncy5zZS5Mb2dpbkdhbWVWZXJzaW9uUmVxdWVzdC5NZXRob2QsXHJcbiAgICAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlcXVlc3RDZXJ0OiB0cnVlLFxyXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdYLUhhc2gtQ2hlY2snOiAnWC1IYXNoLUNoZWNrJyxcclxuICAgICAgICAgICAgICAgICdVc2VyLUFnZW50JzogU2V0dGluZ3Muc2UuVXNlckFnZW50LFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IFNldHRpbmdzLnNlLkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0LkNvbnRlbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogbG9jYWxHYW1lSGFzaC5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAnUmVmZXJlcic6IFNldHRpbmdzLnNlLkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0LlJlZmVyZXJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFjdGlvbihvcHRpb25zLCBsb2NhbEdhbWVIYXNoLCByZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICBsYXRlc3RHYW1lVmVyc2lvbjogcmVzcG9uc2UuaGVhZGVyc1sneC1sYXRlc3QtdmVyc2lvbiddLFxyXG4gICAgICAgICAgICAgICAgdXNlclJlYWxTaWQ6IHJlc3BvbnNlLmhlYWRlcnNbJ3gtcGF0Y2gtdW5pcXVlLWlkJ11cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZERhdEluRG9tKGJvZHksIGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBib2R5LnNwbGl0KFwiXFxuXCIpLmZpbHRlcihsaW5lID0+IGxpbmUuaW5kZXhPZihkYXRhKSA+IC0xKVswXTtcclxuXHJcbiAgICAgICAgaWYgKCFsaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBsaW5lXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJfU1RPUkVEX1wiIHZhbHVlPVwiJywgJycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCd3aW5kb3cuZXh0ZXJuYWwudXNlcihcImxvZ2luPWF1dGgsb2ssc2lkLCcsICcnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgnLHRlcm1zLDEscmVnaW9uLDIsZXRtYWRkLDAscGxheWFibGUsMSxwczNwa2csMCxtYXhleCwyLHByb2R1Y3QsMVwiKTsnLCAnJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoJyx0ZXJtcywxLHJlZ2lvbiwzLGV0bWFkZCwwLHBsYXlhYmxlLDEscHMzcGtnLDAsbWF4ZXgsMixwcm9kdWN0LDFcIik7JywgJycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCdcIj4nLCAnJylcclxuICAgICAgICAgICAgLnRyaW0oKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IFJlcXVlc3QoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3hpdi9YSVZSZXF1ZXN0LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIlxuLy8gbW9kdWxlIGlkID0gY2hpbGRfcHJvY2Vzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjcnlwdG9cIlxuLy8gbW9kdWxlIGlkID0gY3J5cHRvXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gZnNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwc1wiXG4vLyBtb2R1bGUgaWQgPSBodHRwc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJxdWVyeXN0cmluZ1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInF1ZXJ5c3RyaW5nXCJcbi8vIG1vZHVsZSBpZCA9IHF1ZXJ5c3RyaW5nXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=