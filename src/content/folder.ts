import { MessageTypes } from "../shared/messageTypes";
import { SetUnsavedMessage } from "../shared/types";
import { Entry } from "./createEntry";

export default class Folder {

    private subFolders: Map<string, Folder>;
    private entries: Entry[];

    private subFoldersContainer: HTMLUListElement;
    private entriesContainer: HTMLUListElement;
    private container: HTMLDivElement;
    private unsavedIndicator: HTMLDivElement;
    
    constructor(protected parentList: HTMLUListElement, name: string, color: string, doCreateFolder: boolean = true, private parent: Folder | null = null) {
        this.subFolders = new Map();
        this.entries = [];

        this.subFoldersContainer = document.createElement("ul");
        this.entriesContainer = document.createElement("ul");
        this.container = document.createElement("div");
        this.unsavedIndicator = document.createElement("div");

        if (doCreateFolder) {
            this.createFolder(name, color);
        } else {
            this.parentList.appendChild(this.subFoldersContainer);
            this.parentList.appendChild(this.entriesContainer);
            this.subFoldersContainer.className = "pb-3";
        }
    }

    private getSaved(): number {
        let unsaved = 0;

        for (const e of this.entries) {
            if (e.unsaved) unsaved++;
        }

        for (const f of this.subFolders.values()) {
            unsaved += f.getSaved();
        }

        if (unsaved === 0) {
            this.unsavedIndicator.textContent = "🟢";
            this.unsavedIndicator.title = "No unsaved data";
        } else {
            this.unsavedIndicator.textContent = `🔴 ${unsaved}`;
            this.unsavedIndicator.title = `${unsaved} mask(s) have unsaved data`;
        }

        return unsaved;
    }

    checkSaved() {
        const unsaved = this.getSaved();
        const message: SetUnsavedMessage = { type: MessageTypes.SetUnsaved, unsaved: unsaved };
        browser.runtime.sendMessage(message);
    }

    addEntry(entry: Entry, folderIndex: number = 0) {
        const subFolderName = entry.folders.at(folderIndex);

        if (subFolderName === undefined) {
            this.entries.push(entry);
            this.entriesContainer.appendChild(entry.listElement);
            const color = entry.folderColors.at(-1);
            if ((color !== "") && (color !== undefined)) this.container.style.backgroundColor = color;
            return;
        }

        let subFolder = this.subFolders.get(subFolderName);

        if (subFolder === undefined) {
            subFolder = new Folder(this.subFoldersContainer, subFolderName, entry.folderColors[folderIndex], true, this);
            this.subFolders.set(subFolderName, subFolder);
        }

        subFolder.addEntry(entry, folderIndex + 1);
    }

    private createFolder(name: string, color: string) {
        const listElement = document.createElement("li");
        this.parentList.appendChild(listElement);
        listElement.className = "py-2";

            listElement.appendChild(this.container);
            this.container.style.backgroundColor = color;
            this.container.className = "rounded-lg p-2";

                const folder = document.createElement("div");
                this.container.appendChild(folder);
                folder.className = "m-1 flex flex-row";

                    const showContentsButton = document.createElement("button");
                    folder.appendChild(showContentsButton);
                    showContentsButton.textContent = "➕";
                    showContentsButton.onclick = () => {
                        contents.hidden = !contents.hidden;
                        showContentsButton.textContent = contents.hidden? "➕" : "➖";
                    }
                    showContentsButton.className = "w-6";

                    const folderName = document.createElement("div");
                    folder.appendChild(folderName);
                    folderName.textContent = name;

                    folder.appendChild(this.unsavedIndicator);
                    this.unsavedIndicator.className = "ml-2";
                    this.unsavedIndicator.textContent = "🟢";
                    this.unsavedIndicator.title = "No unsaved data";

                const contents = document.createElement("div");
                this.container.appendChild(contents);
                contents.hidden = true;

                    contents.appendChild(this.subFoldersContainer);
                    contents.appendChild(this.entriesContainer);
                    this.subFoldersContainer.className = "border-l-2 pl-2 ml-1 pb-3";
                    this.entriesContainer.className = "border-l-2 pl-2 ml-1";
    }

}
