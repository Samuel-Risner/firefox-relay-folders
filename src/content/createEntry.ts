import settings from "./settings";

export type Entry = {
    firstDiv: HTMLDivElement;
    
    inputValue: string;
    inputElement: HTMLInputElement;

    expandArrow: HTMLElement;

    container: HTMLElement;
    element: HTMLElement;

    tags: string[];
    tagColors: string[];
    folder: string[];
}

function getColorsAndModTags(tags: string[]): string[] {
    const colors: string[] = [];

    for (let i = 0; i < tags.length; i++) {
        const parts = tags[i].split(settings.tags.colorSeparator);

        if (parts.length != 2) {
            colors.push("");
            continue;
        }

        colors.push(parts[1]);
        tags[i] = parts[0];
    }

    return colors;
}

function getTagsAndColors(value: string): { colors: string[], tags: string[] } {
    let parts = value.split(settings.tags.start);
    if (parts.length != 2) return { colors: [], tags: [] };

    let parts2 = parts[1].split(settings.tags.end);
    if (parts2.length != 2) return { colors: [], tags: [] };

    const tags = parts2[0].split(settings.tags.separator);
    const colors = getColorsAndModTags(tags);
    return { colors: colors, tags: tags };
}

function getFolder(value: string): string[] {
    let parts = value.split(settings.folder.start);
    if (parts.length != 2) return [];

    let parts2 = parts[1].split(settings.folder.end);
    if (parts2.length != 2) return [];

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

    expandArrow.remove();
    element.remove();

    const tagsAndColors = getTagsAndColors(inputElement.value);

    return {
        inputValue: inputElement.value,
        inputElement: inputElement,
        
        expandArrow: expandArrow,
        
        firstDiv: firstDiv,
        container: smallMaskDiv,

        element: element,

        tags: tagsAndColors.tags,
        tagColors: tagsAndColors.colors,
        folder: getFolder(inputElement.value)
    }
}
