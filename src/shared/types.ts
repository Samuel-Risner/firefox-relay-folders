import { MessageTypes } from "./messageTypes";

export interface BasicMessage {
    type: MessageTypes;
}

export interface ChangeIconMessage extends BasicMessage {
    type: MessageTypes.ChangeIcon;
    newIcon: string;
}

export interface GetUnsavedMessage extends BasicMessage {
    type: MessageTypes.GetUnsaved;
}

export interface GetUnsavedResponse {
    unsaved: number
}

export interface SetUnsavedMessage extends BasicMessage {
    type: MessageTypes.SetUnsaved;
    unsaved: number;
}
