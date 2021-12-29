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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nlet prisma;\n\nif (false) {} else {\n  if (!global.prisma) {\n    global.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__[\"PrismaClient\"]();\n  }\n\n  prisma = global.prisma;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (prisma);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb250ZXh0cy9wcmlzbWEuanM/NGM3OSJdLCJuYW1lcyI6WyJwcmlzbWEiLCJnbG9iYWwiLCJQcmlzbWFDbGllbnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUEsSUFBSUEsTUFBSjs7QUFFQSxXQUEyQyxFQUEzQyxNQUVPO0FBQ04sTUFBSSxDQUFDQyxNQUFNLENBQUNELE1BQVosRUFBb0I7QUFDbkJDLFVBQU0sQ0FBQ0QsTUFBUCxHQUFnQixJQUFJRSwyREFBSixFQUFoQjtBQUNBOztBQUVERixRQUFNLEdBQUdDLE1BQU0sQ0FBQ0QsTUFBaEI7QUFDQTs7QUFFY0EscUVBQWYiLCJmaWxlIjoiLi9jb250ZXh0cy9wcmlzbWEuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxubGV0IHByaXNtYTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIikge1xuXHRwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG59IGVsc2Uge1xuXHRpZiAoIWdsb2JhbC5wcmlzbWEpIHtcblx0XHRnbG9iYWwucHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXHR9XG5cblx0cHJpc21hID0gZ2xvYmFsLnByaXNtYTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./contexts/prisma.js\n");

/***/ }),

