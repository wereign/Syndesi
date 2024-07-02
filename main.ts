import { Plugin } from "obsidian";
import { exec } from "child_process";

export default class Syndesi extends Plugin {
	async onload() {
		console.log("Loading Plugin");

		this.addCommand({
			id: "create-mindmap",
			name: "Convert Current Document to Mindmap",
			callback: () => {
				console.log(
					`The current file is ${
						this.app.workspace.getActiveFile()?.path
					}`
				);

				const basePath = (this.app.vault.adapter as any).basePath;
				const docPath = this.app.workspace.getActiveFile()?.path;
				const docAbsPath = `${basePath}\\${docPath}`;
				const canvasPath = docPath?.replace(".md", ".canvas");
				const canvasAbsPath = `${basePath}\\${canvasPath}`;

				console.log("Document path", docAbsPath);
				console.log("Canvas path", canvasAbsPath);

				const pythonPath =`${basePath}\\.obsidian\\plugins\\obsidian-sample-plugin\\main.py`;
				const command = `python "${pythonPath}" --src "${docAbsPath}" --dest "${canvasAbsPath}"`; // Replace with your command

				exec(command, (error, stdout, stderr) => {
					if (error) {
						console.error(`Error: ${error.message}`);
						return;
					}

					if (stderr) {
						console.error(`Stderr: ${stderr}`);
						return;
					}

					console.log(`Stdout: ${stdout}`);

				});

				console.log("End")
			},
		});
	}

	async onunload() {
		console.log("Unloading Plugin");
	}
}
