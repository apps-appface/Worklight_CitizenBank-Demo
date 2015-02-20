var verifyUserStatement = WL.Server
		.createSQLStatement("select * from USER where user_name=? and user_password=?;");

function verifyUser(name, password) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : verifyUserStatement,
		parameters : [ name, password ]
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

function submitAuthentication(name, password) {
	
	WL.Logger.debug("Authentication Started...");
	
	userDetail = verifyUser(name, password);

	var userName = userDetail.resultSet[0].user_name;
	var userId = userDetail.resultSet[0].user_id;

	if (userDetail.resultSet.length > 0) {

		WL.Logger.info('Authenticated...');

		var userIdentity = {
			userId : ""+userId,
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
		userId : userDetail.resultSet[0].user_id,
		userName : userDetail.resultSet[0].user_name,
		userRole:userDetail.resultSet[0].user_role,
	};
}