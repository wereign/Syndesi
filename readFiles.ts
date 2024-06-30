import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

type ObsidianCard = {
	readonly uuid: string;
	x?: number;
	y?: number;
	text: string;
};

type Node = {
	level: number;
	card: ObsidianCard;
};

function classifyHeader(line: string): number {
	const max_level = 5;

	for (let i = 1; i <= max_level; i++) {
		if (line.startsWith("#".repeat(i) + " ")) {
			return i;
		}
	}
	return -1;
}

const filePath = "./test-media/4.Data Engineering.md";

function loadMarkdown(filePath: string): void {
	const allNodes: Node[] = [];

	fs.readFile(filePath, "utf-8", (err, data) => {
		if (err) {
			console.error("Error reading:", err);
			return;
		}

		const lines: string[] = data.split("\n");

		let currentNode: Node | null = null;

		for (const line of lines) {
			const level = classifyHeader(line);

			if (level > -1) {
				// Save the current node if it exists
				if (currentNode) {
					allNodes.push(currentNode);
				}
				// Start a new node
				const uuid = uuidv4();
				const tmpCard: ObsidianCard = { uuid: uuid, text: line };
				currentNode = { level: level, card: tmpCard };
			} else if (currentNode) {
				// Append to the current node's text if not a new header
				currentNode.card.text += "\n" + line;
			}
		}

		// Push the last node if it exists
		if (currentNode) {
			allNodes.push(currentNode);
		}

		printNodes(allNodes);
	});
}


function printNodes(nodes: Node[]): void {
	nodes.forEach((node, index) => {
		console.log(`Node ${index + 1}:`);
		console.log(`Level: ${node.level}`);
		console.log(`UUID: ${node.card.uuid}`);
		console.log(`Text:\n${node.card.text}`);
		console.log("-------------------------");
	});
}

loadMarkdown(filePath);
