var procedure2Statement = WL.Server

		.createSQLStatement("insert into Response_Verification_Checklist (pcbu_location, pcbu_size, pcbu_ara_letter, ara_issues_resolved, action_ara_letter, pcbu_consultation_mechanism, pcbu_engage_workers, additional_issues_identified, additional_issue_details, additional_issue_action, workcover_products, ara_comments) values(?,?,?,?,?,?,?,?,?,?,?,?)");
function submitAdministrativeResponseVerificationChecklist(pcbuWorkplace,
		pcbuSize, pcbuARALetter, araIssuesResolved, actionARALetter,
		pcbuConsultationMechanism, pcbuEngageWorkers,
		additionalIssuesIdentified, issueDetails, additionalIssueAction,
		workCoverProducts, araComments) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure2Statement,
		parameters : [ pcbuWorkplace, pcbuSize, pcbuARALetter,
				araIssuesResolved, actionARALetter, pcbuConsultationMechanism,
				pcbuEngageWorkers, additionalIssuesIdentified, issueDetails,
				additionalIssueAction, workCoverProducts, araComments ]
	});
}

var procedure3Statement = WL.Server

		.createSQLStatement("insert into CURRENCY_CERTIFICATE_REQUEST (notice_number, registered_name, business_name, abn, building_name, number, street_name, suburb, state, post_code, officer_name, officer_address, date) values(?,?,?,?,?,?,?,?,?,?,?,?,?)");
function submitCurrencyCertificateRequest(rccNoticeNumber, rccRegisteredName,
		rccBusinessName, rccABN, rccBuildingName, rccNumber, rccStreetName,
		rccSuburb, rccState, rccPostCode, rccOfficerName, rccOfficerAddress,
		rccDate) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure3Statement,
		parameters : [ rccNoticeNumber, rccRegisteredName, rccBusinessName,
				rccABN, rccBuildingName, rccNumber, rccStreetName, rccSuburb,
				rccState, rccPostCode, rccOfficerName, rccOfficerAddress,
				rccDate ]
	});

}