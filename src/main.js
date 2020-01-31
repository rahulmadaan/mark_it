const setUserName = userName => {
  const today = new Date();
  const currentHours = today.getHours();
  let greetingPrefix = "Good Morning";
  if (currentHours > 11 && currentHours < 16) {
    greetingPrefix = "Good Afternoon";
  }
  if (currentHours > 15 && currentHours <= 23) {
    greetingPrefix = "Good Evening";
  }
  document.getElementById(
    "greeting"
  ).innerText = `${greetingPrefix} \t ${userName}`;
};
const createElement = (elementType, className, id = "", body = "") => {
  const element = document.createElement(elementType);
  element.className = className;
  element.id = id;
  element.innerHTML = body;
  return element;
};

const clearInputField = () => {
  document.getElementById("name-input").value = "";
};

const set = () => {
  const userName = document.getElementById("name-input").value;
  if (userName != "") {
    localStorage.setItem("userName", userName);
    setUserName(userName);
    clearInputField();
  }
};

const displayUser = () => {
  const userName = localStorage.getItem("userName");
  if (userName != null) {
    setUserName(userName);
  }
};
const buildImagePopup = () => {
  showPopup();
};
const buildNamePopup = () => {
  showPopup();
  const popupHeader = document.getElementById("popup-header");
  popupHeader.innerHTML = "Change Greeting Name";
  const popupBody = document.getElementById("popup-body");

  const userInput = createElement("div", "", "user-input-div");
  const nameInputBox = createElement("input", "", "name-input");
  nameInputBox.placeholder = "Type your name here.....";

  const nameInputButton = createElement(
    "button",
    "",
    "name-input-button",
    "Update"
  );
  nameInputButton.onclick = set;

  userInput.appendChild(nameInputBox);
  userInput.appendChild(nameInputButton);

  popupBody.appendChild(userInput);
};
const showPopup = () => {
  document.getElementById("popup-main").style.width = "30%";
};

const initialize = () => {
  document
    .getElementById("image-popup")
    .addEventListener("click", buildImagePopup);
  document
    .getElementById("greeting-name-box")
    .addEventListener("click", buildNamePopup);

  displayUser();
};

window.onload = initialize;
