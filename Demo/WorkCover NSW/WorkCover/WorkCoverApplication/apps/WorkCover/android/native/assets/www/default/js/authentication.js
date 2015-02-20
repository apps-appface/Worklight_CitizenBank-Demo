
/* JavaScript content from js/authentication.js in folder common */
var BankAuthenticationChallengeHandler = WL.Client
		.createChallengeHandler("LoginRealm");

BankAuthenticationChallengeHandler.isCustomResponse = function(response) {
	if (!response || !response.responseJSON || response.responseText === null) {
		return false;
	}
	if (typeof (response.responseJSON.authRequired) !== 'undefined') {
		return true;
	} else {
		return false;
	}
};

BankAuthenticationChallengeHandler.handleChallenge = function(response) {
	var authRequired = response.responseJSON.authRequired;

	if (authRequired == true) {
		$('#AuthBody').show();
		$("#AppBody").hide();
		$("#username").empty();
		$("#password").empty();

		if (response.responseJSON.errorMessage)
			$("#errorMessage").html(response.responseJSON.errorMessage);

	} else if (authRequired == false) {

		$('#AuthBody').hide();
		$("#AppBody").show();
		
		BankAuthenticationChallengeHandler.submitSuccess();
	}
};

$("#loginButton").bind(
		'click',
		function() {
			busyIndicator.show();
			var email = $("#username").val();
			var password = $("#password").val();

			var invocationData = {
				adapter : "UserAdapter",
				procedure : "submitAuthentication",
				parameters : [ email.toString(), password ]
			};

			BankAuthenticationChallengeHandler.submitAdapterAuthentication(
					invocationData, {});
		});