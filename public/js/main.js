$(document).ready(function () {
    // slider //
    const webs = document.getElementById("webs"),
        totalWebs = document.querySelectorAll(".webToSlider"),
        thumbnailTotal = document.querySelectorAll(".thumbnail"),
        thumbnailContainer = document.querySelector("#thumbnailContainer"),
        setTimeInterval = 5000

    let sliderAutomatic = setInterval(slider, setTimeInterval),
        state = false,
        count = 0

    function slider() {
        count++
        if (count == totalWebs.length) count = 0
        selectCard(totalWebs)
    }

    function selectCard(totalElements, nImg = count) {
        for (position of totalElements) {
            if (position == totalElements[nImg]) {
                position.classList.replace("d-none", "d-block")

                document.getElementsByClassName("activeBar")[0].classList.remove("activeBar")
                thumbnailTotal[count].classList.add("activeBar")
            } else position.classList.replace("d-block", "d-none")
        }
    }

    // Delegation for thumbnail
    thumbnailContainer.addEventListener('click', e => {
        if (e.target == thumbnailContainer) return
        let thumbClicked = parseInt(e.target.getAttribute('data-number'))
        selectCard(totalWebs, thumbClicked)
        document.getElementsByClassName("activeBar")[0].classList.remove("activeBar")
        thumbnailTotal[thumbClicked].classList.add("activeBar")
        count = thumbClicked
        clearInterval(sliderAutomatic)
        sliderAutomatic = setInterval(slider, setTimeInterval)
    })

    // keep while the click is over webs and restore interval after leave the element
    webs.addEventListener('mouseover', () => clearInterval(sliderAutomatic))
    webs.addEventListener('mouseout', () => sliderAutomatic = setInterval(slider, setTimeInterval))
    // finish slider //



    // navbar //
    const body = $("body"),
        navbar = $("#auto-add-active"),
        home = $("#home"),
        parentNav = $("#myName")

    let heightToChange = home.height() / 2 + parentNav.height() / 2,
        change = true
    
    // move to top side
    window.onscroll = () => {
        if (heightToChange <= window.scrollY && change) {
            navbar.remove()
            home.before(navbar)
            heightToChange = home.height() / 2 + parentNav.height() * 1.02
            change = false
            navbar
                .removeClass('gradient-nav')
                .removeClass('animate__pulse')
                .addClass('animate__fadeInDown')
        }
        else if (heightToChange >= window.scrollY && !change) {
            navbar.remove()
            parentNav.append(navbar)
            heightToChange = home.height() / 2 + parentNav.height() / 2
            change = true
            navbar
                .addClass('gradient-nav')
                .removeClass('animate__fadeInDown')
                .addClass('animate__pulse')
        }
        // add color to home
        if (!(document.querySelector('.active'))) {
            document.querySelector('#home-btn').classList.add('active')
        }
    }

    // add color to home initial
    if (!(document.querySelector('.active'))) {
        document.querySelector('#home-btn').classList.add('active')
    }

    // Delegation for auto close in movile version
    if (window.screen.width < 992) {
        let menuBtn = document.querySelector('#menu-btn')
        document.querySelector('#auto-add-active').addEventListener('click', () => {
            menuBtn.click()
        })
        document.querySelector('body').addEventListener('click', () => {
            if ($('#navbarSupportedContent').hasClass('show')) {
                $('#navbarSupportedContent').removeClass('show')
            }
        })
    }
    // finish navbar //



    

});
