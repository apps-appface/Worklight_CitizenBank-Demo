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
	user_detail = result.invocationResult;
	user_Id = user_detail.userId;
	var date = new Date();
	var lDate = date.toString().slice(0, 25);
	$('#user_name').html(user_detail.userName);
	$('#user_address').html(user_detail.userAddress);
	searchInStore(user_Id, lDate);
	getSensexData();
}

function getSensexData(){
	var invocationData = {
			adapter : 'SensexAdapter',
			procedure : 'getSensex',
			parameters : []
		};
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : getSensexDataSuccess,
			onFailure : fail
		});
}

function getSensexDataSuccess(result){
	var sensexData = result.invocationResult;
	$("#sensex").html(sensexData.rss.channel.item.title+"    |    "+"DATE : "+sensexData.rss.channel.item.pubDate);
}

$('#locateDiv').click(function(){
	alert("Locate ATM");
});

$('#CCDiv').click(function(){
	alert("Currency Converter");
});

$('#BSDiv').click(function(){
	alert("Barcode Scanner");
});