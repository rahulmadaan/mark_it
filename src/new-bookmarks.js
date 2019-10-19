const haveChildren = entity => entity.children;
const isList = entity => Array.isArray(entity);

const createElement = (elementType, className, id = "", body = "") => {
  const element = document.createElement(elementType);
  element.className = className;
  element.id = id;
  element.innerHTML = body;
  return element;
};

const buildPaneElement = element => {
  const pane = document.getElementById("left-pane-bookmarks");
  if (haveChildren(element)) {
    const newElement = createElement("div", "", "", element.title);
    pane.appendChild(newElement);
    return;
  }
};

const buildPane = element => {
  if (haveChildren(element)) {
    element.children.map(ele => {
      buildPaneElement(ele);
      buildPane(ele);
    });
  }
};

const loadBookmarks = () => {
  chrome.bookmarks.getTree(output => {
    const bManager = output[0].children;
    bManager.map(bookmarkGroup => {
      buildPaneElement(bookmarkGroup);
      buildPane(bookmarkGroup);
    });
  });
};
loadBookmarks();
