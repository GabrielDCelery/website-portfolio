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

	$renderedSkillsContainer.on('click', icon, function(){
		var $spanElements = $(this).find('span');
		$spanElements.toggle();
	});

	$renderedToolsContainer.on('click', icon, function(){
		var $spanElements = $(this).find('span');
		$spanElements.toggle();
	});



}());