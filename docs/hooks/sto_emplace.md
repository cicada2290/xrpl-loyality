sto_emplace
Emplace a field into an existing STObject at its canonical placement

Concepts
Serialized Objects
Behaviour
Parse an STObject S (source object) pointed to by sread_ptr
Parse an STObject F (to inject/emplace) pointed to by fread_ptr
Write a new STObject to write_ptr which places F into S at the canonical position field_id
🚧
Field ID encoding

The sto_ apis accept a field_id parameter encoded as follows: (type << 16U) + field
Thus type 1 field 2 would be 0x10002U.

Definition
C

int64_t sto_emplace (
    uint32_t write_ptr,
  	uint32_t write_len,
    uint32_t sread_ptr,
    uint32_t sread_len,
    uint32_t fread_ptr,
    uint32_t fread_len,
  	uint32_t field_id
);
Example
C

uint8_t tx_out[1024];

int64_t tx_len =
    sto_emplace(tx_out, sizeof(tx_out),
                tx_in, tx_len,
                sequence_field, 5, sfSequence);

if (tx_len <= 0)
    rollback("Emplacing failed.", 17, 1);
Parameters
Name	Type	Description
write_ptr	uint32_t	The buffer to write the modified STObject to
write_len	uint32_t	The length of the output buffer
sread_ptr	uint32_t	The buffer to read the source STObject from
sread_len	uint32_t	The Length of the source object
fread_ptr	uint32_t	The buffer to read the field to be emplaced/injected from
fread_len	uint32_t	The length of the field to be emplaced/injected
field_id	uint32_t	The sf code (location) to form the emplacement. If this already exists in the source object then the existing field is overriden. If it doesn't exist it is inserted.
Return Code
Type	Description
int64_t	The number of bytes written to write_ptr

If negative, an error:
OUT_OF_BOUNDS
- pointers/lengths specified outside of hook memory.

TOO_SMALL
- Output buffer must be at least as large as the source object + the injected field, even if the field is only being overriden.

TOO_BIG
- Field you are attempting to emplace is too large

PARSE_ERROR
- The supplied STObject is malformed or not an STObject.
