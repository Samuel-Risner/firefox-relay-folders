import addExpandArrow from "./addExpandArrow";
import addTags from "./addTags";
import createEntry, { Entry } from "./createEntry";
import Folder from "./folder";
import createSettings from "./createSettings";
import getListElements from "./getListElements";

function main(timeOut: NodeJS.Timeout) {
    console.log("foo");

    const listElements = getListElements();

    if (listElements === null) {
        return false;
    }

    clearTimeout(timeOut);

    const entries: Entry[] = [];
    for (const el of listElements.children) {
        entries.push(createEntry(el));
    }

    const folder: Folder = new Folder(listElements.parent, "p", false);

    for (const e of entries) {
        folder.addEntry(e, 0);
        addTags(e);
        createSettings(e);
        addExpandArrow(e);
    }
    
}

const x = setInterval(() => { main(x); }, 1000);
