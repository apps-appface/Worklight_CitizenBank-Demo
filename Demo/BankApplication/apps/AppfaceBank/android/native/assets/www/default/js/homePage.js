
/* JavaScript content from js/homePage.js in folder common */
$('.my_boxes').bind('click', function() {
	var id = this.id;

	if (id == 'myAccounts') {
		var invocationData = {
			adapter : 'AccountsAdapter',
			procedure : 'getAccountsOfUser',
			parameters : [ user_Id ]
		};
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : getAcclountsDataSuccess,
			onFailure : fail
		});
	}

	if (id == 'fundTransfer') {
		$.mobile.changePage('#fundTransferPage', {
			transition : "slide"
		});
	}
	if (id == 'beneficieries') {
		getBeneficieries();
	}
	if (id == 'miniStatement') {
		getMinistatement();
	}
	if (id == 'more') {
		alert('11111');
	}
	if (id == 'profile') {
		alert('111111');
	}
});

function getMinistatement() {
	var invocationData = {
		adapter : 'TransactionAdapter',
		procedure : 'getMinistatementOfUser',
		parameters : [ user_Id ]
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getMinistatementSuccess,
		onFailure : fail
	});
}

function getMinistatementSuccess(result) {
	var statements = result.invocationResult;
	var table = "";
	table = '<tr style="font-size: small; color: gray; text-shadow: none; padding: 10px;"><th>Date</th><th>Type</th><th>From</th><th>To</th><th>Amount</th></tr>';

	for (var i = 0; i < statements.resultSet.length; i++) {
		table += '<tr style="font-size: small; margin:10px;text-shadow: none;color:green;padding: 10px;"><td style="background-color: #bdbdbd; color:white;border-radius:3px;padding:5px;">'
				+ statements.resultSet[i].Transaction_Date
				+ '</td><td style="color:blue;">'
				+ statements.resultSet[i].Transaction_Type
				+ '</td><td>'
				+ statements.resultSet[i].Payee_Account
				+ '</td><td>'
				+ statements.resultSet[i].Beneficiery_Account
				+ '</td><td style="color:red;">\u20B9.'
				+ statements.resultSet[i].Amount + '</td></tr>';
	}
	$('#miniStatementTable').html(table);
	$.mobile.changePage('#miniStatementPage', {
		transition : "slide"
	});
}

function getAcclountsDataSuccess(result) {
	user_accounts = result.invocationResult;
	account_list = "";
	$('#accountsLV').empty();
	for (var i = 0; i < user_accounts.resultSet.length; i++) {
		if (user_accounts.resultSet[i].Account_Type == 'Saving') {
			createList('Saving Account',
					user_accounts.resultSet[i].Account_Balance, i);
		}
		if (user_accounts.resultSet[i].Account_Type == 'Current') {
			createList('Current Account',
					user_accounts.resultSet[i].Account_Balance, i);
		}
		if (user_accounts.resultSet[i].Account_Type == 'Fixed Deposit') {
			createList('Fixed Account',
					user_accounts.resultSet[i].Account_Balance, i);
		}
		if (user_accounts.resultSet[i].Account_Type == 'Others') {
			createList('Other Account',
					user_accounts.resultSet[i].Account_Balance, i);
		}
	}
	$('#accountsLV').html(account_list);
	$.mobile.changePage('#myAccountsPage', {
		transition : "slide"
	});
	$("#accountsLV").listview('refresh');
}

function createList(accountType, balance, index) {

	var image = "";

	if (accountType == 'Saving Account') {
		image = "images/saving.png";
	}

	if (accountType == 'Current Account') {
		image = "images/current.png";
	}

	if (accountType == 'Fixed Account') {
		image = "images/fixed.png";
	}

	if (accountType == 'Other Account') {
		image = "images/fund.png";
	}

	account_list += '<li class="mylist" style="border-radius: 3px;border: 1px solid green;" id="'
			+ index
			+ '"><div style="margin-top: 10px;color: green;text-shadow: none;border-radius: 5px; padding: 10px; border: 1px solid green;"><img src="'
			+ image
			+ '" style="width: 70px; float: left;" /><span style="padding-left:10px;">'
			+ accountType
			+ '</span><br><span style="font-size: x-small;padding-left:10px;">\u20B9.'
			+ balance + '</span></div></li><br>';
}

function getBeneficieries() {
	var invocationData = {
		adapter : 'BeneficieryAdapter',
		procedure : 'getBeneficieries',
		parameters : [ user_Id ]
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getBeneficieriesSuccess,
		onFailure : fail
	});
}

function getBeneficieriesSuccess(result) {
	beneficiery = "";
	beneficiery = result.invocationResult;
	setBeneficieryInList();
}

function setBeneficieryInList() {
	$('#beneficieryLV').empty();
	var beneficieryList = "";
	for (var i = 0; i < beneficiery.resultSet.length; i++) {
		beneficieryList += '<li style="margin-top:5px;border: 1px solid green; border-radius:5px;"><div style="float:left;color:green;text-shadow: none;"><label style="color:gray;">'
				+ beneficiery.resultSet[i].B_Name
				+ '</label><label style="font-size: x-small;">Mobile : '
				+ beneficiery.resultSet[i].B_Mobile
				+ '</label><label style="font-size: x-small;">Account : '
				+ beneficiery.resultSet[i].B_AccountNo
				+ '</label></div><div id="'
				+ beneficiery.resultSet[i].B_Id
				+ '" class="delete" align="center" style="float:right;border-radius:5px;background-color: red; text-shadow: none; color: white; width:60px;height:60px;line-height:60px;">Delete</div></li>';
	}
	$('#beneficieryLV').html(beneficieryList);
	$.mobile.changePage('#beneficieriesPage', {
		transition : "slide"
	});
	$("#beneficieryLV").listview('refresh');
}