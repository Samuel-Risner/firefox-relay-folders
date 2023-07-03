import { Entry } from "./createEntry";

export default class Folder {

    private subFolders: Map<string, Folder>;
    private entries: Entry[];

    private subFoldersContainer: HTMLUListElement;
    private entriesContainer: HTMLUListElement;
    private container: HTMLDivElement;
    
    constructor(protected parentList: HTMLUListElement, name: string, color: string, doCreateFolder: boolean = true) {
        this.subFolders = new Map();
        this.entries = [];

        this.subFoldersContainer = document.createElement("ul");
        this.entriesContainer = document.createElement("ul");
        this.container = document.createElement("div");

        if (doCreateFolder) {
            this.createFolder(name, color);
        } else {
            this.parentList.appendChild(this.subFoldersContainer);
            this.parentList.appendChild(this.entriesContainer);
        }
    }

    addEntry(entry: Entry, folderIndex: number = 0) {
        const subFolderName = entry.folder.at(folderIndex);

        if (subFolderName === undefined) {
            this.entries.push(entry);
            this.entriesContainer.appendChild(entry.listElement);
            const color = entry.folderColors.at(-1);
            if ((color !== "") && (color !== undefined)) this.container.style.backgroundColor = color;
            this.subFoldersContainer.className = "pb-3";
            return;
        }

        let subFolder = this.subFolders.get(subFolderName);

        if (subFolder === undefined) {
            subFolder = new Folder(this.subFoldersContainer, subFolderName, entry.folderColors[folderIndex]);
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

                const contents = document.createElement("div");
                this.container.appendChild(contents);
                contents.hidden = true;

                    contents.appendChild(this.subFoldersContainer);
                    contents.appendChild(this.entriesContainer);
                    this.subFoldersContainer.className = "border-l-2 pl-2 ml-1 pb-3";
                    this.entriesContainer.className = "border-l-2 pl-2 ml-1";
    }

}
