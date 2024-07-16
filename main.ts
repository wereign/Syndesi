import { Notice, Plugin } from "obsidian";
import { exec } from "child_process";

interface PluginSettings {
	maxLevel: number;
}

const DefaultSettings: Partial<PluginSettings> = {
	maxLevel: 4,
};

export default class Syndesi extends Plugin {
	settings: PluginSettings;

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DefaultSettings,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onload() {
		console.log("Loading Plugin");

		// Register the event to listen for file modifications
		this.registerEvent(
			this.app.vault.on("modify", this.onFileModify.bind(this))
		);

		this.addCommand({
			id: "create-mindmap",
			name: "Convert Current Document to Mindmap",
			callback: this.convertToMindmap.bind(this),
		});
	}

	onFileModify(file) {
		const activeFile = this.app.workspace.getActiveFile();
		if (file.path === activeFile?.path){
			console.log(`File modified: ${file.path}`);
			this.convertToMindmap();
			new Notice('Updated Mindmap')

		}
	}

	convertToMindmap() {
		const activeFile = this.app.workspace.getActiveFile();
		if (!activeFile) {
			console.log("No active file found.");
			return;
		}

		const basePath = (this.app.vault.adapter as any).basePath;
		const docPath = activeFile.path;
		const docAbsPath = `${basePath}\\${docPath}`;
		const canvasPath = docPath.replace(".md", ".canvas");
		const canvasAbsPath = `${basePath}\\${canvasPath}`;

		console.log("Document path", docAbsPath);
		console.log("Canvas path", canvasAbsPath);

		const pythonPath = `${basePath}\\.obsidian\\plugins\\Syndesi\\main.py`;
		const command = `python "${pythonPath}" --src "${docAbsPath}" --dest "${canvasAbsPath}"`;

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

		console.log("End");
	}

	onunload() {
		console.log("Unloading Plugin");
	}
}
