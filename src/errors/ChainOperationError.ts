class ChainOperationError extends Error {
  operation: string;
  blockchain: string;

  constructor(operation: string, blockchain: string, message: string) {
    super(message);
    this.name = "ChainOperationError"; // Setting the error name as the class name
    this.operation = operation;
    this.blockchain = blockchain;
    Object.setPrototypeOf(this, ChainOperationError.prototype); // Ensure the prototype is set correctly for instanceof checks
  }
}

export default ChainOperationError;
