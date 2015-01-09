
/* JavaScript content from js/main1.js in folder common */
function wlCommonInit() {
	
	
	initializeJSonStore();
	getSecretData();

}

function func1(){
	alert("1");
}

function func2(){
	alert("2");
}

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

var user_detail;
var user_Id;

function getUserDetailSuccess(result) {
	user_detail = result.invocationResult;
	user_Id = user_detail.userId;
	var date = new Date();
	var lDate = date.toString().slice(0, 25);
	$('#user_name').html(user_detail.userName);
	$('#user_address').html(user_detail.userAddress);
	searchInStore(user_Id, lDate);
}

function fail(errMsg) {
	alert(JSON.stringify(errMsg));
}

var account_list = "";

$('.my_boxes').bind('click', function() {
	var id = this.id;

	if (id == 'myAccounts') {
		var invocationData = {
			adapter : 'UserAdapter',
			procedure : 'getAccountsData',
			parameters : [ user_Id ]
		};
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : getAcclountsDataSuccess,
			onFailure : fail
		});
	}

	if (id == 'fundTransfer') {
		alert("11");
	}
	if (id == 'manageBeneficiery') {
		alert('111');
	}
	if (id == 'otherServices') {
		alert('1111');
	}
});

var user_accounts;

function getAcclountsDataSuccess(result) {
	user_accounts = result.invocationResult;
	$('#account_List').empty();
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
	$('#account_List').html(account_list);
	$.mobile.changePage('#myAccountsPage');
	$("#account_List").listview('refresh');
}

function createList(accountType, balance, index) {

	var color = "#E45E9D";
	
	if (index == 0) {
		color = "#E45E9D";
	}
	if (index == 1) {
		color = "#C36241";
	}
	if (index == 2) {
		color = "#E45E9D";
	}
	if (index == 3) {
		color = "#C36241";
	}
	
	account_list += '<div class="detail" id="'
			+ index
			+ '" style="background-color: '
			+ color
			+ ';"><i style="float:left; font-size: small; width: 74%; line-height: 30px;">'
			+ accountType
			+ '</i><i style="float:right; width: 24%; font-size: small; line-height: 30px;">\u20B9.'
			+ balance + '</i></div>';
}

var acc_detail = "";

$('#account_List')
		.on(
				'click',
				'.detail',
				function() {
					var index = this.id;

					var detail = '<div style="background-color:#22D2A6;color:white;padding:10px;text-decoration:italic;">Account Type : '
							+ user_accounts.resultSet[index].Account_Type
							+ '<br>Account No. : '
							+ user_accounts.resultSet[index].Account_No
							+ '<br>Balance : \u20B9.'
							+ user_accounts.resultSet[index].Account_Balance
							+ '<br>Mobile No. : '
							+ user_detail.userMobileNo
							+ '<br>E-mail Id : '
							+ user_detail.userEmailId
							+ '<br>Address : '
							+ user_detail.userAddress
							+ '</div>';

					WL.SimpleDialog.show('Account Detail', detail, [ {
						text : 'OK',
						handler : function() {
						}
					} ]);
				});


$('#menu').click(function() {
	$('#menuPanel').panel('open');
});

$('#logoutButton').click(function() {
	WL.Client.logout('LoginRealm', {
		onSuccess : WL.Client.reloadApp
	});
});

$('#userImage').click(function() {
});

$('#scanButton').bind('click', doScan);

function doScan() {
	cordova.exec(onScanSuccess, onScanFailure, 'BarcodeScanner', 'scan', []);
}

function onScanSuccess(result) {
	$('#success').html("true");
	$('#code').html(result.text);
	$('#format').html(result.format);
	$('#cancelled').html(result.cancelled);
}

function onScanFailure(error) {
	$('#success').html("false, Error Message : " + error);
}


//--------------------------------------------------------------  Back Click
$('.ui-btn-left').click(function() {
	account_list = "";
	$.mobile.changePage('#mainPage');
});
//});
//
//$('#currencyBack').click(function() {
//	$.mobile.changePage('#mainPage');
//});
//
//$('#contactBack').click(function() {
//	$.mobile.changePage('#mainPage');
//});
//
//$('#scannerBack').click(function() {
//	$.mobile.changePage('#mainPage');
//});
//
//$('#weatherBack').click(function() {
//	$.mobile.changePage('#mainPage');
//});
//
//$('#mobileBack').click(function() {
//	$.mobile.changePage('#mainPage');
//});
//

//--------------------------------------------------------------  List Click
$('#bcReader').click(function() {
	$.mobile.changePage('#barcodeScannerPage');
});

$('#mRecharge').click(function() {
	$.mobile.changePage('#mobileRechargePage');
});

$('#cConverter').click(function() {
	$.mobile.changePage('#currencyConverterPage');
});

$('#weather').click(function() {
	$.mobile.changePage('#weatherPage');
});

$('#contactUs').click(function() {
	$.mobile.changePage("#contactUsPage");
});