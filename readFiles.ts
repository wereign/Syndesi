import * as fs from "fs";

function classifyHeader(line: string): number {
	const max_level = 5;

	for (let i = 0; i < max_level; i++) {
		if (line.slice(0, i + 1) === "#".repeat(i) + " ") {
			return i;
		}
	}
	return -1;
}

const filePath = "./test-media/4.Data Engineering.md";

fs.readFile(filePath, "utf-8", (err, data) => {
	if (err) {
		console.error("Error reading:", err);
		return;
	}

	// console.log('File Contents:',data)
	console.log(typeof data);

	const lines: Array<string> = data.split("\n");

	console.log(typeof lines);
	for (const idx in lines) {
		if (lines[idx][0] == "#") {
			console.log(classifyHeader(lines[idx]), lines[idx]);
		}
	}
});
