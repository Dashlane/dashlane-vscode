import * as vscode from 'vscode';
import { sync } from '../providers/dashlane-cli/dashlane-cli.commands';

export const syncCommand = vscode.commands.registerCommand('dashlane-vscode.sync', async () => {
    try {
        await sync();
        vscode.window.showInformationMessage('Dashlane Vault sync task is executing');
    } catch (error) {
        console.error(error);
        vscode.window.showErrorMessage(error instanceof Error ? error.message : 'Unkonwn error');
    }
});
