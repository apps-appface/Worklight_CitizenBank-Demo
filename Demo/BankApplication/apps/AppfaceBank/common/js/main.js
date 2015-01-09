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