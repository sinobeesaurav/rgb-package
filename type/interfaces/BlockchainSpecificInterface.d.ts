import { BlockchainInterface } from "./BlockchainBaseInterface";
import { BurnParamsRgb, CreateTokenParamsRgb, TransferBaseParamsRgb } from "./BlockchainSpecificParamsInterface";
export interface RgbBlockchainInterface extends BlockchainInterface {
    createToken(params: CreateTokenParamsRgb): Promise<any>;
    burn(params: BurnParamsRgb): Promise<any>;
    transfer(params: TransferBaseParamsRgb): Promise<any>;
}
