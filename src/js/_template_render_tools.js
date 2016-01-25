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
FUNCTIONS
********************************************************************************/

function renderTools(){
	$.getJSON(phpGetDataLink, function (data) {


		jsonData = templateModule.fixImageRoutes(data, dbImageName, imagesLocation, imagesExtension, testDevice.screenSize());
		jsonData = templateModule.addColorClasses(data, dbPercentage);

		templateModule.renderTemplate($template, jsonData, $rendered);

	});
}

/********************************************************************************
EVENT BINDERS
********************************************************************************/

$(window).on('resize', renderTools);

/********************************************************************************
INITIATING FUNCTIONS DURING LOADING
********************************************************************************/

renderTools();


}());