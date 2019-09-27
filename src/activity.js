const main = () => {
  chrome.tabs.getAllInWindow(tabs => {
    tabs.map(tab => {
      if (tab.active) {
        console.log("url is", tab.url);
      }
    });
  });
};
const initializeActivity = () => {
  if (localStorage.getItem("activity") == null) {
    localStorage.setItem("activity", JSON.stringify([]));
  }
};

initializeActivity();
//-----------sampleJSON-------------------
[
  {
    url: "domain.com",
    count: 10
  }
];
