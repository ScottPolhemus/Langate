$(document).ready(function(){ 
	$(".menu-burger").click(function(){
  		$(".menu-burger").toggleClass("open");
  		$("main").toggleClass("slide");
  		$(".nav-wrapper").toggleClass("open");
	});
})