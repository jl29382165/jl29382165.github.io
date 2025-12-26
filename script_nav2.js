let pc = window.matchMedia('(min-width: 1200px)');
    let moblie = window.matchMedia('(max-width: 768px)');
    console.log(pc);
    console.log(moblie);


    function setWidthTable() {
        console.log('setWidthTable');

    }


    function setWidthMoblie(pMatchMedia) {
        if (pMatchMedia.matches) {
            console.log('小於768px');
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
            console.log('大於786px');
            setWidthTable();
        }
    }

    function setWidthPC(pMatchMedia) {
        if (pMatchMedia.matches) {
            console.log('大於1200px');

        } else {
            console.log('小於1200px');
            setWidthTable();
        }

    }

    moblie.addListener(setWidthMoblie);
    pc.addListener(setWidthPC);