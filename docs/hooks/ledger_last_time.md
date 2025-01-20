ledger_last_time
Fetch the last closed ledger's timestamp

Behaviour
Return the XRPL Timestamp from the last closed ledger.
📘
Tip

XRPL timestamps are identical to a unix timestamps except that they are offset by -946684800.

The equivalent unix timestamp is: ledger_last_time() + 946684800;

Definition
C

int64_t ledger_last_time ();
Example
C

int64_t ts =
    ledger_last_time();
Parameters
This API takes no parameters.

Return Code
Type	Description
int64_t	The XRPL timestamp of the last closed ledger
