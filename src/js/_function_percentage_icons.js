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