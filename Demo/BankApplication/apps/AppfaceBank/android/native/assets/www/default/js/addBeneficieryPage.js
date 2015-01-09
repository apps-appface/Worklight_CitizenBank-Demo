
/* JavaScript content from js/addBeneficieryPage.js in folder common */
$("#addBeneficieryBack").click(function() {
	$.mobile.changePage('#beneficieriesPage', {
		transition : "slide"
	});
});

$("#cancelBtn").click(function() {
	$.mobile.changePage('#beneficieriesPage', {
		transition : "slide"
	});
});

$("#addBtn")
		.click(
				function() {
					if ($("#bname").val() == null || $("#bname").val() == "") {
						WL.SimpleDialog.show("Appface Bank",
								"Invalid beneficiery name", [ {
									text : 'Ok',
									handler : function() {
									}
								} ]);
					}

					else if ($("#baccount").val() == null
							|| $("#baccount").val() == "") {
						WL.SimpleDialog.show("Appface Bank",
								"Invalid account no", [ {
									text : 'Ok',
									handler : function() {
									}
								} ]);
					}

					else if ($("#bmobile").val() == null
							|| $("#bmobile").val() == "") {
						WL.SimpleDialog.show("Appface Bank",
								"Invalid mobile no", [ {
									text : 'Ok',
									handler : function() {
									}
								} ]);
					}

					else if ($("#bemail").val() == null
							|| $("#bemail").val() == "") {
						WL.SimpleDialog.show("Appface Bank",
								"Invalid email id", [ {
									text : 'Ok',
									handler : function() {
									}
								} ]);
					}

					else {
						var isAlready = false;

						for (var i = 0; i < beneficiery.resultSet.length; i++) {
							if ($("#baccount").val() == beneficiery.resultSet[i].B_AccountNo) {
								isAlready = true;
							}
						}

						if (isAlready) {
							WL.SimpleDialog.show('Appface Bank',
									"Beneficiery already in the list", [ {
										text : 'Ok',
										handler : function() {
											$.mobile.changePage('#beneficieriesPage', {
												transition : "slide"
											});
										}
									} ]);
						} else {
							var invocationData = {
								adapter : 'BeneficieryAdapter',
								procedure : 'addBeneficiery',
								parameters : [ $("#bname").val(),
										$("#baccount").val(),
										$("#bmobile").val(),
										$("#bemail").val(), user_Id ]
							};
							WL.Client.invokeProcedure(invocationData, {
								onSuccess : addBeneficierySuccess,
								onFailure : fail
							});
						}
					}
				});

function addBeneficierySuccess(result) {
	WL.SimpleDialog.show("Appface Bank", "Beneficiery successfully added", [ {
		text : 'Ok',
		handler : function() {
			getBeneficieries();
		}
	} ]);
}
