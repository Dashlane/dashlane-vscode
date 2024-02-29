import * as vscode from 'vscode';
import { syncCommand } from './commands/sync';
import { getPasswordCommand } from './commands/getPassword';
import { logoutCommand } from './commands/logout';
import { getNoteCommand } from './commands/getNote';

export function activate(context: vscode.ExtensionContext) {
	console.log('"dashlane-vscode" now active!');

	context.subscriptions.push(syncCommand, logoutCommand, getPasswordCommand, getNoteCommand);
}

export function deactivate() {}
