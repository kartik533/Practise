import {barchart} from "./data.js";

export async function getData() {
    return new Promise((resolve) => { setTimeout(resolve, 2000, barchart); });
}

export function getFilteredItems (items, target) {
    const matchingItems = [];

    for (const item of items) {
        if (item.name.toLowerCase().includes(target)) {
            matchingItems.push({
                id: item.id,
                name: item.name,
                items: item.items
                    ? getFilteredItems(item.items, target)
                    : undefined
            })
        } else if (item.items && item.items.length > 0) {
            const filteredItems = getFilteredItems(item.items, target)
            if (filteredItems.length) {
                matchingItems.push({
                    id: item.id,
                    name: item.name,
                    items: filteredItems
                })
            }
        }
    }

    return matchingItems;
}