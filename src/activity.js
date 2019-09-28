const getActivities = () => {
  const data = localStorage.getItem("activity");
  return JSON.parse(data);
};

const isUrlExists = url => {
  const pastData = getActivities();
  return pastData.filter(entry => entry.url == url)[0];
};

const updateActivities = data => {
  localStorage.setItem("activity", JSON.stringify(data));
};

const isUrlValid = url => {
  return url !== "chrome://newtab/";
};

const incrementCount = url => {
  const pastData = getActivities();
  pastData.map(tab => {
    if (tab.url == url) {
      tab.count = tab.count + 1;
      updateActivities(pastData);
    }
  });
};

const addNewActivity = url => {
  const data = getActivities();
  data.push({ url, count: 0 });
  updateActivities(data);
};

const updateActivityData = url => {
  if (isUrlExists(url)) {
    incrementCount(url);
    return;
  }
  addNewActivity(url);
};

const main = () => {
  chrome.tabs.getAllInWindow(tabs => {
    tabs.map(tab => {
      if (tab.active && isUrlValid(tab.url)) {
        updateActivityData(tab.url);
      }
    });
  });
};
const ensureStartUp = () => {
  if (localStorage.getItem("activity") == null) {
    updateActivities([]);
  }
};
const startMonitoring = () => {
  ensureStartUp();

  setInterval(() => {
    main();
  }, 1000);
};

startMonitoring();

//-----------sampleJSON-------------------
[
  {
    url: "domain.com",
    count: 10
  }
];
