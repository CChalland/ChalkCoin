module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/users.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/users.js":
/*!****************************!*\
  !*** ./pages/api/users.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _prisma_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../prisma/prisma */ \"./prisma/prisma.js\");\n/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/client */ \"next-auth/client\");\n/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_client__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (async (req, res) => {\n  const session = await Object(next_auth_client__WEBPACK_IMPORTED_MODULE_1__[\"getSession\"])({\n    req\n  });\n\n  if (req.method === \"GET\") {\n    const user = await _prisma_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.findUnique({\n      where: {\n        email: session.user.email\n      },\n      include: {\n        requester: true,\n        accepter: true\n      }\n    });\n    return res.json(user);\n  } else if (req.method === \"POST\") {\n    const user = JSON.parse(req.body);\n    const updatedUser = await _prisma_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.update({\n      where: {\n        email: session.user.email\n      },\n      data: user\n    });\n    return res.json(updatedUser);\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvdXNlcnMuanM/NTc0ZCJdLCJuYW1lcyI6WyJyZXEiLCJyZXMiLCJzZXNzaW9uIiwiZ2V0U2Vzc2lvbiIsIm1ldGhvZCIsInVzZXIiLCJwcmlzbWEiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJlbWFpbCIsImluY2x1ZGUiLCJyZXF1ZXN0ZXIiLCJhY2NlcHRlciIsImpzb24iLCJKU09OIiwicGFyc2UiLCJib2R5IiwidXBkYXRlZFVzZXIiLCJ1cGRhdGUiLCJkYXRhIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFZSxzRUFBT0EsR0FBUCxFQUFZQyxHQUFaLEtBQW9CO0FBQ2xDLFFBQU1DLE9BQU8sR0FBRyxNQUFNQyxtRUFBVSxDQUFDO0FBQUVIO0FBQUYsR0FBRCxDQUFoQzs7QUFFQSxNQUFJQSxHQUFHLENBQUNJLE1BQUosS0FBZSxLQUFuQixFQUEwQjtBQUN6QixVQUFNQyxJQUFJLEdBQUcsTUFBTUMsc0RBQU0sQ0FBQ0QsSUFBUCxDQUFZRSxVQUFaLENBQXVCO0FBQ3pDQyxXQUFLLEVBQUU7QUFDTkMsYUFBSyxFQUFFUCxPQUFPLENBQUNHLElBQVIsQ0FBYUk7QUFEZCxPQURrQztBQUl6Q0MsYUFBTyxFQUFFO0FBQ1JDLGlCQUFTLEVBQUUsSUFESDtBQUVSQyxnQkFBUSxFQUFFO0FBRkY7QUFKZ0MsS0FBdkIsQ0FBbkI7QUFTQSxXQUFPWCxHQUFHLENBQUNZLElBQUosQ0FBU1IsSUFBVCxDQUFQO0FBQ0EsR0FYRCxNQVdPLElBQUlMLEdBQUcsQ0FBQ0ksTUFBSixLQUFlLE1BQW5CLEVBQTJCO0FBQ2pDLFVBQU1DLElBQUksR0FBR1MsSUFBSSxDQUFDQyxLQUFMLENBQVdmLEdBQUcsQ0FBQ2dCLElBQWYsQ0FBYjtBQUVBLFVBQU1DLFdBQVcsR0FBRyxNQUFNWCxzREFBTSxDQUFDRCxJQUFQLENBQVlhLE1BQVosQ0FBbUI7QUFDNUNWLFdBQUssRUFBRTtBQUNOQyxhQUFLLEVBQUVQLE9BQU8sQ0FBQ0csSUFBUixDQUFhSTtBQURkLE9BRHFDO0FBSTVDVSxVQUFJLEVBQUVkO0FBSnNDLEtBQW5CLENBQTFCO0FBTUEsV0FBT0osR0FBRyxDQUFDWSxJQUFKLENBQVNJLFdBQVQsQ0FBUDtBQUNBO0FBQ0QsQ0F6QkQiLCJmaWxlIjoiLi9wYWdlcy9hcGkvdXNlcnMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJpc21hIGZyb20gXCIuLi8uLi9wcmlzbWEvcHJpc21hXCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aC9jbGllbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cdGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXNzaW9uKHsgcmVxIH0pO1xuXG5cdGlmIChyZXEubWV0aG9kID09PSBcIkdFVFwiKSB7XG5cdFx0Y29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuXHRcdFx0d2hlcmU6IHtcblx0XHRcdFx0ZW1haWw6IHNlc3Npb24udXNlci5lbWFpbCxcblx0XHRcdH0sXG5cdFx0XHRpbmNsdWRlOiB7XG5cdFx0XHRcdHJlcXVlc3RlcjogdHJ1ZSxcblx0XHRcdFx0YWNjZXB0ZXI6IHRydWUsXG5cdFx0XHR9LFxuXHRcdH0pO1xuXHRcdHJldHVybiByZXMuanNvbih1c2VyKTtcblx0fSBlbHNlIGlmIChyZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xuXHRcdGNvbnN0IHVzZXIgPSBKU09OLnBhcnNlKHJlcS5ib2R5KTtcblxuXHRcdGNvbnN0IHVwZGF0ZWRVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIudXBkYXRlKHtcblx0XHRcdHdoZXJlOiB7XG5cdFx0XHRcdGVtYWlsOiBzZXNzaW9uLnVzZXIuZW1haWwsXG5cdFx0XHR9LFxuXHRcdFx0ZGF0YTogdXNlcixcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVzLmpzb24odXBkYXRlZFVzZXIpO1xuXHR9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/users.js\n");

