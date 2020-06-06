const element = (id) => document.getElementById(id);
const setUserName = (newName) => localStorage.setItem("userName", newName);
const getUserName = () => localStorage.getItem("userName") || "Click Here";
const setBackground = () => element('body').style.backgroundImage = `url(${getBackground()})`;
const getBackground = () => localStorage.getItem("background") || "../library/backgroundImage.jpg";
const enableNameEdit = () => element("name").setAttribute("contenteditable", "true");
const disableNameEdit = () => element("name").setAttribute("contenteditable", "false");

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
  element("greeting").innerText = getGreetTime();
  element("name").innerText = getUserName();
};

const showNameLengthError = (nameElement) => {
  disableNameEdit(nameElement);
  element("name").style.color = "crimson";
}

function addEventListeners() {
  const nameElement = element("name");
  nameElement.addEventListener("click", event => {
    enableNameEdit(nameElement);
  });

  nameElement.addEventListener("keypress", event => {
    const newName = nameElement.innerText;
    const nameCharLimit = 5;
    if (newName.length <= nameCharLimit || event.keyCode == 13) {
      element("name").style.color = "white";
    } else {
      showNameLengthError(nameElement);
    }
    if (event.keyCode == 13) {
      disableNameEdit(nameElement);
      if (newName.length <= nameCharLimit + 1) {
        setUserName(newName);
      }
    }
  });

  element('file-selector').addEventListener('change', event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', event => {
      localStorage.setItem("background", reader.result);
      setBackground();
    });
    reader.readAsDataURL(file);
  });
}

const initialize = () => {
  addEventListeners();
  greetUser();
  setBackground();
};
window.onload = initialize;