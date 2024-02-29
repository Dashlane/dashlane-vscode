import { CLINoteOutputItem } from "../providers/dashlane-cli/dashlane-cli.definitions";

export const noteMapper = {
    toQuickPickEntry: (item: CLINoteOutputItem) => ({
        label: item.title,
        id: item.id,
        note: item.content,
    }),
};
