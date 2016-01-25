(function(){

/********************************************************************************
VARIABLES
********************************************************************************/

var jsonData;

var phpGetDataLink = 'php/get-works.php';
var imagesLocation = 'img/portfolio/';
var imagesExtension = '.jpg';

var dbImageName = 'preview_image';
var dbPercentage = 'completion_percentage';
var dbProjectLink = 'link_website';
var dbGithubLink = 'link_github';

var $template = $('#templateWorks');
var $rendered = $('#renderedWorks');

/********************************************************************************
FUNCTIONS
********************************************************************************/

function renderWorks(){

	$.getJSON(phpGetDataLink, function (data) {

		jsonData = templateModule.fixImageRoutes(data, dbImageName, imagesLocation, imagesExtension, testDevice.screenSize());
		jsonData = templateModule.addColorClasses(data, dbPercentage);
		jsonData = templateModule.checkDisabledStatus(data, dbProjectLink, dbGithubLink);

		templateModule.renderTemplate($template, jsonData, $rendered);

	});

}

/********************************************************************************
EVENT BINDERS
********************************************************************************/

$(window).on('resize', renderWorks);

/********************************************************************************
INITIATING FUNCTIONS DURING LOADING
********************************************************************************/

renderWorks();


}());