import { CLIPasswordOutputItem } from "../providers/dashlane-cli/dashlane-cli.definitions";

export const passwordMapper = {
    toQuickPickEntry: (item: CLIPasswordOutputItem) => ({
        label: item.title,
        detail: `${item.url} (Login: ${item.login ?? 'none'})`,
        id: item.id,
        password: item.password,
    }),
};
