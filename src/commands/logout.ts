import * as vscode from "vscode";
import { logout } from "../providers/dashlane-cli/dashlane-cli.commands";

export const logoutCommand = vscode.commands.registerCommand("dashlane-vscode.logout", async () => {
    try {
        await logout();
        vscode.window.showInformationMessage("Dashlane Vault logout task is executing");
    } catch (error) {
        console.error(error);
        vscode.window.showErrorMessage(error instanceof Error ? error.message : "Unknown error");
    }
});
