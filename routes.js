const routes = require("next-routes")();

routes.add("/games/:event", "/games/show");

module.exports = routes;
