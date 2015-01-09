function getSensex() {	
	
	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : '/data/xml/SensexRSS.xml'
	};
		
	return WL.Server.invokeHttp(input);
}