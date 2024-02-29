import * as vscode from 'vscode';
import { getNote } from '../providers/dashlane-cli/dashlane-cli.commands';
import { noteMapper } from '../mappers/dashlane-cli-note';

export const getNoteCommand = vscode.commands.registerCommand('dashlane-vscode.getNote', async () => {
    const searchQuery = await vscode.window.showInputBox({
        placeHolder: "Search query",
        prompt: "Search my notes on Dashlane",
    }) ?? '';

    try {
        const parsedData = await getNote(searchQuery);

        if (parsedData.length === 0) {
            vscode.window.showWarningMessage('No note matching search query, you may need to sync your Dashlane vault');
            return;
        }

        const quickPickItems = parsedData.map(noteMapper.toQuickPickEntry);
    
        const pickedNote = await vscode.window.showQuickPick(quickPickItems, {
            title: 'Which note do you want to obtain?',
            canPickMany: false,
        });
    
        if (pickedNote) {
            vscode.env.clipboard.writeText(pickedNote.note);
            vscode.window.showInformationMessage('Note copied to clipboard');
        }
    } catch (error) {
        console.error(error);
        vscode.window.showErrorMessage(error instanceof Error ? error.message : 'Unkonwn error');
    }
});
