export interface PlanViisitaClientes {
    statusCode: number;
    headers:    Headers;
    body:       Body[];
}

export interface Body {
    kunnr: string;
    txtmd: string;
    erdat: string;
    aufsd: string;
    text1: Text1;
    zterm: Zterm;
    mcod3: Mcod3;
    stras: string;
    telf1: string;
    lat:   number;
    long:  number;
    plan:  Plan;
}

export enum Erdat {
    Empty = "",
    Nuevo = "nuevo",
}

export enum Mcod3 {
    LasCondes = "LAS CONDES",
    Vitacura = "VITACURA",
}

export enum Plan {
    M = "M",
    Mv = "MV",
}

export enum Text1 {
    PagoContado = "Pago Contado",
    The07DÃAs = "07 DÃ\u00adas",
    The10DÃAs = "10 DÃ\u00adas",
    The15DÃAs = "15 DÃ\u00adas",
    The28DÃAs = "28 dÃ\u00adas",
}

export enum Zterm {
    Yg01 = "YG01",
    Yg07 = "YG07",
    Yg10 = "YG10",
    Yg15 = "YG15",
    Yg28 = "YG28",
}

export interface Headers {
    "Access-Control-Allow-Headers": string;
    "Access-Control-Allow-Origin":  string;
    "Access-Control-Allow-Methods": string;
}
