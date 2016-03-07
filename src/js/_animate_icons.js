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