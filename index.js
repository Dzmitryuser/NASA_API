const keyApi = "GviQzdKjoPGNyhx7DSnbn7zyBGqumbiShUSSVJEh";
const getButton = document.querySelector(".get-photo-button");
const photoTitle = document.querySelector(".photo-title");
const cardTitle = document.querySelector(".card-title");
const cardTemplate = document.querySelector(".card-template");
const cardList = document.querySelector(".card-list");

getButton.addEventListener("click", getPhotoOfTheDay);

function getPhotoOfTheDay() {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${keyApi}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      cardList.append(
        cardRender(
          res.explanation,
          res.hdurl,
          res.copyright,
          res.date.split("-").reverse().join("."),
          res.title
        )
      );
    });
}

function cardRender(
  photoExplanation,
  photoField,
  author,
  dateValue,
  cardTitleText
) {
  const placeClonedCard = cardTemplate.content.cloneNode(true);
  const cardPhoto = placeClonedCard.querySelector(".photo-holder");
  const cardTitle = placeClonedCard.querySelector(".card-title");
  const cardAuthor = placeClonedCard.querySelector(".author");
  const date = placeClonedCard.querySelector(".date");
  const explanation = placeClonedCard.querySelector(".photo-explanation");

  if (!placeClonedCard) {
    console.error("Шаблон карточки не найден");
    return;
  }

  explanation.textContent = photoExplanation;
  cardPhoto.setAttribute("src", photoField);
  cardTitle.textContent = cardTitleText;
  cardAuthor.textContent = author;
  date.textContent = dateValue;

  return placeClonedCard;
}
