rollback
Reject the originating transaction and discard any changes the hook made.

Concepts
Introduction
Execution Order
Behaviour
End the execution of the hook with status: reject.

Record a return string and return code in transaction metadata.
Discard all state changes.
Discard all emit() transactions.
Disallow originating transaction to continue.
❗️
Warning

The originating transaction will fail with tecHOOK_REJECTED and a fee will be charged. See: Execution Order.

Definition
C

int64_t rollback (
    uint32_t read_ptr,
    uint32_t read_len,
    uint64_t error_code
);
Example
C

rollback("Rejected!", 9, 100);
Parameters
Name	Type	Description
read_ptr	uint32_t	Pointer to a return string to be stored in execution metadata.
This is any string the hook-developer wishes to return with the acceptance. May be null.
read_len	uint32_t	The length of the return string. At most 32. May be null.
error_code	uint64_t	A return code specific to this hook to be stored in execution metadata.

Similar to the return code of an application on a *nix system. By convention non-success is non-zero.
Return Code
Type	Description
int64_t	Rollback ends the hook, therefore no value is returned to the caller. By convention all Hook APIs return int64_t, but in this case nothing is returned.
