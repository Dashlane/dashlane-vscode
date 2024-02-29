import * as vscode from 'vscode';
import { getPassword } from '../providers/dashlane-cli/dashlane-cli.commands';
import { passwordMapper } from '../mappers/dashlane-cli-password';

export const getPasswordCommand = vscode.commands.registerCommand('dashlane-vscode.getPassword', async () => {
    const searchQuery = await vscode.window.showInputBox({
        placeHolder: "Search query",
        prompt: "Search my passwords on Dashlane",
    }) ?? '';

    try {
        const parsedData = await getPassword(searchQuery);

        if (parsedData.length === 0) {
            vscode.window.showWarningMessage('No password matching search query, you may need to sync your Dashlane vault');
            return;
        }

        const quickPickItems = parsedData.map(passwordMapper.toQuickPickEntry);
    
        const pickedPassword = await vscode.window.showQuickPick(quickPickItems, {
            title: 'Which password do you want to obtain?',
            canPickMany: false,
        });
    
        if (pickedPassword) {
            vscode.env.clipboard.writeText(pickedPassword.password);
            vscode.window.showInformationMessage('Password copied to clipboard');
        }
    } catch (error) {
        console.error(error);
        vscode.window.showErrorMessage(error instanceof Error ? error.message : 'Unkonwn error');
    }
});
