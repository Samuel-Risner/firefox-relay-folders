import { Entry } from "./createEntry";

export default function modEntry(entry: Entry): Entry {
    entry.element.remove();
    entry.expandArrow.remove();

    const btn = document.createElement("button");
    entry.container.appendChild(btn);
    btn.textContent = "⚙";
    btn.onclick = () => {
        settingsDiv.hidden = !settingsDiv.hidden;
    }

    const settingsDiv = document.createElement("div");
    settingsDiv.hidden = true;
    settingsDiv.textContent = "test";
    entry.firstDiv.appendChild(settingsDiv);

    entry.container.appendChild(entry.expandArrow);

    return entry;
}
