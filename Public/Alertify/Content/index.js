const { app, Notification } = require("electron");
const path = require("path");
require("electron-reloader")(module);

app.whenReady().then(() => {
	var notification = new Notification({
		title: 'Title of Notification',
		subtitle: 'Subtitle of Notification',
		body: 'Body of Notification',
		silent: false,
		icon: 'Content/Alertify.ico',
		hasReply: true,
		replyPlaceholder: 'Enter your reply here...',
		urgency: 'normal',
		timeoutType: 'default',
		sound: 'Content/sound.mp3',
		actions: [
			{
				type: 'button',
				text: 'Action 1',
				icon: '/path/to/action1.png',
				action: () => {
					console.log('Action 1 clicked')
				}
			},
			{
				type: 'button',
				text: 'Action 2',
				icon: '/path/to/action2.png',
				action: () => {
					console.log('Action 2 clicked')
				}
			}
		]
	}
	)
	notification.show()
});

async function readFile(filePath) {
	try {
		const fileData = await fs.readFile(filePath, 'utf-8');
		return fileData;
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function writeFile(filePath, fileContents) {
	try {
		await fs.writeFile(filePath, fileContents, 'utf-8');
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}