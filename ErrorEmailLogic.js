
let inputRecord = input.record;

if (inputRecord.ErrorMsg != null) {
    errorMsg = inputRecord.ErrorMsg.message;
    errorStatusCode = inputRecord.ErrorMsg.statusCode;
    errorError = inputRecord.ErrorMsg.error;   
}

holdRec = inputRecord.holdSend;

propCode = inputRecord.Opstatmt.PropCode;
loanNumber = inputRecord.Opstatmt.LoanNumber;
statementDate = inputRecord.Opstatmt.StatementDate;
statementType = inputRecord.Opstatmt.UserDefType;

errorCode = "";

if (holdRec == "TRUE") {
    errorCode = "General";
    input.parameters.userEmail = inputRecord.userEmailId;
    input.parameters.ccEmail = "charper@merchantsbankofindiana.com";
    input.parameters.subject = "Clik.ai Upload Error - Loan " + loanNumber;
    input.parameters.body = "<head><style>table, th, td {border: 1px solid black;border-collapse: collapse;}th, td {padding-left: 10px;padding-right: 10px;}</style></head><body><p>Hello,</p><p>A line item internal category is missing for the Operating Statement with the below parameters:</p><table><tr><td>Loan Number</td><td>" + loanNumber + 
                        "</td></tr><tr><td>Collateral Code</td><td>" + propCode + "</td></tr><tr><td>Statement Date</td><td>" + statementDate + "</td></tr><tr><td>Statement Type</td><td>"+ statementType +"</td></tr></table>" +
                        "<p>Please review and update documents in Clik.ai and resubmit.</p><p>Thanks,</p></body>";
} else if (errorStatusCode = 500 && errorMsg == "Unable to call service"){
    errorCode = "General";
    input.parameters.userEmail = inputRecord.userEmailId;
    input.parameters.ccEmail = "charper@merchantsbankofindiana.com; cguzman@merchantsbankofindiana.com; ngajjela@merchantscapital.com";
    input.parameters.subject = "Clik.ai Upload Error - Loan " + loanNumber;
    input.parameters.body = "<head><style>table, th, td {border: 1px solid black;border-collapse: collapse;}th, td {padding-left: 10px;padding-right: 10px;}</style></head><body><p>Hello,</p><p>An unknown error occurred while sending your Operating Statement with the below parameters:</p><table><tr><td>Loan Number</td><td>" + loanNumber + 
                        "</td></tr><tr><td>Collateral Code</td><td>" + propCode + "</td></tr><tr><td>Statement Date</td><td>" + statementDate + "</td></tr><tr><td>Statement Type</td><td>"+ statementType +"</td></tr></table>" +
                        "<p>Please submit a ticket to BI in The Hopper.</p><p>Thanks,</p></body>";
} else if (indexLocation = errorError.indexOf("already exists") > 0){
    errorCode = "Duplicate";
    input.parameters.userEmail = inputRecord.userEmailId;
    input.parameters.ccEmail = "";
    input.parameters.subject = "Clik.ai Upload Error - Loan " + loanNumber;
    input.parameters.body = "<head><style>table, th, td {border: 1px solid black;border-collapse: collapse;}th, td {padding-left: 10px;padding-right: 10px;}</style></head><body><p>Hello,</p><p>A duplicate Operating Statement already exists in PLM with the below parameters:</p><table><tr><td>Loan Number</td><td>" + loanNumber + 
                        "</td></tr><tr><td>Collateral Code</td><td>" + propCode + "</td></tr><tr><td>Statement Date</td><td>" + statementDate + "</td></tr><tr><td>Statement Type</td><td>"+ statementType +"</td></tr></table>" +
                        "<p>This can be resolved by deleting the duplicate in PLM. Please submit a BI ticket if issues persist.</p><p>Thanks,</p></body>";
} else if (indexLocation = errorError.indexOf("not found in database") > 0) {
    errorCode = "Collateral";
    input.parameters.userEmail = inputRecord.userEmailId;
    input.parameters.ccEmail = "";
    input.parameters.subject = "Clik.ai Upload Error - Loan " + loanNumber;
    input.parameters.body = "<head><style>table, th, td {border: 1px solid black;border-collapse: collapse;}th, td {padding-left: 10px;padding-right: 10px;}</style></head><body><p>Hello,</p><p>While sending your Operating Statement with the below parameters:</p><table><tr><td>Loan Number</td><td>" + loanNumber + 
                        "</td></tr><tr><td>Collateral Code</td><td>" + propCode + "</td></tr><tr><td>Statement Date</td><td>" + statementDate + "</td></tr><tr><td>Statement Type</td><td>"+ statementType +"</td></tr></table>" +
                        "<p>There was a problem with that folder's API integration. Please submit a BI Ticket in The Hopper. If the spread urgently needs to be uploaded, please use the Model Integration method to upload.</p><p>Thanks,</p></body>";
} else {
    errorCode = "General";
    input.parameters.userEmail = inputRecord.userEmailId;
    input.parameters.ccEmail = "charper@merchantsbankofindiana.com; cguzman@merchantsbankofindiana.com; ngajjela@merchantscapital.com";
    input.parameters.subject = "Clik.ai Upload Error - Loan " + loanNumber;
    input.parameters.body = "<head><style>table, th, td {border: 1px solid black;border-collapse: collapse;}th, td {padding-left: 10px;padding-right: 10px;}</style></head><body><p>Hello,</p><p>An unknown error occurred while sending your Operating Statement with the below parameters:</p><table><tr><td>Loan Number</td><td>" + loanNumber + 
                        "</td></tr><tr><td>Collateral Code</td><td>" + propCode + "</td></tr><tr><td>Statement Date</td><td>" + statementDate + "</td></tr><tr><td>Statement Type</td><td>"+ statementType +"</td></tr></table>" +
                        "<p>Please submit a ticket to BI in The Hopper.</p><p>Thanks,</p></body>";
};


//return errorCode;
//return input.parameters.subject;
//return input.parameters.userEmail;
return inputRecord;




