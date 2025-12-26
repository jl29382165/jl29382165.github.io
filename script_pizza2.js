$(window).scroll(function (e) {
  if ($(window).scrollTop() <= 0) $(".explore,.navbar").addClass("at_top");
  else $(".explore,.navbar").removeClass("at_top");
});

$(document).on("click", "a", function (event) {
  event.preventDefault();
  var target = $(this).attr("href");
  console.log(target);
  $("html,body").animate(
    {
      scrollTop: $(target).offset().top
    },
    500
  );
});

function detect_cat(cat_id,x){
  var catplace=catplace=$(cat_id).offset().left+$("#cat").width()/2;
  if(Math.abs(x-catplace)<80)
    $(cat_id).css("bottom","0px")
  else
    $(cat_id).css("bottom","-70px")
}





$(window).mousemove(function (evt) {
  var pagex = evt.pageX;
  var pagey = evt.pageY;

  var x = pagex - $("#section_about").offset().left;
  var y = pagey - $("#section_about").offset().top;
  console.log(x + "," + y);

  if(y<0 || y>$("#section_about").outerHeight())
    $("#cross").css("opacity",0);
  else
    $("#cross").css("opacity",0);
  
  $("#cross").css("left", x + "px");
  $("#cross").css("top", y + "px");
  
  var catplace=$("#cat").offset().left+$("#cat").width()/2;
  var cattop=$("#cat").offset().top;
  var img_url="https://awiclass.monoame.com/catpic/";
  
  if(pagex<catplace-50)
    $("#cat").attr("src","https://res-console.cloudinary.com/df0cwejff/thumbnails/v1/image/upload/v1707653048/c2hpcm1wX19sZWZ0X3psbmxtNw==/grid_landscape")
  else if(pagex>catplace+50)
    $("#cat").attr("src","https://res-console.cloudinary.com/df0cwejff/thumbnails/v1/image/upload/v1707653048/c2hpcm1wX19yaWdodF9oMXNteXo=/grid_landscape")
  else
    $("#cat").attr("src","https://res-console.cloudinary.com/df0cwejff/thumbnails/v1/image/upload/v1707653049/c2hpcm1wX190b3BfZG8wbnY5/grid_landscape")
  
  if(pagex<catplace-50 && pagey<cattop)
    $("#cat").attr("src","https://res-console.cloudinary.com/df0cwejff/thumbnails/v1/image/upload/v1707653048/c2hpcm1wX19sZWZ0dG9wX2h2dWNlYw==/grid_landscape")
  if(pagex>catplace+50 && pagey<cattop)
    $("#cat").attr("src","https://res-console.cloudinary.com/df0cwejff/thumbnails/v1/image/upload/v1707653049/c2hpcm1wX19yaWdodHRvcF9peTBxa2o=/grid_landscape")
  

  
  $(".r1text").css("transform", "translateX(" + y / -10 + "px)");
  $(".r2text").css("transform", "translateX(" + y / -10 + "px)");
  $(".r3text").css("transform", "translateX(" + y / +15 + "px)");

  $(".tri1").css("transform", "translateX(" + x / -5 + "px)");
  $(".tri2").css("transform", "translateX(" + x / -10 + "px)");
  $(".tri3").css("transform", "translateX(" + x / -15 + "px)");
  $(".tri4").css("transform", "translateX(" + x / -20 + "px)");
  $(".tri5").css("transform", "translateX(" + x / -25 + "px)");

  detect_cat("#cat_yellow",pagex);
  detect_cat("#cat_blue",pagex);
  detect_cat("#cat_grey",pagex); 

  
  $(".mountain").css("transform", "translateX(" + (pagex / -20 + 80) + "px)");
});



// // ---
// let mybutton = document.getElementById("myBtn");

// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// function topFunction() {
//   document.body.scrollTop = 0; 
//   document.documentElement.scrollTop = 0;
// }