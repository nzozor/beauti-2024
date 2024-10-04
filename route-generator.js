const fs = require("fs");
const axios = require("axios");

let routes = [];
axios
	.get("http://167.99.200.71:1339/api/treaments")
	.then((res) => {
		routes = res;
		routes = routes.data.data.map((route) => `/treatments/${route.attributes.slug}`);
		routes.push("/about-us");
		routes.push("/contact");
		routes.push("/treatments");
		routes.push("/consultation");
		routes = routes.join("\r\n");
		writeToFile(routes);
	})
	.catch((error) => {
		console.error(error);
	});

function writeToFile(routes) {
	fs.writeFile("./dynamic-routes.txt", routes, (err) => {
		if (err) {
			console.error(err);
		}
		console.log('prerendered routes successfully generated');
	});
}
