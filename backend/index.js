const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

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
// HOME
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
	res.send("Welcome to API nettruyenco - Crawl by QuangAnh Snake");
	res.sendFile(path.join(__dirname, "public", "index.html"));
});
// GET : Hot Comics
app.get("/api/v1/hot-comics", (request, response, next) => {
	const posterComics = [];
	try {
		axios(process.env.BASE_URL, {
			headers: {
				rejectUnauthorized: false,
			},
		}).then((res) => {
			const html = res.data;
			const $ = cheerio.load(html);
			$(".listupd .hot-item > a", html).each(function () {
				const name = $(this).attr("title") || $(this).find(".caption > h3").text() || $(this).find("> img").attr("alt");
				const url = $(this).attr("href").split(process.env.BASE_URL)[1];
				const thumbnail = $(this).find("> img").attr("data-src") || $(this).find("> img").attr("src");
				// console.log(`>>> line 33: Name: ${name} - URL: ${url} - thumbnail: ${thumbnail}`);
				posterComics.push({
					name: name,
					url: "http://localhost:8069/api/v1/" + url,
					thumbnail: thumbnail,
				});
			});
			// console.log(posterComics);
			response.status(200).json(posterComics);
		});
	} catch (error) {
		response.status(500).json(error.message);
	}
});

// GET : List New Comics
app.get("/api/v1/new-comics", (request, response) => {
	const listNewComics = [];
	try {
		axios(process.env.BASE_URL).then((res) => {
			const html = res.data;
			const regexGetId = /\/(\d+)$/;

			const $ = cheerio.load(html);
			$(".listupd > .page-item > .bsx-item", html).each(function () {
				const name = $(this).find(".thumb-manga > a").attr("title") || $(this).find(".thumb-manga > a > img").attr("alt");
				const url = "http://localhost:8069/api/v1" + $(this).find(".thumb-manga > a").attr("href").split("https://manhuarockvip.com")[1];
				const id = url.match(regexGetId)[1];
				const thumbnail = $(this).find(".thumb-manga > a > img").attr("data-src") || $(this).find(".thumb-manga > a > img").attr("src");
				const rate = $(this).find(".bigor-manga > .item-rate .mmrate").attr("data-rating").trim() || $(this).find(".bigor-manga > .item-rate span").text().trim();

				listNewComics.push({
					id,
					name,
					url,
					thumbnail,
					rate,
				});
			});
			response.status(200).json(listNewComics);
		});
	} catch (error) {
		response.status(500).json(error.message);
	}
});

// GET : A Comic
app.get("/api/v1/truyen/:comic/:id", (request, response) => {
	let urlComic = process.env.BASE_URL + "truyen/" + request.params.comic + "/" + request.params.id;
	try {
		axios(urlComic).then((res) => {
			let dataComicDetail = {
				id: request.params.id,
				thumbnail: "",
				averagerate: 0,
				countrate: 0,
				otherName: "",
				authorName: "",
				artist: "",
				category: [],
				comicType: "",
				yearOfRelease: "",
				status: "",
				totalViews: 0,
				description: "",
				listChapters: [],
			};
			const html = res.data;
			const $ = cheerio.load(html);
			$(".tab-summary", html).each(function () {
				const thumbnail = $(this).find(".summary_image > a > img").attr("src") || $(this).find(".summary_image > a > img").attr("data-src");
				dataComicDetail = { ...dataComicDetail, thumbnail };
			});

			$(".content-manga-left", html).each(function () {
				const description = $(this).find(".panel-story-description .dsct > p").text();
				const listChapters = [];
				const regexGetId = /\/(\d+)$/;
				$(this)
					.find(".panel-manga-chapter .row-content-chapter li")
					.each(function () {
						const chapterName = $(this).find("> a").text();
						const chapterLink = "http://localhost:8069/api/v1" + $(this).find("> a").attr("href").split("https://manhuarockvip.com")[1];
						const chapterId = chapterLink.match(regexGetId)[1];
						const chapterCreatedAt = $(this).find("> span.chapter-time").text();
						listChapters.push({
							chapterId,
							chapterName,
							chapterLink,
							chapterCreatedAt,
						});
					});
				dataComicDetail = { ...dataComicDetail, description, listChapters };
			});
			response.status(200).json(dataComicDetail);
		});
	} catch (error) {
		response.status(500).json(error.message);
	}
});

// GET : A Chapter
app.get("/api/v1/truyen/:comic/:chapter/:id", (request, response) => {
	let urlChapter = process.env.BASE_URL + `truyen/${request.params.comic}/${request.params.chapter}/${request.params.id}`;
	try {
        axios(urlChapter).then(res => {
            const html = res.data;
            
        })
	} catch (error) {
		res.status(500).json(error.message);
	}
});

// Run the server
app.listen(process.env.PORT || 8069, () => {
	console.log(`Starting server on port ${process.env.PORT}`);
});
