import { Entry } from "./createEntry";
import { removeElementFromArray } from "./misc";
import settings from "./settings";

export default function createSettings(entry: Entry): Entry {
    entry.expandArrow.remove();

    const btn = document.createElement("button");

    entry.container.appendChild(btn);
    entry.container.appendChild(entry.expandArrow);

    btn.textContent = "⚙";
    btn.className = "active:animate-spin";
    btn.onclick = () => { settingsDiv.hidden = !settingsDiv.hidden; }

    const settingsDiv = createSettingsContents(entry.folder, entry.tags);
    entry.firstDiv.appendChild(settingsDiv);

    return entry;

}

function createSettingsContents(alreadyExistingFolder: string[], alreadyExistingTags: string[]): HTMLDivElement {
    const settingsDiv = document.createElement("div");
    settingsDiv.hidden = true;
    settingsDiv.className = "border-t-[1px] p-6 pb-5";

    const description = document.createElement("span");
    settingsDiv.appendChild(description);
    description.textContent = "Please append this to the accounts name: ";

    const folderAndTagsTpAppendToAliasName = document.createElement("span");
    settingsDiv.appendChild(folderAndTagsTpAppendToAliasName);
    folderAndTagsTpAppendToAliasName.textContent = "";

    let folderPart = "";
    let tagsPart = "";

    function addToFolderPart(a: string) {
        folderPart = a.length == 0? "" : settings.folder.start + a + settings.folder.end;
        folderAndTagsTpAppendToAliasName.textContent = folderPart + tagsPart;
    }

    function addToTagsPart(a: string) {
        tagsPart = a.length == 0? "" : settings.tags.start + a + settings.tags.end;
        folderAndTagsTpAppendToAliasName.textContent = folderPart + tagsPart;
    }

    settingsDiv.appendChild(createInputFields("Folder:", addToFolderPart, settings.folder.separator, alreadyExistingFolder));
    settingsDiv.appendChild(createInputFields("Tags:", addToTagsPart, settings.tags.separator, alreadyExistingTags));

    return settingsDiv;

}

function createInputFields(description: string, addCombinedTextTo: (cT: string) => void, combinedTextSeparator: string, alreadyExisting: string[]): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "flex flex-row pb-1";

        const descriptionElement = document.createElement("div");
        container.appendChild(descriptionElement);
        descriptionElement.textContent = description;
        descriptionElement.className = "p-1";

        const inputsContainer = document.createElement("div");
        container.appendChild(inputsContainer);
        inputsContainer.className = "flex flex-row";

        const addInputButton = document.createElement("button");
        container.appendChild(addInputButton);
        addInputButton.textContent = "➕";
        addInputButton.className = "pl-2 py-1";
    
    const inputContainerElements: HTMLDivElement[] = [];
    const inputElements: HTMLInputElement[] = [];

    addInputButton.onclick = () => { addInputField(inputsContainer, inputContainerElements, inputElements, addCombinedTextTo, combinedTextSeparator, ""); }

    for (const a of alreadyExisting) {
        addInputField(inputsContainer, inputContainerElements, inputElements, addCombinedTextTo, combinedTextSeparator, a);
    }

    return container;

}

function addInputField(container: HTMLDivElement, containerElements: HTMLDivElement[], inputElements: HTMLInputElement[], addCombinedTextTo: (cT: string) => void, combinedTextSeparator: string, preValue: string) {
    const div = document.createElement("div");
    container.appendChild(div);
    containerElements.push(div);
    div.className = "ml-2 bg-neutral-200 rounded-md p-1";

        const removeButton = document.createElement("button");
        div.appendChild(removeButton);
        removeButton.textContent = "❌";

        const input = document.createElement("input");
        div.appendChild(input);
        inputElements.push(input);
        input.value = preValue;
        input.className = "w-20 ml-2 bg-transparent";

    function combineInputs(): string {
        let combinedText = "";
        inputElements.forEach((value: HTMLInputElement) => { combinedText += value.value + combinedTextSeparator; });
        combinedText = combinedText.substring(0, combinedText.length - 1);

        return combinedText;
    }

    input.oninput = () => {
        addCombinedTextTo(combineInputs());
    }

    removeButton.onclick = () => {
        div.remove();
        removeElementFromArray(containerElements, div);
        removeElementFromArray(inputElements, input);
        addCombinedTextTo(combineInputs());
    }

}
