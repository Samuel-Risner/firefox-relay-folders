import createEntry, { Entry } from "./createEntry";
import getUList from "./getUList";
import modEntry from "./modEntry";

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

            const parentContents = document.createElement("div");
            parent.appendChild(parentContents);

                const quickInfo = document.createElement("div");
                parentContents.appendChild(quickInfo);

                    const folderName = document.createElement("div");
                    quickInfo.appendChild(folderName);
                    folderName.textContent = name;

                    const showContentsButton = document.createElement("button");
                    quickInfo.appendChild(showContentsButton);
                    showContentsButton.textContent = "➕";
                    showContentsButton.onclick = () => {
                        subContents.hidden = !subContents.hidden;
                    }

                const subContents = document.createElement("div");
                parentContents.appendChild(subContents);
                subContents.hidden = true;

                    const subContentsList = document.createElement("ul");
                    subContents.appendChild(subContentsList);

        for (const e of folder.entries) {
            subContentsList.appendChild(e.element);
        }

        for (const f of folder.subFolders) {
            this.addFolders(f[1], f[0], subContentsList);
        }

    }

}

function main() {
    console.log("foo");

    const listElements = getUList();

    if (listElements === null) {
        return;
    }

    const entries: Entry[] = [];
    for (const el of listElements.children) {
        entries.push(modEntry(createEntry(el)));
    }

    const m = new Main(listElements.parent, entries);

}

main();
