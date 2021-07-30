const express = require("express");
const next = require("next");
// const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = app.getRequestHandler();
const cors = require("cors");

// Without express
const { createServer } = require("http");
app.prepare().then(() => {
	createServer(handler).listen(4000, (err) => {
		if (err) throw err;
		console.log("Ready on localhost:4000");
	});
});

/*
// With express
app.prepare().then(() => {
  express()
    .use(handler)
    .listen(3000);
});

app
	.prepare()
	.then(() => {
		const server = express();

		server.get("*", (req, res) => {
			return handle(req, res);
		});

		server.listen(3000, (err) => {
			if (err) throw err;
			console.log("> Ready on http://localhost:3000");
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
*/
