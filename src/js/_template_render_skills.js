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