$("#fundTransferBack").click(function() {
	$.mobile.changePage('#loginPage', {
		transition : "slide"
	});
});

$("#rechargeMoney").click(function(){
	$.mobile.changePage('#rechargeMobilePage', {
		transition : "slide"
	});
});

$('#transferMoney').click(function() {
	$('#amount').val("");
	$('#remark').val("");
	$('#payeeAccountList').empty();
	$('#beneficiaryAccountList').empty();
	getAccountsForTransfer();
	getBeneficiaryListForTransfer();
	setParametersForTransferMoney();
	$.mobile.changePage('#transferMoneyPage', {
		transition : "slide"
	});
});

function getAccountsForTransfer() {
	var invocationData = {
		adapter : 'AccountsAdapter',
		procedure : 'getAccountsOfUser',
		parameters : [ user_Id ]
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getAccountsForTransferSuccess,
		onFailure : fail
	});
}

function getAccountsForTransferSuccess(result) {
	userAccountsForTransfer = result.invocationResult;
}

function getBeneficiaryListForTransfer() {
	var invocationData = {
		adapter : 'BeneficieryAdapter',
		procedure : 'getBeneficieries',
		parameters : [ user_Id ]
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getBeneficiaryListSuccess,
		onFailure : fail
	});
}

function getBeneficiaryListSuccess(result) {
	beneficiaryListForTransfer = result.invocationResult;
}

function setParametersForTransferMoney(){
	var index = 0;
	$('#amount').val("");
	$('#remark').val("");
	$('#payeeAccountList').empty();
	$('#beneficiaryAccountList').empty();

	var temp = '<option value="0">From</option>';
	var temp1 = '<option value="0">To</option>';

	for (index; index < userAccountsForTransfer.resultSet.length; index++) {
		temp = temp
				+ "<option value="
				+ userAccountsForTransfer.resultSet[index].Account_No
				+ ">"
				+ userAccountsForTransfer.resultSet[index].Account_No
				+ " \u20B9."
				+ userAccountsForTransfer.resultSet[index].Account_Balance
				+ "</option>";
	}
	$('#payeeAccountList').html(temp);
	
	var index1 = 0;
	for (index1; index1 < beneficiaryListForTransfer.resultSet.length; index1++) {
		temp1 = temp1
				+ "<option value="
				+ beneficiaryListForTransfer.resultSet[index1].B_AccountNo
				+ ">"
				+ beneficiaryListForTransfer.resultSet[index1].B_Name
				+ " "
				+ beneficiaryListForTransfer.resultSet[index1].B_AccountNo
				+ "</option>";
	}
	$('#beneficieryAccountList').html(temp1);
}