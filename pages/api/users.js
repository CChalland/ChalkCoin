import { NextApiRequest, NextApiResponse } from "next";

export default async (req, res) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const userData = JSON.parse(req.body);

	res.json({ message: "hello world" });
};
