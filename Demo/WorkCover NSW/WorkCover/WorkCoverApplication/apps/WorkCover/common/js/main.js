var busyIndicator;
var lDate;
var user_role;

function wlCommonInit() {
	busyIndicator = new WL.BusyIndicator('loginPage');
	getSecretData();
}

$(".ui-btn-right").click(function() {
	$.mobile.changePage("#loginPage");
	WL.Client.reloadApp();
});

function getSecretData() {
	var invocationData = {
		adapter : 'UserAdapter',
		procedure : 'getSecretData',
		parameters : []
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getUserDetailSuccess,
		onFailure : fail
	});
}

function getUserDetailSuccess(result) {
	busyIndicator.hide();
	var user_detail = result.invocationResult;
	var user_name = user_detail.userName;
	user_role = user_detail.userRole;
	$('#welcomelbl').html("Welcome " + user_role + " " + user_name + " !");
}

function fail(errMsg) {
	busyIndicator.hide();
	alert(JSON.stringify(errMsg));
}

$("#certification").click(function() {
	var date = new Date();
	lDate = date.toString().slice(0, 25);
	$("#rccDateField").html("Date : "+convertDate(lDate));
	$.mobile.changePage($("#currencyCertificateRequestPage"));
});

function convertDate(inputFormat) {
	  function pad(s) { return (s < 10) ? '0' + s : s; }
	  var d = new Date(inputFormat);
	  return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
	}

$("#rccBack").click(function() {
	$.mobile.changePage($("#loginPage"));
});

$("#adminResponse").click(function() {
	busyIndicator.show();
	$.mobile.changePage($("#responseVerificationPage"));
	busyIndicator.hide();
});

$("#listBack").click(function() {
	$.mobile.changePage($("#loginPage"));
});

$("#rvpBack").click(function() {
	$.mobile.changePage($("#loginPage"));
});

$("#verificationCheck").click(function() {
	getList();
});

$("#vBack").click(function() {
	$.mobile.changePage($("#showListPage"));
});

$('#save')
		.click(
				function() {
					busyIndicator.show();
					workerName = $('#workername').val();
					dateOfBirth = $('#birthday').val();
					haveLicence = $("#licence :radio:checked").val();
					if (haveLicence == "Yes") {
						haveLicence = 1;
					} else {
						haveLicence = 0;
					}
					hrwExpiryDate = $('#expirydate').val();
					licenceClasses = $('#licenceclasses').val();
					hrwLicenceNo = $('#hrwlicenceno').val();
					issuingJurisdiction = $('#issuejurisdiction').val();
					enrolledTrain = $("input[name=enrollintraining]:checked")
							.val();

					interStateCheck = $('#interstatecheckdate').val();
					isLicenceValid = $("#licencevalid :radio:checked").val();
					if (isLicenceValid == "Yes") {
						isLicenceValid = 1;
					} else {
						isLicenceValid = 0;
					}
					initiatedRFS = $("input[name=initiatedRFS]:checked").val();
					noticesIssued = $('#noticeissued').val();
					addComment = $('#textareaComments').val();

					var invocationData = {
						adapter : 'VerificationCheckAdapter',
						procedure : 'submitVerificationCheck',
						parameters : [ workerName, dateOfBirth, haveLicence,
								hrwExpiryDate, licenceClasses, hrwLicenceNo,
								issuingJurisdiction, enrolledTrain,
								interStateCheck, isLicenceValid, initiatedRFS,
								noticesIssued, addComment ]
					};
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : success,
						onFailure : saveFail
					});
				});

$('input[name=workerlicence]').click(function() {
	var result = $("input[name=workerlicence]:checked").val();
	if (result == "Yes") {
		$("#yesDiv").show();
		$("#noDiv").hide();
	} else {
		$("#noDiv").show();
		$("#yesDiv").hide();
	}
});
function success(result) {
	busyIndicator.hide();
	alert("Successfully Saved");
	$.mobile.changePage($("#loginPage"));
}

function saveFail(errMsg) {
	busyIndicator.hide();
	alert("Unable to save empty fields");
}