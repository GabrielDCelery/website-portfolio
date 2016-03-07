var events = {
	events: {},
	on: function(eventName, fn){
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	},
	emit: function(eventName, data){
		if(this.events[eventName]){
			this.events[eventName].forEach(function(fn){
				fn(data);
			})
		}
	}
};
(function(){

	function animateIcon(input){

		var number;

		do {
			number = Math.floor(Math.random() * input.numberOfElements);
		} while (input.randomNumber == number)

		var $selectedElement = $('.' + input.selectedElement + ':eq(' + number + ')');

		$selectedElement.addClass(input.animateClass);

		input.randomNumber = number;

		setTimeout(function(){
			$selectedElement.removeClass(input.animateClass);
			events.emit(input.nextEventName, input);
		}, 1500)
	}

	events.on('animateSkillsIcon', animateIcon);
	events.on('animateToolsIcon', animateIcon);

})()
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

		var input = {
			selectedElement: 'portfolio-icon-skill',
			animateClass: 'portfolio-icon-animate-on',
			numberOfElements: jsonData.length,
			randomNumber: 0, 
			nextEventName: 'animateSkillsIcon'
		}

		events.emit('animateSkillsIcon', input);

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

		var input = {
			selectedElement: 'portfolio-icon-tool',
			animateClass: 'portfolio-icon-animate-on',
			numberOfElements: jsonData.length,
			randomNumber: 0, 
			nextEventName: 'animateToolsIcon'
		}

		events.emit('animateToolsIcon', input);

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

var phpGetWorksLink = 'php/get-works.php';
var phpGetDescriptionsLink = 'php/get-descriptions.php';
var imagesLocation = 'img/portfolio/';
var imagesExtension = '.jpg';

var dbImageName = 'preview_image';
var dbPercentage = 'completion_percentage';
var dbProjectLink = 'link_website';
var dbGithubLink = 'link_github';
var dbDescriptionWorkId = 'work_id';
var dbDescription = 'description';
var dbWorkId = 'id';

var $template = $('#templateWorks');
var $rendered = $('#renderedWorks');

/********************************************************************************
FUNCTIONS
********************************************************************************/

function renderWorks(){

	$.getJSON(phpGetWorksLink, function (data) {

		jsonData = templateModule.fixImageRoutes(data, dbImageName, imagesLocation, imagesExtension, testDevice.screenSize());
		jsonData = templateModule.addColorClasses(data, dbPercentage);
		jsonData = templateModule.checkDisabledStatus(data, dbProjectLink, dbGithubLink);

		$.getJSON(phpGetDescriptionsLink, function (data){

			jsonData = jsonData.map(function (obj){

				obj.descriptions = [];

				for(var i = 0; i < data.length; i++){
					if(data[i][dbDescriptionWorkId] == obj[dbWorkId]){

						var descriptionObject = {
							description: data[i][dbDescription]
						}

						obj.descriptions.push(descriptionObject);
					}
				}
				return obj;
			})

			templateModule.renderTemplate($template, jsonData, $rendered);

		})

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