import { Notice, Plugin } from "obsidian";
import { exec } from "child_process";
import { SyndesiSettings } from "settings";

interface PluginSettings {
	maxLevel: number;
	autoSync: boolean;
	renderLinks: boolean;
}

const DefaultSettings: Partial<PluginSettings> = {
	maxLevel: 4,
	autoSync: false,
	renderLinks: false
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

	async onload() {
		console.log("Loading Plugin");

		await this.loadSettings();

		// Register the event to listen for file modifications
		this.registerEvent(
			this.app.vault.on("modify", this.onFileModify.bind(this))
		);

		this.addSettingTab(new SyndesiSettings(this.app, this));

		this.addCommand({
			id: "create-mindmap",
			name: "Convert Current Document to Mindmap",
			callback: this.convertToMindmap.bind(this),
		});
	}

	onFileModify(file) {
		if (!this.settings.autoSync) return;

		const activeFile = this.app.workspace.getActiveFile();
		if (file.path === activeFile?.path && file.extension === "md") {
			console.log(`Markdown file modified: ${file.path}`);
			this.convertToMindmap();
			new Notice("Updated Mindmap");
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

		// console.log("Document path", docAbsPath);
		// console.log("Canvas path", canvasAbsPath);

		const pythonPath = `${basePath}\\.obsidian\\plugins\\Syndesi\\main.py`;
		const command = `python "${pythonPath}" --src "${docAbsPath}" --dest "${canvasAbsPath}" --max-header ${this.settings.maxLevel} --render-links ${this.settings.renderLinks}`;
		console.log(`Generated Command ${command}`)

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
