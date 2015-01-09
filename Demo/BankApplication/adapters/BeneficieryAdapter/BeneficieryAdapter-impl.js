var getBeneficieriesOfUserStatement = WL.Server
		.createSQLStatement("select * from Beneficiery_table where B_PayeeId=?;");

function getBeneficieries(userid) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getBeneficieriesOfUserStatement,
		parameters : [ userid ]
	});
}

var addBeneficieryStatement = WL.Server
		.createSQLStatement("insert into Beneficiery_table(B_Name,B_AccountNo,B_Mobile,B_Email,B_PayeeId) values(?,?,?,?,?);");

function addBeneficiery(name, bAccno, mobile, email, payeeId) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : addBeneficieryStatement,
		parameters : [ name, bAccno, mobile, email, payeeId ]
	});
}

var deleteBeneficieryStatement = WL.Server
		.createSQLStatement("delete from Beneficiery_table where B_Id=?;");

function deleteBeneficiery(bid) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteBeneficieryStatement,
		parameters : [ bid ]
	});
}