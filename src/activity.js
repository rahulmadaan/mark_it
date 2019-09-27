const ACTIVITY = "activity";

const getActivities = () => {
  const data = localStorage.getItem(ACTIVITY);
  return JSON.parse(data);
};

const isUrlExists = url => {
  const pastData = getActivities();
  return pastData.filter(entry => entry.url == url)[0];
};

const updateActivities = data => {
  localStorage.setItem(ACTIVITY, JSON.stringify(data));
};

const incrementCount = url => {
  const pastData = getActivities();
  pastData.map(tab => {
    if (tab.url == url) {
      tab.count = tab.count + 1;
    }
  });
  updateActivities(pastData);
};

const addNewActivity = url => {
  const data = getActivities();
  data.push({ url: url, count: 0 });
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
  if (localStorage.getItem(ACTIVITY) == null) {
    updateActivities([]);
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
