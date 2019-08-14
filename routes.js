const routes = require("next-routes")();

routes.add("/games/show/:event", "/games/show");

module.exports = routes;
