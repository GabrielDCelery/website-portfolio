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
		addColorClasses: addColorClasses,
		checkDisabledStatus: checkDisabledStatus,
		renderTemplate: renderTemplate

	}


}());
var testDevice = (function(){

	var smallDevice = 768;
	var mediumDevice = 992;
	var largeDevice = 1200;

	function isMobile(){

		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			return true;
		}

	}

	function screenSize(){

		var screenWidth = window.innerWidth;

		if(screenWidth < smallDevice){
			return 'small';
		} else if (smallDevice <= screenWidth && screenWidth < mediumDevice) {
			return 'medium';
		} else {
			return 'large';
		}

	}

	return {

		isMobile: isMobile,
		screenSize: screenSize

	}


}());
(function(){

/********************************************************************************
VARIABLES
********************************************************************************/

var jsonData;

var phpGetDataLink = 'php/get-skills.php';
var imagesLocation = 'img/badges-skills/';
var imagesExtension = '.jpg';

var dbImageName = 'image_name';
var dbPercentage = 'percentage';

var $template = $('#templateSkills');
var $rendered = $('#renderedSkills');


/********************************************************************************
FUNCTIONS
********************************************************************************/

function renderSkills(){
	$.getJSON(phpGetDataLink, function (data) {

		jsonData = templateModule.fixImageRoutes(data, dbImageName, imagesLocation, imagesExtension, testDevice.screenSize());
		jsonData = templateModule.addColorClasses(data, dbPercentage);

		templateModule.renderTemplate($template, jsonData, $rendered);

	});
}

/********************************************************************************
EVENT BINDERS
********************************************************************************/

$(window).on('resize', renderSkills);

/********************************************************************************
INITIATING FUNCTIONS DURING LOADING
********************************************************************************/

renderSkills();



}());
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
(function(){

/********************************************************************************
VARIABLES
********************************************************************************/
var $appWindow = $(window);
var $navbarLinks = $('nav a');
var $navbarCollapse = $(".navbar-collapse");

/********************************************************************************
EVENT BINDERS
********************************************************************************/

$navbarLinks.on('click', function (event){
	event.preventDefault();
	var titleId = $(this).attr('href'); // Code for scrolling after clicking link
	$appWindow.scrollTo($(titleId), 500);

});


}());
(function(){

/********************************************************************************
VARIABLES
********************************************************************************/

var $renderedSkillsContainer = $('#renderedSkills');
var $renderedToolsContainer = $('#renderedTools');
var icon = '.percentage-circle';

/********************************************************************************
EVENT BINDERS
********************************************************************************/

	$renderedSkillsContainer.on('click touchstart', icon, toggleImage);
	$renderedToolsContainer.on('click touchstart', icon, toggleImage);

	if(!testDevice.isMobile()){
		
		$renderedSkillsContainer.on('mouseenter', icon, toggleImage);
		$renderedSkillsContainer.on('mouseleave', icon, toggleImage);
		$renderedToolsContainer.on('mouseenter', icon, toggleImage);
		$renderedToolsContainer.on('mouseleave', icon, toggleImage);

	}

/********************************************************************************
FUNCTIONS
********************************************************************************/

function toggleImage(event){

	var $spanElements = $(this).find('span');
	$spanElements.toggle();

}


}());