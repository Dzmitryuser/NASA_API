const keyApi = "GviQzdKjoPGNyhx7DSnbn7zyBGqumbiShUSSVJEh"
const getButton = document.querySelector(".get-photo-button")
const photoField = document.querySelector(".photo-holder")
const photoTitle = document.querySelector(".photo-title")
const photoExplanation = document.querySelector(".photo-explanation")
const author = document.querySelector(".author")
const date = document.querySelector(".date")
const cardTitle = document.querySelector(".card-title")

getButton.addEventListener("click", getPhotoOfTheDay)


function getPhotoOfTheDay() {
fetch(`https://api.nasa.gov/planetary/apod?api_key=${keyApi}`)
.then((res) => {
    return res.json()
})
.then((res) => {
    photoExplanation.textContent = res.explanation
    photoField.style.backgroundImage = `url('${res.hdurl}')`
    author.textContent = res.copyright
    date.textContent = res.date.split("-").reverse().join(".")
    cardTitle.textContent = res.title
})
}
