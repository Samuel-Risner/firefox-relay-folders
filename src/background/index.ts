import { MessageTypes } from "../shared/messageTypes";
import { BasicMessage, ChangeIconMessage, GetUnsavedResponse, SetUnsavedMessage } from "../shared/types";

type SavedData = {
    unsaved: number;
}

browser.runtime.onInstalled.addListener(() => {
    const data: SavedData = { unsaved: 0 };
    browser.storage.local.set(data);
});

async function setIcon(message: ChangeIconMessage, sendResponse: () => void) {
    await browser.browserAction.setIcon({ path: (message as ChangeIconMessage).newIcon });
    sendResponse();
}

async function getUnsaved(sendResponse: (response: GetUnsavedResponse) => void) {
    const data = await browser.storage.local.get() as SavedData;
    sendResponse(data);
}

async function setUnsaved(message: SetUnsavedMessage, sendResponse: () => void) {
    await browser.storage.local.set({ unsaved: message.unsaved } as SavedData);
    sendResponse();
    if (message.unsaved === 0) {
        browser.browserAction.setIcon({ path: "icons/icon-96.png"});
    } else {
        browser.browserAction.setIcon({ path: "icons/icon-unsaved-96.png"});
    }
}

browser.runtime.onMessage.addListener((message: BasicMessage, sender: browser.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    if (message.type === MessageTypes.ChangeIcon) {
        setIcon(message as ChangeIconMessage, sendResponse);
    } else if (message.type === MessageTypes.GetUnsaved) {
        getUnsaved(sendResponse);
    } else if (message.type === MessageTypes.SetUnsaved) {
        setUnsaved(message as SetUnsavedMessage, sendResponse);
    }

    return true;
});
