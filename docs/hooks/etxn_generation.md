etxn_generation
Get the generation of a hypothetically emitted transaction

Concepts
Emitted Transactions
Behaviour
Return the generation an emitted transaction will carry.
Definition
C

int64_t etxn_generation (
    void
);
Example
C

int64_t burden =
  etxn_generation();
Parameters
None

Return Code
Type	Description
int64_t	The generation an emitted transaction will need in order to be successfully passed to emit()
