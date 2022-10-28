export interface OrderDetail {
    quantity: number;
    productId: string;
    description: string;
    unitPrice: number;
    unitSubTotal: number;
    accountSubTotal: number;
    discounts: number;
    totalTaxes: number;
    totalPrice: number;
    erpProductId: string;
    group: string;

}
