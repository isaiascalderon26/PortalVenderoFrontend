// To parse this data:
//
//   import { Convert, AuthResponse } from "./file";
//
//   const authResponse = Convert.toAuthResponse(json);

export interface AuthResponse {
    authority:          string;
    uniqueId:           string;
    tenantId:           string;
    scopes:             string[];
    account:            Account;
    idToken:            string;
    idTokenClaims:      IDTokenClaims;
    accessToken:        string;
    fromCache:          boolean;
    expiresOn:          Date;
    extExpiresOn:       Date;
    familyId:           string;
    tokenType:          string;
    state:              string;
    cloudGraphHostName: string;
    msGraphHost:        string;
}

export interface Account {
    homeAccountId:  string;
    environment:    string;
    tenantId:       string;
    username:       string;
    localAccountId: string;
    name:           string;
    idTokenClaims:  IDTokenClaims;
}

export interface IDTokenClaims {
    aud:                string;
    iss:                string;
    iat:                number;
    nbf:                number;
    exp:                number;
    aio:                string;
    name:               string;
    nonce:              string;
    oid:                string;
    preferred_username: string;
    rh:                 string;
    sub:                string;
    tid:                string;
    uti:                string;
    ver:                string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAuthResponse(json: string): AuthResponse {
        return JSON.parse(json);
    }

    public static authResponseToJson(value: AuthResponse): string {
        return JSON.stringify(value);
    }
}
