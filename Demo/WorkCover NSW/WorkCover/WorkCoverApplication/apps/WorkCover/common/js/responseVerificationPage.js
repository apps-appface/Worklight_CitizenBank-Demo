/**
 * 
 */

var pcbuWorkplace;
var pcbuSize;
var pcbuARALetter;
var araIssuesResolved;
var actionARALetter;
var pcbuConsultationMechanism;
var pcbuEngageWorkers;
var additionalIssuesIdentified;
var issueDetails;
var additionalIssueAction;
var workCoverProducts;
var araComments;

$("input[name=araIssuesResolved]").click(function(){
	if($("input[name=araIssuesResolved]:checked").val()=="0"){
		$("#actionARALetterDiv").show();
	}else{
		$("#actionARALetterDiv").hide();
	}
});



$("input[name=additionalIssuesIdentified]").click(function(){
	if($("input[name=additionalIssuesIdentified]:checked").val()=="1"){
		$("#ifAdditionalIssues").show();
	}else{
		$("#ifAdditionalIssues").hide();
	}
});


$("#rvpSubmit").click(function(){
	busyIndicator.show();
	pcbuWorkplace = $("#pcbuWorkplace").val();
	pcbuSize = $("#pcbuSize").val();
	if($("input[name=pcbuARALetter]:checked").val()==1){
		pcbuARALetter = 1;
	}else{
		pcbuARALetter = 0;
	}
	if($("input[name=araIssuesResolved]:checked").val()==1){
		araIssuesResolved = 1;
	}else{
		araIssuesResolved = 0;
	}
	
	actionARALetter = $("#actionARALetter").val();
	pcbuConsultationMechanism = $("input[name=pcbuConsultationMechanism]:checked").val();
	pcbuEngageWorkers = $("input[name=pcbuEngageWorkers]:checked").val();
	if($("input[name=additionalIssuesIdentified]:checked").val()==1){
		additionalIssuesIdentified = 1;
	}else{
		additionalIssuesIdentified = 0;
	}
	
	issueDetails = $("#issueDetails").val();
	additionalIssueAction = $("#additionalIssueAction").val();
	workCoverProducts = $("#workCoverProducts").val();
	araComments = $("#araComments").val();
	
	var invocationData = {adapter:'SubmitForm',
			procedure:'submitAdministrativeResponseVerificationChecklist',
			parameters:[pcbuWorkplace, pcbuSize, pcbuARALetter, araIssuesResolved, actionARALetter, pcbuConsultationMechanism, pcbuEngageWorkers, additionalIssuesIdentified, issueDetails, additionalIssueAction, workCoverProducts, araComments]};
	WL.Client.invokeProcedure(invocationData, {onSuccess:arvcSubmitSuccess, onFailure:arvcSubmitFailed});
});


function arvcSubmitSuccess(result){
	busyIndicator.hide();
	alert("Successfully Saved");
}

function arvcSubmitFailed(error){
	busyIndicator.hide();
	alert("some error occurd 3\n" +JSON.stringify(error));
}