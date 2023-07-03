import { MessageTypes } from "../shared/messageTypes";
import { ChangeIconMessage } from "../shared/types";
import { Entry } from "./createEntry";
import { removeElementFromArray } from "./misc";
import settings from "./settings";

function addInputField(container: HTMLDivElement, containerElements: HTMLDivElement[], inputDataElements: HTMLInputElement[], inputColorElements: HTMLInputElement[], preValueData: string, preValueColor: string, combineInputs: () => void, name: string) {
    name = name.toLowerCase();
    
    const div = document.createElement("div");
    container.appendChild(div);
    containerElements.push(div);
    div.className = "ml-2 bg-neutral-200 rounded-md text-center";

        const removeButton = document.createElement("button");
        div.appendChild(removeButton);
        removeButton.textContent = "🗑";
        removeButton.className = "h-7 m-[2px]";

        const inputData = document.createElement("input");
        div.appendChild(inputData);
        inputDataElements.push(inputData);
        inputData.value = preValueData;
        inputData.className = "ml-1 px-1 bg-transparent border-2 border-neutral-300 rounded-lg h-fit" + removeButton.className;
        inputData.placeholder = `Enter ${name} name`;

        const inputColor = document.createElement("input");
        div.appendChild(inputColor);
        inputColorElements.push(inputColor);
        inputColor.value = preValueColor;
        inputColor.className = inputData.className;
        inputColor.placeholder = `Enter ${name} color`;
        div.style.backgroundColor = inputColor.value;

    inputData.oninput = () => { combineInputs(); }
    inputColor.oninput = () => {
        div.style.backgroundColor = inputColor.value;
        combineInputs();
    }

    removeButton.onclick = () => {
        div.remove();
        removeElementFromArray(containerElements, div);
        removeElementFromArray(inputDataElements, inputData);
        removeElementFromArray(inputColorElements, inputData);
        combineInputs();
    }

}

function createInputFields(name: string, addCombinedText: (cT: string) => void, dataSeparator: string, colorSeparator: string, alreadyExistingData: string[], alreadyExistingColors: string[]): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "flex flex-row pb-1";

        const nameElement = document.createElement("div");
        container.appendChild(nameElement);
        nameElement.textContent = name;
        nameElement.className = "p-1";

        const inputsContainer = document.createElement("div");
        container.appendChild(inputsContainer);
        inputsContainer.className = "flex flex-col";

        const addInputButton = document.createElement("button");
        container.appendChild(addInputButton);
        addInputButton.textContent = "➕";
        addInputButton.className = "pl-2 py-1";
    
    const inputContainerElements: HTMLDivElement[] = [];
    const inputDataElements: HTMLInputElement[] = [];
    const inputColorElements: HTMLInputElement[] = [];

    function combineInputs() {
        let combinedText = "";
        for (let i = 0; i < inputDataElements.length; i++) {
            if (inputDataElements[i].value === "") {
                continue;
            } else if (inputColorElements[i].value === "") {
                combinedText += inputDataElements[i].value + dataSeparator;
            } else {
                combinedText += inputDataElements[i].value + colorSeparator + inputColorElements[i].value + dataSeparator;
            }
        }
        combinedText = combinedText.substring(0, combinedText.length - dataSeparator.length);

        addCombinedText(combinedText);
    }

    addInputButton.onclick = () => { addInputField(inputsContainer, inputContainerElements, inputDataElements, inputColorElements, "", "", combineInputs, name); }

    for (let i = 0; i < alreadyExistingData.length; i++) {
        addInputField(inputsContainer, inputContainerElements, inputDataElements, inputColorElements, alreadyExistingData[i], alreadyExistingColors[i], combineInputs, name);
    }

    combineInputs();

    return container;
}

function createSettingsContents(entry: Entry): HTMLDivElement {
    const settingsDiv = document.createElement("div");
    settingsDiv.hidden = true;
    settingsDiv.className = "border-t-[1px] p-6 pb-5";

    const instructions = document.createElement("span");
    settingsDiv.appendChild(instructions);
    instructions.textContent = "Set your masks name to: ";

    const toSet = document.createElement("span");
    settingsDiv.appendChild(toSet);
    toSet.textContent = "";
    toSet.className = "font-bold";

    const copyButton = document.createElement("button");
    settingsDiv.appendChild(copyButton);
    copyButton.textContent = "📋";
    copyButton.onclick = () => {
        navigator.clipboard.writeText(toSet.textContent as string);
    }
    copyButton.className = "text-lg ml-2";

    let folderPart = "";
    let tagsPart = "";

    function combineParts() {
        const part1 = entry.inputElement.value.split(settings.folder.start)[0];
        const part2 = entry.inputElement.value.split(settings.tags.start)[0];
        toSet.textContent =  part1 > part2? part2 : part1 + folderPart + tagsPart;

        if (entry.inputElement.value === toSet.textContent) {
            entry.unsavedChangesIndicator.textContent = "🟢";
            entry.unsaved = false;
        } else {
            entry.unsavedChangesIndicator.textContent = "🔴";
            entry.unsaved = true;
        }

        entry.folder?.checkSaved();
    }

    function addToFolderPart(a: string) {
        folderPart = a.length == 0? "" : settings.folder.start + a + settings.folder.end;
        combineParts();
    }

    function addToTagsPart(a: string) {
        tagsPart = a.length == 0? "" : settings.tags.start + a + settings.tags.end;
        combineParts();
    }

    entry.inputElement.oninput = () => { combineParts(); }

    settingsDiv.appendChild(createInputFields("Folder", addToFolderPart, settings.folder.separator, settings.folder.colorSeparator, entry.folders, entry.folderColors));
    settingsDiv.appendChild(createInputFields("Tags", addToTagsPart, settings.tags.separator, settings.tags.colorSeparator, entry.tags, entry.tagColors));

    return settingsDiv;
}

export default function createSettings(entry: Entry): Entry {
    entry.settingsButton.textContent = "⚙";
    entry.settingsButton.className = "active:animate-spin mr-2";
    entry.settingsButton.onclick = () => { settingsDiv.hidden = !settingsDiv.hidden; }

    const settingsDiv = createSettingsContents(entry);
    entry.firstDiv.appendChild(settingsDiv);

    return entry;
}
