var testDevice = (function(){

	function isMobile(){

		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			return true;
		}

	}

	return {

		isMobile: isMobile

	}


}());