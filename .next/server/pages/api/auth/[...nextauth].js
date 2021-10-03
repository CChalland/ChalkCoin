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

/***/ "./contexts/prisma.js":
/*!****************************!*\
  !*** ./contexts/prisma.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nlet prisma;\n\nif (false) {} else {\n  if (!global.prisma) {\n    global.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__[\"PrismaClient\"]();\n  }\n\n  prisma = global.prisma;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (prisma);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wcmlzbWEvcHJpc21hLmpzPzIxYmQiXSwibmFtZXMiOlsicHJpc21hIiwiZ2xvYmFsIiwiUHJpc21hQ2xpZW50Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQUlBLE1BQUo7O0FBRUEsV0FBMkMsRUFBM0MsTUFFTztBQUNOLE1BQUksQ0FBQ0MsTUFBTSxDQUFDRCxNQUFaLEVBQW9CO0FBQ25CQyxVQUFNLENBQUNELE1BQVAsR0FBZ0IsSUFBSUUsMkRBQUosRUFBaEI7QUFDQTs7QUFFREYsUUFBTSxHQUFHQyxNQUFNLENBQUNELE1BQWhCO0FBQ0E7O0FBRWNBLHFFQUFmIiwiZmlsZSI6Ii4vY29udGV4dHMvcHJpc21hLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmxldCBwcmlzbWE7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpIHtcblx0cHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xufSBlbHNlIHtcblx0aWYgKCFnbG9iYWwucHJpc21hKSB7XG5cdFx0Z2xvYmFsLnByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcblx0fVxuXG5cdHByaXNtYSA9IGdsb2JhbC5wcmlzbWE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./contexts/prisma.js\n");

/***/ }),

