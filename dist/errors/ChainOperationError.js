"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChainOperationError extends Error {
    constructor(operation, blockchain, message) {
        super(message);
        this.name = "ChainOperationError"; // Setting the error name as the class name
        this.operation = operation;
        this.blockchain = blockchain;
        Object.setPrototypeOf(this, ChainOperationError.prototype); // Ensure the prototype is set correctly for instanceof checks
    }
}
exports.default = ChainOperationError;
