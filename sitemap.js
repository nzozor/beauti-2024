const convert = require("xml-js"),
	fs = require("fs"),
	options = {
		compact: true,
		ignoreComment: true,
		spaces: 4,
	},
	moment = require("moment");
const url = "https://www.beautiskinclinic.com";
const axios = require("axios");

let projs = [];
axios
	.get("http://167.99.200.71:1339/api/treaments")
	.then((res) => {
		projs = res.data.data.filter(treat => treat.attributes.Content);
		readXml();
	})
	.catch((error) => {
		console.error(error);
	});

function readXml() {
	fs.readFile("./src/sitemap.xml", (err, data) => {
		if (!data) return;
		const existingSitemapList = JSON.parse(convert.xml2json(data, options));
		existingSitemapList.urlset.url = existingSitemapList.urlset.url.filter(
			(element) => {
				return !element.loc._text.includes("/treatments/");
			}
		);

		for (const project of projs) {
			existingSitemapList.urlset.url.push({
				loc: {
					_text: `${url}/treatments/${project.attributes.slug}`,
				},
				changefreq: {
					_text: "monthly",
				},
				priority: {
					_text: 0.8,
				},
				lastmod: {
					_text: moment(new Date()).format("YYYY-MM-DD"),
				},
			});
		}
		createSitemapFile(existingSitemapList);
	});
}

/*
    Method to convert JSON format data into XML format
*/
const createSitemapFile = (list) => {
	const finalXML = convert.json2xml(list, options); // to convert json text to xml text
	saveNewSitemap(finalXML);
};

/*
  Method to Update sitemap.xml file content
*/
const saveNewSitemap = (xmltext) => {
	fs.writeFile("./src/sitemap.xml", xmltext, (err) => {
		if (err) {
			return console.log(err);
		}

		console.log("sitemap successfully generated");
	});
};
