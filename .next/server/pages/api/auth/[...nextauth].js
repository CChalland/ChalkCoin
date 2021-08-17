module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/auth/[...nextauth].js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers */ \"next-auth/providers\");\n/* harmony import */ var next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_adapters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/adapters */ \"next-auth/adapters\");\n/* harmony import */ var next_auth_adapters__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_adapters__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_3__[\"PrismaClient\"]();\n\nconst authHandler = (req, res) => next_auth__WEBPACK_IMPORTED_MODULE_0___default()(req, res, options);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (authHandler);\nconst options = {\n  providers: [next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default.a.Credentials({\n    id: \"credentials\",\n    name: \"Login\",\n\n    async authorize(credentials) {\n      const user = await prisma.users.findFirst({\n        where: {\n          email: credentials.email,\n          password: credentials.password\n        }\n      });\n\n      if (user !== null) {\n        userAccount = user;\n        return user;\n      } else {\n        return null;\n      }\n    }\n\n  }), next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default.a.Email({\n    server: {\n      host: process.env.SMTP_HOST,\n      port: Number(process.env.SMTP_PORT),\n      auth: {\n        user: process.env.SMTP_USER,\n        pass: process.env.SMTP_PASSWORD\n      }\n    },\n    from: process.env.SMTP_FROM\n  }), next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default.a.GitHub({\n    clientId: process.env.GITHUB_ID,\n    clientSecret: process.env.GITHUB_SECRET\n  })],\n  callbacks: {\n    async jwt(token, user) {\n      if (user) {\n        token.accessToken = user.data.token;\n      }\n\n      return token;\n    },\n\n    async session(session, token) {\n      session.accessToken = token.accessToken;\n      return session;\n    }\n\n  },\n  pages: {\n    signIn: \"/LoginRegister\",\n    newUser: \"/UserPage\"\n  },\n  // @ts-ignore\n  adapter: next_auth_adapters__WEBPACK_IMPORTED_MODULE_2___default.a.Prisma.Adapter({\n    prisma\n  }),\n  secret: process.env.SECRET\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzPzk5MDkiXSwibmFtZXMiOlsicHJpc21hIiwiUHJpc21hQ2xpZW50IiwiYXV0aEhhbmRsZXIiLCJyZXEiLCJyZXMiLCJOZXh0QXV0aCIsIm9wdGlvbnMiLCJwcm92aWRlcnMiLCJQcm92aWRlcnMiLCJDcmVkZW50aWFscyIsImlkIiwibmFtZSIsImF1dGhvcml6ZSIsImNyZWRlbnRpYWxzIiwidXNlciIsInVzZXJzIiwiZmluZEZpcnN0Iiwid2hlcmUiLCJlbWFpbCIsInBhc3N3b3JkIiwidXNlckFjY291bnQiLCJFbWFpbCIsInNlcnZlciIsImhvc3QiLCJwcm9jZXNzIiwiZW52IiwiU01UUF9IT1NUIiwicG9ydCIsIk51bWJlciIsIlNNVFBfUE9SVCIsImF1dGgiLCJTTVRQX1VTRVIiLCJwYXNzIiwiU01UUF9QQVNTV09SRCIsImZyb20iLCJTTVRQX0ZST00iLCJHaXRIdWIiLCJjbGllbnRJZCIsIkdJVEhVQl9JRCIsImNsaWVudFNlY3JldCIsIkdJVEhVQl9TRUNSRVQiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsImFjY2Vzc1Rva2VuIiwiZGF0YSIsInNlc3Npb24iLCJwYWdlcyIsInNpZ25JbiIsIm5ld1VzZXIiLCJhZGFwdGVyIiwiQWRhcHRlcnMiLCJQcmlzbWEiLCJBZGFwdGVyIiwic2VjcmV0IiwiU0VDUkVUIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLE1BQU1BLE1BQU0sR0FBRyxJQUFJQywyREFBSixFQUFmOztBQUVBLE1BQU1DLFdBQVcsR0FBRyxDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBY0MsZ0RBQVEsQ0FBQ0YsR0FBRCxFQUFNQyxHQUFOLEVBQVdFLE9BQVgsQ0FBMUM7O0FBQ2VKLDBFQUFmO0FBRUEsTUFBTUksT0FBTyxHQUFHO0FBQ2ZDLFdBQVMsRUFBRSxDQUNWQywwREFBUyxDQUFDQyxXQUFWLENBQXNCO0FBQ3JCQyxNQUFFLEVBQUUsYUFEaUI7QUFFckJDLFFBQUksRUFBRSxPQUZlOztBQUdyQixVQUFNQyxTQUFOLENBQWdCQyxXQUFoQixFQUE2QjtBQUM1QixZQUFNQyxJQUFJLEdBQUcsTUFBTWQsTUFBTSxDQUFDZSxLQUFQLENBQWFDLFNBQWIsQ0FBdUI7QUFDekNDLGFBQUssRUFBRTtBQUNOQyxlQUFLLEVBQUVMLFdBQVcsQ0FBQ0ssS0FEYjtBQUVOQyxrQkFBUSxFQUFFTixXQUFXLENBQUNNO0FBRmhCO0FBRGtDLE9BQXZCLENBQW5COztBQU9BLFVBQUlMLElBQUksS0FBSyxJQUFiLEVBQW1CO0FBQ2xCTSxtQkFBVyxHQUFHTixJQUFkO0FBQ0EsZUFBT0EsSUFBUDtBQUNBLE9BSEQsTUFHTztBQUNOLGVBQU8sSUFBUDtBQUNBO0FBQ0Q7O0FBakJvQixHQUF0QixDQURVLEVBb0JWTiwwREFBUyxDQUFDYSxLQUFWLENBQWdCO0FBQ2ZDLFVBQU0sRUFBRTtBQUNQQyxVQUFJLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxTQURYO0FBRVBDLFVBQUksRUFBRUMsTUFBTSxDQUFDSixPQUFPLENBQUNDLEdBQVIsQ0FBWUksU0FBYixDQUZMO0FBR1BDLFVBQUksRUFBRTtBQUNMaEIsWUFBSSxFQUFFVSxPQUFPLENBQUNDLEdBQVIsQ0FBWU0sU0FEYjtBQUVMQyxZQUFJLEVBQUVSLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUTtBQUZiO0FBSEMsS0FETztBQVNmQyxRQUFJLEVBQUVWLE9BQU8sQ0FBQ0MsR0FBUixDQUFZVTtBQVRILEdBQWhCLENBcEJVLEVBK0JWM0IsMERBQVMsQ0FBQzRCLE1BQVYsQ0FBaUI7QUFDaEJDLFlBQVEsRUFBRWIsT0FBTyxDQUFDQyxHQUFSLENBQVlhLFNBRE47QUFFaEJDLGdCQUFZLEVBQUVmLE9BQU8sQ0FBQ0MsR0FBUixDQUFZZTtBQUZWLEdBQWpCLENBL0JVLENBREk7QUFxQ2ZDLFdBQVMsRUFBRTtBQUNWLFVBQU1DLEdBQU4sQ0FBVUMsS0FBVixFQUFpQjdCLElBQWpCLEVBQXVCO0FBQ3RCLFVBQUlBLElBQUosRUFBVTtBQUNUNkIsYUFBSyxDQUFDQyxXQUFOLEdBQW9COUIsSUFBSSxDQUFDK0IsSUFBTCxDQUFVRixLQUE5QjtBQUNBOztBQUNELGFBQU9BLEtBQVA7QUFDQSxLQU5TOztBQU9WLFVBQU1HLE9BQU4sQ0FBY0EsT0FBZCxFQUF1QkgsS0FBdkIsRUFBOEI7QUFDN0JHLGFBQU8sQ0FBQ0YsV0FBUixHQUFzQkQsS0FBSyxDQUFDQyxXQUE1QjtBQUNBLGFBQU9FLE9BQVA7QUFDQTs7QUFWUyxHQXJDSTtBQWlEZkMsT0FBSyxFQUFFO0FBQ05DLFVBQU0sRUFBRSxnQkFERjtBQUVOQyxXQUFPLEVBQUU7QUFGSCxHQWpEUTtBQXFEZjtBQUNBQyxTQUFPLEVBQUVDLHlEQUFRLENBQUNDLE1BQVQsQ0FBZ0JDLE9BQWhCLENBQXdCO0FBQ2hDckQ7QUFEZ0MsR0FBeEIsQ0F0RE07QUEwRGZzRCxRQUFNLEVBQUU5QixPQUFPLENBQUNDLEdBQVIsQ0FBWThCO0FBMURMLENBQWhCIiwiZmlsZSI6Ii4vcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgUHJvdmlkZXJzIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzXCI7XG5pbXBvcnQgQWRhcHRlcnMgZnJvbSBcIm5leHQtYXV0aC9hZGFwdGVyc1wiO1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcblxuY29uc3QgYXV0aEhhbmRsZXIgPSAocmVxLCByZXMpID0+IE5leHRBdXRoKHJlcSwgcmVzLCBvcHRpb25zKTtcbmV4cG9ydCBkZWZhdWx0IGF1dGhIYW5kbGVyO1xuXG5jb25zdCBvcHRpb25zID0ge1xuXHRwcm92aWRlcnM6IFtcblx0XHRQcm92aWRlcnMuQ3JlZGVudGlhbHMoe1xuXHRcdFx0aWQ6IFwiY3JlZGVudGlhbHNcIixcblx0XHRcdG5hbWU6IFwiTG9naW5cIixcblx0XHRcdGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuXHRcdFx0XHRjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXJzLmZpbmRGaXJzdCh7XG5cdFx0XHRcdFx0d2hlcmU6IHtcblx0XHRcdFx0XHRcdGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcblx0XHRcdFx0XHRcdHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAodXNlciAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdHVzZXJBY2NvdW50ID0gdXNlcjtcblx0XHRcdFx0XHRyZXR1cm4gdXNlcjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9KSxcblx0XHRQcm92aWRlcnMuRW1haWwoe1xuXHRcdFx0c2VydmVyOiB7XG5cdFx0XHRcdGhvc3Q6IHByb2Nlc3MuZW52LlNNVFBfSE9TVCxcblx0XHRcdFx0cG9ydDogTnVtYmVyKHByb2Nlc3MuZW52LlNNVFBfUE9SVCksXG5cdFx0XHRcdGF1dGg6IHtcblx0XHRcdFx0XHR1c2VyOiBwcm9jZXNzLmVudi5TTVRQX1VTRVIsXG5cdFx0XHRcdFx0cGFzczogcHJvY2Vzcy5lbnYuU01UUF9QQVNTV09SRCxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHRmcm9tOiBwcm9jZXNzLmVudi5TTVRQX0ZST00sXG5cdFx0fSksXG5cdFx0UHJvdmlkZXJzLkdpdEh1Yih7XG5cdFx0XHRjbGllbnRJZDogcHJvY2Vzcy5lbnYuR0lUSFVCX0lELFxuXHRcdFx0Y2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HSVRIVUJfU0VDUkVULFxuXHRcdH0pLFxuXHRdLFxuXHRjYWxsYmFja3M6IHtcblx0XHRhc3luYyBqd3QodG9rZW4sIHVzZXIpIHtcblx0XHRcdGlmICh1c2VyKSB7XG5cdFx0XHRcdHRva2VuLmFjY2Vzc1Rva2VuID0gdXNlci5kYXRhLnRva2VuO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRva2VuO1xuXHRcdH0sXG5cdFx0YXN5bmMgc2Vzc2lvbihzZXNzaW9uLCB0b2tlbikge1xuXHRcdFx0c2Vzc2lvbi5hY2Nlc3NUb2tlbiA9IHRva2VuLmFjY2Vzc1Rva2VuO1xuXHRcdFx0cmV0dXJuIHNlc3Npb247XG5cdFx0fSxcblx0fSxcblx0cGFnZXM6IHtcblx0XHRzaWduSW46IFwiL0xvZ2luUmVnaXN0ZXJcIixcblx0XHRuZXdVc2VyOiBcIi9Vc2VyUGFnZVwiLFxuXHR9LFxuXHQvLyBAdHMtaWdub3JlXG5cdGFkYXB0ZXI6IEFkYXB0ZXJzLlByaXNtYS5BZGFwdGVyKHtcblx0XHRwcmlzbWEsXG5cdH0pLFxuXG5cdHNlY3JldDogcHJvY2Vzcy5lbnYuU0VDUkVULFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/auth/[...nextauth].js\n");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@prisma/client\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAcHJpc21hL2NsaWVudFwiP2UwMDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiQHByaXNtYS9jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAcHJpc21hL2NsaWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@prisma/client\n");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next-auth\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LWF1dGhcIj8yOWY3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5leHQtYXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQtYXV0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next-auth\n");

/***/ }),

/***/ "next-auth/adapters":
/*!*************************************!*\
  !*** external "next-auth/adapters" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next-auth/adapters\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LWF1dGgvYWRhcHRlcnNcIj9iYjBhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5leHQtYXV0aC9hZGFwdGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQtYXV0aC9hZGFwdGVyc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next-auth/adapters\n");

/***/ }),

/***/ "next-auth/providers":
/*!**************************************!*\
  !*** external "next-auth/providers" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next-auth/providers\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LWF1dGgvcHJvdmlkZXJzXCI/NjljNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJuZXh0LWF1dGgvcHJvdmlkZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC1hdXRoL3Byb3ZpZGVyc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next-auth/providers\n");

/***/ })

/******/ });