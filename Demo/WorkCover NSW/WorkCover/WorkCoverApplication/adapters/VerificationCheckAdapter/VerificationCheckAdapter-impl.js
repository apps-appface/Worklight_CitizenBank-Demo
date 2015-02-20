var procedure1Statement = WL.Server

		.createSQLStatement("insert into WORKER_DETAIL (name, date_of_birth, has_licence, hrw_licence_number, licence_jurisdiction, has_enrolled_training, hrw_card_expiry_date, licence_classes, gls_date, licence_validity, rfs_consultation, notices_issued, comments) values(?,?,?,?,?,?,?,?,?,?,?,?,?)");

function submitVerificationCheck(workerName, dateOfBirth, haveLicence,
		hrwExpiryDate, licenceClasses, hrwLicenceNo, issuingJurisdiction,
		enrolledTrain, interStateCheck, isLicenceValid, initiatedRFS,
		noticesIssued, addComment) {

	return WL.Server.invokeSQLStatement({

		preparedStatement : procedure1Statement,

		parameters : [ workerName, dateOfBirth, haveLicence, hrwLicenceNo,
				issuingJurisdiction, enrolledTrain, hrwExpiryDate,

				licenceClasses,

				interStateCheck, isLicenceValid, initiatedRFS,

				noticesIssued, addComment ]

	});

}

function getWorkerId() {

	return WL.Server.invokeSQLStatement({

		preparedStatement : procedure1Statement,

		parameters : [ workerName, dateOfBirth, haveLicence, hrwLicenceNo,
				issuingJurisdiction, enrolledTrain, hrwExpiryDate,

				licenceClasses,

				interStateCheck, isLicenceValid, initiatedRFS,

				noticesIssued, addComment ]

	});

}