export const findEpisodeItem = (object, arr) => {
    object.children.map((child) => {
        if (child.name === "item") {
            arr.push(child)
        } else {
            findEpisodeItem(child)
        }
    })
}