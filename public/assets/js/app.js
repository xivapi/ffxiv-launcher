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

//
// Misc crap
//

document.getElementById('Window.BG').addEventListener('change', function (event) {
    document.getElementsByTagName('html')[0].className = document.getElementById('Window.BG').value;
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjUxY2Y5YTI1ZWU5OTRjMjgyYjgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NoYTEtZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvR2FtZUZpbGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvR2FtZUxhdW5jaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvTG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3hpdi9TZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMveGl2L1hJVlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJxdWVyeXN0cmluZ1wiIl0sIm5hbWVzIjpbIkdhbWVMYXVuY2hlciIsImluaXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2xhc3NOYW1lIiwidmFsdWUiLCJzaGExRmlsZSIsInJlcXVpcmUiLCJmaWxlc3lzdGVtIiwiR2FtZUZpbGVzIiwiZmlsZXMiLCJpIiwic2l6ZUFuZEhhc2giLCJnZXRTaXplQW5kSGFzaCIsImpvaW4iLCJmaWxlbmFtZSIsIlNldHRpbmdzIiwic2UiLCJHYW1lUGF0aCIsImJ1ZmZlciIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiaGFzaCIsImxlbmd0aCIsInN0YXRTeW5jIiwic2l6ZSIsIm9uY2xpY2siLCJyZXF1ZXN0TG9naW4iLCJzaWQiLCJ0cmltIiwibGF1bmNoR2FtZSIsIkxvZ2luIiwiZ28iLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJ1c2VyUmVhbFNpZCIsImxhdGVzdEdhbWVWZXJzaW9uIiwidXNlclNpZCIsImdhbWVGaWxlbmFtZSIsIkR4MTFQYXRoIiwiZ2FtZUFyZ3VtZW50cyIsImV4ZWNGaWxlIiwiZXJyIiwiZGF0YSIsImVycm9yIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIm90cCIsImNhbGxiYWNrIiwiZ2V0UmVhbFVzZXJTaWQiLCJnZXRTdWRvVXNlclNpZCIsImxvY2FsR2FtZVZlcnNpb24iLCJ2ZXJzaW9uIiwibG9jYWxHYW1lSGFzaCIsIlhJVlJlcXVlc3QiLCJTVURPX1VTRVJfSUQiLCJnZXRUZW1wVXNlclNpZCIsImdldEZha2VVc2VyU2lkIiwiVEVNUF9VU0VSX0lEIiwibW9kdWxlIiwiZXhwb3J0cyIsIkR4OVBhdGgiLCJVc2VyQWdlbnQiLCJMb2dpbkdhbWVWZXJzaW9uUmVxdWVzdCIsIkhvc3QiLCJQb3J0IiwiUGF0aCIsIkNvbnRlbnRUeXBlIiwiUmVmZXJlciIsIkxvZ2luT0F1dGhGb3JtUmVxdWVzdCIsIk1ldGhvZCIsIkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0IiwibGFuZ3VhZ2VzIiwiZXhwYW5zaW9ucyIsIlJlcXVlc3QiLCJvcHRpb25zIiwicG9zdGRhdGEiLCJyZXEiLCJyZXF1ZXN0IiwiYm9keSIsIm9uIiwiY2h1bmsiLCJoZWFkZXJzIiwid3JpdGUiLCJlbmQiLCJob3N0IiwicG9ydCIsInBhdGgiLCJtZXRob2QiLCJyZWplY3RVbmF1dGhvcml6ZWQiLCJyZXF1ZXN0Q2VydCIsImFnZW50IiwiYWN0aW9uIiwiZmluZERhdEluRG9tIiwidGVtcFVzZXJJZCIsInN0cmluZ2lmeSIsInJlcGxhY2UiLCJsaW5lIiwic3BsaXQiLCJmaWx0ZXIiLCJpbmRleE9mIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFBQTtBQUNBO0FBQ0Esa0VBQUFBLENBQWFDLElBQWI7O0FBRUE7QUFDQTtBQUNBOztBQUVBQyxTQUFTQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDQyxnQkFBckMsQ0FBc0QsUUFBdEQsRUFBZ0UsaUJBQVM7QUFDckVGLGFBQVNHLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDQyxTQUF6QyxHQUFxREosU0FBU0MsY0FBVCxDQUF3QixXQUF4QixFQUFxQ0ksS0FBMUY7QUFDSCxDQUZELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBLElBQU1DLFdBQVcsbUJBQUFDLENBQVEsb0RBQVIsQ0FBakI7QUFDQSxJQUFNQyxhQUFhLG1CQUFBRCxDQUFRLGNBQVIsQ0FBbkI7O0lBRU1FLFM7Ozs7Ozs7K0JBR0Y7QUFDSSxnQkFBTUMsUUFBUSxDQUNWLGVBRFUsRUFFVixtQkFGVSxFQUdWLGtCQUhVLENBQWQ7O0FBTUEsaUJBQUksSUFBSUMsQ0FBUixJQUFhRCxLQUFiLEVBQW9CO0FBQ2hCLG9CQUFNRSxjQUFjLEtBQUtDLGNBQUwsWUFBNkJILE1BQU1DLENBQU4sQ0FBN0IsQ0FBcEI7QUFDQUQsc0JBQU1DLENBQU4sSUFBY0QsTUFBTUMsQ0FBTixDQUFkLFNBQTBCQyxXQUExQjtBQUNIOztBQUVELG1CQUFPRixNQUFNSSxJQUFOLENBQVcsR0FBWCxDQUFQO0FBQ0g7OztrQ0FHRDtBQUNJLGdCQUFJQyxXQUFXLGlEQUFBQyxDQUFTQyxFQUFULENBQVlDLFFBQVosR0FBdUIscUJBQXRDO0FBQUEsZ0JBQ0lDLFNBQVNYLFdBQVdZLFlBQVgsQ0FBd0JMLFFBQXhCLENBRGI7O0FBR0EsbUJBQU9JLE9BQU9FLFFBQVAsRUFBUDtBQUNIOzs7dUNBRWNOLFEsRUFDZjtBQUNJQSx1QkFBVyxpREFBQUMsQ0FBU0MsRUFBVCxDQUFZQyxRQUFaLEdBQXVCSCxRQUFsQztBQUNBLGdCQUFJTyxPQUFPaEIsU0FBU1MsUUFBVCxDQUFYO0FBQUEsZ0JBQ0lRLFNBQVNmLFdBQVdnQixRQUFYLENBQW9CVCxRQUFwQixFQUE4QlUsSUFEM0M7QUFFQSxtQkFBT0YsU0FBUyxHQUFULEdBQWVELElBQXRCO0FBQ0g7Ozs7OztBQUdMLHlEQUFlLElBQUliLFNBQUosRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUNBOztJQUVNWCxZOzs7Ozs7OytCQUdGO0FBQUE7O0FBQ0lFLHFCQUFTQyxjQUFULENBQXdCLG9CQUF4QixFQUE4Q3lCLE9BQTlDLEdBQXdELGlCQUFTO0FBQzdELHNCQUFLQyxZQUFMO0FBQ0gsYUFGRDs7QUFJQTNCLHFCQUFTQyxjQUFULENBQXdCLHFCQUF4QixFQUErQ3lCLE9BQS9DLEdBQXlELGlCQUFTO0FBQzlELG9CQUFNRSxNQUFNNUIsU0FBU0MsY0FBVCxDQUF3QixRQUF4QixFQUFrQ0ksS0FBbEMsQ0FBd0N3QixJQUF4QyxFQUFaO0FBQ0Esc0JBQUtDLFVBQUwsQ0FBZ0JGLEdBQWhCO0FBQ0gsYUFIRDtBQUlIOzs7dUNBR0Q7QUFBQTs7QUFDSUcsWUFBQSx1REFBQUEsQ0FBTUMsRUFBTixDQUFTLG9CQUFZO0FBQ2pCQyx3QkFBUUMsR0FBUixDQUFZLGdCQUFaO0FBQ0FELHdCQUFRQyxHQUFSLENBQVksaUJBQWdCQyxTQUFTQyxXQUFyQztBQUNBSCx3QkFBUUMsR0FBUixDQUFZLDBCQUF5QkMsU0FBU0UsaUJBQTlDOztBQUVBLHVCQUFLUCxVQUFMLENBQWdCSyxTQUFTQyxXQUF6QjtBQUNILGFBTkQ7QUFPSDs7O21DQUVVRSxPLEVBQ1g7QUFDSSxnQkFBTUMsZUFBZSxpREFBQXZCLENBQVNDLEVBQVQsQ0FBWUMsUUFBWixHQUF1QixpREFBQUYsQ0FBU0MsRUFBVCxDQUFZdUIsUUFBeEQ7QUFDQSxnQkFBTUMsZ0JBQWdCLENBQ2xCLGlCQUFpQkgsT0FEQyxFQUVsQiw4QkFGa0IsRUFHbEIsWUFIa0IsQ0FBdEI7O0FBTUEvQixZQUFBLG1CQUFBQSxDQUFRLG9DQUFSLEVBQXlCbUMsUUFBekIsQ0FBa0NILFlBQWxDLEVBQWdERSxhQUFoRCxFQUErRCxVQUFTRSxHQUFULEVBQWNDLElBQWQsRUFBb0I7QUFDL0Usb0JBQUdELEdBQUgsRUFBTztBQUNKViw0QkFBUVksS0FBUixDQUFjRixHQUFkO0FBQ0E7QUFDRjs7QUFFRFYsd0JBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0E7QUFDSCxhQVJEO0FBU0g7Ozs7OztBQUdMLHlEQUFlLElBQUlwQyxZQUFKLEVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUNBOztJQUVNaUMsSztBQUVGLHFCQUNBO0FBQUE7O0FBQ0ksYUFBS2UsUUFBTCxHQUFnQixLQUFoQjtBQUNBLGFBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxhQUFLQyxHQUFMLEdBQVcsS0FBWDtBQUVIOzs7OzJCQUVFQyxRLEVBQ0g7QUFDSSxpQkFBS0gsUUFBTCxHQUFnQjlDLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NJLEtBQXBDLENBQTBDd0IsSUFBMUMsRUFBaEI7QUFDQSxpQkFBS2tCLFFBQUwsR0FBZ0IvQyxTQUFTQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DSSxLQUFwQyxDQUEwQ3dCLElBQTFDLEVBQWhCO0FBQ0EsaUJBQUttQixHQUFMLEdBQVdoRCxTQUFTQyxjQUFULENBQXdCLEtBQXhCLEVBQStCSSxLQUEvQixDQUFxQ3dCLElBQXJDLEVBQVg7O0FBRUE7QUFDQSxpQkFBS3FCLGNBQUwsQ0FBb0JELFFBQXBCO0FBQ0g7Ozt1Q0FFY0EsUSxFQUNmO0FBQ0ksaUJBQUtFLGNBQUwsQ0FBb0Isd0JBQWdCO0FBQ2hDLG9CQUFJQyxtQkFBbUIsMkRBQUEzQyxDQUFVNEMsT0FBVixFQUF2QjtBQUFBLG9CQUNJQyxnQkFBZ0IsMkRBQUE3QyxDQUFVYSxJQUFWLEVBRHBCOztBQUdBaUMsZ0JBQUEsNERBQUFBLENBQVdMLGNBQVgsQ0FDSU0sWUFESixFQUVJSixnQkFGSixFQUdJRSxhQUhKLEVBSUlMLFFBSko7QUFNSCxhQVZEO0FBV0g7Ozt1Q0FFY0EsUSxFQUNmO0FBQUE7O0FBQ0k7QUFDQSxpQkFBS1EsY0FBTCxDQUFvQix3QkFBZ0I7QUFDaEM7QUFDQUYsZ0JBQUEsNERBQUFBLENBQVdHLGNBQVgsQ0FDSUMsWUFESixFQUVJLE1BQUtiLFFBRlQsRUFHSSxNQUFLQyxRQUhULEVBSUksTUFBS0MsR0FKVCxFQUtJQyxRQUxKO0FBT0gsYUFURDtBQVVIOzs7dUNBRWNBLFEsRUFDZjtBQUNJTSxZQUFBLDREQUFBQSxDQUFXRSxjQUFYLENBQTBCUixRQUExQjtBQUNIOzs7Ozs7QUFHTCx5REFBZSxJQUFJbEIsS0FBSixFQUFmLEU7Ozs7Ozs7Ozs7OztBQzNEQTs7O0FBR0E2QixPQUFPQyxPQUFQLEdBQWlCO0FBQ2I7QUFDQTVDLFFBQUk7QUFDQUMsa0JBQVUseUVBRFY7QUFFQTRDLGlCQUFTLG1CQUZUO0FBR0F0QixrQkFBVSx3QkFIVjtBQUlBdUIsbUJBQVcsa0RBSlg7QUFLQUMsaUNBQXlCO0FBQ3JCQyxrQkFBTSx5QkFEZTtBQUVyQkMsa0JBQU0sR0FGZTtBQUdyQkMsa0JBQU0sd0RBSGU7QUFJckJDLHlCQUFhLG1DQUpRO0FBS3JCQyxxQkFBUztBQUxZLFNBTHpCO0FBWUFDLCtCQUF1QjtBQUNuQkwsa0JBQU0sNkJBRGE7QUFFbkJDLGtCQUFNLEdBRmE7QUFHbkJDLGtCQUFNLHlEQUhhO0FBSW5CSSxvQkFBUTtBQUpXLFNBWnZCO0FBa0JBQyxpQ0FBeUI7QUFDckJQLGtCQUFNLDZCQURlO0FBRXJCQyxrQkFBTSxHQUZlO0FBR3JCQyxrQkFBTSxrQ0FIZTtBQUlyQkksb0JBQVEsTUFKYTtBQUtyQkgseUJBQWEsbUNBTFE7QUFNckJDLHFCQUFTO0FBTlk7QUFsQnpCLEtBRlM7QUE2QmI7QUFDQUksZUFBVztBQUNQLFdBQUcsVUFESTtBQUVQLFdBQUcsU0FGSTtBQUdQLFdBQUcsUUFISTtBQUlQLFdBQUc7QUFKSSxLQTlCRTtBQW9DYjtBQUNBQyxnQkFBWTtBQUNSLFdBQUcsZ0JBREs7QUFFUixXQUFHLGFBRks7QUFHUixXQUFHO0FBSEs7QUFyQ0MsQ0FBakIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBOztBQUVBO0FBQ0E7O0lBRU1DLE87Ozs7Ozs7K0JBRUtDLE8sRUFBU0MsUSxFQUFVNUIsUSxFQUMxQjtBQUNJO0FBQ0EsZ0JBQUk2QixNQUFNLG1CQUFBdkUsQ0FBUSxvQkFBUixFQUFpQndFLE9BQWpCLENBQXlCSCxPQUF6QixFQUFrQyxVQUFVekMsUUFBVixFQUFvQjtBQUM1RCxvQkFBSTZDLE9BQU8sRUFBWDtBQUNBN0MseUJBQVM4QyxFQUFULENBQVksTUFBWixFQUFvQixVQUFVQyxLQUFWLEVBQWlCO0FBQ2pDRiw0QkFBUUUsS0FBUjtBQUNILGlCQUZEO0FBR0EvQyx5QkFBUzhDLEVBQVQsQ0FBWSxLQUFaLEVBQW1CLFlBQVk7QUFDM0JoQyw2QkFBUztBQUNMa0MsaUNBQVNoRCxTQUFTZ0QsT0FEYjtBQUVMSCw4QkFBTUE7QUFGRCxxQkFBVDtBQUlILGlCQUxEO0FBTUE3Qyx5QkFBUzhDLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFVBQVVwQyxLQUFWLEVBQWlCO0FBQ2xDWiw0QkFBUUMsR0FBUixDQUFZLGdCQUFaLEVBQThCVyxLQUE5QjtBQUNILGlCQUZEO0FBR0gsYUFkUyxDQUFWOztBQWdCQWlDLGdCQUFJRyxFQUFKLENBQU8sT0FBUCxFQUFnQixVQUFVcEMsS0FBVixFQUFpQjtBQUM3Qlosd0JBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCVyxLQUE3QjtBQUNILGFBRkQ7O0FBSUE7QUFDQSxnQkFBSWdDLFFBQUosRUFBYztBQUNWQyxvQkFBSU0sS0FBSixDQUFVUCxRQUFWO0FBQ0g7O0FBRURDLGdCQUFJTyxHQUFKO0FBQ0g7O0FBRUQ7Ozs7Ozt1Q0FHZXBDLFEsRUFDZjtBQUFBOztBQUNJaEIsb0JBQVFDLEdBQVIsQ0FBWSwrQkFBWjs7QUFFQTtBQUNBLGdCQUFJMEMsVUFBVTtBQUNWVSxzQkFBTSxpREFBQXRFLENBQVNDLEVBQVQsQ0FBWXFELHFCQUFaLENBQWtDTCxJQUQ5QjtBQUVWc0Isc0JBQU0saURBQUF2RSxDQUFTQyxFQUFULENBQVlxRCxxQkFBWixDQUFrQ0osSUFGOUI7QUFHVnNCLHNCQUFNLGlEQUFBeEUsQ0FBU0MsRUFBVCxDQUFZcUQscUJBQVosQ0FBa0NILElBSDlCO0FBSVZzQix3QkFBUSxpREFBQXpFLENBQVNDLEVBQVQsQ0FBWXFELHFCQUFaLENBQWtDQyxNQUpoQztBQUtWbUIsb0NBQW9CLEtBTFY7QUFNVkMsNkJBQWEsSUFOSDtBQU9WQyx1QkFBTyxLQVBHO0FBUVZULHlCQUFTO0FBQ0wsa0NBQWMsaURBQUFuRSxDQUFTQyxFQUFULENBQVk4QztBQURyQjtBQVJDLGFBQWQ7O0FBYUEsaUJBQUs4QixNQUFMLENBQVlqQixPQUFaLEVBQXFCLEtBQXJCLEVBQTRCLG9CQUFZO0FBQ3BDM0IseUJBQ0ksTUFBSzZDLFlBQUwsQ0FBa0IzRCxTQUFTNkMsSUFBM0IsRUFBaUMsVUFBakMsQ0FESjtBQUdILGFBSkQ7QUFLSDs7QUFFRDs7Ozs7O3VDQUdlZSxVLEVBQVlqRCxRLEVBQVVDLFEsRUFBVUMsRyxFQUFLQyxRLEVBQ3BEO0FBQUE7O0FBQ0loQixvQkFBUUMsR0FBUixDQUFZLCtCQUFaOztBQUVBLGdCQUFNMkMsV0FBVyxtQkFBQXRFLENBQVEsZ0NBQVIsRUFBdUJ5RixTQUF2QixDQUFpQztBQUM5Qyw0QkFBWUQsVUFEa0M7QUFFOUMsMEJBQVVqRCxRQUZvQztBQUc5Qyw0QkFBWUMsUUFIa0M7QUFJOUMseUJBQVNDO0FBSnFDLGFBQWpDLENBQWpCOztBQU9BO0FBQ0EsZ0JBQUk0QixVQUFVO0FBQ1ZVLHNCQUFNLGlEQUFBdEUsQ0FBU0MsRUFBVCxDQUFZdUQsdUJBQVosQ0FBb0NQLElBRGhDO0FBRVZzQixzQkFBTSxpREFBQXZFLENBQVNDLEVBQVQsQ0FBWXVELHVCQUFaLENBQW9DTixJQUZoQztBQUdWc0Isc0JBQU0saURBQUF4RSxDQUFTQyxFQUFULENBQVl1RCx1QkFBWixDQUFvQ0wsSUFIaEM7QUFJVnNCLHdCQUFRLGlEQUFBekUsQ0FBU0MsRUFBVCxDQUFZdUQsdUJBQVosQ0FBb0NELE1BSmxDO0FBS1ZtQixvQ0FBb0IsS0FMVjtBQU1WQyw2QkFBYSxJQU5IO0FBT1ZDLHVCQUFPLEtBUEc7QUFRVlQseUJBQVM7QUFDTCxrQ0FBYyxpREFBQW5FLENBQVNDLEVBQVQsQ0FBWThDLFNBRHJCO0FBRUwsb0NBQWdCLGlEQUFBL0MsQ0FBU0MsRUFBVCxDQUFZdUQsdUJBQVosQ0FBb0NKLFdBRi9DO0FBR0wsc0NBQWtCUyxTQUFTdEQsTUFIdEI7QUFJTCwrQkFBVyxpREFBQVAsQ0FBU0MsRUFBVCxDQUFZdUQsdUJBQVosQ0FBb0NIO0FBSjFDO0FBUkMsYUFBZDs7QUFnQkEsaUJBQUt3QixNQUFMLENBQVlqQixPQUFaLEVBQXFCQyxRQUFyQixFQUErQixvQkFBWTtBQUN2QzVCLHlCQUNJLE9BQUs2QyxZQUFMLENBQWtCM0QsU0FBUzZDLElBQTNCLEVBQWlDLG1CQUFqQyxDQURKO0FBR0gsYUFKRDtBQUtIOztBQUVEOzs7Ozs7dUNBR2VlLFUsRUFBWTNDLGdCLEVBQWtCRSxhLEVBQWVMLFEsRUFDNUQ7QUFDSWhCLG9CQUFRQyxHQUFSLENBQVksK0JBQVo7O0FBRUEsZ0JBQUlzRCxPQUFPLGlEQUFBeEUsQ0FBU0MsRUFBVCxDQUFZK0MsdUJBQVosQ0FBb0NHLElBQXBDLENBQ044QixPQURNLENBQ0UsV0FERixFQUNlN0MsZ0JBRGYsRUFFTjZDLE9BRk0sQ0FFRSxZQUZGLEVBRWdCRixVQUZoQixDQUFYOztBQUlBO0FBQ0EsZ0JBQUluQixVQUFVO0FBQ1ZVLHNCQUFNLGlEQUFBdEUsQ0FBU0MsRUFBVCxDQUFZK0MsdUJBQVosQ0FBb0NDLElBRGhDO0FBRVZzQixzQkFBTSxpREFBQXZFLENBQVNDLEVBQVQsQ0FBWStDLHVCQUFaLENBQW9DRSxJQUZoQztBQUdWc0Isc0JBQU1BLElBSEk7QUFJVkMsd0JBQVEsaURBQUF6RSxDQUFTQyxFQUFULENBQVkrQyx1QkFBWixDQUFvQ08sTUFKbEM7QUFLVm1CLG9DQUFvQixLQUxWO0FBTVZDLDZCQUFhLElBTkg7QUFPVkMsdUJBQU8sS0FQRztBQVFWVCx5QkFBUztBQUNMLG9DQUFnQixjQURYO0FBRUwsa0NBQWMsaURBQUFuRSxDQUFTQyxFQUFULENBQVk4QyxTQUZyQjtBQUdMLG9DQUFnQixpREFBQS9DLENBQVNDLEVBQVQsQ0FBWStDLHVCQUFaLENBQW9DSSxXQUgvQztBQUlMLHNDQUFrQmQsY0FBYy9CLE1BSjNCO0FBS0wsK0JBQVcsaURBQUFQLENBQVNDLEVBQVQsQ0FBWStDLHVCQUFaLENBQW9DSztBQUwxQztBQVJDLGFBQWQ7O0FBaUJBLGlCQUFLd0IsTUFBTCxDQUFZakIsT0FBWixFQUFxQnRCLGFBQXJCLEVBQW9DLG9CQUFZO0FBQzNDTCx5QkFBUztBQUNOWix1Q0FBbUJGLFNBQVNnRCxPQUFULENBQWlCLGtCQUFqQixDQURiO0FBRU4vQyxpQ0FBYUQsU0FBU2dELE9BQVQsQ0FBaUIsbUJBQWpCO0FBRlAsaUJBQVQ7QUFJSixhQUxEO0FBTUg7OztxQ0FFWUgsSSxFQUFNcEMsSSxFQUNuQjtBQUNJLGdCQUFJc0QsT0FBT2xCLEtBQUttQixLQUFMLENBQVcsSUFBWCxFQUFpQkMsTUFBakIsQ0FBd0I7QUFBQSx1QkFBUUYsS0FBS0csT0FBTCxDQUFhekQsSUFBYixJQUFxQixDQUFDLENBQTlCO0FBQUEsYUFBeEIsRUFBeUQsQ0FBekQsQ0FBWDs7QUFFQSxnQkFBSSxDQUFDc0QsSUFBTCxFQUFXO0FBQ1AsdUJBQU8sS0FBUDtBQUNIOztBQUVELG1CQUFPQSxLQUNGRCxPQURFLENBQ00sOENBRE4sRUFDc0QsRUFEdEQsRUFFRkEsT0FGRSxDQUVNLDBDQUZOLEVBRWtELEVBRmxELEVBR0ZBLE9BSEUsQ0FHTSxxRUFITixFQUc2RSxFQUg3RSxFQUlGQSxPQUpFLENBSU0scUVBSk4sRUFJNkUsRUFKN0UsRUFLRkEsT0FMRSxDQUtNLElBTE4sRUFLWSxFQUxaLEVBTUZwRSxJQU5FLEVBQVA7QUFPSDs7Ozs7O0FBR0wseURBQWUsSUFBSThDLE9BQUosRUFBZixFOzs7Ozs7Ozs7Ozs7QUMvSkEsMEM7Ozs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7OztBQ0FBLHdDIiwiZmlsZSI6ImpzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9hcHAuanNcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjUxY2Y5YTI1ZWU5OTRjMjgyYjgiLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKVxyXG52YXIgZnMgPSByZXF1aXJlKCdmcycpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmaWxlbmFtZSwgY2FsbGJhY2spIHtcclxuICB2YXIgc3VtID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTEnKVxyXG4gIGlmIChjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHZhciBmaWxlU3RyZWFtID0gZnMuY3JlYXRlUmVhZFN0cmVhbShmaWxlbmFtZSlcclxuICAgIGZpbGVTdHJlYW0ub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCBudWxsKVxyXG4gICAgfSlcclxuICAgIGZpbGVTdHJlYW0ub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBzdW0udXBkYXRlKGNodW5rKVxyXG4gICAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhleCwgbnVsbClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIGZpbGVTdHJlYW0ub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHN1bS5kaWdlc3QoJ2hleCcpKVxyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgc3VtLnVwZGF0ZShmcy5yZWFkRmlsZVN5bmMoZmlsZW5hbWUpKVxyXG4gICAgcmV0dXJuIHN1bS5kaWdlc3QoJ2hleCcpXHJcbiAgfVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NoYTEtZmlsZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvc2hhMS1maWxlL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEluaXRpYWxpemUgR2FtZSBMYXVuY2hlciBsb2dpY1xyXG5pbXBvcnQgR2FtZUxhdW5jaGVyIGZyb20gJy4veGl2L0dhbWVMYXVuY2hlcic7XHJcbkdhbWVMYXVuY2hlci5pbml0KCk7XHJcblxyXG4vL1xyXG4vLyBNaXNjIGNyYXBcclxuLy9cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdXaW5kb3cuQkcnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBldmVudCA9PiB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLmNsYXNzTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdXaW5kb3cuQkcnKS52YWx1ZTtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2FwcC5qcyIsImltcG9ydCBTZXR0aW5ncyBmcm9tICcuL1NldHRpbmdzJztcclxuY29uc3Qgc2hhMUZpbGUgPSByZXF1aXJlKCdzaGExLWZpbGUnKTtcclxuY29uc3QgZmlsZXN5c3RlbSA9IHJlcXVpcmUoJ2ZzJyk7XHJcblxyXG5jbGFzcyBHYW1lRmlsZXNcclxue1xyXG4gICAgaGFzaCgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZmlsZXMgPSBbXHJcbiAgICAgICAgICAgICdmZnhpdmJvb3QuZXhlJyxcclxuICAgICAgICAgICAgJ2ZmeGl2bGF1bmNoZXIuZXhlJyxcclxuICAgICAgICAgICAgJ2ZmeGl2dXBkYXRlci5leGUnXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpIGluIGZpbGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpemVBbmRIYXNoID0gdGhpcy5nZXRTaXplQW5kSGFzaChgL2Jvb3QvJHtmaWxlc1tpXX1gKTtcclxuICAgICAgICAgICAgZmlsZXNbaV0gPSBgJHtmaWxlc1tpXX0vJHtzaXplQW5kSGFzaH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZpbGVzLmpvaW4oJywnKTtcclxuICAgIH1cclxuXHJcbiAgICB2ZXJzaW9uKClcclxuICAgIHtcclxuICAgICAgICBsZXQgZmlsZW5hbWUgPSBTZXR0aW5ncy5zZS5HYW1lUGF0aCArICcvZ2FtZS9mZnhpdmdhbWUudmVyJyxcclxuICAgICAgICAgICAgYnVmZmVyID0gZmlsZXN5c3RlbS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gYnVmZmVyLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2l6ZUFuZEhhc2goZmlsZW5hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgZmlsZW5hbWUgPSBTZXR0aW5ncy5zZS5HYW1lUGF0aCArIGZpbGVuYW1lO1xyXG4gICAgICAgIGxldCBoYXNoID0gc2hhMUZpbGUoZmlsZW5hbWUpLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBmaWxlc3lzdGVtLnN0YXRTeW5jKGZpbGVuYW1lKS5zaXplO1xyXG4gICAgICAgIHJldHVybiBsZW5ndGggKyAnLycgKyBoYXNoO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgR2FtZUZpbGVzKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy94aXYvR2FtZUZpbGVzLmpzIiwiaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vU2V0dGluZ3MnO1xyXG5pbXBvcnQgTG9naW4gZnJvbSAnLi9Mb2dpbic7XHJcblxyXG5jbGFzcyBHYW1lTGF1bmNoZXJcclxue1xyXG4gICAgaW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0dhbWVMYXVuY2hlci5Mb2dpbicpLm9uY2xpY2sgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdExvZ2luKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0dhbWVMYXVuY2hlci5CeXBhc3MnKS5vbmNsaWNrID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnlwYXNzJykudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxhdW5jaEdhbWUoc2lkKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RMb2dpbigpXHJcbiAgICB7XHJcbiAgICAgICAgTG9naW4uZ28ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTE9HSU4gQ09NUExFVEUnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1VTRVIgU0lEID09ICcrIHJlc3BvbnNlLnVzZXJSZWFsU2lkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xJVkUgR0FNRSBWRVJTSU9OID09ICcrIHJlc3BvbnNlLmxhdGVzdEdhbWVWZXJzaW9uKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGF1bmNoR2FtZShyZXNwb25zZS51c2VyUmVhbFNpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGF1bmNoR2FtZSh1c2VyU2lkKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGdhbWVGaWxlbmFtZSA9IFNldHRpbmdzLnNlLkdhbWVQYXRoICsgU2V0dGluZ3Muc2UuRHgxMVBhdGg7XHJcbiAgICAgICAgY29uc3QgZ2FtZUFyZ3VtZW50cyA9IFtcclxuICAgICAgICAgICAgJ0RFVi5UZXN0U0lEPScgKyB1c2VyU2lkLFxyXG4gICAgICAgICAgICAnREVWLk1heEVudGl0bGVkRXhwYW5zaW9uSUQ9MicsXHJcbiAgICAgICAgICAgICdsYW5ndWFnZT0xJ1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKS5leGVjRmlsZShnYW1lRmlsZW5hbWUsIGdhbWVBcmd1bWVudHMsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZihlcnIpe1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcnKTtcclxuICAgICAgICAgICAgLy8gdG9kbyAtIGRvIHNvbWV0aGluZyBoZXJlPyBDbG9zZSB0aGUgbGF1bmNoZXI/IEhpZGUgaW4gYmFja2dyb3VuZD9cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IEdhbWVMYXVuY2hlcigpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMveGl2L0dhbWVMYXVuY2hlci5qcyIsImltcG9ydCBHYW1lRmlsZXMgZnJvbSAnLi9HYW1lRmlsZXMnO1xyXG5pbXBvcnQgWElWUmVxdWVzdCBmcm9tICcuL1hJVlJlcXVlc3QnO1xyXG5cclxuY2xhc3MgTG9naW5cclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vdHAgPSBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ28oY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpLnZhbHVlLnRyaW0oKTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJykudmFsdWUudHJpbSgpO1xyXG4gICAgICAgIHRoaXMub3RwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ290cCcpLnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgLy8gYXNrIGZvciB0aGUgcmVhbCBVU0VSX1NJRFxyXG4gICAgICAgIHRoaXMuZ2V0UmVhbFVzZXJTaWQoY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlYWxVc2VyU2lkKGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZ2V0U3Vkb1VzZXJTaWQoU1VET19VU0VSX0lEID0+IHtcclxuICAgICAgICAgICAgbGV0IGxvY2FsR2FtZVZlcnNpb24gPSBHYW1lRmlsZXMudmVyc2lvbigpLFxyXG4gICAgICAgICAgICAgICAgbG9jYWxHYW1lSGFzaCA9IEdhbWVGaWxlcy5oYXNoKCk7XHJcblxyXG4gICAgICAgICAgICBYSVZSZXF1ZXN0LmdldFJlYWxVc2VyU2lkKFxyXG4gICAgICAgICAgICAgICAgU1VET19VU0VSX0lELFxyXG4gICAgICAgICAgICAgICAgbG9jYWxHYW1lVmVyc2lvbixcclxuICAgICAgICAgICAgICAgIGxvY2FsR2FtZUhhc2gsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3Vkb1VzZXJTaWQoY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgLy8gZ2V0IHRlbXAgaWQgZm9yIGZvcm1cclxuICAgICAgICB0aGlzLmdldFRlbXBVc2VyU2lkKFRFTVBfVVNFUl9JRCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGxvZ2luIHRvIGdldCAgZmFrZSB1c2VyIGlkXHJcbiAgICAgICAgICAgIFhJVlJlcXVlc3QuZ2V0RmFrZVVzZXJTaWQoXHJcbiAgICAgICAgICAgICAgICBURU1QX1VTRVJfSUQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZCxcclxuICAgICAgICAgICAgICAgIHRoaXMub3RwLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRlbXBVc2VyU2lkKGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIFhJVlJlcXVlc3QuZ2V0VGVtcFVzZXJTaWQoY2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgTG9naW4oKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3hpdi9Mb2dpbi5qcyIsIi8qKlxyXG4gKiBGRlhJViBDdXN0b20gTGF1bmNoZXIgU2V0dGluZ3NcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLy8gU3F1YXJlLUVuaXggc3BlY2lmaWMgb3B0aW9uc1xyXG4gICAgc2U6IHtcclxuICAgICAgICBHYW1lUGF0aDogJ0M6XFxcXFByb2dyYW0gRmlsZXMgKHg4NilcXFxcU3F1YXJlRW5peFxcXFxGSU5BTCBGQU5UQVNZIFhJViAtIEEgUmVhbG0gUmVib3JuJyxcclxuICAgICAgICBEeDlQYXRoOiAnXFxcXGdhbWVcXFxcZmZ4aXYuZXhlJyxcclxuICAgICAgICBEeDExUGF0aDogJ1xcXFxnYW1lXFxcXGZmeGl2X2R4MTEuZXhlJyxcclxuICAgICAgICBVc2VyQWdlbnQ6ICdTUUVYQXV0aG9yLzIuMC4wKFdpbmRvd3MgNi4yOyBqYS1qcDsgOWU3NWFiMzAxMiknLFxyXG4gICAgICAgIExvZ2luR2FtZVZlcnNpb25SZXF1ZXN0OiB7XHJcbiAgICAgICAgICAgIEhvc3Q6ICdwYXRjaC1nYW1ldmVyLmZmeGl2LmNvbScsXHJcbiAgICAgICAgICAgIFBvcnQ6IDQ0MyxcclxuICAgICAgICAgICAgUGF0aDogJy9odHRwL3dpbjMyL2ZmeGl2bmVvX3JlbGVhc2VfZ2FtZS97R0FNRVZFUn0ve1VTRVJfU0lEfScsXHJcbiAgICAgICAgICAgIENvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgUmVmZXJlcjogJ2h0dHBzOi8vZmZ4aXYtbG9naW4uc3F1YXJlLWVuaXguY29tL29hdXRoL2ZmeGl2YXJyL2xvZ2luL3RvcD9sbmc9ZW4mcmduPTMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBMb2dpbk9BdXRoRm9ybVJlcXVlc3Q6IHtcclxuICAgICAgICAgICAgSG9zdDogJ2ZmeGl2LWxvZ2luLnNxdWFyZS1lbml4LmNvbScsXHJcbiAgICAgICAgICAgIFBvcnQ6IDQ0MyxcclxuICAgICAgICAgICAgUGF0aDogJy9vYXV0aC9mZnhpdmFyci9sb2dpbi90b3A/bG5nPWVuJnJnbj0zJmlzZnQ9MCZpc3N0ZWFtPTAnLFxyXG4gICAgICAgICAgICBNZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIExvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0OiB7XHJcbiAgICAgICAgICAgIEhvc3Q6ICdmZnhpdi1sb2dpbi5zcXVhcmUtZW5peC5jb20nLFxyXG4gICAgICAgICAgICBQb3J0OiA0NDMsXHJcbiAgICAgICAgICAgIFBhdGg6ICcvb2F1dGgvZmZ4aXZhcnIvbG9naW4vbG9naW4uc2VuZCcsXHJcbiAgICAgICAgICAgIE1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBDb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXHJcbiAgICAgICAgICAgIFJlZmVyZXI6ICdodHRwczovL2ZmeGl2LWxvZ2luLnNxdWFyZS1lbml4LmNvbS9vYXV0aC9mZnhpdmFyci9sb2dpbi90b3A/bG5nPWVuJnJnbj0zJmlzZnQ9MCZpc3N0ZWFtPTAnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIHRoZSBudW1iZXJzIG9mIHRoZXNlIGFyZSBpbXBvcnRhbnRcclxuICAgIGxhbmd1YWdlczoge1xyXG4gICAgICAgIDA6ICdKYXBhbmVzZScsXHJcbiAgICAgICAgMTogJ0VuZ2xpc2gnLFxyXG4gICAgICAgIDI6ICdHZXJtYW4nLFxyXG4gICAgICAgIDM6ICdGcmVuY2gnLFxyXG4gICAgfSxcclxuICAgIC8vIHRoZSBudW1iZXJzIG9mIHRoZXNlIGFyZSBpbXBvcnRhbnRcclxuICAgIGV4cGFuc2lvbnM6IHtcclxuICAgICAgICAwOiAnQSBSZWFsbSBSZWJvcm4nLFxyXG4gICAgICAgIDE6ICdIZWF2ZW5zd2FyZCcsXHJcbiAgICAgICAgMjogJ1N0b3JtYmxvb2QnXHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy94aXYvU2V0dGluZ3MuanMiLCJpbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9TZXR0aW5ncyc7XHJcblxyXG4vLyBpIGRvbid0IGtub3cgaWYgdGhpcyBpcyBuZWVkZWQsIHRoZSBwYXRjaC1nYW1ldmVyIHNlcnZlciBuZWVkcyBodHRwcyBzc2wgY2VydGlmaWNhdGUgdmVyaWZpY2F0aW9uXHJcbi8vIHByb2Nlc3MuZW52Lk5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQgPSBcIjBcIjtcclxuXHJcbmNsYXNzIFJlcXVlc3Rcclxue1xyXG4gICAgYWN0aW9uKG9wdGlvbnMsIHBvc3RkYXRhLCBjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICAvLyByZXF1ZXN0IG9iamVjdFxyXG4gICAgICAgIGxldCByZXEgPSByZXF1aXJlKFwiaHR0cHNcIikucmVxdWVzdChvcHRpb25zLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgbGV0IGJvZHkgPSAnJztcclxuICAgICAgICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcclxuICAgICAgICAgICAgICAgIGJvZHkgKz0gY2h1bms7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXNwb25zZS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlLmhlYWRlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXNwb25zZS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSRVNQT05TRV9FUlJPUicsIGVycm9yKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUkVRVUVTVF9FUlJPUicsIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gaWYgYW55IHBvc3QgZGF0YSwgYXR0YWNoIGl0XHJcbiAgICAgICAgaWYgKHBvc3RkYXRhKSB7XHJcbiAgICAgICAgICAgIHJlcS53cml0ZShwb3N0ZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXEuZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHVzZXJzIHRlbXAgc2Vzc2lvbiBpZCBmb3IgdGhlIGxvZ2luIGZvcm0uXHJcbiAgICAgKi9cclxuICAgIGdldFRlbXBVc2VyU2lkKGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdYSVZSZXF1ZXN0IC0tPiBnZXRUZW1wVXNlclNpZCcpO1xyXG5cclxuICAgICAgICAvLyBvcHRpb25zXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGhvc3Q6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhGb3JtUmVxdWVzdC5Ib3N0LFxyXG4gICAgICAgICAgICBwb3J0OiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoRm9ybVJlcXVlc3QuUG9ydCxcclxuICAgICAgICAgICAgcGF0aDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEZvcm1SZXF1ZXN0LlBhdGgsXHJcbiAgICAgICAgICAgIG1ldGhvZDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEZvcm1SZXF1ZXN0Lk1ldGhvZCxcclxuICAgICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVxdWVzdENlcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIGFnZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ1VzZXItQWdlbnQnOiBTZXR0aW5ncy5zZS5Vc2VyQWdlbnQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3Rpb24ob3B0aW9ucywgZmFsc2UsIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmREYXRJbkRvbShyZXNwb25zZS5ib2R5LCAnX1NUT1JFRF8nKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB1c2VycyBmYWtlIHNlc3Npb24gaWQgZm9yIGEgZ2FtZS12ZXJzaW9uIGNoZWNrXHJcbiAgICAgKi9cclxuICAgIGdldEZha2VVc2VyU2lkKHRlbXBVc2VySWQsIHVzZXJuYW1lLCBwYXNzd29yZCwgb3RwLCBjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnWElWUmVxdWVzdCAtLT4gZ2V0RmFrZVVzZXJTaWQnKTtcclxuXHJcbiAgICAgICAgY29uc3QgcG9zdGRhdGEgPSByZXF1aXJlKCdxdWVyeXN0cmluZycpLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICdfU1RPUkVEXyc6IHRlbXBVc2VySWQsXHJcbiAgICAgICAgICAgICdzcWV4aWQnOiB1c2VybmFtZSxcclxuICAgICAgICAgICAgJ3Bhc3N3b3JkJzogcGFzc3dvcmQsXHJcbiAgICAgICAgICAgICdvdHBwdyc6IG90cFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBvcHRpb25zXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGhvc3Q6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0Lkhvc3QsXHJcbiAgICAgICAgICAgIHBvcnQ6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0LlBvcnQsXHJcbiAgICAgICAgICAgIHBhdGg6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0LlBhdGgsXHJcbiAgICAgICAgICAgIG1ldGhvZDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuTWV0aG9kLFxyXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXF1ZXN0Q2VydDogdHJ1ZSxcclxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnVXNlci1BZ2VudCc6IFNldHRpbmdzLnNlLlVzZXJBZ2VudCxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoQWN0aW9uUmVxdWVzdC5Db250ZW50VHlwZSxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LUxlbmd0aCc6IHBvc3RkYXRhLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICdSZWZlcmVyJzogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuUmVmZXJlclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aW9uKG9wdGlvbnMsIHBvc3RkYXRhLCByZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRGF0SW5Eb20ocmVzcG9uc2UuYm9keSwgJ2xvZ2luPWF1dGgsb2ssc2lkJylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgdXNlcnMgcmVhbCBzZXNzaW9uIGlkIVxyXG4gICAgICovXHJcbiAgICBnZXRSZWFsVXNlclNpZCh0ZW1wVXNlcklkLCBsb2NhbEdhbWVWZXJzaW9uLCBsb2NhbEdhbWVIYXNoLCBjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnWElWUmVxdWVzdCAtLT4gZ2V0UmVhbFVzZXJTaWQnKTtcclxuXHJcbiAgICAgICAgbGV0IHBhdGggPSBTZXR0aW5ncy5zZS5Mb2dpbkdhbWVWZXJzaW9uUmVxdWVzdC5QYXRoXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7R0FNRVZFUn0nLCBsb2NhbEdhbWVWZXJzaW9uKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgne1VTRVJfU0lEfScsIHRlbXBVc2VySWQpO1xyXG5cclxuICAgICAgICAvLyBvcHRpb25zXHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGhvc3Q6IFNldHRpbmdzLnNlLkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0Lkhvc3QsXHJcbiAgICAgICAgICAgIHBvcnQ6IFNldHRpbmdzLnNlLkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0LlBvcnQsXHJcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXHJcbiAgICAgICAgICAgIG1ldGhvZDogU2V0dGluZ3Muc2UuTG9naW5HYW1lVmVyc2lvblJlcXVlc3QuTWV0aG9kLFxyXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXF1ZXN0Q2VydDogdHJ1ZSxcclxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnWC1IYXNoLUNoZWNrJzogJ1gtSGFzaC1DaGVjaycsXHJcbiAgICAgICAgICAgICAgICAnVXNlci1BZ2VudCc6IFNldHRpbmdzLnNlLlVzZXJBZ2VudCxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiBTZXR0aW5ncy5zZS5Mb2dpbkdhbWVWZXJzaW9uUmVxdWVzdC5Db250ZW50VHlwZSxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LUxlbmd0aCc6IGxvY2FsR2FtZUhhc2gubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgJ1JlZmVyZXInOiBTZXR0aW5ncy5zZS5Mb2dpbkdhbWVWZXJzaW9uUmVxdWVzdC5SZWZlcmVyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3Rpb24ob3B0aW9ucywgbG9jYWxHYW1lSGFzaCwgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICAgICAgbGF0ZXN0R2FtZVZlcnNpb246IHJlc3BvbnNlLmhlYWRlcnNbJ3gtbGF0ZXN0LXZlcnNpb24nXSxcclxuICAgICAgICAgICAgICAgIHVzZXJSZWFsU2lkOiByZXNwb25zZS5oZWFkZXJzWyd4LXBhdGNoLXVuaXF1ZS1pZCddXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmREYXRJbkRvbShib2R5LCBkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBsaW5lID0gYm9keS5zcGxpdChcIlxcblwiKS5maWx0ZXIobGluZSA9PiBsaW5lLmluZGV4T2YoZGF0YSkgPiAtMSlbMF07XHJcblxyXG4gICAgICAgIGlmICghbGluZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbGluZVxyXG4gICAgICAgICAgICAucmVwbGFjZSgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiX1NUT1JFRF9cIiB2YWx1ZT1cIicsICcnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgnd2luZG93LmV4dGVybmFsLnVzZXIoXCJsb2dpbj1hdXRoLG9rLHNpZCwnLCAnJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoJyx0ZXJtcywxLHJlZ2lvbiwyLGV0bWFkZCwwLHBsYXlhYmxlLDEscHMzcGtnLDAsbWF4ZXgsMixwcm9kdWN0LDFcIik7JywgJycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCcsdGVybXMsMSxyZWdpb24sMyxldG1hZGQsMCxwbGF5YWJsZSwxLHBzM3BrZywwLG1heGV4LDIscHJvZHVjdCwxXCIpOycsICcnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgnXCI+JywgJycpXHJcbiAgICAgICAgICAgIC50cmltKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBSZXF1ZXN0KCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy94aXYvWElWUmVxdWVzdC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjaGlsZF9wcm9jZXNzXCJcbi8vIG1vZHVsZSBpZCA9IGNoaWxkX3Byb2Nlc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY3J5cHRvXCJcbi8vIG1vZHVsZSBpZCA9IGNyeXB0b1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IGZzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cHNcIlxuLy8gbW9kdWxlIGlkID0gaHR0cHNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicXVlcnlzdHJpbmdcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJxdWVyeXN0cmluZ1wiXG4vLyBtb2R1bGUgaWQgPSBxdWVyeXN0cmluZ1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9