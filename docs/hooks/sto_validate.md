sto_validate
Validate an STObject

Concepts
Serialized Objects
Behaviour
Parse an STObject pointed to by read_ptr
Return 1 if the serialization is valid, 0 otherwise.
Definition
C

int64_t sto_validate (
    uint32_t read_ptr,
    uint32_t read_len
);
Example
C

int64_t result = 
  sto_validate(tx_out, sizeof(tx_out));

if (tx_len <= 0)
    rollback("Invalid STO.", 12, 1);
Parameters
Name	Type	Description
read_ptr	uint32_t	The buffer to read the source STObject from
read_len	uint32_t	The Length of the source object
Return Code
Type	Description
int64_t	1 if the STObject pointed to by read_ptr is a valid STObject.
0 if it isn't.

If negative, an error:
OUT_OF_BOUNDS
- pointers/lengths specified outside of hook memory.
