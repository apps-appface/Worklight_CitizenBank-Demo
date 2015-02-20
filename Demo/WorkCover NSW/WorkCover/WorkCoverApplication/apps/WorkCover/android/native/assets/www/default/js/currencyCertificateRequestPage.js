
/* JavaScript content from js/currencyCertificateRequestPage.js in folder common */
var rccNoticeNumber;
var rccRegisteredName;
var rccBusinessName;
var rccABN;
var rccBuildingName;
var rccNumber;
var rccStreetName;
var rccSuburb;
var rccState;
var rccPostCode;
var rccOfficerName;
var rccOfficerAddress;
var rccDate;


$("#rccGenerateNotice").click(function(){
	
	busyIndicator.show();
	
	rccNoticeNumber = $("#rccNoticeNumberField").val();
	rccRegisteredName = $("#rccRegisteredNameField").val();
	rccBusinessName = $("#rccBusinessNameField").val();
	rccABN = $("#rccABNField").val();
	rccBuildingName = $("#rccBuildingNameField").val();
	rccNumber = $("#rccNumberField").val();
	rccStreetName = $("#rccStreetNameField").val();
	rccSuburb = $("#rccSuburbField").val();
	rccState = $("#rccStateField").val();
	rccPostCode = $("#rccPostCodeField").val();
	rccOfficerName = $("#rccOfficerNameField").val();
	rccOfficerAddress = $("#rccOfficerAddressField").val();
	
	var invocationData = {adapter:'SubmitForm',
			procedure:'submitCurrencyCertificateRequest',
			parameters:[rccNoticeNumber, rccRegisteredName, rccBusinessName, rccABN, rccBuildingName, rccNumber, rccStreetName, rccSuburb, rccState, rccPostCode, rccOfficerName, rccOfficerAddress, convertDate(lDate)]};
	WL.Client.invokeProcedure(invocationData, {onSuccess:rccSubmitSuccess, onFailure:rccSubmitFailed});
});

function rccSubmitSuccess(result){
	busyIndicator.hide();
	alert("Successfully Saved");
	$.mobile.changePage($("#loginPage"));
}

function rccSubmitFailed(error){
	busyIndicator.hide();
	alert("Error : Unable to insert");
}