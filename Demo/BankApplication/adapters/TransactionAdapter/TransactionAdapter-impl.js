var insertTransactionStatement = WL.Server
		.createSQLStatement("insert into Transaction(Payee_Id,Payee_Account,MobileNoToRecharge,Beneficiery_Name,Beneficiery_Account,Transaction_Type,Transaction_Date,Amount,Remark,Status) values(?,?,?,?,?,?,?,?,?,?);");

function insertTransaction(userid, pacc, mobno, bname, bacc, ttype, tdate,
		tammount, remark, status) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : insertTransactionStatement,
		parameters : [ userid, pacc, mobno, bname, bacc, ttype, tdate,
				tammount, remark, status ]
	});
}

function doTransaction(userAccount, beneficiaryAccount, transferAmount) {
	updateUserAccount(transferAmount, userAccount);
	updateBeneficieryAccount(transferAmount, beneficiaryAccount);
}

var updateUserAccountStatement = WL.Server
		.createSQLStatement("update Accounts_table set Account_Balance=Account_Balance-? where Account_No=?;");

function updateUserAccount(amount, accno) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateUserAccountStatement,
		parameters : [ amount, accno ]
	});
}

var updateBeneficieryAccountStatement = WL.Server
		.createSQLStatement("update Accounts_table set Account_Balance=Account_Balance+? where Account_No=?;");

function updateBeneficieryAccount(amount, accno) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateBeneficieryAccountStatement,
		parameters : [ amount, accno ]
	});
}

var getMinistatementOfUserStatement = WL.Server
		.createSQLStatement("select * from Transaction where Payee_Id=?;");

function getMinistatementOfUser(userid) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getMinistatementOfUserStatement,
		parameters : [ userid ]
	});
}
