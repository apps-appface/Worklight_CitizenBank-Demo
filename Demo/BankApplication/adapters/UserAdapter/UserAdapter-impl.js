var verifyUserStatement = WL.Server
		.createSQLStatement("select * from User_table where User_Email=? and User_Password=?;");

function verifyUser(email, password) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : verifyUserStatement,
		parameters : [ email, password ]
	});
}

//---------------------------------------------------------------------------------------------------

function onAuthRequired(headers, errorMessage) {
	errorMessage = errorMessage ? errorMessage : null;
	return {
		authRequired : true,
		errorMessage : errorMessage
	};
}

var userDetail;

function submitAuthentication(email, password) {
	
	WL.Logger.debug("Authentication Started...");
	
	userDetail = verifyUser(email, password);

	var userName = userDetail.resultSet[0].User_Name;
	var userId = userDetail.resultSet[0].User_Id;

	if (userDetail.resultSet.length > 0) {

		WL.Logger.info('Authenticated...');

		var userIdentity = {
			userId : userId.toString(),
			displayName : userName
		};

		WL.Server.setActiveUser("LoginRealm", userIdentity);

		WL.Logger.info('Logged in...');

		return {
			authRequired : false,
		};
	}
	return onAuthRequired(null, "* Invalid login credentials");
}

function onLogout() {
	WL.Server.setActiveUser("LoginRealm", null);
	WL.Logger.info('Logged out...');
}

//---------------------------------------------------------------------------------------------------

function getSecretData() {
	return {
		userId : userDetail.resultSet[0].User_Id,
		userName : userDetail.resultSet[0].User_Name,
		userMobileNo:userDetail.resultSet[0].User_Mobile_No,
		userEmailId: userDetail.resultSet[0].User_Email,
		userAddress : userDetail.resultSet[0].User_Address
	};
}