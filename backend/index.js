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
				const thumbnail = $(this).find("> img").attr("src") || $(this).find("> img").attr("data-src");
				console.log(`>>> line 33: Name: ${name} - URL: ${url} - thumbnail: ${thumbnail}`);
				posterComics.push({
					name: name,
					url: "http://localhost:8069/api/v1" + url,
					thumbnail: "https://manhuarock.us" + thumbnail,
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
	try {
		axios(process.env.BASE_URL).then((res) => {
			const html = res.data;
			const $ = cheerio.load(html);
            $(".listupd > .page-item > .bsx-item", html).each(function () {
                const id = $(this).find(".thumb-manga > a").attr("title");;
				const name = $(this).find(".thumb-manga > a").attr("title") || $(this).find(".thumb-manga > a > img").attr("alt");
				const url = $(this).find(".thumb-manga > a").attr("href");
				const thumbnail = $(this).find(".thumb-manga > a > img").attr("data-src") || $(this).find(".thumb-manga > a > img").attr("src");
				// const comicName = $(this).find("h1.title-detail").text();
				// const comicUpdatedAt = $(this).find("time.small").text();
				// const comicDetailInfor = $(this).find("div.detail-info > div.row");
				// const comicThumbnail = $(comicDetailInfor).find("> div.col-image > img").attr("src");
				// const comicListInfor = $(comicDetailInfor).find("> div.col-info > ul.list-info");
				// const comicOtherName = $(comicListInfor).find("> li.othername > h2").text();
				// const comicAuthor = $(comicListInfor).find("> li.author p+p").text();
				// const comicStatus = $(comicListInfor).find("> li.status p+p").text();
				// // const comicKind = $(comicListInfor).find("> li.kind p+p").text();
				// const comicKinds = [];
				// const comicKindLinks = $(comicListInfor)
				// 	.find("> li.kind p+p a")
				// 	.each(function () {
				// 		comicKinds.push({
				// 			link: $(this).attr("href"),
				// 			name: $(this).text(),
				// 		});
				// 	});
				// // console.log("🚀 ~ file: index.js:73 ~ comicKinds:", comicKinds);
				// const comicViews = $(comicListInfor).find("li:last-child p+p").text();
				// const comicContent = $(this).find("div.detail-content p").text();
				// const listChapters = [];
				// const listChaptersSelector = $(this)
				// 	.find("div.list-chapter > nav > ul li")
				// 	.each(function () {
				// 		listChapters.push({
				// 			nameChapter: $(this).find("div.col-xs-5.chapter").text(),
				// 			linkChapter: "http://localhost:8069/api/v1" + $(this).find("div.col-xs-5.chapter > a").attr("href").split("https://nettruyenco.vn")[1],
				// 			updatedAtChapter: $(this).find("div.col-xs-4.no-wrap.small").text(),
				// 		});
				// 	});
				// const objComic = {
				// 	comicName,
				// 	comicUpdatedAt,
				// 	comicThumbnail,
				// 	comicDetailInfo: {
				// 		comicOtherName,
				// 		comicAuthor,
				// 		comicStatus,
				// 		comicKinds,
				// 		comicViews,
				// 	},
				// 	comicContent,
				// 	listChapters,
				// };
				// response.status(200).json(objComic);
			});
		});
	} catch (error) {
		response.status(500).json(error.message);
	}
});

// GET : A Chapter

// Run the server

app.listen(process.env.PORT || 8069, () => {
	console.log(`Starting server on port ${process.env.PORT}`);
});
