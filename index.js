const keyApi = "GviQzdKjoPGNyhx7DSnbn7zyBGqumbiShUSSVJEh";
let getButton;
const photoTitle = document.querySelector(".photo-title");
const cardTitle = document.querySelector(".card-title");
const cardTemplate = document.querySelector(".card-template");
const cardList = document.querySelector(".card-list");
const onePicButton = document.querySelector(".pic-of-the-day");
const severalPicButton = document.querySelector(".several-pic");
const byDatePicButton = document.querySelector(".pic-by-date");
const formsHolder = document.querySelector(".param-form-holder");
const getOneTemplate = document.querySelector(".photo-of-the-day-form-template");
const getSeveralTemplate = document.querySelector(".several-photos-form-template");
const getByDateTemplate = document.querySelector(".photos-by-date-form-template");
let SeveralPhotosForm;
let photosByDate;

function formRender(elem) {
  const clonedForm = elem.content.cloneNode(true);
  return clonedForm;
}

onePicButton.addEventListener("click", () => {
  formsHolder.textContent = "";
  formsHolder.append(formRender(getOneTemplate));
  getButton = document.querySelector(".get-photo-button");
  getButton.addEventListener("click", getPhotoOfTheDay);
});

severalPicButton.addEventListener("click", () => {
  formsHolder.textContent = "";
  formsHolder.append(formRender(getSeveralTemplate));
  SeveralPhotosForm = document.querySelector(".several-photos-form");
  SeveralPhotosForm.addEventListener("submit", (evt) => {
    cardList.textContent = "";
    severalPhotosAdding(evt)
  });
});

byDatePicButton.addEventListener("click", () => {
  formsHolder.textContent = "";
  formsHolder.append(formRender(getByDateTemplate));
  photosByDate = document.querySelector(".photos-by-date-form");
  photosByDate.addEventListener("submit", (evt) => {
    evt.preventDefault()
    cardList.textContent = "";
    const startDate = evt.target.querySelector(".start-date")
    const finishDate = evt.target.querySelector(".finish-date")
    console.log(startDate)
    getPhotosByDate(startDate.value, finishDate.value)
  });

});

function severalPhotosAdding (evt) {
  evt.preventDefault();
  const NumberOfPhotosField = evt.target.querySelector(".numder-af-photos-input")
  getSeveralPhotos(NumberOfPhotosField.value)
}

//getPhotosByDate("2017-07-10", "2017-07-15");
function getPhotosByDate(start, finish) {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${keyApi}&start_date=${start}&end_date=${finish}`
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((res) => {
      console.log(res);
      res.forEach((elem) => {
        cardList.append(
          cardRender(
            elem.explanation,
            elem.hdurl,
            elem.copyright,
            elem.date.split("-").reverse().join("."),
            elem.title
          )
        );
      });
    })
    .catch((error) => console.error("Ошибка при получении данных:", error));
}

function getSeveralPhotos(num) {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${keyApi}&count=${num}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      res.forEach((elem) => {
        cardList.append(
          cardRender(
            elem.explanation,
            elem.hdurl,
            elem.copyright,
            elem.date.split("-").reverse().join("."),
            elem.title
          )
        );
      });
    })
    .catch((error) => console.error("Ошибка при получении данных:", error));
}

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
    })
    .catch((error) => console.error("Ошибка при получении данных:", error));
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
