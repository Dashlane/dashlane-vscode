export enum DashlaneCLICommands {
  SYNC = "sync",
  READ = "read",
  EXEC = "exec",
  INJECT = "inject",
  PASSWORD = "password",
  OTP = "otp",
  NOTE = "note",
  SECRET = "secret",
  ACCOUNTS = "accounts",
  DEVICES = "deviced",
  TEAM = "team",
  CONFIGURE = "configure",
  BACKUP = "backup",
  LOGOUT = "logout",
  HELP = "help",
}

export enum DashlaneCLIOutputTypes {
    JSON = "json"
}

type CommandConfig<TArgs extends string[], TOutput extends DashlaneCLIOutputTypes | null, TResult> = {
  "inputArgs": TArgs;
  "output": TOutput;
  "result": TResult;
};

export type UnknownCommandConfig = CommandConfig<(string)[], DashlaneCLIOutputTypes | null, unknown>;

export type CommandsTypes = {
  [DashlaneCLICommands.SYNC]: CommandConfig<(never)[], null, undefined>;
  [DashlaneCLICommands.READ]: UnknownCommandConfig;
  [DashlaneCLICommands.EXEC]: UnknownCommandConfig;
  [DashlaneCLICommands.INJECT]: UnknownCommandConfig;
  [DashlaneCLICommands.PASSWORD]: CommandConfig<[string], DashlaneCLIOutputTypes.JSON, CLIPasswordOutput>;
  [DashlaneCLICommands.OTP]: UnknownCommandConfig;
  [DashlaneCLICommands.NOTE]: CommandConfig<[string], DashlaneCLIOutputTypes.JSON, CLINoteOutput>;
  [DashlaneCLICommands.SECRET]: UnknownCommandConfig;
  [DashlaneCLICommands.ACCOUNTS]: UnknownCommandConfig;
  [DashlaneCLICommands.DEVICES]: UnknownCommandConfig;
  [DashlaneCLICommands.TEAM]: UnknownCommandConfig;
  [DashlaneCLICommands.CONFIGURE]: UnknownCommandConfig;
  [DashlaneCLICommands.BACKUP]: UnknownCommandConfig;
  [DashlaneCLICommands.LOGOUT]: CommandConfig<(never)[], null, undefined>;
  [DashlaneCLICommands.HELP]: UnknownCommandConfig;
};

export const CommandsWithoutOutput: DashlaneCLICommands[] = [DashlaneCLICommands.SYNC, DashlaneCLICommands.LOGOUT];

export type CommandOutputType<TCommand extends DashlaneCLICommands> = CommandsTypes[TCommand]["output"];
export type CommandResultType<TCommand extends DashlaneCLICommands> = CommandsTypes[TCommand]["result"];
export type CommandArgsType<TCommand extends DashlaneCLICommands> = CommandsTypes[TCommand]["inputArgs"];

export type CLIPasswordOutputItem = {
  id: string;
  title: string;
  url: string;
  login: string;
  password: string;
};
export type CLIPasswordOutput = CLIPasswordOutputItem[];

export type CLINoteOutputItem = {
  id: string;
  title: string;
  content: string;
};
export type CLINoteOutput = CLINoteOutputItem[];

export type DashlaneCLIExecOptions<TCommand extends DashlaneCLICommands> = {
  args: CommandArgsType<TCommand>;
  output: CommandOutputType<TCommand>;
  interactive: CommandOutputType<TCommand> extends null ? boolean : false;
};
