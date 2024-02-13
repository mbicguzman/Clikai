
let inputRecord = input.record;

errorMsg = inputRecord.ErrorMsg.message;
errorStatusCode = inputRecord.ErrorMsg.statusCode;
errorError = inputRecord.ErrorMsg.error;

propCode = inputRecord.Opstatmt.PropCode;
loanNumber = inputRecord.Opstatmt.LoanNumber;
statementDate = inputRecord.Opstatmt.StatementDate;
statementType = inputRecord.Opstatmt.UserDefType;


errorCode = "";

if (indexLocation = errorError.indexOf("already exists") > 0){
    errorCode = "Duplicate";
    input.parameters.userEmail = inputRecord.userEmailId;
    input.parameters.subject = "Clik.ai Upload Error - Duplicate Operating Statement in PLM";
    input.parameters.body = "<p>Hello,</p><p>A duplicate Operating Statement already exists in PLM with the below parameters:</p><table><tr><td>Loan Number</td><td>" + loanNumber + 
                        "</td></tr><tr><td>Collateral Code</td><td>" + propCode + "</td></tr><tr><td>Statement Date</td><td>" + statementDate + "</td></tr><tr><td>Statement Type</td><td>"+ statementType +"</td></tr></table>" +
                        "<p>This can be resolved by deleting the duplicate in PLM. Please submit a BI ticket if issues persist.</p><p>Thanks,</p>";
} else if (indexLocation = errorError.indexOf("Collateral Code not found in database") > 0) {
    errorCode = "Collateral";
    input.parameters.userEmail = inputRecord.userEmailId;
} else if (errorStatusCode = 500 && errorMsg == "Unable to call service") {
    errorCode = "ServiceDown";
    input.parameters.userEmail = inputRecord.userEmailId;
} else {
    errorCode = "General";
    input.parameters.userEmail = inputRecord.userEmailId;
};


//return errorCode;
return inputRecord;




