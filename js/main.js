
const web1 = document.querySelector("#web1"),
    web2 = document.querySelector("#web2"),
    web3 = document.querySelector("#web3"),
    web4 = document.querySelector("#web4"),
    thumbnail = document.getElementsByClassName("thumbnail"),
    webs = $("#webs"),
    setTimeInterval = 5000

let sliderAutomatic = setInterval(slider, setTimeInterval),
    state = false,
    count = 0;

webs.hover(() => {
    state = !state;
    if (state == true) {
        clearInterval(sliderAutomatic);
    } else {
        sliderAutomatic = setInterval(slider, setTimeInterval);
    }
});

function slider() {
    count++;
    selectCard(count);
}

function selectCard(n) {
    clearInterval(sliderAutomatic)
    if (n == 1) {
        web1.classList.replace("d-block", "d-none");
        web2.classList.replace("d-none", "d-block");
        web3.classList.replace("d-block", "d-none");
        web4.classList.replace("d-block", "d-none");
        document
            .getElementsByClassName("activeBar")[0]
            .classList.remove("activeBar");
        thumbnail[n].classList.add("activeBar");
        count = n;
    }
    if (n == 2) {
        web1.classList.replace("d-block", "d-none");
        web2.classList.replace("d-block", "d-none");
        web3.classList.replace("d-none", "d-block");
        web4.classList.replace("d-block", "d-none");
        document
            .getElementsByClassName("activeBar")[0]
            .classList.remove("activeBar");
        thumbnail[n].classList.add("activeBar");
        count = n;
    }
    if (n == 3) {
        web1.classList.replace("d-block", "d-none");
        web2.classList.replace("d-block", "d-none");
        web3.classList.replace("d-block", "d-none");
        web4.classList.replace("d-none", "d-block");
        document
            .getElementsByClassName("activeBar")[0]
            .classList.remove("activeBar");
        thumbnail[n].classList.add("activeBar");
        count = n;
    }
    if (n == 4) {
        web1.classList.replace("d-none", "d-block");
        web2.classList.replace("d-block", "d-none");
        web3.classList.replace("d-block", "d-none");
        web4.classList.replace("d-block", "d-none");
        document
            .getElementsByClassName("activeBar")[0]
            .classList.remove("activeBar");
        thumbnail[0].classList.add("activeBar");
        count = 0;
    }
}

$("#slide_nav_button").click(function () {
    $("#slide_menu").animate({
        width: "toggle",
        height: "toggle",
    }, 500 );
});

if (screen.availWidth < 767) {
    $("#slide_menu li").click(function () {
        $("#slide_menu").show();

        $("#slide_menu").animate({
            width: "toggle",
            height: "toggle",
        }, 500 );
    });
}