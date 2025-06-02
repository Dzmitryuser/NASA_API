const keyApi = "GviQzdKjoPGNyhx7DSnbn7zyBGqumbiShUSSVJEh"
const getButton = document.querySelector(".get-photo-button")
const photoField = document.querySelector(".photo-container")
const photoTitle = document.querySelector(".photo-title")
const photoExplanation = document.querySelector(".photo-explanation")
const author = document.querySelector(".author")
const date = document.querySelector(".date")

getButton.addEventListener("click", getPhotoInformation)


function getPhotoInformation() {
fetch(`https://api.nasa.gov/planetary/apod?api_key=${keyApi}`)
.then((res) => {
    return res.json()
})
.then((res) => {
    photoTitle.textContent = res.title
    photoExplanation.textContent = res.explanation
    photoField.setAttribute("src", `${res.hdurl}`)
    author.textContent = res.copyright
    date.textContent = res.date
})
}
