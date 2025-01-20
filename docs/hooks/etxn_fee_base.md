etxn_fee_base
Estimate the required fee for a txn to be emitted successfully

🚧
Warning

Fees on a Hooks-enabled ledger are non trivial. See: Hook Fees for details.

Concepts
Emitted Transactions
Behaviour
Return the amount of the fee in drops recommended for a to-be emitted transaction.
Definition
C

int64_t etxn_fee_base (
    uint32_t read_ptr,
  	uint32_t read_len
);
Example
C

int64_t fee_to_pay =
    etxn_fee_base(tx_blob, tx_blob_len);
Parameters
Name	Type	Description
read_ptr	uint32_t	Pointer to the buffer containing the serialized transaction you intend to emit. The fee field is required but ignored (you may use zero). Use the output of this function to populate the fee field correctly.
read_len	uint32_t	The length of the tx blob.
Return Code
Type	Description
int64_t	The smallest number of drops that an emitted txn would need to be accepted.

If negative, an error:
OUT_OF_BOUNDS
- The provided buffer is not validly within the hook memory.

PREREQUISITE_NOT_MET
- etxn_reserve has not been called first.

INVALID_TXN
- The provided buffer did not contain a valid serialized transaction. (Deserialization failed, or a required field was missing.)
