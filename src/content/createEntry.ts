import settings from "./settings";

export type Entry = {
    listElement: HTMLLIElement;
        firstDiv: HTMLDivElement;
            maskOverview: HTMLDivElement;
                maskInputAndAliasContainer: HTMLDivElement;
                    inputElement: HTMLInputElement;
                tagContainer: HTMLDivElement;
                settingsButton: HTMLButtonElement;
                unsavedChangesIndicator: HTMLDivElement;
            maskStats: HTMLDivElement;
    
    inputValue: string;

    tags: string[];
    tagColors: string[];
    folder: string[];
    folderColors: string[];
}

function getDataAndColor(value: string, start: string, end: string, colorSeparator: string, dataSeparator: string): { data: string[], colors: string[] } {
    const parts = value.split(start);
    if (parts.length != 2) return { data: [], colors: [] };

    const parts2 = parts[1].split(end);
    if (parts2.length != 2) return { data: [], colors: [] };

    const combinedParts = parts2[0].split(dataSeparator);

    const data: string[] = [];
    const colors: string[] = [];

    for (const c of combinedParts) {
        const parts3 = c.split(colorSeparator);
        if (parts3.length == 1) {
            data.push(c);
            colors.push("");
        } else if (parts3.length != 2) {
            continue;
        } else {
            data.push(parts3[0]);
            colors.push(parts3[1]);
        }
    }

    return { colors: colors, data: data };
}

export default function createEntry(element: HTMLLIElement): Entry {
    const firstDiv = element.children[0] as HTMLDivElement;
        const maskOverview = firstDiv.children[0] as HTMLDivElement;
            const maskInputAndAliasContainer = maskOverview.children[0] as HTMLDivElement;
                const inputDiv = maskInputAndAliasContainer.children[0] as HTMLDivElement; //
                    const inputForm = inputDiv.children[0] as HTMLFormElement; //
                        const inputElement = inputForm.children[0] as HTMLInputElement;
            const tagContainer = document.createElement("div");
            const settingsButton = document.createElement("button");
            const unsavedChangesIndicator = document.createElement("div");
            const expandArrow = maskOverview.children[1] as HTMLButtonElement; //
        const maskStats = firstDiv.children[1] as HTMLDivElement;

    expandArrow.remove();
    element.remove();

    maskInputAndAliasContainer.appendChild(tagContainer);
    maskInputAndAliasContainer.appendChild(settingsButton);
    maskInputAndAliasContainer.appendChild(unsavedChangesIndicator);
    maskInputAndAliasContainer.appendChild(expandArrow);

    const tagsAndColors = getDataAndColor(inputElement.value, settings.tags.start, settings.tags.end, settings.tags.colorSeparator, settings.tags.separator);
    const foldersAndColors = getDataAndColor(inputElement.value, settings.folder.start, settings.folder.end, settings.folder.colorSeparator, settings.folder.separator);

    return {
        listElement: element,
            firstDiv: firstDiv,
                maskOverview: maskOverview,
                    maskInputAndAliasContainer: maskInputAndAliasContainer,
                        inputElement: inputElement,
                    tagContainer: tagContainer,
                    settingsButton: settingsButton,
                    unsavedChangesIndicator: unsavedChangesIndicator,
                maskStats: maskStats,

        inputValue: inputElement.value,

        tags: tagsAndColors.data,
        tagColors: tagsAndColors.colors,
        folder: foldersAndColors.data,
        folderColors: foldersAndColors.colors
    }
}
