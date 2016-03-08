var templateModule = (function(){

	function fixImageRoutes(data, dbImageName, imageLocation, imageExtension, deviceSize){

		if(deviceSize === undefined){
			deviceSize = '';
		} else {
			deviceSize = '-' + deviceSize;
		}

		for(var i = 0; i < data.length; i++){

			var skill_image_name = data[i][dbImageName];
			data[i][dbImageName] = imageLocation + skill_image_name + deviceSize + imageExtension;

		}

		return data;

	}

	function checkDisabledStatus(data, dbProjectLink, dbGithubLink){

		for(var i = 0; i < data.length; i++){

			if(data[i][dbProjectLink] === null || data[i][dbProjectLink] === 'undefined' || data[i][dbProjectLink] === ''){
				data[i]['projectButtonStatus'] = 'disabled';
				data[i]['projectButtonStyle'] = 'btn-default';
			} else {
				data[i]['projectButtonStatus'] = '';
				data[i]['projectButtonStyle'] = 'btn-info';
			}

			if(data[i][dbGithubLink] === null || data[i][dbGithubLink] === 'undefined' || data[i][dbGithubLink] === ''){
				data[i]['githubButtonStatus'] = 'disabled';
				data[i]['githubButtonStyle'] = 'btn-default';
			} else {
				data[i]['githubButtonStatus'] = '';
				data[i]['githubButtonStyle'] = 'btn-primary';
			}

		}

		return data;

	}

	function renderTemplate(templateId, data, renderedId){

		var template = templateId.html();

		var viewData = {
			data: data
		}

		var output = Mustache.render(template, viewData);

		renderedId.html(output);

	}

	return {

		fixImageRoutes: fixImageRoutes,
		checkDisabledStatus: checkDisabledStatus,
		renderTemplate: renderTemplate

	}


}());