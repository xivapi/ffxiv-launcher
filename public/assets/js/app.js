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

            console.log('XIVRequest --> getFakeUserSid: ' + tempUserId);

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
            console.log('XIVRequest --> getRealUserSid: ' + tempUserId);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmFjZTM5MmM3ODJmM2UzZmZlZTUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NoYTEtZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvR2FtZUZpbGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvR2FtZUxhdW5jaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy94aXYvTG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3hpdi9TZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMveGl2L1hJVlJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJxdWVyeXN0cmluZ1wiIl0sIm5hbWVzIjpbIkdhbWVMYXVuY2hlciIsImluaXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2xhc3NOYW1lIiwidmFsdWUiLCJzaGExRmlsZSIsInJlcXVpcmUiLCJmaWxlc3lzdGVtIiwiR2FtZUZpbGVzIiwiZmlsZXMiLCJpIiwic2l6ZUFuZEhhc2giLCJnZXRTaXplQW5kSGFzaCIsImpvaW4iLCJmaWxlbmFtZSIsIlNldHRpbmdzIiwic2UiLCJHYW1lUGF0aCIsImJ1ZmZlciIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiaGFzaCIsImxlbmd0aCIsInN0YXRTeW5jIiwic2l6ZSIsIm9uY2xpY2siLCJyZXF1ZXN0TG9naW4iLCJzaWQiLCJ0cmltIiwibGF1bmNoR2FtZSIsIkxvZ2luIiwiZ28iLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJ1c2VyUmVhbFNpZCIsImxhdGVzdEdhbWVWZXJzaW9uIiwidXNlclNpZCIsImdhbWVGaWxlbmFtZSIsIkR4MTFQYXRoIiwiZ2FtZUFyZ3VtZW50cyIsImV4ZWNGaWxlIiwiZXJyIiwiZGF0YSIsImVycm9yIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIm90cCIsImNhbGxiYWNrIiwiZ2V0UmVhbFVzZXJTaWQiLCJnZXRTdWRvVXNlclNpZCIsImxvY2FsR2FtZVZlcnNpb24iLCJ2ZXJzaW9uIiwibG9jYWxHYW1lSGFzaCIsIlhJVlJlcXVlc3QiLCJTVURPX1VTRVJfSUQiLCJnZXRUZW1wVXNlclNpZCIsImdldEZha2VVc2VyU2lkIiwiVEVNUF9VU0VSX0lEIiwibW9kdWxlIiwiZXhwb3J0cyIsIkR4OVBhdGgiLCJVc2VyQWdlbnQiLCJMb2dpbkdhbWVWZXJzaW9uUmVxdWVzdCIsIkhvc3QiLCJQb3J0IiwiUGF0aCIsIkNvbnRlbnRUeXBlIiwiUmVmZXJlciIsIkxvZ2luT0F1dGhGb3JtUmVxdWVzdCIsIk1ldGhvZCIsIkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0IiwibGFuZ3VhZ2VzIiwiZXhwYW5zaW9ucyIsIlJlcXVlc3QiLCJvcHRpb25zIiwicG9zdGRhdGEiLCJyZXEiLCJyZXF1ZXN0IiwiYm9keSIsIm9uIiwiY2h1bmsiLCJoZWFkZXJzIiwid3JpdGUiLCJlbmQiLCJob3N0IiwicG9ydCIsInBhdGgiLCJtZXRob2QiLCJyZWplY3RVbmF1dGhvcml6ZWQiLCJyZXF1ZXN0Q2VydCIsImFnZW50IiwiYWN0aW9uIiwiZmluZERhdEluRG9tIiwidGVtcFVzZXJJZCIsInN0cmluZ2lmeSIsInJlcGxhY2UiLCJsaW5lIiwic3BsaXQiLCJmaWx0ZXIiLCJpbmRleE9mIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FB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QUVBLGdCQUFJLENBQUNzRCxJQUFMLEVBQVc7QUFDUCx1QkFBTyxLQUFQO0FBQ0g7O0FBRUQsbUJBQU9BLEtBQ0ZELE9BREUsQ0FDTSw4Q0FETixFQUNzRCxFQUR0RCxFQUVGQSxPQUZFLENBRU0sMENBRk4sRUFFa0QsRUFGbEQsRUFHRkEsT0FIRSxDQUdNLHFFQUhOLEVBRzZFLEVBSDdFLEVBSUZBLE9BSkUsQ0FJTSxxRUFKTixFQUk2RSxFQUo3RSxFQUtGQSxPQUxFLENBS00sSUFMTixFQUtZLEVBTFosRUFNRnBFLElBTkUsRUFBUDtBQU9IOzs7Ozs7QUFHTCx5REFBZSxJQUFJOEMsT0FBSixFQUFmLEU7Ozs7Ozs7Ozs7OztBQy9KQSwwQzs7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7O0FDQUEsd0MiLCJmaWxlIjoianMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2FwcC5qc1wiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2YWNlMzkyYzc4MmYzZTNmZmVlNSIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpXHJcbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZpbGVuYW1lLCBjYWxsYmFjaykge1xyXG4gIHZhciBzdW0gPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMScpXHJcbiAgaWYgKGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgdmFyIGZpbGVTdHJlYW0gPSBmcy5jcmVhdGVSZWFkU3RyZWFtKGZpbGVuYW1lKVxyXG4gICAgZmlsZVN0cmVhbS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIG51bGwpXHJcbiAgICB9KVxyXG4gICAgZmlsZVN0cmVhbS5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHN1bS51cGRhdGUoY2h1bmspXHJcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGV4LCBudWxsKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgZmlsZVN0cmVhbS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgc3VtLmRpZ2VzdCgnaGV4JykpXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBzdW0udXBkYXRlKGZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSkpXHJcbiAgICByZXR1cm4gc3VtLmRpZ2VzdCgnaGV4JylcclxuICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2hhMS1maWxlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9zaGExLWZpbGUvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSW5pdGlhbGl6ZSBHYW1lIExhdW5jaGVyIGxvZ2ljXHJcbmltcG9ydCBHYW1lTGF1bmNoZXIgZnJvbSAnLi94aXYvR2FtZUxhdW5jaGVyJztcclxuR2FtZUxhdW5jaGVyLmluaXQoKTtcclxuXHJcbi8vXHJcbi8vIE1pc2MgY3JhcFxyXG4vL1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1dpbmRvdy5CRycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGV2ZW50ID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uY2xhc3NOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1dpbmRvdy5CRycpLnZhbHVlO1xyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXBwLmpzIiwiaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vU2V0dGluZ3MnO1xyXG5jb25zdCBzaGExRmlsZSA9IHJlcXVpcmUoJ3NoYTEtZmlsZScpO1xyXG5jb25zdCBmaWxlc3lzdGVtID0gcmVxdWlyZSgnZnMnKTtcclxuXHJcbmNsYXNzIEdhbWVGaWxlc1xyXG57XHJcbiAgICBoYXNoKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBmaWxlcyA9IFtcclxuICAgICAgICAgICAgJ2ZmeGl2Ym9vdC5leGUnLFxyXG4gICAgICAgICAgICAnZmZ4aXZsYXVuY2hlci5leGUnLFxyXG4gICAgICAgICAgICAnZmZ4aXZ1cGRhdGVyLmV4ZSdcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgaW4gZmlsZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZUFuZEhhc2ggPSB0aGlzLmdldFNpemVBbmRIYXNoKGAvYm9vdC8ke2ZpbGVzW2ldfWApO1xyXG4gICAgICAgICAgICBmaWxlc1tpXSA9IGAke2ZpbGVzW2ldfS8ke3NpemVBbmRIYXNofWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmlsZXMuam9pbignLCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHZlcnNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBmaWxlbmFtZSA9IFNldHRpbmdzLnNlLkdhbWVQYXRoICsgJy9nYW1lL2ZmeGl2Z2FtZS52ZXInLFxyXG4gICAgICAgICAgICBidWZmZXIgPSBmaWxlc3lzdGVtLnJlYWRGaWxlU3luYyhmaWxlbmFtZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBidWZmZXIudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTaXplQW5kSGFzaChmaWxlbmFtZSlcclxuICAgIHtcclxuICAgICAgICBmaWxlbmFtZSA9IFNldHRpbmdzLnNlLkdhbWVQYXRoICsgZmlsZW5hbWU7XHJcbiAgICAgICAgbGV0IGhhc2ggPSBzaGExRmlsZShmaWxlbmFtZSksXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IGZpbGVzeXN0ZW0uc3RhdFN5bmMoZmlsZW5hbWUpLnNpemU7XHJcbiAgICAgICAgcmV0dXJuIGxlbmd0aCArICcvJyArIGhhc2g7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBHYW1lRmlsZXMoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3hpdi9HYW1lRmlsZXMuanMiLCJpbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9TZXR0aW5ncyc7XHJcbmltcG9ydCBMb2dpbiBmcm9tICcuL0xvZ2luJztcclxuXHJcbmNsYXNzIEdhbWVMYXVuY2hlclxyXG57XHJcbiAgICBpbml0KClcclxuICAgIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnR2FtZUxhdW5jaGVyLkxvZ2luJykub25jbGljayA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0TG9naW4oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnR2FtZUxhdW5jaGVyLkJ5cGFzcycpLm9uY2xpY2sgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdieXBhc3MnKS52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgICAgIHRoaXMubGF1bmNoR2FtZShzaWQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdExvZ2luKClcclxuICAgIHtcclxuICAgICAgICBMb2dpbi5nbyhyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMT0dJTiBDT01QTEVURScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVVNFUiBTSUQgPT0gJysgcmVzcG9uc2UudXNlclJlYWxTaWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTElWRSBHQU1FIFZFUlNJT04gPT0gJysgcmVzcG9uc2UubGF0ZXN0R2FtZVZlcnNpb24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sYXVuY2hHYW1lKHJlc3BvbnNlLnVzZXJSZWFsU2lkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsYXVuY2hHYW1lKHVzZXJTaWQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZ2FtZUZpbGVuYW1lID0gU2V0dGluZ3Muc2UuR2FtZVBhdGggKyBTZXR0aW5ncy5zZS5EeDExUGF0aDtcclxuICAgICAgICBjb25zdCBnYW1lQXJndW1lbnRzID0gW1xyXG4gICAgICAgICAgICAnREVWLlRlc3RTSUQ9JyArIHVzZXJTaWQsXHJcbiAgICAgICAgICAgICdERVYuTWF4RW50aXRsZWRFeHBhbnNpb25JRD0yJyxcclxuICAgICAgICAgICAgJ2xhbmd1YWdlPTEnXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWNGaWxlKGdhbWVGaWxlbmFtZSwgZ2FtZUFyZ3VtZW50cywgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZycpO1xyXG4gICAgICAgICAgICAvLyB0b2RvIC0gZG8gc29tZXRoaW5nIGhlcmU/IENsb3NlIHRoZSBsYXVuY2hlcj8gSGlkZSBpbiBiYWNrZ3JvdW5kP1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgR2FtZUxhdW5jaGVyKCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy94aXYvR2FtZUxhdW5jaGVyLmpzIiwiaW1wb3J0IEdhbWVGaWxlcyBmcm9tICcuL0dhbWVGaWxlcyc7XHJcbmltcG9ydCBYSVZSZXF1ZXN0IGZyb20gJy4vWElWUmVxdWVzdCc7XHJcblxyXG5jbGFzcyBMb2dpblxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm90cCA9IGZhbHNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnbyhjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykudmFsdWUudHJpbSgpO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgdGhpcy5vdHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RwJykudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAvLyBhc2sgZm9yIHRoZSByZWFsIFVTRVJfU0lEXHJcbiAgICAgICAgdGhpcy5nZXRSZWFsVXNlclNpZChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVhbFVzZXJTaWQoY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nZXRTdWRvVXNlclNpZChTVURPX1VTRVJfSUQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxHYW1lVmVyc2lvbiA9IEdhbWVGaWxlcy52ZXJzaW9uKCksXHJcbiAgICAgICAgICAgICAgICBsb2NhbEdhbWVIYXNoID0gR2FtZUZpbGVzLmhhc2goKTtcclxuXHJcbiAgICAgICAgICAgIFhJVlJlcXVlc3QuZ2V0UmVhbFVzZXJTaWQoXHJcbiAgICAgICAgICAgICAgICBTVURPX1VTRVJfSUQsXHJcbiAgICAgICAgICAgICAgICBsb2NhbEdhbWVWZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgbG9jYWxHYW1lSGFzaCxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdWRvVXNlclNpZChjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICAvLyBnZXQgdGVtcCBpZCBmb3IgZm9ybVxyXG4gICAgICAgIHRoaXMuZ2V0VGVtcFVzZXJTaWQoVEVNUF9VU0VSX0lEID0+IHtcclxuICAgICAgICAgICAgLy8gbG9naW4gdG8gZ2V0ICBmYWtlIHVzZXIgaWRcclxuICAgICAgICAgICAgWElWUmVxdWVzdC5nZXRGYWtlVXNlclNpZChcclxuICAgICAgICAgICAgICAgIFRFTVBfVVNFUl9JRCxcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3N3b3JkLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vdHAsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGVtcFVzZXJTaWQoY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgWElWUmVxdWVzdC5nZXRUZW1wVXNlclNpZChjYWxsYmFjayk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBMb2dpbigpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMveGl2L0xvZ2luLmpzIiwiLyoqXHJcbiAqIEZGWElWIEN1c3RvbSBMYXVuY2hlciBTZXR0aW5nc1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvLyBTcXVhcmUtRW5peCBzcGVjaWZpYyBvcHRpb25zXHJcbiAgICBzZToge1xyXG4gICAgICAgIEdhbWVQYXRoOiAnQzpcXFxcUHJvZ3JhbSBGaWxlcyAoeDg2KVxcXFxTcXVhcmVFbml4XFxcXEZJTkFMIEZBTlRBU1kgWElWIC0gQSBSZWFsbSBSZWJvcm4nLFxyXG4gICAgICAgIER4OVBhdGg6ICdcXFxcZ2FtZVxcXFxmZnhpdi5leGUnLFxyXG4gICAgICAgIER4MTFQYXRoOiAnXFxcXGdhbWVcXFxcZmZ4aXZfZHgxMS5leGUnLFxyXG4gICAgICAgIFVzZXJBZ2VudDogJ1NRRVhBdXRob3IvMi4wLjAoV2luZG93cyA2LjI7IGphLWpwOyA5ZTc1YWIzMDEyKScsXHJcbiAgICAgICAgTG9naW5HYW1lVmVyc2lvblJlcXVlc3Q6IHtcclxuICAgICAgICAgICAgSG9zdDogJ3BhdGNoLWdhbWV2ZXIuZmZ4aXYuY29tJyxcclxuICAgICAgICAgICAgUG9ydDogNDQzLFxyXG4gICAgICAgICAgICBQYXRoOiAnL2h0dHAvd2luMzIvZmZ4aXZuZW9fcmVsZWFzZV9nYW1lL3tHQU1FVkVSfS97VVNFUl9TSUR9JyxcclxuICAgICAgICAgICAgQ29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICBSZWZlcmVyOiAnaHR0cHM6Ly9mZnhpdi1sb2dpbi5zcXVhcmUtZW5peC5jb20vb2F1dGgvZmZ4aXZhcnIvbG9naW4vdG9wP2xuZz1lbiZyZ249MydcclxuICAgICAgICB9LFxyXG4gICAgICAgIExvZ2luT0F1dGhGb3JtUmVxdWVzdDoge1xyXG4gICAgICAgICAgICBIb3N0OiAnZmZ4aXYtbG9naW4uc3F1YXJlLWVuaXguY29tJyxcclxuICAgICAgICAgICAgUG9ydDogNDQzLFxyXG4gICAgICAgICAgICBQYXRoOiAnL29hdXRoL2ZmeGl2YXJyL2xvZ2luL3RvcD9sbmc9ZW4mcmduPTMmaXNmdD0wJmlzc3RlYW09MCcsXHJcbiAgICAgICAgICAgIE1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTG9naW5PQXV0aEFjdGlvblJlcXVlc3Q6IHtcclxuICAgICAgICAgICAgSG9zdDogJ2ZmeGl2LWxvZ2luLnNxdWFyZS1lbml4LmNvbScsXHJcbiAgICAgICAgICAgIFBvcnQ6IDQ0MyxcclxuICAgICAgICAgICAgUGF0aDogJy9vYXV0aC9mZnhpdmFyci9sb2dpbi9sb2dpbi5zZW5kJyxcclxuICAgICAgICAgICAgTWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIENvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgUmVmZXJlcjogJ2h0dHBzOi8vZmZ4aXYtbG9naW4uc3F1YXJlLWVuaXguY29tL29hdXRoL2ZmeGl2YXJyL2xvZ2luL3RvcD9sbmc9ZW4mcmduPTMmaXNmdD0wJmlzc3RlYW09MCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gdGhlIG51bWJlcnMgb2YgdGhlc2UgYXJlIGltcG9ydGFudFxyXG4gICAgbGFuZ3VhZ2VzOiB7XHJcbiAgICAgICAgMDogJ0phcGFuZXNlJyxcclxuICAgICAgICAxOiAnRW5nbGlzaCcsXHJcbiAgICAgICAgMjogJ0dlcm1hbicsXHJcbiAgICAgICAgMzogJ0ZyZW5jaCcsXHJcbiAgICB9LFxyXG4gICAgLy8gdGhlIG51bWJlcnMgb2YgdGhlc2UgYXJlIGltcG9ydGFudFxyXG4gICAgZXhwYW5zaW9uczoge1xyXG4gICAgICAgIDA6ICdBIFJlYWxtIFJlYm9ybicsXHJcbiAgICAgICAgMTogJ0hlYXZlbnN3YXJkJyxcclxuICAgICAgICAyOiAnU3Rvcm1ibG9vZCdcclxuICAgIH1cclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3hpdi9TZXR0aW5ncy5qcyIsImltcG9ydCBTZXR0aW5ncyBmcm9tICcuL1NldHRpbmdzJztcclxuXHJcbi8vIGkgZG9uJ3Qga25vdyBpZiB0aGlzIGlzIG5lZWRlZCwgdGhlIHBhdGNoLWdhbWV2ZXIgc2VydmVyIG5lZWRzIGh0dHBzIHNzbCBjZXJ0aWZpY2F0ZSB2ZXJpZmljYXRpb25cclxuLy8gcHJvY2Vzcy5lbnYuTk9ERV9UTFNfUkVKRUNUX1VOQVVUSE9SSVpFRCA9IFwiMFwiO1xyXG5cclxuY2xhc3MgUmVxdWVzdFxyXG57XHJcbiAgICBhY3Rpb24ob3B0aW9ucywgcG9zdGRhdGEsIGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICAgICAgbGV0IHJlcSA9IHJlcXVpcmUoXCJodHRwc1wiKS5yZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBsZXQgYm9keSA9ICcnO1xyXG4gICAgICAgICAgICByZXNwb25zZS5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xyXG4gICAgICAgICAgICAgICAgYm9keSArPSBjaHVuaztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVycyxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBib2R5LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JFU1BPTlNFX0VSUk9SJywgZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSRVFVRVNUX0VSUk9SJywgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBpZiBhbnkgcG9zdCBkYXRhLCBhdHRhY2ggaXRcclxuICAgICAgICBpZiAocG9zdGRhdGEpIHtcclxuICAgICAgICAgICAgcmVxLndyaXRlKHBvc3RkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcS5lbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgdXNlcnMgdGVtcCBzZXNzaW9uIGlkIGZvciB0aGUgbG9naW4gZm9ybS5cclxuICAgICAqL1xyXG4gICAgZ2V0VGVtcFVzZXJTaWQoY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1hJVlJlcXVlc3QgLS0+IGdldFRlbXBVc2VyU2lkJyk7XHJcblxyXG4gICAgICAgIC8vIG9wdGlvbnNcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaG9zdDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEZvcm1SZXF1ZXN0Lkhvc3QsXHJcbiAgICAgICAgICAgIHBvcnQ6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhGb3JtUmVxdWVzdC5Qb3J0LFxyXG4gICAgICAgICAgICBwYXRoOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoRm9ybVJlcXVlc3QuUGF0aCxcclxuICAgICAgICAgICAgbWV0aG9kOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoRm9ybVJlcXVlc3QuTWV0aG9kLFxyXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXF1ZXN0Q2VydDogdHJ1ZSxcclxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnVXNlci1BZ2VudCc6IFNldHRpbmdzLnNlLlVzZXJBZ2VudCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFjdGlvbihvcHRpb25zLCBmYWxzZSwgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZERhdEluRG9tKHJlc3BvbnNlLmJvZHksICdfU1RPUkVEXycpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHVzZXJzIGZha2Ugc2Vzc2lvbiBpZCBmb3IgYSBnYW1lLXZlcnNpb24gY2hlY2tcclxuICAgICAqL1xyXG4gICAgZ2V0RmFrZVVzZXJTaWQodGVtcFVzZXJJZCwgdXNlcm5hbWUsIHBhc3N3b3JkLCBvdHAsIGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdYSVZSZXF1ZXN0IC0tPiBnZXRGYWtlVXNlclNpZDogJyArIHRlbXBVc2VySWQpO1xyXG5cclxuICAgICAgICBjb25zdCBwb3N0ZGF0YSA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJykuc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgJ19TVE9SRURfJzogdGVtcFVzZXJJZCxcclxuICAgICAgICAgICAgJ3NxZXhpZCc6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAncGFzc3dvcmQnOiBwYXNzd29yZCxcclxuICAgICAgICAgICAgJ290cHB3Jzogb3RwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIG9wdGlvbnNcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaG9zdDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuSG9zdCxcclxuICAgICAgICAgICAgcG9ydDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuUG9ydCxcclxuICAgICAgICAgICAgcGF0aDogU2V0dGluZ3Muc2UuTG9naW5PQXV0aEFjdGlvblJlcXVlc3QuUGF0aCxcclxuICAgICAgICAgICAgbWV0aG9kOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoQWN0aW9uUmVxdWVzdC5NZXRob2QsXHJcbiAgICAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlcXVlc3RDZXJ0OiB0cnVlLFxyXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdVc2VyLUFnZW50JzogU2V0dGluZ3Muc2UuVXNlckFnZW50LFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IFNldHRpbmdzLnNlLkxvZ2luT0F1dGhBY3Rpb25SZXF1ZXN0LkNvbnRlbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogcG9zdGRhdGEubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgJ1JlZmVyZXInOiBTZXR0aW5ncy5zZS5Mb2dpbk9BdXRoQWN0aW9uUmVxdWVzdC5SZWZlcmVyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3Rpb24ob3B0aW9ucywgcG9zdGRhdGEsIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2soXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmREYXRJbkRvbShyZXNwb25zZS5ib2R5LCAnbG9naW49YXV0aCxvayxzaWQnKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB1c2VycyByZWFsIHNlc3Npb24gaWQhXHJcbiAgICAgKi9cclxuICAgIGdldFJlYWxVc2VyU2lkKHRlbXBVc2VySWQsIGxvY2FsR2FtZVZlcnNpb24sIGxvY2FsR2FtZUhhc2gsIGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdYSVZSZXF1ZXN0IC0tPiBnZXRSZWFsVXNlclNpZDogJysgdGVtcFVzZXJJZCk7XHJcblxyXG4gICAgICAgIGxldCBwYXRoID0gU2V0dGluZ3Muc2UuTG9naW5HYW1lVmVyc2lvblJlcXVlc3QuUGF0aFxyXG4gICAgICAgICAgICAucmVwbGFjZSgne0dBTUVWRVJ9JywgbG9jYWxHYW1lVmVyc2lvbilcclxuICAgICAgICAgICAgLnJlcGxhY2UoJ3tVU0VSX1NJRH0nLCB0ZW1wVXNlcklkKTtcclxuXHJcbiAgICAgICAgLy8gb3B0aW9uc1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBob3N0OiBTZXR0aW5ncy5zZS5Mb2dpbkdhbWVWZXJzaW9uUmVxdWVzdC5Ib3N0LFxyXG4gICAgICAgICAgICBwb3J0OiBTZXR0aW5ncy5zZS5Mb2dpbkdhbWVWZXJzaW9uUmVxdWVzdC5Qb3J0LFxyXG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxyXG4gICAgICAgICAgICBtZXRob2Q6IFNldHRpbmdzLnNlLkxvZ2luR2FtZVZlcnNpb25SZXF1ZXN0Lk1ldGhvZCxcclxuICAgICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVxdWVzdENlcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIGFnZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ1gtSGFzaC1DaGVjayc6ICdYLUhhc2gtQ2hlY2snLFxyXG4gICAgICAgICAgICAgICAgJ1VzZXItQWdlbnQnOiBTZXR0aW5ncy5zZS5Vc2VyQWdlbnQsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogU2V0dGluZ3Muc2UuTG9naW5HYW1lVmVyc2lvblJlcXVlc3QuQ29udGVudFR5cGUsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1MZW5ndGgnOiBsb2NhbEdhbWVIYXNoLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICdSZWZlcmVyJzogU2V0dGluZ3Muc2UuTG9naW5HYW1lVmVyc2lvblJlcXVlc3QuUmVmZXJlclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aW9uKG9wdGlvbnMsIGxvY2FsR2FtZUhhc2gsIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgIGNhbGxiYWNrKHtcclxuICAgICAgICAgICAgICAgIGxhdGVzdEdhbWVWZXJzaW9uOiByZXNwb25zZS5oZWFkZXJzWyd4LWxhdGVzdC12ZXJzaW9uJ10sXHJcbiAgICAgICAgICAgICAgICB1c2VyUmVhbFNpZDogcmVzcG9uc2UuaGVhZGVyc1sneC1wYXRjaC11bmlxdWUtaWQnXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kRGF0SW5Eb20oYm9keSwgZGF0YSlcclxuICAgIHtcclxuICAgICAgICBsZXQgbGluZSA9IGJvZHkuc3BsaXQoXCJcXG5cIikuZmlsdGVyKGxpbmUgPT4gbGluZS5pbmRleE9mKGRhdGEpID4gLTEpWzBdO1xyXG5cclxuICAgICAgICBpZiAoIWxpbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxpbmVcclxuICAgICAgICAgICAgLnJlcGxhY2UoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIl9TVE9SRURfXCIgdmFsdWU9XCInLCAnJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoJ3dpbmRvdy5leHRlcm5hbC51c2VyKFwibG9naW49YXV0aCxvayxzaWQsJywgJycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCcsdGVybXMsMSxyZWdpb24sMixldG1hZGQsMCxwbGF5YWJsZSwxLHBzM3BrZywwLG1heGV4LDIscHJvZHVjdCwxXCIpOycsICcnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgnLHRlcm1zLDEscmVnaW9uLDMsZXRtYWRkLDAscGxheWFibGUsMSxwczNwa2csMCxtYXhleCwyLHByb2R1Y3QsMVwiKTsnLCAnJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoJ1wiPicsICcnKVxyXG4gICAgICAgICAgICAudHJpbSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgUmVxdWVzdCgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMveGl2L1hJVlJlcXVlc3QuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiXG4vLyBtb2R1bGUgaWQgPSBjaGlsZF9wcm9jZXNzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNyeXB0b1wiXG4vLyBtb2R1bGUgaWQgPSBjcnlwdG9cbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSBmc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImh0dHBzXCJcbi8vIG1vZHVsZSBpZCA9IGh0dHBzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInF1ZXJ5c3RyaW5nXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicXVlcnlzdHJpbmdcIlxuLy8gbW9kdWxlIGlkID0gcXVlcnlzdHJpbmdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==