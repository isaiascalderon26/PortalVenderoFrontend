import { EmbedPowertBI } from './embedPowerBI';

export interface PowerBIConfig {
    tokenId: string;
    accessToken: string;
    tokenExpiry: Date;
    reportConfig: EmbedPowertBI;
}
