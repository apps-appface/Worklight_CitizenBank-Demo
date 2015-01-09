
/* JavaScript content from js/main.js in folder common */
function wlCommonInit(){
	initializeJSonStore();
	getSecretData();
}

var user_detail;
var user_Id;
var user_accounts;
var account_list;
var beneficiery;
var userAccountsForTransfer;
var beneficiaryListForTransfer;
var status="Failed";

function fail(errMsg) {
	alert(JSON.stringify(errMsg));
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}