import * as fs from "fs";

type Node = {
	level: number;
	text: string;
};

function classifyHeader(line: string): number {
	const max_level = 5;

	for (let i = 1; i <= max_level; i++) {
		if (line.slice(0, i + 1) === "#".repeat(i) + " ") {
			return i;
		}
	}
	return -1;
}

const filePath = "./test-media/4.Data Engineering.md";

function loadMarkdown(filePath: string) {
	const allNodes: Array<Node> = [];
	fs.readFile(filePath, "utf-8", (err, data) => {
		if (err) {
			console.error("Error reading:", err);
			return;
		}

		const lines: Array<string> = data.split("\n");

		let currentNode: Node | null = null;

		for (const line of lines) {
			const level = classifyHeader(line);

			if (level > -1) {
				if (currentNode) {
					allNodes.push(currentNode);
				}
				currentNode = { level: level, text: line };
			} else if (currentNode) {
				currentNode.text += "\n" + line;
			}
		}

		if (currentNode) {
			allNodes.push(currentNode);
		}

		console.log(allNodes);
	});
}

loadMarkdown(filePath);