/***/ "./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers */ \"next-auth/providers\");\n/* harmony import */ var next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_adapters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/adapters */ \"next-auth/adapters\");\n/* harmony import */ var next_auth_adapters__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_adapters__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/discord */ \"next-auth/providers/discord\");\n/* harmony import */ var next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_auth_providers_linkedin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-auth/providers/linkedin */ \"next-auth/providers/linkedin\");\n/* harmony import */ var next_auth_providers_linkedin__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_linkedin__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _contexts_prisma__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../contexts/prisma */ \"./contexts/prisma.js\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nconst authHandler = (req, res) => next_auth__WEBPACK_IMPORTED_MODULE_0___default()(req, res, options);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (authHandler);\nconst options = {\n  providers: [next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default.a.Credentials({\n    id: \"credentials\",\n    name: \"Login\",\n\n    async authorize(credentials) {\n      const user = await _contexts_prisma__WEBPACK_IMPORTED_MODULE_5__[\"default\"].user.findFirst({\n        where: {\n          email: credentials.email\n        },\n        include: {\n          requester: {\n            select: {\n              id: true\n            }\n          },\n          accepter: {\n            select: {\n              id: true\n            }\n          },\n          recipient: {\n            select: {\n              id: true\n            }\n          }\n        }\n      });\n\n      if (user) {\n        const passwordTrue = await Object(bcrypt__WEBPACK_IMPORTED_MODULE_6__[\"compareSync\"])(credentials.password, user.password);\n\n        if (passwordTrue) {\n          delete user.password;\n          return user;\n        } else {\n          throw new Error(\"incorrectPassword\");\n        }\n      } else {\n        throw new Error(\"invalidEmail\");\n      }\n    }\n\n  }), next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default.a.Email({\n    server: {\n      host: process.env.SMTP_HOST,\n      port: Number(process.env.SMTP_PORT),\n      auth: {\n        user: process.env.SMTP_USER,\n        pass: process.env.SMTP_PASSWORD\n      }\n    },\n    from: process.env.SMTP_FROM\n  }), next_auth_providers__WEBPACK_IMPORTED_MODULE_1___default.a.GitHub({\n    clientId: process.env.GITHUB_ID,\n    clientSecret: process.env.GITHUB_SECRET\n  }), next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_3___default()({\n    clientId: process.env.DISCORD_CLIENT_ID,\n    clientSecret: process.env.DISCORD_CLIENT_SECRET\n  }), next_auth_providers_linkedin__WEBPACK_IMPORTED_MODULE_4___default()({\n    clientId: process.env.LINKEDIN_CLIENT_ID,\n    clientSecret: process.env.LINKEDIN_CLIENT_SECRET\n  })],\n  session: {\n    jwt: true,\n    maxAge: 30 * 24 * 60 * 60,\n    // 30 days\n    updateAge: 24 * 60 * 60 // 24 hours\n\n  },\n  callbacks: {\n    async jwt(token, user, account, profile, isNewUser) {\n      // console.log(\"jwt token\", token);\n      // console.log(\"jwt user\", user);\n      // console.log(\"jwt account\", account);\n      // console.log(\"jwt profile\", profile);\n      // console.log(\"jwt isNewUser\", isNewUser);\n      if (account) {\n        token.accessToken = account.access_token;\n      }\n\n      if (user) {\n        if (!(\"accepter\" in user) || !(\"recipient\" in user) || !(\"requester\" in user)) {\n          const currentUser = await _contexts_prisma__WEBPACK_IMPORTED_MODULE_5__[\"default\"].user.findFirst({\n            where: {\n              id: parseInt(user.id)\n            },\n            include: {\n              requester: {\n                select: {\n                  id: true\n                }\n              },\n              accepter: {\n                select: {\n                  id: true\n                }\n              },\n              recipient: {\n                select: {\n                  id: true\n                }\n              }\n            }\n          });\n          delete currentUser.password;\n          token.user = await currentUser;\n        } else {\n          token.user = user;\n        }\n      }\n\n      return token;\n    },\n\n    async session(session, token, user) {\n      // console.log(\"session session\", session);\n      // console.log(\"session user\", user);\n      // console.log(\"session token\", token);\n      session.accessToken = token.accessToken;\n      session.user = token.user;\n      return session;\n    }\n\n  },\n  pages: {\n    signIn: \"/login\",\n    error: \"/login\",\n    verifyRequest: \"/login?verifyRequest=true\",\n    newUser: \"/user?newUser=true\"\n  },\n  // @ts-ignore\n  adapter: next_auth_adapters__WEBPACK_IMPORTED_MODULE_2___default.a.Prisma.Adapter({\n    prisma: _contexts_prisma__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  }),\n  secret: process.env.SECRET\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzPzk5MDkiXSwibmFtZXMiOlsiYXV0aEhhbmRsZXIiLCJyZXEiLCJyZXMiLCJOZXh0QXV0aCIsIm9wdGlvbnMiLCJwcm92aWRlcnMiLCJQcm92aWRlcnMiLCJDcmVkZW50aWFscyIsImlkIiwibmFtZSIsImF1dGhvcml6ZSIsImNyZWRlbnRpYWxzIiwidXNlciIsInByaXNtYSIsImZpbmRGaXJzdCIsIndoZXJlIiwiZW1haWwiLCJpbmNsdWRlIiwicmVxdWVzdGVyIiwic2VsZWN0IiwiYWNjZXB0ZXIiLCJyZWNpcGllbnQiLCJwYXNzd29yZFRydWUiLCJjb21wYXJlU3luYyIsInBhc3N3b3JkIiwiRXJyb3IiLCJFbWFpbCIsInNlcnZlciIsImhvc3QiLCJwcm9jZXNzIiwiZW52IiwiU01UUF9IT1NUIiwicG9ydCIsIk51bWJlciIsIlNNVFBfUE9SVCIsImF1dGgiLCJTTVRQX1VTRVIiLCJwYXNzIiwiU01UUF9QQVNTV09SRCIsImZyb20iLCJTTVRQX0ZST00iLCJHaXRIdWIiLCJjbGllbnRJZCIsIkdJVEhVQl9JRCIsImNsaWVudFNlY3JldCIsIkdJVEhVQl9TRUNSRVQiLCJEaXNjb3JkUHJvdmlkZXIiLCJESVNDT1JEX0NMSUVOVF9JRCIsIkRJU0NPUkRfQ0xJRU5UX1NFQ1JFVCIsIkxpbmtlZEluUHJvdmlkZXIiLCJMSU5LRURJTl9DTElFTlRfSUQiLCJMSU5LRURJTl9DTElFTlRfU0VDUkVUIiwic2Vzc2lvbiIsImp3dCIsIm1heEFnZSIsInVwZGF0ZUFnZSIsImNhbGxiYWNrcyIsInRva2VuIiwiYWNjb3VudCIsInByb2ZpbGUiLCJpc05ld1VzZXIiLCJhY2Nlc3NUb2tlbiIsImFjY2Vzc190b2tlbiIsImN1cnJlbnRVc2VyIiwicGFyc2VJbnQiLCJwYWdlcyIsInNpZ25JbiIsImVycm9yIiwidmVyaWZ5UmVxdWVzdCIsIm5ld1VzZXIiLCJhZGFwdGVyIiwiQWRhcHRlcnMi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Q0EsU0FuQkQsTUFtQk87QUFDTk4sZUFBSyxDQUFDN0MsSUFBTixHQUFhQSxJQUFiO0FBQ0E7QUFDRDs7QUFDRCxhQUFPNkMsS0FBUDtBQUNBLEtBbkNTOztBQW9DVixVQUFNTCxPQUFOLENBQWNBLE9BQWQsRUFBdUJLLEtBQXZCLEVBQThCN0MsSUFBOUIsRUFBb0M7QUFDbkM7QUFDQTtBQUNBO0FBQ0F3QyxhQUFPLENBQUNTLFdBQVIsR0FBc0JKLEtBQUssQ0FBQ0ksV0FBNUI7QUFDQVQsYUFBTyxDQUFDeEMsSUFBUixHQUFlNkMsS0FBSyxDQUFDN0MsSUFBckI7QUFFQSxhQUFPd0MsT0FBUDtBQUNBOztBQTVDUyxHQWpFSTtBQStHZmEsT0FBSyxFQUFFO0FBQ05DLFVBQU0sRUFBRSxRQURGO0FBRU5DLFNBQUssRUFBRSxRQUZEO0FBR05DLGlCQUFhLEVBQUUsMkJBSFQ7QUFJTkMsV0FBTyxFQUFFO0FBSkgsR0EvR1E7QUFxSGY7QUFDQUMsU0FBTyxFQUFFQyx5REFBUSxDQUFDQyxNQUFULENBQWdCQyxPQUFoQixDQUF3QjtBQUNoQzVELG9FQUFNQTtBQUQwQixHQUF4QixDQXRITTtBQTBIZjZELFFBQU0sRUFBRTdDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZNkM7QUExSEwsQ0FBaEIiLCJmaWxlIjoiLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCBQcm92aWRlcnMgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnNcIjtcbmltcG9ydCBBZGFwdGVycyBmcm9tIFwibmV4dC1hdXRoL2FkYXB0ZXJzXCI7XG5pbXBvcnQgRGlzY29yZFByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2Rpc2NvcmRcIjtcbmltcG9ydCBMaW5rZWRJblByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2xpbmtlZGluXCI7XG5pbXBvcnQgcHJpc21hIGZyb20gXCIuLi8uLi8uLi9jb250ZXh0cy9wcmlzbWFcIjtcbmltcG9ydCB7IGNvbXBhcmVTeW5jIH0gZnJvbSBcImJjcnlwdFwiO1xuXG5jb25zdCBhdXRoSGFuZGxlciA9IChyZXEsIHJlcykgPT4gTmV4dEF1dGgocmVxLCByZXMsIG9wdGlvbnMpO1xuZXhwb3J0IGRlZmF1bHQgYXV0aEhhbmRsZXI7XG5cbmNvbnN0IG9wdGlvbnMgPSB7XG5cdHByb3ZpZGVyczogW1xuXHRcdFByb3ZpZGVycy5DcmVkZW50aWFscyh7XG5cdFx0XHRpZDogXCJjcmVkZW50aWFsc1wiLFxuXHRcdFx0bmFtZTogXCJMb2dpblwiLFxuXHRcdFx0YXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG5cdFx0XHRcdGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kRmlyc3Qoe1xuXHRcdFx0XHRcdHdoZXJlOiB7XG5cdFx0XHRcdFx0XHRlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRpbmNsdWRlOiB7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0ZXI6IHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0OiB7IGlkOiB0cnVlIH0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0YWNjZXB0ZXI6IHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0OiB7IGlkOiB0cnVlIH0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0cmVjaXBpZW50OiB7XG5cdFx0XHRcdFx0XHRcdHNlbGVjdDogeyBpZDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAodXNlcikge1xuXHRcdFx0XHRcdGNvbnN0IHBhc3N3b3JkVHJ1ZSA9IGF3YWl0IGNvbXBhcmVTeW5jKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcblx0XHRcdFx0XHRpZiAocGFzc3dvcmRUcnVlKSB7XG5cdFx0XHRcdFx0XHRkZWxldGUgdXNlci5wYXNzd29yZDtcblx0XHRcdFx0XHRcdHJldHVybiB1c2VyO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJpbmNvcnJlY3RQYXNzd29yZFwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZEVtYWlsXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdH0pLFxuXHRcdFByb3ZpZGVycy5FbWFpbCh7XG5cdFx0XHRzZXJ2ZXI6IHtcblx0XHRcdFx0aG9zdDogcHJvY2Vzcy5lbnYuU01UUF9IT1NULFxuXHRcdFx0XHRwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuU01UUF9QT1JUKSxcblx0XHRcdFx0YXV0aDoge1xuXHRcdFx0XHRcdHVzZXI6IHByb2Nlc3MuZW52LlNNVFBfVVNFUixcblx0XHRcdFx0XHRwYXNzOiBwcm9jZXNzLmVudi5TTVRQX1BBU1NXT1JELFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdGZyb206IHByb2Nlc3MuZW52LlNNVFBfRlJPTSxcblx0XHR9KSxcblx0XHRQcm92aWRlcnMuR2l0SHViKHtcblx0XHRcdGNsaWVudElkOiBwcm9jZXNzLmVudi5HSVRIVUJfSUQsXG5cdFx0XHRjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdJVEhVQl9TRUNSRVQsXG5cdFx0fSksXG5cdFx0RGlzY29yZFByb3ZpZGVyKHtcblx0XHRcdGNsaWVudElkOiBwcm9jZXNzLmVudi5ESVNDT1JEX0NMSUVOVF9JRCxcblx0XHRcdGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuRElTQ09SRF9DTElFTlRfU0VDUkVULFxuXHRcdH0pLFxuXHRcdExpbmtlZEluUHJvdmlkZXIoe1xuXHRcdFx0Y2xpZW50SWQ6IHByb2Nlc3MuZW52LkxJTktFRElOX0NMSUVOVF9JRCxcblx0XHRcdGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuTElOS0VESU5fQ0xJRU5UX1NFQ1JFVCxcblx0XHR9KSxcblx0XSxcblx0c2Vzc2lvbjoge1xuXHRcdGp3dDogdHJ1ZSxcblx0XHRtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXG5cdFx0dXBkYXRlQWdlOiAyNCAqIDYwICogNjAsIC8vIDI0IGhvdXJzXG5cdH0sXG5cdGNhbGxiYWNrczoge1xuXHRcdGFzeW5jIGp3dCh0b2tlbiwgdXNlciwgYWNjb3VudCwgcHJvZmlsZSwgaXNOZXdVc2VyKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcImp3dCB0b2tlblwiLCB0b2tlbik7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcImp3dCB1c2VyXCIsIHVzZXIpO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJqd3QgYWNjb3VudFwiLCBhY2NvdW50KTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwiand0IHByb2ZpbGVcIiwgcHJvZmlsZSk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcImp3dCBpc05ld1VzZXJcIiwgaXNOZXdVc2VyKTtcblx0XHRcdGlmIChhY2NvdW50KSB7XG5cdFx0XHRcdHRva2VuLmFjY2Vzc1Rva2VuID0gYWNjb3VudC5hY2Nlc3NfdG9rZW47XG5cdFx0XHR9XG5cdFx0XHRpZiAodXNlcikge1xuXHRcdFx0XHRpZiAoIShcImFjY2VwdGVyXCIgaW4gdXNlcikgfHwgIShcInJlY2lwaWVudFwiIGluIHVzZXIpIHx8ICEoXCJyZXF1ZXN0ZXJcIiBpbiB1c2VyKSkge1xuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZEZpcnN0KHtcblx0XHRcdFx0XHRcdHdoZXJlOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBwYXJzZUludCh1c2VyLmlkKSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRpbmNsdWRlOiB7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3Rlcjoge1xuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdDogeyBpZDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRhY2NlcHRlcjoge1xuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdDogeyBpZDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRyZWNpcGllbnQ6IHtcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3Q6IHsgaWQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0ZGVsZXRlIGN1cnJlbnRVc2VyLnBhc3N3b3JkO1xuXHRcdFx0XHRcdHRva2VuLnVzZXIgPSBhd2FpdCBjdXJyZW50VXNlcjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0b2tlbi51c2VyID0gdXNlcjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRva2VuO1xuXHRcdH0sXG5cdFx0YXN5bmMgc2Vzc2lvbihzZXNzaW9uLCB0b2tlbiwgdXNlcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJzZXNzaW9uIHNlc3Npb25cIiwgc2Vzc2lvbik7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcInNlc3Npb24gdXNlclwiLCB1c2VyKTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwic2Vzc2lvbiB0b2tlblwiLCB0b2tlbik7XG5cdFx0XHRzZXNzaW9uLmFjY2Vzc1Rva2VuID0gdG9rZW4uYWNjZXNzVG9rZW47XG5cdFx0XHRzZXNzaW9uLnVzZXIgPSB0b2tlbi51c2VyO1xuXG5cdFx0XHRyZXR1cm4gc2Vzc2lvbjtcblx0XHR9LFxuXHR9LFxuXHRwYWdlczoge1xuXHRcdHNpZ25JbjogXCIvbG9naW5cIixcblx0XHRlcnJvcjogXCIvbG9naW5cIixcblx0XHR2ZXJpZnlSZXF1ZXN0OiBcIi9sb2dpbj92ZXJpZnlSZXF1ZXN0PXRydWVcIixcblx0XHRuZXdVc2VyOiBcIi91c2VyP25ld1VzZXI9dHJ1ZVwiLFxuXHR9LFxuXHQvLyBAdHMtaWdub3JlXG5cdGFkYXB0ZXI6IEFkYXB0ZXJzLlByaXNtYS5BZGFwdGVyKHtcblx0XHRwcmlzbWEsXG5cdH0pLFxuXG5cdHNlY3JldDogcHJvY2Vzcy5lbnYuU0VDUkVULFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/auth/[...nextauth].js\n");

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

/***/ }),

/***/ "next-auth/providers/discord":
/*!**********************************************!*\
  !*** external "next-auth/providers/discord" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next-auth/providers/discord\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2Rpc2NvcmRcIj8yYzNkIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5leHQtYXV0aC9wcm92aWRlcnMvZGlzY29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQtYXV0aC9wcm92aWRlcnMvZGlzY29yZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next-auth/providers/discord\n");

/***/ }),

/***/ "next-auth/providers/linkedin":
/*!***********************************************!*\
  !*** external "next-auth/providers/linkedin" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next-auth/providers/linkedin\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2xpbmtlZGluXCI/MDQyZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJuZXh0LWF1dGgvcHJvdmlkZXJzL2xpbmtlZGluLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC1hdXRoL3Byb3ZpZGVycy9saW5rZWRpblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next-auth/providers/linkedin\n");

/***/ })

/******/ });