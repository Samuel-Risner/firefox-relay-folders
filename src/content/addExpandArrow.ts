import { Entry } from "./createEntry";

export default function addExpandArrow(entry: Entry) {
    entry.maskOverview.appendChild(entry.expandArrow);
}
