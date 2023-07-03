import { Entry } from "./createEntry";

export default function addTags(entry: Entry) {
    entry.tagContainer.className = "flex grow flex-row";

    for (let i = 0; i < entry.tags.length; i++) {
        const div = document.createElement("div");
        entry.tagContainer.appendChild(div);
        div.textContent = entry.tags[i];
        div.className = "px-2 mx-1 rounded-full";
        div.style.backgroundColor = entry.tagColors[i];
    }
}
