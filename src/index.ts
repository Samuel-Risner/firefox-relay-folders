import createEntry, { Entry } from "./createEntry";
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
        console.log(folder);
        console.log(name);
        console.log(folder.entries);

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

function getUList(): { children: HTMLLIElement[], parent: HTMLUListElement } | null {
    const elements: HTMLCollectionOf<HTMLUListElement> = document.getElementsByTagName("ul");

    for (const listEl of elements) {
        const children = listEl.children;
        const wantedListElements: HTMLLIElement[] = [];

        for (const child of children) {
            if (child.tagName !==  "LI") {
                continue;
            }
    
            if (!child.id.endsWith("mozmail.com")){
                continue;
            }
    
            if (child.className !== "AliasList_alias-card-wrapper__a_ZUO") {
                continue;
            }

            wantedListElements.push(child as HTMLLIElement);
        }
        
        if (wantedListElements.length > 0) {
            return { children: wantedListElements, parent: listEl };
        }

    }

    return null;
}

function main() {
    console.log("foo");

    const listElements = getUList();
    console.log(listElements);

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
