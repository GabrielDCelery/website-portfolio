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