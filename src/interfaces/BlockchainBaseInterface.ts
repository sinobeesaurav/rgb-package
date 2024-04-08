import {
  BurnParams,
  CreateTokenParams,
  TransferParamsBase,
} from "./BlockchainBaseParamsInterface";

export interface BlockchainInterface {
  createToken(params: CreateTokenParams): Promise<void>;
  burn(params: BurnParams): Promise<void>;
  transfer(params: TransferParamsBase): Promise<void>;
}
