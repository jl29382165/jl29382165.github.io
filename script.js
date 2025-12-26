let pc = window.matchMedia("(min-width: 1200px)");
let moblie = window.matchMedia("(max-width: 768px)");
console.log(pc);
console.log(moblie);

function setWidthTable() {
  console.log("setWidthTable");
}

function setWidthMoblie(pMatchMedia) {
  if (pMatchMedia.matches) {
    console.log("小於768px");
    const dataToggle = document.querySelectorAll("[data-toggle]");
    const menuToggle = document.getElementById("navbarSupportedContent");
    const bsCollapse = new bootstrap.Collapse(menuToggle, {
      toggle: false
    });

    dataToggle.forEach((item) => {
      item.addEventListener("click", () => {
        bsCollapse.toggle();
      });
    });
  } else {
    console.log("大於786px");
    setWidthTable();
  }
}

function setWidthPC(pMatchMedia) {
  if (pMatchMedia.matches) {
    console.log("大於1200px");
  } else {
    console.log("小於1200px");
    setWidthTable();
  }
}

moblie.addListener(setWidthMoblie);
pc.addListener(setWidthPC);


let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0;
}

// 自動收合漢堡選單
$(window).on('resize', function() {
    if ($(window).width() <= 992) {  // 手機版時才執行
        $('.nav-link').on('click', function() {
            $('.navbar-collapse').collapse('hide');
        });
    }
}).resize(); // 一開始就檢查一次視窗大小
