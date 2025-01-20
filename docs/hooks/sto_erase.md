sto_erase
Remove a field from an STObject

Concepts
Serialized Objects
Behaviour
Parse an STObject pointed to by read_ptr
Write a new STObject to write_ptr but without field_id if it was present in the original object.
Definition
C

int64_t sto_erase (
    uint32_t write_ptr,
  	uint32_t write_len,
    uint32_t read_ptr,
    uint32_t read_len,
  	uint32_t field_id
);
🚧
Field ID encoding

The sto_ apis accept a field_id parameter encoded as follows: (type << 16U) + field
Thus type 1 field 2 would be 0x10002U.

Example
C

int64_t result = 
  sto_erase(tx_out, sizeof(tx_out),
            tx_in, tx_len, sfSigners);

if (tx_len <= 0)
    rollback("Erasing failed.", 15, 1);
📘
Emplace equivalence

sto_erase is the same as sto_emplace with 0,0 for field_ptr, field_len parameters.

Parameters
Name	Type	Description
write_ptr	uint32_t	The buffer to write the modified STObject to
write_len	uint32_t	The length of the output buffer
read_ptr	uint32_t	The buffer to read the source STObject from
read_len	uint32_t	The Length of the source object
field_id	uint32_t	The sf code (location) to erase
Return Code
Type	Description
int64_t	The number of bytes written to write_ptr

If negative, an error:
OUT_OF_BOUNDS
- pointers/lengths specified outside of hook memory.

TOO_SMALL
- Output buffer must be at least as large as the source object.

TOO_BIG
- Field you are attempting to erase from is too large

PARSE_ERROR
- The supplied STObject is malformed or not an STObject.

DOESNT_EXIST
- The specified field_id isn't present in the STObject.