/***/ "./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers */ \"next-auth/providers\");\n/* harmony import */ var next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_adapters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/adapters */ \"next-auth/adapters\");\n/* harmony import */ var next_auth_adapters__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_adapters__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _contexts_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../contexts/prisma */ \"./contexts/prisma.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nconst authHandler = (req, res) => next_auth__WEBPACK_IMPORTED_MODULE_0___default()(req, res, options);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (authHandler);\nconst options = {\n  providers: [next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default.a.Credentials({\n    id: \"credentials\",\n    name: \"Login\",\n\n    async authorize(credentials) {\n      const user = await _contexts_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"].user.findFirst({\n        where: {\n          email: credentials.email\n        } // include: {\n        // \trequester: true,\n        // \taccepter: true,\n        // \trecipient: true,\n        // },\n\n      });\n\n      if (user) {\n        const passwordTrue = await Object(bcrypt__WEBPACK_IMPORTED_MODULE_4__[\"compareSync\"])(credentials.password, user.password);\n\n        if (passwordTrue) {\n          delete user.password;\n          return user;\n        } else {\n          throw new Error(\"incorrectPassword\");\n        }\n      } else {\n        throw new Error(\"invalidEmail\");\n      }\n    }\n\n  }), next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default.a.Email({\n    server: {\n      host: process.env.SMTP_HOST,\n      port: Number(process.env.SMTP_PORT),\n      auth: {\n        user: process.env.SMTP_USER,\n        pass: process.env.SMTP_PASSWORD\n      }\n    },\n    from: process.env.SMTP_FROM\n  }), next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default.a.GitHub({\n    clientId: process.env.GITHUB_ID,\n    clientSecret: process.env.GITHUB_SECRET\n  })],\n  session: {\n    jwt: true,\n    maxAge: 30 * 24 * 60 * 60,\n    // 30 days\n    updateAge: 24 * 60 * 60 // 24 hours\n\n  },\n  callbacks: {\n    async jwt(token, user, account, profile, isNewUser) {\n      // console.log(\"jwt token\", token);\n      // console.log(\"jwt user\", user);\n      // console.log(\"jwt account\", account);\n      // console.log(\"jwt profile\", profile);\n      // console.log(\"jwt isNewUser\", isNewUser);\n      if (account) {\n        token.accessToken = account.access_token;\n      }\n\n      if (user) {\n        token.user = user;\n      }\n\n      return token;\n    },\n\n    async session(session, token, user) {\n      // console.log(\"session session\", session);\n      // console.log(\"session user\", user);\n      // console.log(\"session token\", token);\n      session.accessToken = token.accessToken;\n      session.user = token.user;\n      return session;\n    }\n\n  },\n  pages: {\n    signIn: \"/LoginRegister\",\n    error: \"/LoginRegister\",\n    verifyRequest: \"/LoginRegister?verifyRequest=true\",\n    newUser: \"/UserPage?newUser=true\"\n  },\n  // @ts-ignore\n  adapter: next_auth_adapters__WEBPACK_IMPORTED_MODULE_2___default.a.Prisma.Adapter({\n    prisma: _contexts_prisma__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  }),\n  secret: process.env.SECRET\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzPzk5MDkiXSwibmFtZXMiOlsiYXV0aEhhbmRsZXIiLCJyZXEiLCJyZXMiLCJOZXh0QXV0aCIsIm9wdGlvbnMiLCJwcm92aWRlcnMiLCJQcm92aWRlcnMiLCJDcmVkZW50aWFscyIsImlkIiwibmFtZSIsImF1dGhvcml6ZSIsImNyZWRlbnRpYWxzIiwidXNlciIsInByaXNtYSIsImZpbmRGaXJzdCIsIndoZXJlIiwiZW1haWwiLCJwYXNzd29yZFRydWUiLCJjb21wYXJlU3luYyIsInBhc3N3b3JkIiwiRXJyb3IiLCJFbWFpbCIsInNlcnZlciIsImhvc3QiLCJwcm9jZXNzIiwiZW52IiwiU01UUF9IT1NUIiwicG9ydCIsIk51bWJlciIsIlNNVFBfUE9SVCIsImF1dGgiLCJTTVRQX1VTRVIiLCJwYXNzIiwiU01UUF9QQVNTV09SRCIsImZyb20iLCJTTVRQX0ZST00iLCJHaXRIdWIiLCJjbGllbnRJZCIsIkdJVEhVQl9JRCIsImNsaWVudFNlY3JldCIsIkdJVEhVQl9TRUNSRVQiLCJzZXNzaW9uIiwiand0IiwibWF4QWdlIiwidXBkYXRlQWdlIiwiY2FsbGJhY2tzIiwidG9rZW4iLCJhY2NvdW50IiwicHJvZmlsZSIsImlzTmV3VXNlciIsImFjY2Vzc1Rva2VuIiwiYWNjZXNzX3Rva2VuIiwicGFnZXMiLCJzaWduSW4iLCJlcnJvciIsInZlcmlmeVJlcXVlc3QiLCJuZXdVc2VyIiwiYWRhcHRlciIsIkFkYXB0ZXJzIiwiUHJpc21hIiwiQWRhcHRlciIsInNlY3JldCIsIlNFQ1JFVCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1BLFdBQVcsR0FBRyxDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBY0MsZ0RBQVEsQ0FBQ0YsR0FBRCxFQUFNQyxHQUFOLEVB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QUVOQyxTQUFLLEVBQUUsZ0JBRkQ7QUFHTkMsaUJBQWEsRUFBRSxtQ0FIVDtBQUlOQyxXQUFPLEVBQUU7QUFKSCxHQTVFUTtBQWtGZjtBQUNBQyxTQUFPLEVBQUVDLHlEQUFRLENBQUNDLE1BQVQsQ0FBZ0JDLE9BQWhCLENBQXdCO0FBQ2hDL0Msb0VBQU1BO0FBRDBCLEdBQXhCLENBbkZNO0FBdUZmZ0QsUUFBTSxFQUFFckMsT0FBTyxDQUFDQyxHQUFSLENBQVlxQztBQXZGTCxDQUFoQiIsImZpbGUiOiIuL3BhZ2VzL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IFByb3ZpZGVycyBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVyc1wiO1xuaW1wb3J0IEFkYXB0ZXJzIGZyb20gXCJuZXh0LWF1dGgvYWRhcHRlcnNcIjtcbmltcG9ydCBwcmlzbWEgZnJvbSBcIi4uLy4uLy4uL2NvbnRleHRzL3ByaXNtYVwiO1xuaW1wb3J0IHsgY29tcGFyZVN5bmMgfSBmcm9tIFwiYmNyeXB0XCI7XG5cbmNvbnN0IGF1dGhIYW5kbGVyID0gKHJlcSwgcmVzKSA9PiBOZXh0QXV0aChyZXEsIHJlcywgb3B0aW9ucyk7XG5leHBvcnQgZGVmYXVsdCBhdXRoSGFuZGxlcjtcblxuY29uc3Qgb3B0aW9ucyA9IHtcblx0cHJvdmlkZXJzOiBbXG5cdFx0UHJvdmlkZXJzLkNyZWRlbnRpYWxzKHtcblx0XHRcdGlkOiBcImNyZWRlbnRpYWxzXCIsXG5cdFx0XHRuYW1lOiBcIkxvZ2luXCIsXG5cdFx0XHRhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcblx0XHRcdFx0Y29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRGaXJzdCh7XG5cdFx0XHRcdFx0d2hlcmU6IHtcblx0XHRcdFx0XHRcdGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vIGluY2x1ZGU6IHtcblx0XHRcdFx0XHQvLyBcdHJlcXVlc3RlcjogdHJ1ZSxcblx0XHRcdFx0XHQvLyBcdGFjY2VwdGVyOiB0cnVlLFxuXHRcdFx0XHRcdC8vIFx0cmVjaXBpZW50OiB0cnVlLFxuXHRcdFx0XHRcdC8vIH0sXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmICh1c2VyKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGFzc3dvcmRUcnVlID0gYXdhaXQgY29tcGFyZVN5bmMoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuXHRcdFx0XHRcdGlmIChwYXNzd29yZFRydWUpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSB1c2VyLnBhc3N3b3JkO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHVzZXI7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcImluY29ycmVjdFBhc3N3b3JkXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkRW1haWxcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fSksXG5cdFx0UHJvdmlkZXJzLkVtYWlsKHtcblx0XHRcdHNlcnZlcjoge1xuXHRcdFx0XHRob3N0OiBwcm9jZXNzLmVudi5TTVRQX0hPU1QsXG5cdFx0XHRcdHBvcnQ6IE51bWJlcihwcm9jZXNzLmVudi5TTVRQX1BPUlQpLFxuXHRcdFx0XHRhdXRoOiB7XG5cdFx0XHRcdFx0dXNlcjogcHJvY2Vzcy5lbnYuU01UUF9VU0VSLFxuXHRcdFx0XHRcdHBhc3M6IHByb2Nlc3MuZW52LlNNVFBfUEFTU1dPUkQsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0ZnJvbTogcHJvY2Vzcy5lbnYuU01UUF9GUk9NLFxuXHRcdH0pLFxuXHRcdFByb3ZpZGVycy5HaXRIdWIoe1xuXHRcdFx0Y2xpZW50SWQ6IHByb2Nlc3MuZW52LkdJVEhVQl9JRCxcblx0XHRcdGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR0lUSFVCX1NFQ1JFVCxcblx0XHR9KSxcblx0XSxcblx0c2Vzc2lvbjoge1xuXHRcdGp3dDogdHJ1ZSxcblx0XHRtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXG5cdFx0dXBkYXRlQWdlOiAyNCAqIDYwICogNjAsIC8vIDI0IGhvdXJzXG5cdH0sXG5cdGNhbGxiYWNrczoge1xuXHRcdGFzeW5jIGp3dCh0b2tlbiwgdXNlciwgYWNjb3VudCwgcHJvZmlsZSwgaXNOZXdVc2VyKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcImp3dCB0b2tlblwiLCB0b2tlbik7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcImp3dCB1c2VyXCIsIHVzZXIpO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJqd3QgYWNjb3VudFwiLCBhY2NvdW50KTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwiand0IHByb2ZpbGVcIiwgcHJvZmlsZSk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcImp3dCBpc05ld1VzZXJcIiwgaXNOZXdVc2VyKTtcblx0XHRcdGlmIChhY2NvdW50KSB7XG5cdFx0XHRcdHRva2VuLmFjY2Vzc1Rva2VuID0gYWNjb3VudC5hY2Nlc3NfdG9rZW47XG5cdFx0XHR9XG5cdFx0XHRpZiAodXNlcikge1xuXHRcdFx0XHR0b2tlbi51c2VyID0gdXNlcjtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0b2tlbjtcblx0XHR9LFxuXHRcdGFzeW5jIHNlc3Npb24oc2Vzc2lvbiwgdG9rZW4sIHVzZXIpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwic2Vzc2lvbiBzZXNzaW9uXCIsIHNlc3Npb24pO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJzZXNzaW9uIHVzZXJcIiwgdXNlcik7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcInNlc3Npb24gdG9rZW5cIiwgdG9rZW4pO1xuXHRcdFx0c2Vzc2lvbi5hY2Nlc3NUb2tlbiA9IHRva2VuLmFjY2Vzc1Rva2VuO1xuXHRcdFx0c2Vzc2lvbi51c2VyID0gdG9rZW4udXNlcjtcblxuXHRcdFx0cmV0dXJuIHNlc3Npb247XG5cdFx0fSxcblx0fSxcblx0cGFnZXM6IHtcblx0XHRzaWduSW46IFwiL0xvZ2luUmVnaXN0ZXJcIixcblx0XHRlcnJvcjogXCIvTG9naW5SZWdpc3RlclwiLFxuXHRcdHZlcmlmeVJlcXVlc3Q6IFwiL0xvZ2luUmVnaXN0ZXI/dmVyaWZ5UmVxdWVzdD10cnVlXCIsXG5cdFx0bmV3VXNlcjogXCIvVXNlclBhZ2U/bmV3VXNlcj10cnVlXCIsXG5cdH0sXG5cdC8vIEB0cy1pZ25vcmVcblx0YWRhcHRlcjogQWRhcHRlcnMuUHJpc21hLkFkYXB0ZXIoe1xuXHRcdHByaXNtYSxcblx0fSksXG5cblx0c2VjcmV0OiBwcm9jZXNzLmVudi5TRUNSRVQsXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/auth/[...nextauth].js\n");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@prisma/client\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAcHJpc21hL2NsaWVudFwiP2UwMDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiQHByaXNtYS9jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAcHJpc21hL2NsaWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@prisma/client\n");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIj9jZjljIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImJjcnlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///bcrypt\n");

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