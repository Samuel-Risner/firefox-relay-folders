import { MessageTypes } from "../shared/messageTypes";
import { GetUnsavedMessage, GetUnsavedResponse } from "../shared/types";

async function main() {
    const message: GetUnsavedMessage = { type: MessageTypes.GetUnsaved };
    const unsavedPromise = browser.runtime.sendMessage(message);

    const unsavedContainer = document.getElementById("unsavedContainer") as HTMLDivElement;
    const unsavedDisplay = document.getElementById("unsaved") as HTMLSpanElement;

    const unsaved = (await unsavedPromise as GetUnsavedResponse).unsaved;

    if (unsaved === 0) {
        unsavedContainer.hidden = true;
    } else {
        unsavedDisplay.textContent = String(unsaved);
        unsavedContainer.hidden = false;
    }
}

main();
