import { BlockchainInterface } from "./BlockchainBaseInterface";
import {
  BurnParamsRgb,
  CreateTokenParamsRgb,
  GetWalletParams,
  TransferBaseParamsRgb,
  createBlindUtxosParams,
  createUtxosParams,
  fundAddressParams,
} from "./BlockchainSpecificParamsInterface";

export interface RgbBlockchainInterface extends BlockchainInterface {
  createToken(params: CreateTokenParamsRgb): Promise<any>;
  burn(params: BurnParamsRgb): Promise<any>;
  transfer(params: TransferBaseParamsRgb): Promise<any>;
}

//  createBlindUtxos(params: createBlindUtxosParams): Promise<any>;

// mine(): Promise<any>;

//fundAddress(params: fundAddressParams): Promise<any>;

//createUtxos(params: createUtxosParams): Promise<any>;

// getWalletAddress(params: GetWalletParams): Promise<any>;
