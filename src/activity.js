const getPastData = () => {
  const data = localStorage.getItem("activity");
  return JSON.parse(data);
};

const isUrlExists = url => {
  const pastData = getPastData();
  return pastData.filter(entry => entry.url == url)[0];
};

const updateLocalData = data => {
  localStorage.setItem("activity", JSON.stringify(data));
};

const incrementVote = url => {
  const pastData = getPastData();
  pastData.map(tab => {
    if (tab.url == url) {
      tab.count = tab.count + 1;
    }
  });
  updateLocalData(pastData);
};

const addNewEntry = url => {
  const data = getPastData();
  data.push({ url: url, count: 0 });
  localStorage.setItem("activity", JSON.stringify(data));
};

const updateActivityData = url => {
  if (isUrlExists(url)) {
    incrementVote(url);
    return;
  }
  addNewEntry(url);
};

const main = () => {
  chrome.tabs.getCurrent(current => {
    chrome.tabs.getAllInWindow(tabs => {
      tabs.map(tab => {
        if (current && tab.active) {
          updateActivityData(tab.url);
        }
      });
    });
  });
};
const initializeActivity = () => {
  if (localStorage.getItem("activity") == null) {
    localStorage.setItem("activity", JSON.stringify([]));
  }
};

const initialize = () => {
  initializeActivity();
  setInterval(() => {
    main();
  }, 1000);
};
initialize();

//-----------sampleJSON-------------------
[
  {
    url: "domain.com",
    count: 10
  }
];
