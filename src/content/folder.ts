import { Entry } from "./createEntry";

export default class Folder {

    private subFolders: Map<string, Folder>;
    private entries: Entry[];

    private subFoldersContainer: HTMLUListElement;
    private entriesContainer: HTMLUListElement;
    
    constructor(protected parentList: HTMLUListElement, name: string, doCreateFolder: boolean = true) {
        this.subFolders = new Map();
        this.entries = [];

        this.subFoldersContainer = document.createElement("ul");
        this.entriesContainer = document.createElement("ul");

        if (doCreateFolder) {
            this.createFolder(name);
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
            return;
        }

        let subFolder = this.subFolders.get(subFolderName);

        if (subFolder === undefined) {
            subFolder = new Folder(this.subFoldersContainer, subFolderName);
            this.subFolders.set(subFolderName, subFolder);
        }

        subFolder.addEntry(entry, folderIndex + 1);
    }

    private createFolder(name: string) {
        const listElement = document.createElement("li");
        this.parentList.appendChild(listElement);
        listElement.className = "p-2 pb-4";

            const contentsWrapper = document.createElement("div");
            listElement.appendChild(contentsWrapper);

                const folder = document.createElement("div");
                contentsWrapper.appendChild(folder);
                folder.className = "p-2 flex flex-row";

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
                contentsWrapper.appendChild(contents);
                contents.hidden = true;

                    contents.appendChild(this.subFoldersContainer);
                    contents.appendChild(this.entriesContainer);
                    this.subFoldersContainer.className = "border-l-2 pl-2 ml-7";
                    this.entriesContainer.className = this.subFoldersContainer.className;
    }

}
