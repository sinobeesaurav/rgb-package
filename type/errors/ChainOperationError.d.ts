declare class ChainOperationError extends Error {
    operation: string;
    blockchain: string;
    constructor(operation: string, blockchain: string, message: string);
}
export default ChainOperationError;
