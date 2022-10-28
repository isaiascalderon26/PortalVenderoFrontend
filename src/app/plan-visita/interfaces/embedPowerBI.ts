export interface EmbedPowertBI {
    id: string;
    reportType: string;
    name: string;
    webUrl: string;
    embedUrl: string;
    isFromPbix: boolean;
    isOwnedByMe: boolean;
    datasetId: string;
    datasetWorkspaceId: string;
    users: any[];
    subscriptions: any[];
}
