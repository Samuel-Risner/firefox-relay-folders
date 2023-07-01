import { MessageTypes } from "../shared/messageTypes";
import { BasicMessage, ChangeIconMessage } from "../shared/types";

browser.runtime.onMessage.addListener((message: BasicMessage, sender: browser.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    if (message.type === MessageTypes.ChangeIcon) {
      browser.browserAction.setIcon({ path: (message as ChangeIconMessage).newIcon });
    }
});
