emit
Emit a new transaction from the hook

Concepts
Emitted Transactions
Behaviour
Read a transaction from read_ptr
Validate the transaction against the emission rules
Emit the transaction into consensus when valid
Write canonical transaction hash to write_ptr
Definition
C

int64_t emit (
    uint32_t write_ptr,
  	uint32_t write_len,
    uint32_t read_ptr,
    uint32_t read_len
);
Example
C

if (emit(tx, tx_len) < 0)
    rollback("Failed to emit!", 15, 1);
Parameters
Name	Type	Description
write_ptr	uint32_t	Pointer to a buffer to write the transaction hash to
write_len	uint32_t	The size of the buffer to write the transaction hash to (should be 32.)
read_ptr	uint32_t	Pointer to the transaction to emit
read_len	uint32_t	The length of the transaction
Return Code
Type	Description
int64_t	On success, the number of bytes of transaction hash written (32), or:

If negative, an error:
OUT_OF_BOUNDS
- pointers/lengths specified outside of hook memory.

PREREQUISITE_NOT_MET
- emit_reserve must be called first

TOO_MANY_EMITTED_TXN
- the number of emitted transactions is now greater than the promise made when emit_reserve was called earlier

EMISSION_FAILURE
- the transaction was malformed according to the emission rules.
