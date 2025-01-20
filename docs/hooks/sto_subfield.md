sto_subfield
Index into a xrpld serialized object and return the location and length of a subfield

Concepts
Serialized Objects
Behaviour
Parse a STObject pointed to by read_ptr
Find the field specified by field_id
If the field is found, and:
It is an array, then return the start and length of the array including the leadin/leadout bytes, or
It is not an array, then return the start and length of the PAYLOAD of the field (excluding the leadin bytes).
🚧
Field ID encoding

The sto_ apis accept a field_id parameter encoded as follows: (type << 16U) + field
Thus type 1 field 2 would be 0x10002U.

Definition
C

int64_t sto_subfield (
    uint32_t read_ptr,
  	uint32_t read_len,
  	uint32_t field_id
);
Example
C

#define SUB_OFFSET(x) ((int32_t)(x >> 32))
#define SUB_LENGTH(x) ((int32_t)(x & 0xFFFFFFFFULL))
int64_t memo_lookup =
    sto_subfield(memo_ptr, memo_len, sfMemo);
if (memo_lookup < 0)
{
    // sfMemo was not found in the STObject pointed at by memo_ptr
}
else
{
    // sfMemo was found and its location is as follows:
	  uint8_t* memo_ptr = SUB_OFFSET(memo_lookup) + memo_ptr;
	  int64_t  memo_len = SUB_LENGTH(memo_lookup);
}
📘
hookmacro.h already contains the SUB_OFFSET and SUB_LENGTH macros.

Parameters
Name	Type	Description
read_ptr	uint32_t	Pointer to the buffer containing the STObject
read_len	uint32_t	Length of STObject
field_id	uint32_t	The sf code of the field you are searching for.

To compute this manually take the serialized type and shift it into the 16 highest bits of uint32_t, then take the field and place it in the 16 lowest bits.

For example:
sfEmitNonce has type 5 and field 11 thus its value is 0x050BU
Return Code
Type	Description
int64_t	The location of the field within the specified buffer:
- The high 32 bits are the offset location.
- The low 32 bits are the length.

If negative, an error:
OUT_OF_BOUNDS
- pointers/lengths specified outside of hook memory.

TOO_SMALL
- Input buffer isn't large enough to possibly contain a valid STObject.

DOESNT_EXIST
- The searched for field isn't present in the supplied STObject.

PARSE_ERROR
- The supplied STObject is malformed or not an STObject.
