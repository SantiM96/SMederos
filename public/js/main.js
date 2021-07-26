document.addEventListener('DOMContentLoaded', function () {

    // slider //
    const webs = document.getElementById("webs"),
        totalWebs = document.querySelectorAll(".webToSlider"),
        thumbnailTotal = document.querySelectorAll(".thumbnail"),
        thumbnailContainer = document.querySelector("#thumbnailContainer"),
        btnsMobile = document.querySelectorAll('.btn-sec'),
        setTimeInterval = 10000

    // inital interval
    let sliderAutomatic = setInterval(slider, setTimeInterval),
        count = 0,
        secuence = false

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
        //with the checked on, not restart the interval
        if (!secuence || window.screen.width > 992) {
            console.log("delegation")
            clearInterval(sliderAutomatic)
            sliderAutomatic = setInterval(slider, setTimeInterval)
        }
    })

    // keep while the click is over webs and restore interval after leave the element in desktop version
    webs.addEventListener('mouseover', () => {
        if (window.screen.width > 992) clearInterval(sliderAutomatic)
    })
    webs.addEventListener('mouseout', () => {
        if (window.screen.width > 992) sliderAutomatic = setInterval(slider, setTimeInterval)
    })
    if (window.screen.width > 992) for (btnMo of btnsMobile) btnMo.parentNode.parentNode.classList.add('d-none')
    // keep while the button mobile is checked and restore interval after quit checked
    for (btnMo of btnsMobile) {
        btnMo.addEventListener('click', function () {
            if (!secuence) {
                //stop
                console.log("click stop " + secuence)
                secuence = true
                clearInterval(sliderAutomatic)
                for (btnToTrue of btnsMobile) btnToTrue.checked = true
            } else {
                //restart secuence
                console.log("click restart " + secuence)
                secuence = false
                sliderAutomatic = setInterval(slider, setTimeInterval)
                for (btnToTrue of btnsMobile) btnToTrue.checked = false
            }
        })
    }
    // calculate time into the internal sliders
    const elementsTimeInternal = document.querySelectorAll('.data-bs-interval')
    for (element of elementsTimeInternal) element.setAttribute('data-bs-interval', setTimeInterval / 3)
    // add notification in the internal slider
    if (window.screen.width > 992) {
        const imgNotification = document.querySelector('#webs aside')
        for (element of elementsTimeInternal) {
            element.addEventListener('mouseover', () => {
                imgNotification.style.opacity = 1
                imgNotification.style.display = 'inline'
            })
            element.addEventListener('mouseout', () => imgNotification.style.opacity = 0)
        }
    }
    // Set height on starting height
    setTimeout(() => {
        document.querySelector('.portafolio').style.height = `${document.querySelector('.portafolio').offsetHeight}px`
    }, 1000);
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
        } else if (heightToChange >= window.scrollY && !change) {
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
