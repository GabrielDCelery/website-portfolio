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

			console.log(jsonData)

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