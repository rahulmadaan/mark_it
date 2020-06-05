const getUserName = () => localStorage.getItem("userName") || "Click Here";
const getBackground = () => localStorage.getItem("background") || "../library/backgroundImage.jpg";
const element = (id) => document.getElementById(id);

function addEventListeners() {
  const nameElement = element("name");
  nameElement.addEventListener("click", event => {
    enableNameEdit(nameElement);
  });
  nameElement.addEventListener("mouseout", event => {
    disableNameEdit(nameElement);
  });
  nameElement.addEventListener("keypress", event => {
    if (event.keyCode == 13) {
      disableNameEdit(nameElement);
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
  element("greeting").innerText = greetTime;
  element("name").innerText = userName;
};

const setBackground = () => {
  const imageFile = getBackground();
  element('body').style.backgroundImage = `url(${imageFile})`;
};

const setUserName = () => {
  const newUserName = element("name").innerText;
  localStorage.setItem("userName", newUserName);
};

const enableNameEdit = (nameElement) => {
  console.log("why this");
  nameElement.setAttribute("contenteditable", "true");
};

const disableNameEdit = (nameElement) => {
  console.log("why this again");
  nameElement.setAttribute("contenteditable", "false");
  setUserName();
};

const initialize = () => {
  addEventListeners();
  greetUser();
  setBackground();
};
window.onload = initialize;