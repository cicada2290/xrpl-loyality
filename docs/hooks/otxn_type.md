otxn_type
Get the Transaction Type of the originating transaction

Behaviour
Return the Transaction Type of the originating transaction
Definition
C

int64_t otxn_type (
    void
);
Example
C

int64_t tt =
  otxn_type();
Parameters
None

Return Code
Type	Description
int64_t	The Transaction Type of the originating transaction. Check the table below for a list of known Transaction Types at time of writing
Known Transaction Types
Name	Value
ttPAYMENT	0
ttESCROW_CREATE	1
ttESCROW_FINISH	2
ttACCOUNT_SET	3
ttESCROW_CANCEL	4
ttREGULAR_KEY_SET	5
ttOFFER_CREATE	7
ttOFFER_CANCEL	8
ttTICKET_CREATE	10
ttTICKET_CANCEL	11
ttSIGNER_LIST_SET	12 
ttPAYCHAN_CREATE	13
ttPAYCHAN_FUND	14
ttPAYCHAN_CLAIM	15
ttCHECK_CREATE	16
ttCHECK_CASH	17
ttCHECK_CANCEL	18
ttDEPOSIT_PREAUTH	19
ttTRUST_SET	20
ttACCOUNT_DELETE	21
ttHOOK_SET	22
ttURITOKEN_MINT	45
ttURITOKEN_BURN	46
ttURITOKEN_BUY	47
ttURITOKEN_CREATE_SELL_OFFER	48
ttURITOKEN_CANCEL_SELL_OFFER	49
ttGENESIS_MINT	96
ttIMPORT	97
ttCLAIM_REWARD	98
ttINVOKE	99
ttAMENDMENT	100
ttFEE	101
ttUNL_MODIFY	102
ttEMIT_FAILURE	103
ttUNL_REPORT	104