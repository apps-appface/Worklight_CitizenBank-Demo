var currentUserData;

function initializeJSonStore() {
	var collectionName = 'logindata';
	var collections = {};
	collections[collectionName] = {};
	collections[collectionName].searchFields = {
		userId : 'number'
	};
	WL.JSONStore.init(collections).then(function() {
	}).fail(function(erroObject) {
		alert(erroObject);
	});
}

function addDataToStore(u_Id, login_time) {
	var data = {
		userId : u_Id,
		data : {
			lastLogin : login_time
		}
	};

	var collectionName = 'logindata';
	var options = {};

	WL.JSONStore.get(collectionName).add(data, options).then(
			function() {
				var query = {
					userId : u_Id
				};

				var collectionName = 'logindata';
				var options = {
					exact : true,
					limit : 10
				};

				WL.JSONStore.get(collectionName).find(query, options).then(
						function(arrayResult) {
							currentUserData = arrayResult[0];
						}).fail(function(error) {
				});

			}).fail(function(erroObject) {
		alert(erroObject);
	});
}

function searchInStore(u_Id, ldate) {
	var query = {
		userId : u_Id
	};
	var collectionName = 'logindata';
	var options = {
		exact : true,
		limit : 10
	};

	WL.JSONStore.get(collectionName).find(query, options).then(
			function(arrayResults) {
				if (arrayResults.length > 0) {
					$('#user_last_login').html("Last Login : "+ arrayResults[0].json.data.lastLogin);

					updateStore(arrayResults[0], ldate);

					currentUserData = arrayResults[0];

				} else {
					$('#user_last_login').html("Last Login: This is your first login.");
					addDataToStore(u_Id, ldate);
				}

			}).fail(function(erroObject) {

		alert("Error in fetching data fron JSONStore : " + erroObject);
	});
}

function updateStore(searchedObject, login_time) {
	var document = {
		_id : parseInt(searchedObject._id, 10),
		json : {
			userId : parseInt(searchedObject._id, 10),
			data : {
				lastLogin : login_time
			}
		}
	};

	var options = {};

	WL.JSONStore.get('logindata').replace(document, options).then(
			function(result) {
			}).fail(function(error) {
		alert("Error : " + error);
	});
}
