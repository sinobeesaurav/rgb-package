import {
  BurnParamsRgb,
  CreateTokenParamsRgb,
  TransferBaseParamsRgb,
  createFuntionReturnInterface,
  rgbContructorParams,
  TransferFunReturnInterface,
} from "./interfaces/BlockchainSpecificParamsInterface";
import { RgbBlockchainInterface } from "./interfaces/BlockchainSpecificInterface";
import axios from "axios";
import apiUtility from "./utils/apiUtility";
import ChainOperationError from "./errors/ChainOperationError";

class Rgb implements RgbBlockchainInterface {
  private rgbApi: apiUtility;
  private walletAddress: string;

  constructor(config: rgbContructorParams) {
    this.rgbApi = new apiUtility(config.backendUrl);
    this.walletAddress = config.walletAdress;
  }

  async createToken(
    params: CreateTokenParamsRgb
  ): Promise<createFuntionReturnInterface> {
    try {
      const resOfCreateUtxos = await this.rgbApi.post("create_UTXOs", {
        wallet_address: this.walletAddress,
        fee: 2,
        num_UTXOs: 1,
      });

      if (
        resOfCreateUtxos?.data?.status === "err" &&
        resOfCreateUtxos?.data?.msg !==
          "Unable to create UTXO. err = RgbLibError.AllocationsAlreadyAvailable()"
      ) {
        console.log(resOfCreateUtxos.data);
        throw new ChainOperationError(
          "During Creating colored utxos for wallet",
          "RGB",
          resOfCreateUtxos.data.msg
        );
      }
      const resOfIssueAsset = await this.rgbApi.post("issue_RGB20", {
        wallet_address: this.walletAddress,
        asset_name: params.name,
        asset_symbol: params.ticker,
        asset_amount: params.amount,
        asset_decimal: params.precision,
      });

      if (resOfIssueAsset?.data?.status === "err") {
        throw new ChainOperationError(
          "While calling issue_RGB20 api",
          "RGB",
          resOfIssueAsset.data.msg
        );
      }
      return resOfIssueAsset.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      const operation =
        error instanceof ChainOperationError
          ? error.operation
          : "While issue rgb asset";

      throw new ChainOperationError(operation, "RGB", errorMessage);
    }
  }

  async burn(params: BurnParamsRgb): Promise<void> {
    // Assuming burning would also be a POST request; adjust as necessary.
    console.log("Burn method not implemented."); // Replace with actual implementation
  }

  async transfer(
    params: TransferBaseParamsRgb
  ): Promise<TransferFunReturnInterface> {
    try {
      const resOfCreateUtxos = await this.rgbApi.post("create_UTXOs", {
        wallet_address: this.walletAddress,
        fee: 2,
        num_UTXOs: 1,
      });

      if (
        resOfCreateUtxos?.data?.status === "err" &&
        resOfCreateUtxos?.data?.msg !==
          "Unable to create UTXO. err = RgbLibError.AllocationsAlreadyAvailable()"
      ) {
        console.log(resOfCreateUtxos.data);
        throw new ChainOperationError(
          "During Creating colored utxos for wallet",
          "RGB",
          resOfCreateUtxos.data.msg
        );
      }

      const resOfTransferApi = await this.rgbApi.post("transfer_assets", {
        wallet_address_from: this.walletAddress,
        amount_to_transfer: params.amount,
        blinded_UTXO_address: params.recipients,
        asset_ID: params.assetId,
      });

      if (
        resOfTransferApi?.data?.msg ===
        `Unable to prepare blinded UTXOs. err = RgbLibError.InsufficientSpendableAssets(asset_id='${params.assetId}')`
      ) {
        throw new ChainOperationError(
          "Transfer",
          "RGB",
          "Insufficient asset amount or waiting for confirmation of another transfer"
        );
      }

      if (resOfTransferApi?.data?.status === "err") {
        throw new ChainOperationError(
          "Transfer",
          "RGB",
          resOfTransferApi.data.msg
        );
      }

      return resOfTransferApi.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      const operation =
        error instanceof ChainOperationError
          ? error.operation
          : "While Transfering rgb asset";

      throw new ChainOperationError(operation, "RGB", errorMessage);
    }
  }
}

export { Rgb };