/***/ }),

/***/ "./prisma/prisma.js":
/*!**************************!*\
  !*** ./prisma/prisma.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nlet prisma;\n\nif (false) {} else {\n  if (!global.prisma) {\n    global.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__[\"PrismaClient\"]();\n  }\n\n  prisma = global.prisma;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (prisma);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wcmlzbWEvcHJpc21hLmpzPzIxYmQiXSwibmFtZXMiOlsicHJpc21hIiwiZ2xvYmFsIiwiUHJpc21hQ2xpZW50Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQUlBLE1BQUo7O0FBRUEsV0FBMkMsRUFBM0MsTUFFTztBQUNOLE1BQUksQ0FBQ0MsTUFBTSxDQUFDRCxNQUFaLEVBQW9CO0FBQ25CQyxVQUFNLENBQUNELE1BQVAsR0FBZ0IsSUFBSUUsMkRBQUosRUFBaEI7QUFDQTs7QUFFREYsUUFBTSxHQUFHQyxNQUFNLENBQUNELE1BQWhCO0FBQ0E7O0FBRWNBLHFFQUFmIiwiZmlsZSI6Ii4vcHJpc21hL3ByaXNtYS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuXG5sZXQgcHJpc21hO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKSB7XG5cdHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcbn0gZWxzZSB7XG5cdGlmICghZ2xvYmFsLnByaXNtYSkge1xuXHRcdGdsb2JhbC5wcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG5cdH1cblxuXHRwcmlzbWEgPSBnbG9iYWwucHJpc21hO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwcmlzbWE7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./prisma/prisma.js\n");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@prisma/client\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAcHJpc21hL2NsaWVudFwiP2UwMDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiQHByaXNtYS9jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAcHJpc21hL2NsaWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@prisma/client\n");

/***/ }),

/***/ "next-auth/client":
/*!***********************************!*\
  !*** external "next-auth/client" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next-auth/client\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LWF1dGgvY2xpZW50XCI/ZDNiMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJuZXh0LWF1dGgvY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC1hdXRoL2NsaWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next-auth/client\n");

/***/ })

/******/ });