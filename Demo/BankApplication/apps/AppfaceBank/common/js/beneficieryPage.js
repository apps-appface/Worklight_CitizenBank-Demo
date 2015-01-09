$("#beneficieryBack").click(function() {
	$.mobile.changePage('#loginPage', {
		transition : "slide"
	});
});

$("#addBeneficiery").click(function(){

	$("#bname").val("");
	$("#baccount").val("");
	$("#bmobile").val("");
	$("#bemail").val("");

	$.mobile.changePage('#addBeneficieriesPage', {
		transition : "slide"
	});
});

$('#beneficieryLV')
.on(
		'click',
		'.delete',
		function() {
			
			var index = this.id;
			
			WL.SimpleDialog.show('Appface Bank', "Are you sure?", [ {
				text : 'Yes',
				handler : function() {
						var invocationData = {
								adapter : 'BeneficieryAdapter',
								procedure : 'deleteBeneficiery',
								parameters : [ index ]
							};
							WL.Client.invokeProcedure(invocationData, {
								onSuccess : deleteBeneficierySuccess,
								onFailure : fail
							});	
				}
			},{
				text : 'No',
				handler : function() {
				}
			} ]);		
		});

function deleteBeneficierySuccess(result){
	WL.SimpleDialog.show('Appface Bank', "Beneficiery Deleted", [ {
		text : 'Ok',
		handler : function() {		
			getBeneficieries();
		}
	}]);
}