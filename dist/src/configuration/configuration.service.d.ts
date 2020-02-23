export declare class ConfigurationService {
    private readonly envConfig;
    constructor(filePath: string);
    get(key: string): string;
    private validateInput;
}
