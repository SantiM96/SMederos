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

    const showSuccess = (modal) => { 
        const color = $('.modal-content')
        const title = $('.modal-title')
        const msg = $('.modal-body p')

        modal.removeClass('animate__fadeOutDown')
        color.removeClass('modal-error')
        color.addClass('modal-success')
        title.html('Mensaje enviado')
        msg.html('Su mensaje ha sido enviado con éxito.')
        modal.show()
        setTimeout(() => {
            modal.addClass('animate__fadeOutDown')
        }, 7000);
    }

    const showError = (modal) => { 
        const color = $('.modal-content')
        const title = $('.modal-title')
        const msg = $('.modal-body p')

        modal.removeClass('animate__fadeOutDown')
        color.removeClass('modal-success')
        color.addClass('modal-error')
        title.html('Error')
        msg.html('Su mensaje no fue enviado, intente nuevamente.')
        modal.show()
        setTimeout(() => {
            modal.addClass('animate__fadeOutDown')
        }, 7000);
    }

    const showMsg = (modal, Msg) => {
        const color = $('.modal-content')
        const title = $('.modal-title')
        const msg = $('.modal-body p')

        modal.removeClass('animate__fadeOutDown')
        color.removeClass('modal-success')
        color.removeClass('modal-error')
        title.html('Mensaje')
        msg.html(Msg)
        modal.show()
        setTimeout(() => {
            modal.addClass('animate__fadeOutDown')
        }, 7000);
    }

    const crossClose = (modal) => {
        modal.addClass('animate__fadeOutDown')
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
        if (!(document.querySelector('#auto-add-active').querySelector('.active'))) {
            document.querySelector('#home-btn').classList.add('active')
        }
    }

    // add color to home initial
    if (!(document.querySelector('#auto-add-active').querySelector('.active'))) {
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



    // technologies //
    const plus = $('#plus'),
        minus = $('#minus'),
        hidden = $('#hidden')
    hidden.hide()
    plus.click( () => {
        plus.slideUp()
        hidden.slideDown()
    })
    minus.click( () => {
        plus.slideDown()
        hidden.slideUp()
    })
    // finish technologies //



    // contact //
    const send = $('#send')
    const modal = $('#modal')
    const modalCross = $('.btn-close')
    
    // send api //
    send.click( async (e) => {
        e.preventDefault()
        const name = $('#name').val(),
            email = $('#email').val(),
            phone = $('#phone').val(),
            message = $('#message').val()

        if ((email.length > 0 || phone.length > 0) && message.length > 0) {
            send.html("<div class='spinner'><span></span></div>")
            send[0].disabled = true;
            try {
                // const response = await fetch('http://localhost:3000/form', { // local
                const response = await fetch('https://backend-smederos-santim96.vercel.app/form', { // vercel

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        message
                    })
                })
                console.log(response)
                if (response.status === 200) {
                    send.html("Enviar")
                    send[0].disabled = false;
                    showSuccess(modal)
                } else {
                    send.html('Enviar')
                    send[0].disabled = false;
                    showError(modal)
                }
            } catch (error) {
                console.log(error)
                send.html('Enviar')
                send[0].disabled = false;
                showError(modal)
            }
        } else { // You must complete the required information
            showMsg(modal, 'Debe completar Email/Número y Mensaje para poder enviar.')
        }
    })
    // send api //

    modalCross.click( () => {
        crossClose(modal)
    })
    // contact //

    
    

});
