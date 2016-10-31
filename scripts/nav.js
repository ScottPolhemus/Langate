$(document).ready(function(){ 
	$(".menu-burger").click(function(){
  		$(".menu-burger").toggleClass("open");
  		$("main").toggleClass("slide");
  		$(".nav-links").toggleClass("open");
	});
})