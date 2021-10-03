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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/acceptBet.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contexts/prisma.js":
/*!****************************!*\
  !*** ./contexts/prisma.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nlet prisma;\n\nif (false) {} else {\n  if (!global.prisma) {\n    global.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__[\"PrismaClient\"]();\n  }\n\n  prisma = global.prisma;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (prisma);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wcmlzbWEvcHJpc21hLmpzPzIxYmQiXSwibmFtZXMiOlsicHJpc21hIiwiZ2xvYmFsIiwiUHJpc21hQ2xpZW50Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQUlBLE1BQUo7O0FBRUEsV0FBMkMsRUFBM0MsTUFFTztBQUNOLE1BQUksQ0FBQ0MsTUFBTSxDQUFDRCxNQUFaLEVBQW9CO0FBQ25CQyxVQUFNLENBQUNELE1BQVAsR0FBZ0IsSUFBSUUsMkRBQUosRUFBaEI7QUFDQTs7QUFFREYsUUFBTSxHQUFHQyxNQUFNLENBQUNELE1BQWhCO0FBQ0E7O0FBRWNBLHFFQUFmIiwiZmlsZSI6Ii4vY29udGV4dHMvcHJpc21hLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmxldCBwcmlzbWE7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpIHtcblx0cHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xufSBlbHNlIHtcblx0aWYgKCFnbG9iYWwucHJpc21hKSB7XG5cdFx0Z2xvYmFsLnByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcblx0fVxuXG5cdHByaXNtYSA9IGdsb2JhbC5wcmlzbWE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./contexts/prisma.js\n");

/***/ }),

