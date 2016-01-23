(function(){

/********************************************************************************
VARIABLES
********************************************************************************/

var jsonData;

var phpGetDataLink = 'php/get-tools.php';
var imagesLocation = 'img/badges-tools/';
var imagesExtension = '.jpg';

var dbImageName = 'image_name';
var dbPercentage = 'percentage';

var $template = $('#templateTools');
var $rendered = $('#renderedTools');

/********************************************************************************
EVENT BINDERS
********************************************************************************/

$(window).on('resize', function() {
	jsonData = templateModule.fixImageRoutes(jsonData, dbImageName, imagesLocation, imagesExtension, testDevice.screenSize());
	jsonData = templateModule.addColorClasses(jsonData, dbPercentage);

	templateModule.renderTemplate($template, jsonData, $rendered);
});

/********************************************************************************
INITIATING FUNCTIONS DURING LOADING
********************************************************************************/

$.getJSON(phpGetDataLink, function (data) {

	jsonData = templateModule.fixImageRoutes(data, dbImageName, imagesLocation, imagesExtension, testDevice.screenSize());
	jsonData = templateModule.addColorClasses(data, dbPercentage);

	templateModule.renderTemplate($template, data, $rendered);

});




}());