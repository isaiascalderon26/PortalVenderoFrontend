export interface Order {
    orderId: string;
    clientId: number;
    cpgId: string;
    countryId: string;
    organizationId: string;
    erpOrderId: string;
    deliveryDate: string;
    orderDate: string;
    origin: string;
    status: string;
    orderHistoryID: string;
    amount: number;
    sourceChannel: string;
    documentType: string;
    transportData: string;
    paymentMethodID: string;
    createdBy: string;
    firstName: string;
    lastName: string;
    erpClientID: string;
    reason: string;
}

