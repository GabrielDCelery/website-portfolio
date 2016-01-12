(function(){

/********************************************************************************
VARIABLES
********************************************************************************/

var $renderedSkillsContainer = $('#renderedSkills');
var icon = '.percentage-circle';

/********************************************************************************
EVENT BINDERS
********************************************************************************/

	$renderedSkillsContainer.on('click', icon, function(){
		var $spanElements = $(this).find('span');
		$spanElements.toggle();
	});


}());