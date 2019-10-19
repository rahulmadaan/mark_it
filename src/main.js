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
const bindEventListeners = () => {
  document.getElementById("name-input-button").addEventListener("click", set);

  document.body.addEventListener("click", e => {
    if (e.target.id !== "setting-div") {
      document.getElementById("setting-popup").style.width = "0%";
    } else {
      document.getElementById("setting-popup").style.width = "50%";
    }
  });
};
const displayUser = () => {
  const userName = localStorage.getItem("userName");
  if (userName != null) {
    setUserName(userName);
  }
};

const initialize = () => {
  displayUser();
  bindEventListeners();
};

window.onload = initialize;
