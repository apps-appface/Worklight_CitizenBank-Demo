var procedure1Statement = WL.Server
		.createSQLStatement("select * from WORKER_DETAIL");
function getWorkersList() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : []
	});
}
