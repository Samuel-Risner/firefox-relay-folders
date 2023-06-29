import { Entry } from "./createEntry";

export default function addExpandArrow(entry: Entry) {
    entry.container.appendChild(entry.expandArrow);
}
