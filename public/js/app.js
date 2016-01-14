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

	function checkDisabledStatus(data, dbProjectLink, dbGithubLink){

		for(var i = 0; i < data.length; i++){

			if(data[i][dbProjectLink] === null || data[i][dbProjectLink] === 'undefined' || data[i][dbProjectLink] === ''){
				data[i]['projectButtonStatus'] = 'disabled';
				data[i]['projectButtonStyle'] = 'btn-danger';
			} else {
				data[i]['projectButtonStatus'] = '';
				data[i]['projectButtonStyle'] = 'btn-primary';
			}

			if(data[i][dbGithubLink] === null || data[i][dbGithubLink] === 'undefined' || data[i][dbGithubLink] === ''){
				data[i]['githubButtonStatus'] = 'disabled';
				data[i]['githubButtonStyle'] = 'btn-danger';
			} else {
				data[i]['githubButtonStatus'] = '';
				data[i]['githubButtonStyle'] = 'btn-info';
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

	function isMobile(){

		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			return true;
		}

	}

	return {

		isMobile: isMobile

	}


}());
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
(function(){

/********************************************************************************
VARIABLES
********************************************************************************/

var phpGetDataLink = 'php/get-tools.php';
var imagesLocation = 'img/badges-tools/';
var imagesExtension = '.jpg';

var dbImageName = 'image_name';
var dbPercentage = 'percentage';

var $template = $('#templateTools');
var $rendered = $('#renderedTools');

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
var imagesLocation = 'img/portfolio/';
var imagesExtension = '.jpg';

var dbImageName = 'preview_image';
var dbPercentage = 'completion_percentage';
var dbProjectLink = 'link_website';
var dbGithubLink = 'link_github';

var $template = $('#templateWorks');
var $rendered = $('#renderedWorks');

/********************************************************************************
INITIATING FUNCTIONS DURING LOADING
********************************************************************************/

$.getJSON(phpGetDataLink, function (data) {

	var data = templateModule.fixImageRoutes(data, dbImageName, imagesLocation, imagesExtension);
	data = templateModule.addColorClasses(data, dbPercentage);
	data = templateModule.checkDisabledStatus(data, dbProjectLink, dbGithubLink);

	templateModule.renderTemplate($template, data, $rendered);

});



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