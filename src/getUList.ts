export default function getUList(): { children: HTMLLIElement[], parent: HTMLUListElement } | null {
    const elements: HTMLCollectionOf<HTMLUListElement> = document.getElementsByTagName("ul");

    for (const listEl of elements) {
        const children = listEl.children;
        const wantedListElements: HTMLLIElement[] = [];

        for (const child of children) {
            if (child.tagName !==  "LI") {
                continue;
            }
    
            if (!child.id.endsWith("mozmail.com")){
                continue;
            }
    
            if (child.className !== "AliasList_alias-card-wrapper__a_ZUO") {
                continue;
            }

            wantedListElements.push(child as HTMLLIElement);
        }
        
        if (wantedListElements.length > 0) {
            return { children: wantedListElements, parent: listEl };
        }

    }

    return null;
}
