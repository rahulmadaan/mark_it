const element = (id) => document.getElementById(id);
const setLocalItem = (key,value) => localStorage.setItem(key, value);
const getLocalItem = (key) => localStorage.getItem(key);
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
  if(getLocalItem("userName")){
    element("name").innerText = getLocalItem("userName")
  }
  else {
    element("name").innerText = "Guest";
    element("name").click();
    element("name").focus();
  }
};

const showNameLengthError = (nameElement) => {
  disableNameEdit();
  element("name").style.color = "crimson";
};

function addEventListeners() {
  const nameElement = element("name");
  nameElement.addEventListener("click", event => {
    enableNameEdit();
  });

  nameElement.addEventListener("keypress", event => {
    const newName = nameElement.innerText;
    const nameCharLimit = 25;
    if (newName.length <= nameCharLimit || event.keyCode === 13) {
      element("name").style.color = "white";
    } else {
      showNameLengthError();
    }
    if (event.keyCode === 13) {
      disableNameEdit(nameElement);
      if (newName.length <= nameCharLimit + 1) {
        setLocalItem("userName", newName);
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