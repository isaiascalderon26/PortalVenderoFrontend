export interface Vendedor {
    statusCode: number;
    headers:    Headers;
    body:       Body1[];
}

export interface Body1 {
    cod_user:    string;
    nombre_user: string;
    rut_user:    string;
    ruta:        string;
}

export interface Headers {
    "Access-Control-Allow-Headers": string;
    "Access-Control-Allow-Origin":  string;
    "Access-Control-Allow-Methods": string;
}