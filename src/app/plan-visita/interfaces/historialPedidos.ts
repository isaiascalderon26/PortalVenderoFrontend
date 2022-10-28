export interface HistorialPedido {
    statusCode: number;
    headers:    Headers;
    body:       Body[];
}

export interface Body {
    cliente:       string;
    f_creacion:    Date;
    creado_por:    CreadoPor;
    f_entrega:     Date;
    pedido:        string;
    cajas_pedido:  number;
    cajas_entrega: number;
    monto:         number;
    cajas_venta:   number;
    fill_rate:     number;
    dif_adm:       number;
    quiebre:       number;
    skus:          { [key: string]: Skus }[];
}

export enum CreadoPor {
    TroApabon = "TRO-APABON  ",
    WsPrxySfcl = "WS_PRXY_SFCL",
}

export interface Skus {
    cajas_pedido: number;
    fill_rate:    number;
    dif_adm:      number;
    quiebre:      number;
    monto:        number;
}

export interface Headers {
    "Access-Control-Allow-Headers": string;
    "Access-Control-Allow-Origin":  string;
    "Access-Control-Allow-Methods": string;
}
