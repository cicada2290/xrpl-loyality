ledger_seq
Fetch the current ledger sequence number

Behaviour
Return the sequence number from the current ledger
Definition
C

int64_t ledger_seq ();
Example
C

int64_t seq =
    ledger_seq();
Parameters
This API takes no parameters.

Return Code
Type	Description
int64_t	The sequence number of the current ledger
