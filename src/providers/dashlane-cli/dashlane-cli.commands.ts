import { execWithDashlaneCLI } from "./dashlane-cli.command-runner";
import { DashlaneCLICommands, DashlaneCLIOutputTypes } from "./dashlane-cli.definitions";

export const sync = () =>
    execWithDashlaneCLI(DashlaneCLICommands.SYNC, {
        args: [],
        output: null,
        interactive: true,
    });

export const logout = () =>
    execWithDashlaneCLI(DashlaneCLICommands.LOGOUT, {
        args: [],
        output: null,
        interactive: true,
    });

export const getPassword = (searchQuery: string) =>
    execWithDashlaneCLI(DashlaneCLICommands.PASSWORD, {
        args: [searchQuery],
        output: DashlaneCLIOutputTypes.JSON,
        interactive: false,
    });

export const getNote = (searchQuery: string) =>
    execWithDashlaneCLI(DashlaneCLICommands.NOTE, {
        args: [searchQuery],
        output: DashlaneCLIOutputTypes.JSON,
        interactive: false,
    });
