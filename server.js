// import express from "express";
const express = require("express");
const next = require("next");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = app.getRequestHandler();
// const routes = require("./routes");
// const cors = require("cors");

// Without express
const { createServer } = require("http");
app.prepare().then(() => {
	createServer(handler).listen(3000, (err) => {
		if (err) throw err;
		console.log("Ready on localhost:3000");
	});
});

// With express
// app
// 	.prepare()
// 	.then(() => {
// 		const server = express();

// 		server.get("/testing", (req, res) => {
// 			res.json({ message: "This works" });
// 		});

// 		server.get("*", (req, res) => {
// 			return handler(req, res);
// 		});

// 		server.listen(4000, (err) => {
// 			if (err) throw err;
// 			console.log("> Ready on http://localhost:4000");
// 		});
// 	})
// 	.catch((ex) => {
// 		console.error(ex.stack);
// 		process.exit(1);
// 	});
