(function(){
	var compute = function() {
		document.getElementById('devicewidth').innerText = document.documentElement.clientWidth + 'px';
		document.getElementById('deviceheight').innerText = document.documentElement.clientHeight + 'px';
		document.getElementById('screenwidth').innerText =  screen.width + 'px';;
		document.getElementById('windowinnerwidth').innerText = window.innerWidth + 'px';
		document.getElementById('bodyclientwidth').innerText = document.body.clientWidth + 'px';
		document.getElementById('screenavailwidth').innerText = screen.availWidth + 'px';
	};
	
	window.onresize = function(event) {
    	compute();
	};
	
	document.addEventListener("DOMContentLoaded", compute);

})();