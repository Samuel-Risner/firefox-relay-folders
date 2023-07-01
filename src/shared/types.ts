import { MessageTypes } from "./messageTypes";

export interface BasicMessage {
    type: MessageTypes;
}

export interface ChangeIconMessage extends BasicMessage {
    type: MessageTypes.ChangeIcon;
    newIcon: string;
}
