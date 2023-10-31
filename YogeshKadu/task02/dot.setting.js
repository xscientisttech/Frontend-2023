const gui = new dat.GUI();
const setting = {
	mode: "Easy",
};
gui.add(setting, "mode", ["Easy", "Hard"]).onChange(() => ResetGame());
const ModeToGridCount = { Easy: 4, Hard: 6 };
const gridContainer = document.getElementById("gridContainer");

const emojiList = generateEmojis("🎈", 18);
// emojiList.sort()
var shuffeledList = [];
var SelectedCell = -1; //index
const Cells = [];
//#region Game setting function
const ResetGame = () => {
	gridContainer.innerHTML = "";
	Cells.splice(0, Cells.length);
	RemoveGridClass();
	gridContainer.classList.add(`grid-cols-${ModeToGridCount[setting.mode]}`);
	const square =
		ModeToGridCount[setting.mode] * ModeToGridCount[setting.mode];
	for (let i = 0; i < square; i++) {
		const node = ReturnCellNode(i % ModeToGridCount[setting.mode]);
		gridContainer.appendChild(node);
		Cells.push(node);
	}
};
const RemoveGridClass = () => {
	gridContainer.classList.remove("grid-cols-4");
	gridContainer.classList.remove("grid-cols-6");
};
const ReturnCellNode = (index) => {
	const button = document.createElement("button");
	const div = document.createElement("div");
	const back = document.createElement("span");
	div.classList="w-full h-full"
	button.classList =
		"bg-white text-xl sm:text-5xl rounded sm:rounded-lg";
	button.onclick = function() {
		this.classList.add("selected");
		setTimeout(function () {
			const selectedBox = document.querySelectorAll("selected");
			if (selectedBox.length > 1) {

			}
		}, 500);
	};
	back.classList = "absolute top-0 left-0 w-full h-full bg-white";
	button.innerHTML = emojiList[index];
	button.appendChild(back);
	div.appendChild(button);
	return div;
};
//#endregion

//#region event listener
window.addEventListener("load", () => ResetGame());
//#endregion

//#region Special functions
function generateEmojis(startEmoji, numEmojis) {
	const startCodePoint = startEmoji.codePointAt(0);
	const emojis = [];
	for (let i = 0; i < numEmojis; i++) {
		const emoji = String.fromCodePoint(startCodePoint + i);
		emojis.push(emoji);
	}
	return emojis;
}
console.log(emojiList);
//#endregion
