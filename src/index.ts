import addExpandArrow from "./addExpandArrow";
import addTags from "./addTags";
import createEntry, { Entry } from "./createEntry";
import createSettings from "./createSettings";
import getUList from "./getUList";

type Folder = {
    entries: Entry[];
    subFolders: Map<string, Folder>;
}

class Main {

    private folder: Folder;

    constructor(private listParent: HTMLUListElement, private entries: Entry[]) {
        this.folder = { entries: [], subFolders: new Map() }

        this.sortEntries();

        for (const subFolder of this.folder.subFolders) {
            this.addFolders(subFolder[1], subFolder[0], this.listParent);
        }

        for (const entry of this.folder.entries) {
            this.listParent.appendChild(entry.element);
        }
    }

    private sortEntries() {
        for (const entry of this.entries) {
            if (entry.folder.length == 0) {
                this.folder.entries.push(entry);
                continue;
            }

            let parentFolder = this.folder;

            for (const subFolderName of entry.folder) {
                const addTo = parentFolder.subFolders.get(subFolderName);

                if (addTo === undefined) {
                    const newSubFolder: Folder = { entries: [entry], subFolders: new Map() };
                    parentFolder.subFolders.set(subFolderName, newSubFolder);
                    parentFolder = newSubFolder;
                    continue;
                }

                addTo.entries.push(entry);
                parentFolder = addTo;
            }
        }
    }

    private addFolders(folder: Folder, name: string, alphaParent: HTMLElement) {
        const parent = document.createElement("li");
        alphaParent.appendChild(parent);
        parent.className = "pt-6";

            const parentContents = document.createElement("div");
            parent.appendChild(parentContents);

                const quickInfo = document.createElement("div");
                parentContents.appendChild(quickInfo);
                quickInfo.className = "p-2 flex flex-row";

                    const showContentsButton = document.createElement("button");
                    quickInfo.appendChild(showContentsButton);
                    showContentsButton.textContent = "➕";
                    showContentsButton.onclick = () => {
                        subContents.hidden = !subContents.hidden;
                        showContentsButton.textContent = subContents.hidden? "➕" : "➖";
                    }
                    showContentsButton.className = "w-6";

                    const folderName = document.createElement("div");
                    quickInfo.appendChild(folderName);
                    folderName.textContent = name;

                const subContents = document.createElement("div");
                parentContents.appendChild(subContents);
                subContents.hidden = true;
                subContents.className = ""

                    const subContentsList = document.createElement("ul");
                    subContents.appendChild(subContentsList);
                    subContentsList.className = "border-l-2 pl-2 ml-7";

        for (const e of folder.entries) {
            subContentsList.appendChild(e.element);
        }

        for (const f of folder.subFolders) {
            this.addFolders(f[1], f[0], subContentsList);
        }

    }

}

function main(timeOut: NodeJS.Timeout) {
    const listElements = getUList();

    if (listElements === null) {
        return false;
    }
    clearTimeout(timeOut);

    const entries: Entry[] = [];
    for (const el of listElements.children) {
        entries.push(createEntry(el));
    }

    const m = new Main(listElements.parent, entries);

    for (const e of entries) {
        addTags(e);
        createSettings(e);
        addExpandArrow(e);
    }
    
}

const x = setTimeout(() => { main(x); }, 1000);
