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
				// console.log(`>>> line 33: Name: ${name} - URL: ${url} - Image: ${image}`);
				posterComics.push({
					name: name,
					url: "http://localhost:8069/api/v1" + url.split("https://nettruyenco.vn")[1],
					image: image,
				});
			});
			// console.log(posterComics);
			response.status(200).json(posterComics);
		});
	} catch (error) {
		return response.status(500).json(error.message);
		// next(error);
	}
});

// GET : A Comic
app.get("/api/v1/truyen-tranh/:comic", (request, response) => {
	// console.log(request.params.comic);
	let urlComic = process.env.BASE_URL + "/truyen-tranh/" + request.params.comic;
	try {
		axios(urlComic).then((res) => {
			const html = res.data;
			const $ = cheerio.load(html);
			$("article#item-detail", html).each(function () {
				const comicName = $(this).find("h1.title-detail").text();
				const comicUpdatedAt = $(this).find("time.small").text();
				const comicDetailInfor = $(this).find("div.detail-info > div.row");
				const comicThumbnail = $(comicDetailInfor).find("> div.col-image > img").attr("src");
				const comicListInfor = $(comicDetailInfor).find("> div.col-info > ul.list-info");
				const comicOtherName = $(comicListInfor).find("> li.othername > h2").text();
				const comicAuthor = $(comicListInfor).find("> li.author p+p").text();
				const comicStatus = $(comicListInfor).find("> li.status p+p").text();
				// const comicKind = $(comicListInfor).find("> li.kind p+p").text();
				const comicKinds = [];
				const comicKindLinks = $(comicListInfor)
					.find("> li.kind p+p a")
					.each(function () {
						comicKinds.push({
							link: $(this).attr("href"),
							name: $(this).text(),
						});
					});
				// console.log("🚀 ~ file: index.js:73 ~ comicKinds:", comicKinds);
				const comicViews = $(comicListInfor).find("li:last-child p+p").text();
				const comicContent = $(this).find("div.detail-content p").text();
				const listChapters = [];
				const listChaptersSelector = $(this)
					.find("div.list-chapter > nav > ul li")
					.each(function () {
						listChapters.push({
							nameChapter: $(this).find("div.col-xs-5.chapter").text(),
							linkChapter: "http://localhost:8069/api/v1" + $(this).find("div.col-xs-5.chapter > a").attr("href").split("https://nettruyenco.vn")[1],
							updatedAtChapter: $(this).find("div.col-xs-4.no-wrap.small").text(),
						});
					});
				const objComic = {
					comicName,
					comicUpdatedAt,
					comicThumbnail,
					comicDetailInfo: {
						comicOtherName,
						comicAuthor,
						comicStatus,
						comicKinds,
						comicViews,
					},
					comicContent,
					listChapters,
				};
				response.status(200).json(objComic);
			});
		});
	} catch (error) {
		response.status(500).json(error.message);
	}
});

// GET : A Chapter
app.get("/api/v1/truyen-tranh/:comic/:chapter/:id", (request, response) => {
	let urlAChapterOfComic = process.env.BASE_URL + `/truyen-tranh/${request.params.comic}/${request.params.chapter}/${request.params.id}`;
	axios(urlAChapterOfComic).then((res) => {
		const html = res.data;
		const $ = cheerio.load(html);
		$("div.reading-detail.box_doc", html).each(function () {
			const listPageChapter = [];
			const getFullPageChapter = $(this)
				.find(".page-chapter > img")
				.each(function () {
					listPageChapter.push($(this).attr("src"));
				});
			response.status(200).json(listPageChapter);
		});
	});
});

// Run the server

app.listen(process.env.PORT || 8069, () => {
	console.log(`Starting server on port ${process.env.PORT}`);
});
