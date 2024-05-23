import * as vscode from "vscode";
import { spawnSync } from "child_process";
import {
    DashlaneCLICommands,
    DashlaneCLIExecOptions,
    CommandResultType,
    CommandsWithoutOutput,
} from "./dashlane-cli.definitions";
import * as dashlaneCliErrors from "./dashlane-cli.errors";
import { DashlaneCLIOutputTypes } from "./dashlane-cli.definitions";

// TODO: provide context to exceptions
export const execWithDashlaneCLI = async <TCommand extends DashlaneCLICommands>(
    command: TCommand,
    options: DashlaneCLIExecOptions<typeof command>
): Promise<CommandResultType<TCommand>> => {
    const extensionSettings = vscode.workspace.getConfiguration("dashlane-vscode");
    const configuredShell = extensionSettings.get("shell");
    const configuredCliCommand = extensionSettings.get("cli");

    const dashlaneCLIArgs = [command, ...options.args];
    const expectNoOutput = CommandsWithoutOutput.includes(command);

    if (options.output) {
        dashlaneCLIArgs.push("--output", options.output);
    }

    if (typeof configuredCliCommand !== "string") {
        throw new dashlaneCliErrors.DashlaneCLIProviderConfigurationException(
            'Settings "dashlane-vscode.cli" must be a string'
        );
    }

    if (options.interactive) {
        await vscode.tasks.executeTask(
            new vscode.Task(
                { type: "shell" },
                vscode.TaskScope.Global,
                "Dashlane CLI",
                "dashlane-vscode",
                new vscode.ShellExecution([configuredCliCommand, ...dashlaneCLIArgs].join(" "))
            )
        );

        return;
    }

    const childProcess = spawnSync(configuredCliCommand, dashlaneCLIArgs, {
        shell: typeof configuredShell === "string" ? configuredShell : true,
        encoding: "utf8",
    });

    const errorString = childProcess.stderr?.toString();

    if (errorString && !expectNoOutput) {
        throw new dashlaneCliErrors.DashlaneCLIProviderExecException(errorString);
    }

    const outputString = childProcess.stdout?.toString();

    if (!outputString && !expectNoOutput) {
        throw new dashlaneCliErrors.DashlaneCLIProviderEmptyOutputException();
    }

    try {
        if (!expectNoOutput) {
            switch (options.output) {
                case DashlaneCLIOutputTypes.JSON:
                    // TODO: validate CLI output
                    return JSON.parse(outputString) as CommandResultType<TCommand>;
                default:
                    throw new dashlaneCliErrors.DashlaneCLIProviderParseOutputNotImplementedException(
                        `"${options.output}" is not implemented`
                    );
            }
        }
    } catch (error) {
        throw new dashlaneCliErrors.DashlaneCLIProviderParseOutputException("", {
            cause: error,
        });
    }
};
