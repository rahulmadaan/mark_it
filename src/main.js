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
const updateImages = newImage => {
  chrome.storage.local.get("background-images", images => {
    images["background-images"].push(newImage);
    chrome.storage.local.set(
      { "background-images": images["background-images"] },
      out => {}
    );
  });
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

  document.getElementById("setting-div").addEventListener("click", e => {
    document.getElementById("setting-popup").style.width = "50%";
  });

  document
    .getElementById("inputFileToLoad")
    .addEventListener("change", uploadImage);
};
const displayUser = () => {
  const userName = localStorage.getItem("userName");
  if (userName != null) {
    setUserName(userName);
  }
};

const setupStorage = () => {
  chrome.storage.local.get("background-images", images => {
    if (Object.keys(images).length < 1) {
      chrome.storage.local.set({ "background-images": [] }, a =>
        console.log(a)
      );
    }
  });
};

const addImage = src => {
  const newImage = {
    src,
    isActive: false
  };
  updateImages(newImage);
};
const uploadImage = function() {
  var filesSelected = document.getElementById("inputFileToLoad").files;
  var fileToLoad = filesSelected[0];
  var fileReader = new FileReader();
  fileReader.readAsDataURL(fileToLoad);

  fileReader.onload = fileLoadedEvent => {
    var srcData = fileLoadedEvent.target.result;
    addImage(srcData);
  };
};

const initialize = () => {
  displayUser();
  bindEventListeners();
  setupStorage();
};

window.onload = initialize;
