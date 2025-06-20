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
const getOneTemplate = document.querySelector(
  ".photo-of-the-day-form-template"
);
const getSeveralTemplate = document.querySelector(
  ".several-photos-form-template"
);
const getByDateTemplate = document.querySelector(
  ".photos-by-date-form-template"
);
let SeveralPhotosForm;
let photosByDate;
const infoPopup = document.querySelector(".information-popup");
const closePopupButton = document.querySelector(".close-button");

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
    severalPhotosAdding(evt);
  });
});

cardList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("photo-holder")) {
    const cardItem = evt.target.closest(".card-list-item");
    openPopup(
      cardItem.querySelector(".card-title").textContent,
      cardItem.querySelector(".author").textContent,
      cardItem.querySelector(".date").textContent,
      cardItem.querySelector(".photo-explanation").textContent,
      cardItem.querySelector(".photo-holder").getAttribute("src")
    );
  }
});

function openPopup(title, author, date, text, photoUrl) {
  infoPopup.style.display = "flex";
  infoPopup.querySelector(".popup-image").setAttribute("src", photoUrl);
  infoPopup.querySelector(".card-title").textContent = title;
  infoPopup.querySelector(".author").textContent = author;
  infoPopup.querySelector(".date").textContent = date;
  infoPopup.querySelector(".photo-info").textContent = text;
}

closePopupButton.addEventListener("click", () => {
  closePopup();
});

document.addEventListener("keydown", (evt) => {
  if (infoPopup.style.display === "flex") {
    closePopup();
  }
});

function closePopup() {
  infoPopup.style.display = "none";
  infoPopup.querySelector(".popup-image").setAttribute("src", "");
  infoPopup.querySelector(".card-title").textContent = "";
  infoPopup.querySelector(".author").textContent = "";
  infoPopup.querySelector(".date").textContent = "";
  infoPopup.querySelector(".photo-info").textContent = "";
}

byDatePicButton.addEventListener("click", () => {
  formsHolder.textContent = "";
  formsHolder.append(formRender(getByDateTemplate));
  photosByDate = document.querySelector(".photos-by-date-form");
  photosByDate.addEventListener("submit", (evt) => {
    evt.preventDefault();
    cardList.textContent = "";
    const startDate = evt.target.querySelector(".start-date");
    const finishDate = evt.target.querySelector(".finish-date");
    getPhotosByDate(startDate.value, finishDate.value);
  });
});

function severalPhotosAdding(evt) {
  evt.preventDefault();
  const NumberOfPhotosField = evt.target.querySelector(
    ".numder-of-photos-input"
  );
  getSeveralPhotos(NumberOfPhotosField.value);
}

//getPhotosByDate("2017-07-10", "2017-07-15");
function getPhotosByDate(start, finish) {
  console.log(start - finish)
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${keyApi}&start_date=${start}&end_date=${finish}`
  )
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
  cardList.textContent = "";
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
  cardPhoto.setAttribute("alt", cardTitleText);
  cardTitle.textContent = cardTitleText;
  cardAuthor.textContent = author;
  date.textContent = dateValue;

  return placeClonedCard;
}
