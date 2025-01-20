etxn_reserve
Estimate the required fee for a txn to be emitted successfully

Concepts
Emitted Transactions
Behaviour
Specifies a number of emitted transactions this hook might emit during execution.
Definition
C

int64_t etxn_fee_base (
    uint32_t count
);
Example
C

int64_t result = 
    etxn_fee_base(2);
if (result < 2)
    rollback("Error reserving!", 16, 1);
Parameters
Name	Type	Description
count	uint32_t	The largest number of transactions this hook might emit during the course of one execution.
Return Code
Type	Description
int64_t	The maximum number of emitted transactions this hook may emit. This will always be the same as the count parameter or an error as below.

If negative, an error:
ALREADY_SET
- The hook already called this function earlier.

TOO_BIG
- The specified number of emitted transactions is too large.
