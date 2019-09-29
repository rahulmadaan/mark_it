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
const attachEventListenerOnButton = () => {
  document.getElementById("name-input-button").addEventListener("click", set);
};

const displayUser = () => {
  const userName = localStorage.getItem("userName");
  if (userName != null) {
    setUserName(userName);
  }
};

const initialize = () => {
  displayUser();
  attachEventListenerOnButton();
};

window.onload = initialize;
