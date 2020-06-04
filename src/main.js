const writeOnConsole = () => {
  console.log("Something Happens?");
};

const enableNameInput = () => {
  document.getElementById("name").style.display = "none";
  document.getElementById("nameInput").style.display = "inline-block";
};
const exitNameInput = () => {
  document.getElementById("name").style.display = "flex";
  document.getElementById("nameInput").style.display = "none";
};


// const createElement = (elementType, className, id = "", body = "") => {
//   const element = document.createElement(elementType);
//   element.className = className;
//   element.id = id;
//   element.innerHTML = body;
//   return element;
// };

// const closePopup = () => {
//   document.getElementById("popup-body").innerHTML = null;
//   document.getElementById("popup-main").style.display = "none";
// };
// const showPopup = () => {
//   closePopup();
//   document.getElementById("popup-main").style.display = "block";
// };

// const clearInputField = () => {
//   document.getElementById("name-input").value = "";
// };

// const setUserName = () => {
//   const userName = document.getElementById("name-input").value;
//   if (userName != "") {
//     localStorage.setItem("userName", userName);
//     greetUser();
//     clearInputField();
//   }
// };

// const buildImagePopup = () => {
//   const popupHeaderText = document.getElementById("popup-header-text");
//   popupHeaderText.innerHTML = "Change Background Image";
//   showPopup();
//   // const imageInputBox = createElement("input", "inputFileToLoad");
//   // imageInputBox.type = "file";

//   // const box = createElement("div", "", "", `Add Image: ${box}`);
//   // console.log("box is", box);
// };

// // const alreadyHasWidth = width => {
// //   return +width.substr(0, width.length - 1) > 0 || 0;
// // };

// const buildNamePopup = () => {
//   // const popup = document.getElementById("popup-main").style.width;

//   // if (alreadyHasWidth(popup)) {
//   //   return;
//   // }

//   const popupHeaderText = document.getElementById("popup-header-text");
//   popupHeaderText.innerHTML = "Change  Greeting  Name";
//   showPopup();
//   const popupBody = document.getElementById("popup-body");

//   nameInputBox = createElement("input", "", "name-input");
//   nameInputBox.placeholder = "Type your name here.....";
//   nameInputBox.autocomplete = "off";

//   const nameInputButton = createElement(
//     "button",
//     "",
//     "name-input-button",
//     "Update"
//   );
//   nameInputButton.onclick = setUserName;
//   popupBody.appendChild(nameInputBox);
//   popupBody.appendChild(nameInputButton);
// };

const getUserName = () => localStorage.getItem("userName") || "Click Here";
const getBackground = () => localStorage.getItem("background") || "../library/backgroundImage.jpg";

const getGreetTime = () => {
  const today = new Date();
  const currentHours = today.getHours();
  let greetTime = "Morning";
  if (currentHours > 11 && currentHours <= 16) {
    greetTime = "Afternoon";
  }
  if (currentHours > 16 && currentHours <= 20) {
    greetTime = "Evening";
  }
  if (currentHours > 20 || currentHours <= 5) {
    greetTime = "Night";
  }
  return "Good " + greetTime;
};

const greetUser = () => {
  const greetTime = getGreetTime();
  const userName = getUserName();
  document.getElementById("greeting").innerText = greetTime;
  document.getElementById("name").innerText = userName;
};


const setBackground = () => {
  const imageFile = getBackground();
  document.getElementById('body').style.backgroundImage = `url(${imageFile})`;
};

const initialize = () => {
  // document
  //   .getElementById("image-popup")
  //   .addEventListener("click", buildImagePopup);
  // document
  //   .getElementById("greeting-name-box")
  //   .addEventListener("click", buildNamePopup);
  // document
  //   .getElementById("popup-close").addEventListener("click", closePopup);
  document.getElementById("name").addEventListener("mouseover", enableNameInput);
  document.getElementById("nameInput").onkeydown = event => {
    if (event.keyCode == 27) {
      exitNameInput();
    }
  }
  document.getElementById('file-selector').addEventListener('change', event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', event => {
      localStorage.setItem("background", reader.result);
      setBackground();
    });
    reader.readAsDataURL(file);
  });
  greetUser();
  setBackground();
};

window.onload = initialize;