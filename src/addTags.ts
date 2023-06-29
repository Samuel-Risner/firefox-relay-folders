import { Entry } from "./createEntry";

export default function addTags(entry: Entry) {
    const tagsContainer = document.createElement("div");
    entry.container.appendChild(tagsContainer);
    tagsContainer.className = "flex flex-row";

    for (let i = 0; i < entry.tags.length; i++) {
        const div = document.createElement("div");
        tagsContainer.appendChild(div);
        div.textContent = entry.tags[i];
        div.className = "px-2 rounded-full";
        div.style.backgroundColor = entry.tagColors[i];
    }
}
