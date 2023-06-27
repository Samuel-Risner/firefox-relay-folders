import { Entry } from "./createEntry";

export default function modEntry(entry: Entry): Entry {
    entry.element.remove();
    entry.expandArrow.remove();

    const btn = document.createElement("button");
    entry.container.appendChild(btn);
    btn.textContent = "⚙";

    entry.container.appendChild(entry.expandArrow);

    return entry;
}
