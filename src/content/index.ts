import addTags from "./addTags";
import createEntry, { Entry } from "./createEntry";
import createSettings from "./createSettings";
import Folder from "./folder";
import getListElements from "./getListElements";

function main(interval: NodeJS.Timer) {
    const listElements = getListElements();

    if (listElements === null) {
        return false;
    }

    clearInterval(interval);

    const entries: Entry[] = [];
    for (const el of listElements.children) {
        entries.push(createEntry(el));
    }

    const folder: Folder = new Folder(listElements.parent, "", "", false);

    for (const e of entries) {
        folder.addEntry(e, 0);
        addTags(e);
        createSettings(e);
        e.folder = folder;
    }
}

const x = setInterval(() => { main(x); }, 1000);
