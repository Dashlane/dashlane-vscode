export class DashlaneCLIProviderConfigurationException extends Error {
    public readonly name = "DashlaneCLIProviderConfigurationException";
}

export class DashlaneCLIProviderExecException extends Error {
    public readonly name = "DashlaneCLIProviderExecException";
}

export class DashlaneCLIProviderEmptyOutputException extends Error {
    public readonly name = "DashlaneCLIProviderEmptyOutputException";
}

export class DashlaneCLIProviderParseOutputException extends Error {
    public readonly name = "DashlaneCLIProviderParseOutputException";
}

export class DashlaneCLIProviderParseOutputNotImplementedException extends Error {
    public readonly name = "DashlaneCLIProviderParseOutputNotImplementedException";
}
