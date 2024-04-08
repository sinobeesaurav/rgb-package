import { BurnParamsRgb, CreateTokenParamsRgb, TransferBaseParamsRgb, createFuntionReturnInterface, rgbContructorParams, TransferFunReturnInterface } from "./interfaces/BlockchainSpecificParamsInterface";
import { RgbBlockchainInterface } from "./interfaces/BlockchainSpecificInterface";
declare class Rgb implements RgbBlockchainInterface {
    private rgbApi;
    private walletAddress;
    constructor(config: rgbContructorParams);
    createToken(params: CreateTokenParamsRgb): Promise<createFuntionReturnInterface>;
    burn(params: BurnParamsRgb): Promise<void>;
    transfer(params: TransferBaseParamsRgb): Promise<TransferFunReturnInterface>;
}
export { Rgb };
