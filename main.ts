import { Plugin  } from "obsidian";

export default class Syndesi extends Plugin {
	async onload() {
		console.log("Loading Plugin");

		this.addCommand({
			id: "create-mindmap",
			name: "Convert Current Document to Mindmap",
			callback: () => {
				console.log(
					"This is where the conversion function call will occur"
				);

				console.log(
					`The current file is ${
						this.app.workspace.getActiveFile()?.path
					}`
				);
			},
		});

	}

	async onunload() {
		console.log("Unloading Plugin");
	}
}
