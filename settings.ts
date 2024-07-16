import Syndesi from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class SyndesiSettings extends PluginSettingTab {
	plugin: Syndesi;

	constructor(app: App, plugin: Syndesi) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Max Header Level")
			.setDesc("Fill later")
			.addText((text) =>
				text
					.setPlaceholder("Heading Level")
					.setValue(this.plugin.settings.maxLevel.toString())
					.onChange(async (value) => {
						this.plugin.settings.maxLevel = Number(value);
						console.log("Max Heading Level Now", value);
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Auto Sync")
			.setDesc("Automatically sync mindmap on file modification")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.autoSync)
					.onChange(async (value) => {
						this.plugin.settings.autoSync = value;
						console.log("Auto Sync Now", value);
						await this.plugin.saveSettings();
					})
			);
	}
}
