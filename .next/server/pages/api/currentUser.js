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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/currentUser.js");
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

/***/ "./pages/api/currentUser.js":
/*!**********************************!*\
  !*** ./pages/api/currentUser.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _contexts_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../contexts/prisma */ \"./contexts/prisma.js\");\n/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/client */ \"next-auth/client\");\n/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_client__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (async (req, res) => {\n  const session = await Object(next_auth_client__WEBPACK_IMPORTED_MODULE_1__[\"getSession\"])({\n    req\n  });\n\n  if (req.method === \"GET\") {\n    if (session) {\n      if (req.query.type === \"layout\") {\n        const user = await _contexts_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.findUnique({\n          where: {\n            id: session.user.id\n          },\n          select: {\n            id: true,\n            username: true,\n            email: true,\n            name: true,\n            image: true,\n            balance: true,\n            walletAddress: true,\n            accepter: true,\n            recipient: true,\n            requester: true\n          }\n        });\n        return res.json({\n          id: user.id,\n          username: user.username,\n          email: user.email,\n          name: user.name,\n          image: user.image,\n          balance: user.balance,\n          walletAddress: user.walletAddress,\n          openBets: [...user.recipient, ...user.requester].filter(bet => !bet.accepted && !bet.completed),\n          acceptedBets: [...user.accepter, ...user.recipient, ...user.requester].filter(bet => bet.accepted && !bet.completed),\n          completedBets: [...user.accepter, ...user.recipient, ...user.requester].filter(bet => bet.accepted && bet.completed)\n        });\n      } else {\n        return res.json(await _contexts_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.findUnique({\n          where: {\n            id: session.user.id\n          },\n          include: {\n            requester: true,\n            accepter: true,\n            recipient: true\n          }\n        }));\n      }\n    } else {\n      return res.json({\n        error: true,\n        message: \"Not logged in.\"\n      });\n    }\n  } else if (req.method === \"POST\") {\n    const user = req.body;\n    delete user.balance;\n    if (user.password) user.password = Object(bcrypt__WEBPACK_IMPORTED_MODULE_2__[\"hashSync\"])(user.password, 10);\n\n    try {\n      const updatedUser = await _contexts_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.update({\n        where: {\n          id: session.user.id\n        },\n        data: user\n      });\n      delete updatedUser.password;\n      return res.json(updatedUser);\n    } catch (e) {\n      console.log(e.meta.target);\n\n      if (e.code === \"P2002\") {\n        return res.json({\n          error: `There's already an account with that ${e.meta.target[0]}`\n        });\n      } // throw e;\n\n    }\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvY3VycmVudFVzZXIuanM/MDhhMyJdLCJuYW1lcyI6WyJyZXEiLCJyZXMiLCJzZXNzaW9uIiwiZ2V0U2Vzc2lvbiIsIm1ldGhvZCIsInF1ZXJ5IiwidHlwZSIsInVzZXIiLCJwcmlzbWEiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpZCIsInNlbGVjdCIsInVzZXJuYW1lIiwiZW1haWwiLCJuYW1lIiwiaW1hZ2UiLCJiYWxhbmNlIiwid2FsbGV0QWRkcmVzcyIsImFjY2VwdGVyIiwicmVjaXBpZW50IiwicmVxdWVzdGVyIiwianNvbiIsIm9wZW5CZXRzIiwiZmlsdGVyIiwiYmV0IiwiYWNjZXB0ZWQiLCJjb21wbGV0ZWQiLCJhY2NlcHRlZEJldHMiLCJjb21wbGV0ZWRCZXRzIiwiaW5jbHVkZSIsImVycm9yIiwibWVzc2FnZSIsImJvZHkiLCJwYXNzd29yZCIsImhhc2hTeW5jIiwidXBkYXRlZFVzZXIiLCJ1cGRhdGUiLCJkYXRhIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJtZXRhIiwidGFyZ2V0IiwiY29kZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRWUsc0VBQU9BLEdBQVAsRUFBWUMsR0FBWixLQUFvQjtBQUNsQyxRQUFNQyxPQUFPLEdBQUcsTUFBTUMsbUVBQVUsQ0FBQztBQUFFSDtBQUFGLEdBQUQsQ0FBaEM7O0FBRUEsTUFBSUEsR0FBRyxDQUFDSSxNQUFKLEtBQWUsS0FBbkIsRUFBMEI7QUFDekIsUUFBSUYsT0FBSixFQUFhO0FBQ1osVUFBSUYsR0FBRyxDQUFDSyxLQUFKLENBQVVDLElBQVYsS0FBbUIsUUFBdkIsRUFBaUM7QUFDaEMsY0FBTUMsSUFBSSxHQUFHLE1BQU1DLHdEQUFNLENBQUNELElBQVAsQ0FBWUUsVUFBWixDQUF1QjtBQUN6Q0MsZUFBSyxFQUFFO0FBQ05DLGNBQUUsRUFBRVQsT0FBTyxDQUFDSyxJQUFSLENBQWFJO0FBRFgs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Q0FBYUk7QUFEWCxTQURxQztBQUk1QzJCLFlBQUksRUFBRS9CO0FBSnNDLE9BQW5CLENBQTFCO0FBTUEsYUFBTzZCLFdBQVcsQ0FBQ0YsUUFBbkI7QUFDQSxhQUFPakMsR0FBRyxDQUFDcUIsSUFBSixDQUFTYyxXQUFULENBQVA7QUFDQSxLQVRELENBU0UsT0FBT0csQ0FBUCxFQUFVO0FBQ1hDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZRixDQUFDLENBQUNHLElBQUYsQ0FBT0MsTUFBbkI7O0FBQ0EsVUFBSUosQ0FBQyxDQUFDSyxJQUFGLEtBQVcsT0FBZixFQUF3QjtBQUN2QixlQUFPM0MsR0FBRyxDQUFDcUIsSUFBSixDQUFTO0FBQUVTLGVBQUssRUFBRyx3Q0FBdUNRLENBQUMsQ0FBQ0csSUFBRixDQUFPQyxNQUFQLENBQWMsQ0FBZCxDQUFpQjtBQUFsRSxTQUFULENBQVA7QUFDQSxPQUpVLENBS1g7O0FBQ0E7QUFDRDtBQUNELENBOUVEIiwiZmlsZSI6Ii4vcGFnZXMvYXBpL2N1cnJlbnRVc2VyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vLi4vY29udGV4dHMvcHJpc21hXCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aC9jbGllbnRcIjtcbmltcG9ydCB7IGhhc2hTeW5jIH0gZnJvbSBcImJjcnlwdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxLCByZXMpID0+IHtcblx0Y29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oeyByZXEgfSk7XG5cblx0aWYgKHJlcS5tZXRob2QgPT09IFwiR0VUXCIpIHtcblx0XHRpZiAoc2Vzc2lvbikge1xuXHRcdFx0aWYgKHJlcS5xdWVyeS50eXBlID09PSBcImxheW91dFwiKSB7XG5cdFx0XHRcdGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcblx0XHRcdFx0XHR3aGVyZToge1xuXHRcdFx0XHRcdFx0aWQ6IHNlc3Npb24udXNlci5pZCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlbGVjdDoge1xuXHRcdFx0XHRcdFx0aWQ6IHRydWUsXG5cdFx0XHRcdFx0XHR1c2VybmFtZTogdHJ1ZSxcblx0XHRcdFx0XHRcdGVtYWlsOiB0cnVlLFxuXHRcdFx0XHRcdFx0bmFtZTogdHJ1ZSxcblx0XHRcdFx0XHRcdGltYWdlOiB0cnVlLFxuXHRcdFx0XHRcdFx0YmFsYW5jZTogdHJ1ZSxcblx0XHRcdFx0XHRcdHdhbGxldEFkZHJlc3M6IHRydWUsXG5cdFx0XHRcdFx0XHRhY2NlcHRlcjogdHJ1ZSxcblx0XHRcdFx0XHRcdHJlY2lwaWVudDogdHJ1ZSxcblx0XHRcdFx0XHRcdHJlcXVlc3RlcjogdHJ1ZSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJlcy5qc29uKHtcblx0XHRcdFx0XHRpZDogdXNlci5pZCxcblx0XHRcdFx0XHR1c2VybmFtZTogdXNlci51c2VybmFtZSxcblx0XHRcdFx0XHRlbWFpbDogdXNlci5lbWFpbCxcblx0XHRcdFx0XHRuYW1lOiB1c2VyLm5hbWUsXG5cdFx0XHRcdFx0aW1hZ2U6IHVzZXIuaW1hZ2UsXG5cdFx0XHRcdFx0YmFsYW5jZTogdXNlci5iYWxhbmNlLFxuXHRcdFx0XHRcdHdhbGxldEFkZHJlc3M6IHVzZXIud2FsbGV0QWRkcmVzcyxcblx0XHRcdFx0XHRvcGVuQmV0czogWy4uLnVzZXIucmVjaXBpZW50LCAuLi51c2VyLnJlcXVlc3Rlcl0uZmlsdGVyKChiZXQpID0+ICFiZXQuYWNjZXB0ZWQgJiYgIWJldC5jb21wbGV0ZWQpLFxuXHRcdFx0XHRcdGFjY2VwdGVkQmV0czogWy4uLnVzZXIuYWNjZXB0ZXIsIC4uLnVzZXIucmVjaXBpZW50LCAuLi51c2VyLnJlcXVlc3Rlcl0uZmlsdGVyKFxuXHRcdFx0XHRcdFx0KGJldCkgPT4gYmV0LmFjY2VwdGVkICYmICFiZXQuY29tcGxldGVkXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRjb21wbGV0ZWRCZXRzOiBbLi4udXNlci5hY2NlcHRlciwgLi4udXNlci5yZWNpcGllbnQsIC4uLnVzZXIucmVxdWVzdGVyXS5maWx0ZXIoXG5cdFx0XHRcdFx0XHQoYmV0KSA9PiBiZXQuYWNjZXB0ZWQgJiYgYmV0LmNvbXBsZXRlZFxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHJlcy5qc29uKFxuXHRcdFx0XHRcdGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuXHRcdFx0XHRcdFx0d2hlcmU6IHtcblx0XHRcdFx0XHRcdFx0aWQ6IHNlc3Npb24udXNlci5pZCxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRpbmNsdWRlOiB7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RlcjogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0YWNjZXB0ZXI6IHRydWUsXG5cdFx0XHRcdFx0XHRcdHJlY2lwaWVudDogdHJ1ZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHJlcy5qc29uKHsgZXJyb3I6IHRydWUsIG1lc3NhZ2U6IFwiTm90IGxvZ2dlZCBpbi5cIiB9KTtcblx0XHR9XG5cdH0gZWxzZSBpZiAocmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcblx0XHRjb25zdCB1c2VyID0gcmVxLmJvZHk7XG5cdFx0ZGVsZXRlIHVzZXIuYmFsYW5jZTtcblx0XHRpZiAodXNlci5wYXNzd29yZCkgdXNlci5wYXNzd29yZCA9IGhhc2hTeW5jKHVzZXIucGFzc3dvcmQsIDEwKTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XG5cdFx0XHRcdHdoZXJlOiB7XG5cdFx0XHRcdFx0aWQ6IHNlc3Npb24udXNlci5pZCxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YTogdXNlcixcblx0XHRcdH0pO1xuXHRcdFx0ZGVsZXRlIHVwZGF0ZWRVc2VyLnBhc3N3b3JkO1xuXHRcdFx0cmV0dXJuIHJlcy5qc29uKHVwZGF0ZWRVc2VyKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhlLm1ldGEudGFyZ2V0KTtcblx0XHRcdGlmIChlLmNvZGUgPT09IFwiUDIwMDJcIikge1xuXHRcdFx0XHRyZXR1cm4gcmVzLmpzb24oeyBlcnJvcjogYFRoZXJlJ3MgYWxyZWFkeSBhbiBhY2NvdW50IHdpdGggdGhhdCAke2UubWV0YS50YXJnZXRbMF19YCB9KTtcblx0XHRcdH1cblx0XHRcdC8vIHRocm93IGU7XG5cdFx0fVxuXHR9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/currentUser.js\n");

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

/***/ "next-auth/client":
/*!***********************************!*\
  !*** external "next-auth/client" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next-auth/client\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LWF1dGgvY2xpZW50XCI/ZDNiMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJuZXh0LWF1dGgvY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC1hdXRoL2NsaWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next-auth/client\n");

/***/ })

/******/ });