const webs = document.getElementById("webs")
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
        }
        else position.classList.replace("d-block", "d-none")
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

//keep while the click is over webs and restore interval after leave the element
webs.addEventListener('mouseover', () => clearInterval(sliderAutomatic))
webs.addEventListener('mouseout', () => sliderAutomatic = setInterval(slider, setTimeInterval))