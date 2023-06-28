import settings from "./settings";

export type Entry = {
    firstDiv: HTMLDivElement;
    
    inputValue: string;
    inputElement: HTMLInputElement;

    expandArrow: HTMLElement;

    container: HTMLElement;
    element: HTMLElement;

    tags: string[];
    folder: string[];
}

function getTags(value: string): string[] {
    if (!value.includes(settings.tags.start)) return [];

    let parts = value.split(settings.tags.start);
    if (parts.length !== 2) return [];

    let parts2 = parts[1].split(settings.tags.end);
    if (parts2.length !== 2) return [];

    const tags = parts2[0].split(settings.tags.separator);
    return tags;
}

function getFolder(value: string): string[] {
    if (!value.includes(settings.folder.start)) return [];

    let parts = value.split(settings.folder.start);
    if (parts.length !== 2) return [];

    let parts2 = parts[1].split(settings.folder.end);
    if (parts2.length !== 2) return [];

    const folder = parts2[0].split(settings.folder.separator);
    return folder;
}

export default function createEntry(element: HTMLElement): Entry {
    const firstDiv = element.children[0] as HTMLDivElement;
    const smallMaskDiv = firstDiv.children[0] as HTMLElement;

    const infoDiv = smallMaskDiv.children[0];
    const expandArrow = smallMaskDiv.children[1] as HTMLElement;

    const inputDiv = infoDiv.children[0];
    const inputForm = inputDiv.children[0];
    const inputElement = inputForm.children[0] as HTMLInputElement;

    element.remove();

    return {
        inputValue: inputElement.value,
        inputElement: inputElement,
        
        expandArrow: expandArrow,
        
        firstDiv: firstDiv,
        container: smallMaskDiv,

        element: element,

        tags: getTags(inputElement.value),
        folder: getFolder(inputElement.value)
    }
}
