import { BurnParams, CreateTokenParams, TransferParamsBase } from "./BlockchainBaseParamsInterface";
export interface TransferBaseParamsRgb extends TransferParamsBase {
    assetId: string;
}
export interface BurnParamsRgb extends BurnParams {
    assetId: string;
}
export interface CreateTokenParamsRgb extends CreateTokenParams {
    walletAddress: string;
}
export interface GetWalletParams {
    networkType: string;
}
export interface createUtxosParams {
    numUtxo: string;
    fee: number;
    walletAddress: string;
}
export interface fundAddressParams {
    walletAddress: string;
}
export interface createBlindUtxosParams {
    walletAddress: string;
}
export interface rgbContructorParams {
    backendUrl: string;
    walletAdress: string;
}
export interface createFuntionReturnInterface {
    asset_ID: string;
    status: string;
    msg: string;
}
export interface TransferFunReturnInterface {
    msg: string;
    status: string;
    txid: string;
    transactionFee: number;
}
