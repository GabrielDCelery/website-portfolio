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