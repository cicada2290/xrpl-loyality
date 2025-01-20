accept
Accept the originating transaction and commit any changes the hook made.

Concepts
Introduction
Execution Order
Behaviour
End the execution of the hook with status: success.

Record a return string and return code in transaction metadata.
Commit all state changes.
Submit all emit() transactions.
Allow originating transaction to continue.
🚧
Caution

If the originating transaction is stopped for some other reason then this accept becomes a rollback. See: Execution Order.

Definition
C

int64_t accept (
    uint32_t read_ptr,
    uint32_t read_len,
    uint64_t error_code
);
Example
C

accept("Success", 7, 100);
Parameters
Name	Type	Description
read_ptr	uint32_t	Pointer to a return string to be stored in execution metadata.
This is any string the hook-developer wishes to return with the acceptance. May be null.
read_len	uint32_t	The length of the return string. At most 32. May be null.
error_code	uint64_t	A return code specific to this hook to be stored in execution metadata.

Similar to the return code of an application on a *nix system. By convention success is zero.
Return Code
Type	Description
int64_t	Accept ends the hook, therefore no value is returned to the caller. By convention all Hook APIs return int64_t, but in this case nothing is returned.
