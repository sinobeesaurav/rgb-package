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
const axios_1 = __importDefault(require("axios"));
const ChainOperationError_1 = __importDefault(require("../errors/ChainOperationError"));
class apiUtility {
    constructor(baseURL) {
        this.axiosInstance = axios_1.default.create({
            baseURL,
        });
    }
    get(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, config = {}) {
            try {
                const response = yield this.axiosInstance.get(url, config);
                return response.data;
            }
            catch (error) {
                throw this.handleError(error);
            }
        });
    }
    post(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, data = {}, config = {}) {
            try {
                const response = yield this.axiosInstance.post(url, data, config);
                return response.data;
            }
            catch (error) {
                throw this.handleError(error);
            }
        });
    }
    handleError(error) {
        var _a, _b;
        if (axios_1.default.isAxiosError(error)) {
            const response = error.response;
            // Check if server responded with a specific error message
            if ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.detail) {
                return new ChainOperationError_1.default("internal Api call error", "RGB", response.data.detail || ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data.detail));
            }
            return new ChainOperationError_1.default("internal Api call error", "RGB", error.message);
        }
        else {
            // Handle other errors (e.g., network errors)
            return new ChainOperationError_1.default("internal Api call", "RGB", "An unknown error occurred");
        }
    }
}
exports.default = apiUtility;
