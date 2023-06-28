export function removeElementFromArray<T>(arr: Array<T>, element: T): Array<T> {
    const found = arr.indexOf(element);

    if (found < 0) {
        return arr;
    }

    return arr.splice(found, 1);
}
