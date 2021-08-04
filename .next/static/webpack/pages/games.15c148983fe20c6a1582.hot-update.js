/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/games",{

/***/ "./src/components/SportCard.js":
/*!*************************************!*\
  !*** ./src/components/SportCard.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_colechalland_Projects_CryptoCurrency_BEToken_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _Users_colechalland_Projects_CryptoCurrency_BEToken_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_colechalland_Projects_CryptoCurrency_BEToken_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_colechalland_Projects_CryptoCurrency_BEToken_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap */ \"./node_modules/react-bootstrap/esm/index.js\");\n/* harmony import */ var _GameScore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GameScore */ \"./src/components/GameScore.js\");\n/* harmony import */ var _GamePlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GamePlay */ \"./src/components/GamePlay.js\");\n/* harmony import */ var _GameLeader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GameLeader */ \"./src/components/GameLeader.js\");\n/* harmony import */ var _helpers_SportCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/SportCard */ \"./src/helpers/SportCard.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _contexts_Sports_Context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../contexts/Sports.Context */ \"./src/contexts/Sports.Context.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\nvar _jsxFileName = \"/Users/colechalland/Projects/CryptoCurrency/BEToken/src/components/SportCard.js\",\n    _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nfunction SportCard(props) {\n  _s();\n\n  var _this = this;\n\n  var dispatch = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_contexts_Sports_Context__WEBPACK_IMPORTED_MODULE_9__.SportDispatch);\n  var sportData = props.sportData,\n      sportName = props.sportName;\n  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {\n    function getData() {\n      return _getData.apply(this, arguments);\n    }\n\n    function _getData() {\n      _getData = (0,_Users_colechalland_Projects_CryptoCurrency_BEToken_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__.default)( /*#__PURE__*/_Users_colechalland_Projects_CryptoCurrency_BEToken_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {\n        var preGames, inGames, postGames, sortedGames, leagueData, reloadData;\n        return _Users_colechalland_Projects_CryptoCurrency_BEToken_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                reloadData = props.sportData.reload;\n                console.log(\"reloadData: \", reloadData);\n\n                if (!reloadData) {\n                  axios__WEBPACK_IMPORTED_MODULE_8___default().get(\"http://site.api.espn.com/apis/site/v2/sports/\".concat(sportData.sport, \"/\").concat(sportData.league_name, \"/scoreboard\")).then(function (response) {\n                    leagueData = response.data;\n                    inGames = response.data.events.filter(function (game) {\n                      reloadData = true;\n                      return game.status.type.state === \"in\";\n                    });\n                    postGames = response.data.events.filter(function (game) {\n                      return game.status.type.state === \"post\";\n                    });\n                    preGames = response.data.events.filter(function (game) {\n                      return game.status.type.state === \"pre\";\n                    });\n                    if (inGames.length === 0) reloadData = false;\n                    sortedGames.push(inGames, postGames, preGames); // leagueData.events =\n                    // dispatch({ type: sportName, data: leagueData });\n\n                    console.log(sortedGames);\n                  });\n                }\n\n              case 3:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }));\n      return _getData.apply(this, arguments);\n    }\n\n    setTimeout(function () {\n      getData();\n    }, 15000);\n  });\n  var gameItems;\n\n  if (sportData.data.events) {\n    gameItems = sportData.data.events.map(function (game) {\n      console.log(\"game data\", game);\n      console.log(\"gameScoreCardData\", (0,_helpers_SportCard__WEBPACK_IMPORTED_MODULE_7__.GameScoreHelper)(game, sportName));\n      console.log(\"gamePlayData\", (0,_helpers_SportCard__WEBPACK_IMPORTED_MODULE_7__.GamePlayHelper)(game, sportName));\n      console.log(\"gameLeaderData\", (0,_helpers_SportCard__WEBPACK_IMPORTED_MODULE_7__.GameLeadersHelper)(game, sportName));\n      return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.Container, {\n        fluid: true,\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.Row, {\n          className: \"mt-3 mb-3\",\n          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.Col, {\n            sm: 4,\n            className: \"border rounded\",\n            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_GameScore__WEBPACK_IMPORTED_MODULE_4__.default, {\n              gameScoreCardData: (0,_helpers_SportCard__WEBPACK_IMPORTED_MODULE_7__.GameScoreHelper)(game, sportName),\n              sportName: sportName\n            }, game.uid.toString(), false, {\n              fileName: _jsxFileName,\n              lineNumber: 63,\n              columnNumber: 8\n            }, _this)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 62,\n            columnNumber: 7\n          }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.Col, {\n            sm: 3,\n            className: \"border rounded\",\n            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_GamePlay__WEBPACK_IMPORTED_MODULE_5__.default, {\n              gamePlayData: (0,_helpers_SportCard__WEBPACK_IMPORTED_MODULE_7__.GamePlayHelper)(game, sportName),\n              sportName: sportName\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 71,\n              columnNumber: 8\n            }, _this)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 70,\n            columnNumber: 7\n          }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.Col, {\n            sm: 3,\n            className: \"border rounded\",\n            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_GameLeader__WEBPACK_IMPORTED_MODULE_6__.default, {\n              gameLeadersData: (0,_helpers_SportCard__WEBPACK_IMPORTED_MODULE_7__.GameLeadersHelper)(game, sportName),\n              sportName: sportName\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 75,\n              columnNumber: 8\n            }, _this)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 74,\n            columnNumber: 7\n          }, _this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 61,\n          columnNumber: 6\n        }, _this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 60,\n        columnNumber: 5\n      }, _this);\n    });\n  } else {\n    gameItems = /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n      children: \"Loading\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 82,\n      columnNumber: 15\n    }, this);\n  }\n\n  return gameItems;\n}\n\n_s(SportCard, \"WwffoFAw4+tY7zP4TjK8gOb+0Nw=\");\n\n_c = SportCard;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SportCard);\n\nvar _c;\n\n$RefreshReg$(_c, \"SportCard\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvU3BvcnRDYXJkLmpzPzk4YjEiXSwibmFtZXMiOlsiU3BvcnRDYXJkIiwicHJvcHMiLCJkaXNwYXRjaCIsInVzZUNvbnRleHQiLCJTcG9ydERpc3BhdGNoIiwic3BvcnREYXRhIiwic3BvcnROYW1lIiwidXNlRWZmZWN0IiwiZ2V0RGF0YSIsInJlbG9hZERhdGEiLCJyZWxvYWQiLCJjb25zb2xlIiwibG9nIiwiYXhpb3MiLCJzcG9ydCIsImxlYWd1ZV9uYW1lIiwidGhlbiIsInJlc3BvbnNlIiwibGVhZ3VlRGF0YSIsImRhdGEiLCJpbkdhbWVzIiwiZXZlbnRzIiwiZmlsdGVyIiwiZ2FtZSIsInN0YXR1cyIsInR5cGUiLCJzdGF0ZSIsInBvc3RHYW1lcyIsInByZUdhbWVzIiwibGVuZ3RoIiwic29ydGVkR2FtZXMiLCJwdXNoIiwic2V0VGltZW91dCIsImdhbWVJdGVtcyIsIm1hcCIsIkdhbWVTY29yZUhlbHBlciIsIkdhbWVQbGF5SGVscGVyIiwiR2FtZUxlYWRlcnNIZWxwZXIiLCJ1aWQiLCJ0b1N0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUFBOztBQUFBOztBQUN6QixNQUFNQyxRQUFRLEdBQUdDLGlEQUFVLENBQUNDLG1FQUFELENBQTNCO0FBRHlCLE1BRWpCQyxTQUZpQixHQUVRSixLQUZSLENBRWpCSSxTQUZpQjtBQUFBLE1BRU5DLFNBRk0sR0FFUUwsS0FGUixDQUVOSyxTQUZNO0FBSXpCQyxrREFBUyxDQUFDLFlBQU07QUFBQSxhQUNBQyxPQURBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDJUQUNmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVLQywwQkFGTCxHQUVrQlIsS0FBSyxDQUFDSSxTQUFOLENBQWdCSyxN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RCxlQVNDLDhEQUFDLGlEQUFEO0FBQUssY0FBRSxFQUFFLENBQVQ7QUFBWSxxQkFBUyxFQUFDLGdCQUF0QjtBQUFBLG1DQUNDLDhEQUFDLDhDQUFEO0FBQVUsMEJBQVksRUFBRUgsa0VBQWMsQ0FBQ2IsSUFBRCxFQUFPakIsU0FBUCxDQUF0QztBQUF5RCx1QkFBUyxFQUFFQTtBQUFwRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFURCxlQWFDLDhEQUFDLGlEQUFEO0FBQUssY0FBRSxFQUFFLENBQVQ7QUFBWSxxQkFBUyxFQUFDLGdCQUF0QjtBQUFBLG1DQUNDLDhEQUFDLGdEQUFEO0FBQVksNkJBQWUsRUFBRStCLHFFQUFpQixDQUFDZCxJQUFELEVBQU9qQixTQUFQLENBQTlDO0FBQWlFLHVCQUFTLEVBQUVBO0FBQTVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUREO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERDtBQXFCQSxLQTFCVyxDQUFaO0FBMkJBLEdBNUJELE1BNEJPO0FBQ04yQixhQUFTLGdCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQVo7QUFDQTs7QUFFRCxTQUFPQSxTQUFQO0FBQ0E7O0dBNUVRakMsUzs7S0FBQUEsUztBQThFVCwrREFBZUEsU0FBZiIsImZpbGUiOiIuL3NyYy9jb21wb25lbnRzL1Nwb3J0Q2FyZC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDb250YWluZXIsIFJvdywgQ29sIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuaW1wb3J0IEdhbWVTY29yZSBmcm9tIFwiLi9HYW1lU2NvcmVcIjtcbmltcG9ydCBHYW1lUGxheSBmcm9tIFwiLi9HYW1lUGxheVwiO1xuaW1wb3J0IEdhbWVMZWFkZXIgZnJvbSBcIi4vR2FtZUxlYWRlclwiO1xuaW1wb3J0IHsgR2FtZVNjb3JlSGVscGVyLCBHYW1lUGxheUhlbHBlciwgR2FtZUxlYWRlcnNIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9TcG9ydENhcmRcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IFNwb3J0RGlzcGF0Y2ggfSBmcm9tIFwiLi4vY29udGV4dHMvU3BvcnRzLkNvbnRleHRcIjtcblxuZnVuY3Rpb24gU3BvcnRDYXJkKHByb3BzKSB7XG5cdGNvbnN0IGRpc3BhdGNoID0gdXNlQ29udGV4dChTcG9ydERpc3BhdGNoKTtcblx0Y29uc3QgeyBzcG9ydERhdGEsIHNwb3J0TmFtZSB9ID0gcHJvcHM7XG5cblx0dXNlRWZmZWN0KCgpID0+IHtcblx0XHRhc3luYyBmdW5jdGlvbiBnZXREYXRhKCkge1xuXHRcdFx0bGV0IHByZUdhbWVzLCBpbkdhbWVzLCBwb3N0R2FtZXMsIHNvcnRlZEdhbWVzLCBsZWFndWVEYXRhO1xuXHRcdFx0bGV0IHJlbG9hZERhdGEgPSBwcm9wcy5zcG9ydERhdGEucmVsb2FkO1xuXG5cdFx0XHRjb25zb2xlLmxvZyhcInJlbG9hZERhdGE6IFwiLCByZWxvYWREYXRhKTtcblxuXHRcdFx0aWYgKCFyZWxvYWREYXRhKSB7XG5cdFx0XHRcdGF4aW9zXG5cdFx0XHRcdFx0LmdldChcblx0XHRcdFx0XHRcdGBodHRwOi8vc2l0ZS5hcGkuZXNwbi5jb20vYXBpcy9zaXRlL3YyL3Nwb3J0cy8ke3Nwb3J0RGF0YS5zcG9ydH0vJHtzcG9ydERhdGEubGVhZ3VlX25hbWV9L3Njb3JlYm9hcmRgXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0bGVhZ3VlRGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cdFx0XHRcdFx0XHRpbkdhbWVzID0gcmVzcG9uc2UuZGF0YS5ldmVudHMuZmlsdGVyKChnYW1lKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJlbG9hZERhdGEgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZ2FtZS5zdGF0dXMudHlwZS5zdGF0ZSA9PT0gXCJpblwiO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRwb3N0R2FtZXMgPSByZXNwb25zZS5kYXRhLmV2ZW50cy5maWx0ZXIoKGdhbWUpID0+IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGdhbWUuc3RhdHVzLnR5cGUuc3RhdGUgPT09IFwicG9zdFwiO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRwcmVHYW1lcyA9IHJlc3BvbnNlLmRhdGEuZXZlbnRzLmZpbHRlcigoZ2FtZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZ2FtZS5zdGF0dXMudHlwZS5zdGF0ZSA9PT0gXCJwcmVcIjtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0aWYgKGluR2FtZXMubGVuZ3RoID09PSAwKSByZWxvYWREYXRhID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRzb3J0ZWRHYW1lcy5wdXNoKGluR2FtZXMsIHBvc3RHYW1lcywgcHJlR2FtZXMpO1xuXHRcdFx0XHRcdFx0Ly8gbGVhZ3VlRGF0YS5ldmVudHMgPVxuXHRcdFx0XHRcdFx0Ly8gZGlzcGF0Y2goeyB0eXBlOiBzcG9ydE5hbWUsIGRhdGE6IGxlYWd1ZURhdGEgfSk7XG5cblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHNvcnRlZEdhbWVzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRnZXREYXRhKCk7XG5cdFx0fSwgMTUwMDApO1xuXHR9KTtcblxuXHRsZXQgZ2FtZUl0ZW1zO1xuXHRpZiAoc3BvcnREYXRhLmRhdGEuZXZlbnRzKSB7XG5cdFx0Z2FtZUl0ZW1zID0gc3BvcnREYXRhLmRhdGEuZXZlbnRzLm1hcCgoZ2FtZSkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJnYW1lIGRhdGFcIiwgZ2FtZSk7XG5cdFx0XHRjb25zb2xlLmxvZyhcImdhbWVTY29yZUNhcmREYXRhXCIsIEdhbWVTY29yZUhlbHBlcihnYW1lLCBzcG9ydE5hbWUpKTtcblx0XHRcdGNvbnNvbGUubG9nKFwiZ2FtZVBsYXlEYXRhXCIsIEdhbWVQbGF5SGVscGVyKGdhbWUsIHNwb3J0TmFtZSkpO1xuXHRcdFx0Y29uc29sZS5sb2coXCJnYW1lTGVhZGVyRGF0YVwiLCBHYW1lTGVhZGVyc0hlbHBlcihnYW1lLCBzcG9ydE5hbWUpKTtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxDb250YWluZXIgZmx1aWQ+XG5cdFx0XHRcdFx0PFJvdyBjbGFzc05hbWU9XCJtdC0zIG1iLTNcIj5cblx0XHRcdFx0XHRcdDxDb2wgc209ezR9IGNsYXNzTmFtZT1cImJvcmRlciByb3VuZGVkXCI+XG5cdFx0XHRcdFx0XHRcdDxHYW1lU2NvcmVcblx0XHRcdFx0XHRcdFx0XHRrZXk9e2dhbWUudWlkLnRvU3RyaW5nKCl9XG5cdFx0XHRcdFx0XHRcdFx0Z2FtZVNjb3JlQ2FyZERhdGE9e0dhbWVTY29yZUhlbHBlcihnYW1lLCBzcG9ydE5hbWUpfVxuXHRcdFx0XHRcdFx0XHRcdHNwb3J0TmFtZT17c3BvcnROYW1lfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9Db2w+XG5cblx0XHRcdFx0XHRcdDxDb2wgc209ezN9IGNsYXNzTmFtZT1cImJvcmRlciByb3VuZGVkXCI+XG5cdFx0XHRcdFx0XHRcdDxHYW1lUGxheSBnYW1lUGxheURhdGE9e0dhbWVQbGF5SGVscGVyKGdhbWUsIHNwb3J0TmFtZSl9IHNwb3J0TmFtZT17c3BvcnROYW1lfSAvPlxuXHRcdFx0XHRcdFx0PC9Db2w+XG5cblx0XHRcdFx0XHRcdDxDb2wgc209ezN9IGNsYXNzTmFtZT1cImJvcmRlciByb3VuZGVkXCI+XG5cdFx0XHRcdFx0XHRcdDxHYW1lTGVhZGVyIGdhbWVMZWFkZXJzRGF0YT17R2FtZUxlYWRlcnNIZWxwZXIoZ2FtZSwgc3BvcnROYW1lKX0gc3BvcnROYW1lPXtzcG9ydE5hbWV9IC8+XG5cdFx0XHRcdFx0XHQ8L0NvbD5cblx0XHRcdFx0XHQ8L1Jvdz5cblx0XHRcdFx0PC9Db250YWluZXI+XG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdGdhbWVJdGVtcyA9IDxoMT5Mb2FkaW5nPC9oMT47XG5cdH1cblxuXHRyZXR1cm4gZ2FtZUl0ZW1zO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTcG9ydENhcmQ7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/SportCard.js\n");

/***/ })

});