export interface CreateTokenParams {
    name: string;
    ticker: string;
    amount: number;
    precision: number;
}
export interface BurnParams {
    from: string;
    amount: number;
}
export interface TransferParamsBase {
    recipients: string;
    amount: number;
}
