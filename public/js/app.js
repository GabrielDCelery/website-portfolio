var templateModule = (function(){

	function fixImageRoutes(data, dbImageName, imageLocation, imageExtension){

		for(var i = 0; i < data.length; i++){

			var skill_image_name = data[i][dbImageName];
			data[i][dbImageName] = imageLocation + skill_image_name + imageExtension;

		}

		return data;

	}

	function addColorClasses(data, dbPercentage){

		for(var i = 0; i < data.length; i++){

			if(data[i][dbPercentage] > 66){
				data[i]['color'] = 'green';
			} else if (data[i][dbPercentage] <= 66 && data[i][dbPercentage] > 33) {
				data[i]['color'] = 'orange';
			} else {
				data[i]['color'] = '';
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
		addColorClasses: addColorClasses,
		renderTemplate: renderTemplate

	}


}());
(function(){

/********************************************************************************
VARIABLES
********************************************************************************/

var phpGetDataLink = 'php/get-skills.php';
var imagesLocation = 'img/';
var imagesExtension = '.jpg';

var dbImageName = 'image_name';
var dbPercentage = 'percentage';

var $template = $('#templateSkills');
var $rendered = $('#renderedSkills');

/********************************************************************************
INITIATING FUNCTIONS DURING LOADING
********************************************************************************/

$.getJSON(phpGetDataLink, function (data) {

	var data = templateModule.fixImageRoutes(data, dbImageName, imagesLocation, imagesExtension);
	data = templateModule.addColorClasses(data, dbPercentage);

	templateModule.renderTemplate($template, data, $rendered);

});




}());
(function(){

/********************************************************************************
VARIABLES
********************************************************************************/

var phpGetDataLink = 'php/get-works.php';
var imagesLocation = 'img/';
var imagesExtension = '.jpg';

var dbImageName = 'preview_image';
var dbPercentage = 'completion_percentage';

var $template = $('#templateWorks');
var $rendered = $('#renderedWorks');

/********************************************************************************
INITIATING FUNCTIONS DURING LOADING
********************************************************************************/

$.getJSON(phpGetDataLink, function (data) {

	var data = templateModule.fixImageRoutes(data, dbImageName, imagesLocation, imagesExtension);
	data = templateModule.addColorClasses(data, dbPercentage);

	templateModule.renderTemplate($template, data, $rendered);

});



}());