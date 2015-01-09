$("#transferMoneyBack").click(function() {
	$.mobile.changePage('#fundTransferPage', {
		transition : "slide"
	});
});

$("#cancelTransferBtn").click(function() {
	$.mobile.changePage('#fundTransferPage', {
		transition : "slide"
	});
});

$('#transferBtn')
		.on(
				'click',
				function() {
					var payeeAcc = $('#payeeAccountList').val();
					var beneficiaryAcc = $('#beneficieryAccountList').val();
					var transferAmount = $('#amount').val();
					var remark = $('#remark').val();

					if (payeeAcc == null || payeeAcc == 0) {
						WL.SimpleDialog.show("Appface Bank",
								"Select valid payee account", [ {
									text : "OK",
									handler : function() {
									}
								} ]);
					} else if (transferAmount == null || transferAmount == ''
							|| transferAmount <= 0 || isNaN(transferAmount)) {
						WL.SimpleDialog.show("Appface Bank", "Invalid amount",
								[ {
									text : "OK",
									handler : function() {
									}
								} ]);
					} else if (beneficiaryAcc == null || beneficiaryAcc == 0) {
						WL.SimpleDialog.show("Appface Bank",
								"Select valid beneficiary account", [ {
									text : "OK",
									handler : function() {
									}
								} ]);
					} else {

						for (var index = 0; index < userAccountsForTransfer.resultSet.length; index++) {
							if (userAccountsForTransfer.resultSet[index].Account_No == payeeAcc) {

								if (transferAmount > userAccountsForTransfer.resultSet[index].Account_Balance) {
									WL.SimpleDialog.show("Appface Bank",
											"Insufficient fund.", [ {
												text : "OK",
												handler : function() {
												}
											} ]);
								} else {
									doTransaction(payeeAcc, beneficiaryAcc,
											transferAmount);

									var d = new Date();
									var transferDate = d.getFullYear() + "-"
											+ (d.getMonth() + 1) + "-"
											+ d.getDate();
									var mobNo=0;

									insertTransactionInTable(user_Id, payeeAcc,mobNo,
											getNameFrom(beneficiaryAcc),
											beneficiaryAcc, "money transfer",
											transferDate, transferAmount,
											remark, status);
								}
							}
						}
					}
				});

function doTransaction(userAccount, beneficiaryAccount, transferAmount) {
	var invocationData = {
		adapter : 'TransactionAdapter',
		procedure : 'doTransaction',
		parameters : [ userAccount, beneficiaryAccount, transferAmount ]
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : doTransactionSuccess,
		onFailure : fail
	});
}

function doTransactionSuccess(result) {
	status = "Success";
}

function insertTransactionInTable(payeeId, payeeAccountNo, mobNo, recieverName,
		recieverAccountNo, tType, tDate, amount, tRemark, tStatus) {
	var invocationData = {
		adapter : 'TransactionAdapter',
		procedure : 'insertTransaction',
		parameters : [ payeeId, payeeAccountNo, mobNo, recieverName,
				recieverAccountNo, tType, tDate, amount, tRemark, tStatus ]
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : insertTransactionInTableSuccess,
		onFailure : fail
	});
}

function insertTransactionInTableSuccess(result) {
	WL.SimpleDialog.show("Appface Bank", "Money transferred successfully", [ {
		text : "OK",
		handler : function() {
		}
	} ]);
	$('#amount').val('');
	$('#remark').val('');
	$('#payeeAccountsList').val('');
	$('#beneficiaryAccountList').val('');
	$.mobile.changePage('#fundTransferPage', {
		transition : "slide"
	});
}

function getNameFrom(account) {
	getBeneficieryList();
	var accountHolderName = null;
	for (var index = 0; index < beneficiery.resultSet.length; index++) {
		if (beneficiery.resultSet[index].BeneficiaryAccountNo == account) {
			accountHolderName = beneficiery.resultSet[index].B_Name;
		}
	}
	return accountHolderName;
}

function getBeneficieryList(){
	
	var invocationData = {
			adapter : 'BeneficieryAdapter',
			procedure : 'getBeneficieries',
			parameters : [ user_Id ]
		};
	
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : getBeneficieryListSuccess,
			onFailure : fail
		});
}

function getBeneficieryListSuccess(result){
	beneficiery = "";
	beneficiery = result.invocationResult;
}
