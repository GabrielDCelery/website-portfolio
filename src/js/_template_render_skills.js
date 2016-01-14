(function(){

/********************************************************************************
VARIABLES
********************************************************************************/

var phpGetDataLink = 'php/get-skills.php';
var imagesLocation = 'img/badges-skills/';
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