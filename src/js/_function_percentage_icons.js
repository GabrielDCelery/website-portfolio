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

	$renderedSkillsContainer.on('click', icon, toggleImage);

	$renderedSkillsContainer.on('mouseenter', icon, toggleImage);

	$renderedSkillsContainer.on('mouseleave', icon, toggleImage);

	$renderedToolsContainer.on('click', icon, toggleImage);

	$renderedToolsContainer.on('mouseenter', icon, toggleImage);

	$renderedToolsContainer.on('mouseleave', icon, toggleImage);

/********************************************************************************
FUNCTIONS
********************************************************************************/

function toggleImage(event){

	var $spanElements = $(this).find('span');
	$spanElements.toggle();

}


}());