
/* JavaScript content from js/listPage.js in folder common */
function getList() {
	var invocationData = {
		adapter : 'GetWorkersListAdapter',
		procedure : 'getWorkersList',
		parameters : []
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getTitle,
		onFailure : failure,
	});
}

var res;
function getTitle(result) {
	var main_user = user_role, user2 = "Inspector";
	$('#showlist').html('');
	res = result.invocationResult;
	var j = 1;
	$('#showlist').append(
			'<lable id=\"currentusername\">Admin</label>');
	for (var i = 0; i < res.resultSet.length; i++) {
		if (main_user == res.resultSet[i].user_role) {
			if (main_user == "Inspector") {
				$('#showlist')
						.append(
								' <li data-inline=\"true\">'
										+ '<label id=\"serialnumber\">'
										+ (j)
										+ '.'
										+ '</label>'
										+ ' '
										+ '<label id=\"name\" style=\"color:green;\">'

										+ res.resultSet[i].name
										+ '</label>'
										+ '<div id=\"buttons\" data-inline=\"true\"><img src=\"images/edit.png\" style=\"width:25px;height:25px;\" id=\"'
										+ res.resultSet[i].worker_id
										+ '\" class=\"edit\" onclick=\"false\"/>'
										+ '<img src=\"images/delete.png\" style=\"width:25px;height:25px;\" id=\"'
										+ res.resultSet[i].worker_id
										+ '\" class=\"delete\" onclick=\"false\"/>'
										+ '<img src=\"images/pdf.png\" style=\"width:25px;height:25px;\" id=\"'
										+ res.resultSet[i].worker_id
										+ '\" class=\"pdf\" onclick=\"false\"/></div>'
										+ '</li>');
				j++;
			} else {
				$('#showlist')
						.append(
								' <li data-inline=\"true\">'
										+ '<label id=\"serialnumber\">'
										+ (j)
										+ '.'
										+ '</label>'
										+ ' '
										+ '<label id=\"name\" style=\"color:green;\">'

										+ res.resultSet[i].name
										+ '</label>'
										+ '<div id=\"buttons\" data-inline=\"true\"><img src=\"images/edit.png\" style=\"width:25px;height:25px;\" id=\"'
										+ res.resultSet[i].worker_id
										+ '\" class=\"edit\" onclick=\"workerEdit(this.id)\"/>'
										+ '<img src=\"images/delete.png\" style=\"width:25px;height:25px;\" id=\"'
										+ res.resultSet[i].worker_id
										+ '\" class=\"delete\" onclick=\"workerDelete(this.id)\"/>'
										+ '<img src=\"images/pdf.png\" style=\"width:25px;height:25px;\" id=\"'
										+ res.resultSet[i].worker_id
										+ '\" class=\"pdf\" onclick=\"workerPDF(this.id)\"/></div>'
										+ '</li>');
				j++;
			}
		}
	}

	$('#showlist')
			.append('<lable id=\"currentusername\">' + user2 + '</label>');
	for (var i = 0; i < res.resultSet.length; i++) {
		if (main_user != res.resultSet[i].user_role) {

			$('#showlist')
					.append(
							' <li data-inline=\"true\">'
									+ '<label id=\"serialnumber\">'
									+ (j)
									+ '.'
									+ '</label>'
									+ ' '
									+ '<label id=\"name\" style=\"color:red;\">'

									+ res.resultSet[i].name
									+ '</label>'
									+ '<div id=\"buttons\" data-inline=\"true\"><img src=\"images/edit.png\" style=\"width:25px;height:25px;\" id=\"'
									+ res.resultSet[i].worker_id
									+ '\" class=\"edit\" onclick=\"workerEdit(this.id)\" />'
									+ '<img src=\"images/delete.png\" style=\"width:25px;height:25px;\" id=\"'
									+ res.resultSet[i].worker_id
									+ '\" class=\"delete\" onclick=\"workerDelete(this.id)\" />'
									+ '<img src=\"images/pdf.png\" style=\"width:25px;height:25px;\" id=\"'
									+ res.resultSet[i].worker_id
									+ '\" class=\"pdf\" onclick=\"workerPDF(this.id)\"/></div>'
									+ '</li>');
			j++;
		}
	}

	$.mobile.changePage($("#showListPage"));
	$('#showlist').listview('refresh');
}

$("#addNew").click(function() {
	workerEdit(0);
});

function workerEdit(element) {
	busyIndicator.show();

	if (element == 0) {
		$("#yesDiv").hide();
		$("#noDiv").hide();
		$.mobile.changePage($("#verificationCheckPage"));
		busyIndicator.hide();
	} else {
		for (var i = 0; i < res.resultSet.length; i++) {
			if (res.resultSet[i].worker_id == element) {
				$("#yesDiv").hide();
				$("#noDiv").hide();
				$('#birthday').val('');
				$('input[name="workerlicence"]').attr('checked', false);
				$('#hrwlicenceno').val('');
				$('#issuejurisdiction').val('');
				$('input[name=enrollintraining]').attr('checked', false);
				$('#expirydate').val('');
				$('#licenceclasses').val('');
				$('#interstatecheckdate').val('');
				$('input[name=validlicence]').attr('checked', false);
				$('input[name=initiatedRFS]').attr('checked', false);
				$('#noticeissued').val('');
				$('#textareaComments').val('');
				$('#workername').val('');
				$.mobile.changePage($("#verificationCheckPage"));
				busyIndicator.hide();
			}
		}
	}
};
function workerDelete(element) {
	WL.SimpleDialog.show("Delete",
			"Are you sure you want to delete data from database", [ {
				text : 'Cancel'
			}, {
				text : 'Ok',
				handler : function() {
					var invocationData = {
						adapter : 'DeleteWorkerDetailsAdapter',
						procedure : 'deleteWorkerDetail',
						parameters : [ element ]
					};
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : deleteSuccess,
						onFailure : deleteFailure
					});
				}
			} ], null);
}

function workerPDF(element) {
	alert(element);
}

function deleteSuccess() {
	alert("Worker is delete successfully" + JSON.stringfy);
	getList();
}

function deleteFailure() {
	alert("Unable to delete");
}

function failure(result) {
	alert(JSON.stringfy);
	WL.Logger.error("Title is not Found");
}