var getAccountsOfUserStatement = WL.Server
		.createSQLStatement("select * from Accounts_table where User_Id=?;");

function getAccountsOfUser(userid) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getAccountsOfUserStatement,
		parameters : [ userid ]
	});
}