/***/ "./pages/api/acceptBet.js":
/*!********************************!*\
  !*** ./pages/api/acceptBet.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _contexts_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../contexts/prisma */ \"./contexts/prisma.js\");\n/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/client */ \"next-auth/client\");\n/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_client__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (async (req, res) => {\n  const session = await Object(next_auth_client__WEBPACK_IMPORTED_MODULE_1__[\"getSession\"])({\n    req\n  });\n\n  if (req.method !== \"POST\") {\n    return res.status(405).json({\n      message: \"Method not allowed\"\n    });\n  } else if (req.method === \"POST\") {\n    const body = req.body;\n\n    if (session) {\n      try {\n        return res.json(session); // const acceptedBet = await prisma.bet.update({\n        // \twhere: {\n        // \t\tid: body.betId,\n        // \t},\n        // \tdata: {\n        // \t\taccepted: true,\n        // \t\taccepter: {\n        // \t\t\tconnect: {\n        // \t\t\t\tid: session.user.id,\n        // \t\t\t},\n        // \t\t},\n        // \t},\n        // });\n        // return res.json(acceptedBet);\n      } catch (e) {\n        console.log(e);\n\n        if (e.code === \"P2002\") {\n          return res.json({\n            error: `There's already an account with that ${e.meta.target[0]}`\n          });\n        } // throw e;\n\n      }\n    }\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvYWNjZXB0QmV0LmpzPzMwYzgiXSwibmFtZXMiOlsicmVxIiwicmVzIiwic2Vzc2lvbiIsImdldFNlc3Npb24iLCJtZXRob2QiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsImJvZHkiLCJlIiwiY29uc29sZSIsImxvZyIsImNvZGUiLCJlcnJvciIsIm1ldGEiLCJ0YXJnZXQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVlLHNFQUFPQSxHQUFQLEVBQVlDLEdBQVosS0FBb0I7QUFDbEMsUUFBTUMsT0FBTyxHQUFHLE1BQU1DLG1FQUFVLENBQUM7QUFBRUg7QUFBRixHQUFELENBQWhDOztBQUVBLE1BQUlBLEdBQUcsQ0FBQ0ksTUFBSixLQUFlLE1BQW5CLEVBQTJCO0FBQzFCLFdBQU9ILEdBQUcsQ0FBQ0ksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLGFBQU8sRUFBRTtBQUFYLEtBQXJCLENBQVA7QUFDQSxHQUZELE1BRU8sSUFBSVAsR0FBRyxDQUFDSSxNQUFKLEtBQWUsTUFBbkIsRUFBMkI7QUFDakMsVUFBTUksSUFBSSxHQUFHUixHQUFHLENBQUNRLElBQWpCOztBQUNBLFFBQUlOLE9BQUosRUFBYTtBQUNaLFVBQUk7QUFDSCxlQUFPRCxHQUFHLENBQUNLLElBQUosQ0FBU0osT0FBVCxDQUFQLENBREcsQ0FFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FoQkQsQ0FnQkUsT0FBT08sQ0FBUCxFQUFVO0FBQ1hDLGVBQU8sQ0FBQ0MsR0FBUixDQUFZRixDQUFaOztBQUNBLFlBQUlBLENBQUMsQ0FBQ0csSUFBRixLQUFXLE9BQWYsRUFBd0I7QUFDdkIsaUJBQU9YLEdBQUcsQ0FBQ0ssSUFBSixDQUFTO0FBQUVPLGlCQUFLLEVBQUcsd0NBQXVDSixDQUFDLENBQUNLLElBQUYsQ0FBT0MsTUFBUCxDQUFjLENBQWQsQ0FBaUI7QUFBbEUsV0FBVCxDQUFQO0FBQ0EsU0FKVSxDQUtYOztBQUNBO0FBQ0Q7QUFDRDtBQUNELENBakNEIiwiZmlsZSI6Ii4vcGFnZXMvYXBpL2FjY2VwdEJldC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcmlzbWEgZnJvbSBcIi4uLy4uL2NvbnRleHRzL3ByaXNtYVwiO1xuaW1wb3J0IHsgZ2V0U2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvY2xpZW50XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuXHRjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2Vzc2lvbih7IHJlcSB9KTtcblxuXHRpZiAocmVxLm1ldGhvZCAhPT0gXCJQT1NUXCIpIHtcblx0XHRyZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBtZXNzYWdlOiBcIk1ldGhvZCBub3QgYWxsb3dlZFwiIH0pO1xuXHR9IGVsc2UgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG5cdFx0Y29uc3QgYm9keSA9IHJlcS5ib2R5O1xuXHRcdGlmIChzZXNzaW9uKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXR1cm4gcmVzLmpzb24oc2Vzc2lvbik7XG5cdFx0XHRcdC8vIGNvbnN0IGFjY2VwdGVkQmV0ID0gYXdhaXQgcHJpc21hLmJldC51cGRhdGUoe1xuXHRcdFx0XHQvLyBcdHdoZXJlOiB7XG5cdFx0XHRcdC8vIFx0XHRpZDogYm9keS5iZXRJZCxcblx0XHRcdFx0Ly8gXHR9LFxuXHRcdFx0XHQvLyBcdGRhdGE6IHtcblx0XHRcdFx0Ly8gXHRcdGFjY2VwdGVkOiB0cnVlLFxuXHRcdFx0XHQvLyBcdFx0YWNjZXB0ZXI6IHtcblx0XHRcdFx0Ly8gXHRcdFx0Y29ubmVjdDoge1xuXHRcdFx0XHQvLyBcdFx0XHRcdGlkOiBzZXNzaW9uLnVzZXIuaWQsXG5cdFx0XHRcdC8vIFx0XHRcdH0sXG5cdFx0XHRcdC8vIFx0XHR9LFxuXHRcdFx0XHQvLyBcdH0sXG5cdFx0XHRcdC8vIH0pO1xuXHRcdFx0XHQvLyByZXR1cm4gcmVzLmpzb24oYWNjZXB0ZWRCZXQpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlKTtcblx0XHRcdFx0aWYgKGUuY29kZSA9PT0gXCJQMjAwMlwiKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlcy5qc29uKHsgZXJyb3I6IGBUaGVyZSdzIGFscmVhZHkgYW4gYWNjb3VudCB3aXRoIHRoYXQgJHtlLm1ldGEudGFyZ2V0WzBdfWAgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gdGhyb3cgZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/acceptBet.js\n");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@prisma/client\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAcHJpc21hL2NsaWVudFwiP2UwMDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiQHByaXNtYS9jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAcHJpc21hL2NsaWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@prisma/client\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n");

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