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