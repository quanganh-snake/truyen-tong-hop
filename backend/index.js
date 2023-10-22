const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// SET UP Server - configuration
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimited: 50000,
	})
);

// Routes

// GET : All Comics
app.get("/api/v1", (request, response, next) => {
	const posterComics = [];
	try {
		axios(process.env.BASE_URL, {
			headers: {
				rejectUnauthorized: false,
			},
		}).then((res) => {
			const html = res.data;
			const $ = cheerio.load(html);
			$(".item", html).each(function () {
				const name = $(this).find("a > img").attr("alt") || $(this).find("a").attr("alt") || $(this).find("a").attr("title");
				const url = $(this).find("a").attr("href");
				const image = $(this).find("a > img").attr("src") || $(this).find("a > img").attr("data-original");
				console.log(`>>> line 33: Name: ${name} - URL: ${url} - Image: ${image}`);
				posterComics.push({
					name: name,
					url: "http://localhost:8069" + url.split("https://nettruyenco.vn")[1],
					image: image,
				});
				response.status(200).json(posterComics);
			});
		});
	} catch (error) {
		return response.status(500).json(error.message);
		// next(error);
	}
});

// GET : A Comic
app.get("/api/v1/truyen-tranh/:comic", (req, res) => {
	console.log(req.params);
});

// Run the server

app.listen(process.env.PORT || 8069, () => {
	console.log(`Starting server on port ${process.env.PORT}`);
});
