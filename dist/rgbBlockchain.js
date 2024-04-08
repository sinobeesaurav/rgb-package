"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rgb = void 0;
const apiUtility_1 = __importDefault(require("./utils/apiUtility"));
const ChainOperationError_1 = __importDefault(require("./errors/ChainOperationError"));
class Rgb {
    constructor(config) {
        this.rgbApi = new apiUtility_1.default(config.backendUrl);
        this.walletAddress = config.walletAdress;
    }
    createToken(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const resOfCreateUtxos = yield this.rgbApi.post("create_UTXOs", {
                    wallet_address: this.walletAddress,
                    fee: 2,
                    num_UTXOs: 1,
                });
                if (((_a = resOfCreateUtxos === null || resOfCreateUtxos === void 0 ? void 0 : resOfCreateUtxos.data) === null || _a === void 0 ? void 0 : _a.status) === "err" &&
                    ((_b = resOfCreateUtxos === null || resOfCreateUtxos === void 0 ? void 0 : resOfCreateUtxos.data) === null || _b === void 0 ? void 0 : _b.msg) !==
                        "Unable to create UTXO. err = RgbLibError.AllocationsAlreadyAvailable()") {
                    console.log(resOfCreateUtxos.data);
                    throw new ChainOperationError_1.default("During Creating colored utxos for wallet", "RGB", resOfCreateUtxos.data.msg);
                }
                const resOfIssueAsset = yield this.rgbApi.post("issue_RGB20", {
                    wallet_address: this.walletAddress,
                    asset_name: params.name,
                    asset_symbol: params.ticker,
                    asset_amount: params.amount,
                    asset_decimal: params.precision,
                });
                if (((_c = resOfIssueAsset === null || resOfIssueAsset === void 0 ? void 0 : resOfIssueAsset.data) === null || _c === void 0 ? void 0 : _c.status) === "err") {
                    throw new ChainOperationError_1.default("While calling issue_RGB20 api", "RGB", resOfIssueAsset.data.msg);
                }
                return resOfIssueAsset.data;
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                const operation = error instanceof ChainOperationError_1.default
                    ? error.operation
                    : "While issue rgb asset";
                throw new ChainOperationError_1.default(operation, "RGB", errorMessage);
            }
        });
    }
    burn(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // Assuming burning would also be a POST request; adjust as necessary.
            console.log("Burn method not implemented."); // Replace with actual implementation
        });
    }
    transfer(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const resOfCreateUtxos = yield this.rgbApi.post("create_UTXOs", {
                    wallet_address: this.walletAddress,
                    fee: 2,
                    num_UTXOs: 1,
                });
                if (((_a = resOfCreateUtxos === null || resOfCreateUtxos === void 0 ? void 0 : resOfCreateUtxos.data) === null || _a === void 0 ? void 0 : _a.status) === "err" &&
                    ((_b = resOfCreateUtxos === null || resOfCreateUtxos === void 0 ? void 0 : resOfCreateUtxos.data) === null || _b === void 0 ? void 0 : _b.msg) !==
                        "Unable to create UTXO. err = RgbLibError.AllocationsAlreadyAvailable()") {
                    console.log(resOfCreateUtxos.data);
                    throw new ChainOperationError_1.default("During Creating colored utxos for wallet", "RGB", resOfCreateUtxos.data.msg);
                }
                const resOfTransferApi = yield this.rgbApi.post("transfer_assets", {
                    wallet_address_from: this.walletAddress,
                    amount_to_transfer: params.amount,
                    blinded_UTXO_address: params.recipients,
                    asset_ID: params.assetId,
                });
                if (((_c = resOfTransferApi === null || resOfTransferApi === void 0 ? void 0 : resOfTransferApi.data) === null || _c === void 0 ? void 0 : _c.msg) ===
                    `Unable to prepare blinded UTXOs. err = RgbLibError.InsufficientSpendableAssets(asset_id='${params.assetId}')`) {
                    throw new ChainOperationError_1.default("Transfer", "RGB", "Insufficient asset amount or waiting for confirmation of another transfer");
                }
                if (((_d = resOfTransferApi === null || resOfTransferApi === void 0 ? void 0 : resOfTransferApi.data) === null || _d === void 0 ? void 0 : _d.status) === "err") {
                    throw new ChainOperationError_1.default("Transfer", "RGB", resOfTransferApi.data.msg);
                }
                return resOfTransferApi.data;
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                const operation = error instanceof ChainOperationError_1.default
                    ? error.operation
                    : "While Transfering rgb asset";
                throw new ChainOperationError_1.default(operation, "RGB", errorMessage);
            }
        });
    }
}
exports.Rgb = Rgb;
