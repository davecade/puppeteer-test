const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://www.traversymedia.com/");

	// -- Create a screenshot of the page
	// await page.screenshot({ path: "example.png", fullPage: true });

	// -- Create a PDF from the page
	// await page.pdf({ path: "example.pdf", format: "A4" });

	// -- Get the HTML page content
	// const html = await page.content();

	// -- Get the title of the page
	// const title = await page.evaluate(() => document.title);

	// const text = await page.evaluate(() => document.body.innerText);

	// -- Get the links from the page
	// -- We are targetting a tags, and then mapping the href attribute
	// const links = await page.evaluate(() =>
	// 	Array.from(document.querySelectorAll("a")).map((link) => link.href)
	// );

	// -- Get the courses from the page
	// -- We are targetting the card class, and then mapping the title, level and url
	// const courses = await page.evaluate(() =>
	// 	Array.from(document.querySelectorAll("#cscourses .card"), (e) => ({
	// 		title: e.querySelector(".card-body h3").innerText,
	// 		level: e.querySelector(".card-body .level").innerText,
	// 		url: e.querySelector(".card-footer a").href,
	// 	}))
	// );

	const courses = await page.$$eval("#cscourses .card", (elements) =>
		elements.map((e) => ({
			title: e.querySelector(".card-body h3").innerText,
			level: e.querySelector(".card-body .level").innerText,
			url: e.querySelector(".card-footer a").href,
		}))
	);

	console.log("courses >> ", courses);

	// -- Save data to JSON file
	fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
		if (err) throw err;
		console.log("Data written to file");
	});

	await browser.close();
}

run();
