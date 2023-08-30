
import { catsData } from "./data.js"

const emotionRadios = document.getElementById('emotion-radios')
const getImage = document.getElementById('get-image')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highLightsToRadio)

memeModalCloseBtn.addEventListener('click', closeModalBtn)

getImage.addEventListener('click', renderCats)

function highLightsToRadio(e) {
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios) {
        radio.classList.remove('highlights')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlights')
}

function closeModalBtn() {
    memeModal.style.display = 'none'
}

function renderCats() {
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
    <img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >
    `
    memeModal.style.display = 'flex'

}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()
    if (catsArray.length === 1) {
        return catsArray[0]
    } else {
        const randomCats = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomCats]
    }
}

function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked

        const matchingCatsArray = catsData.filter(function (cat) {

            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }
}

function getsEmotionRadios(cats) {
    let emotionArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionArray.includes(emotion)) {
                emotionArray.push(emotion)
            }
        }
    }
    return emotionArray
}

function renderEmotionsRadios(cats) {
    let itemRadios = ``
    const emotions = getsEmotionRadios(cats)
    for (let emotion of emotions) {
        itemRadios += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotion"
                >
            </div>
        `
    }
    emotionRadios.innerHTML = itemRadios
}

renderEmotionsRadios(catsData)






