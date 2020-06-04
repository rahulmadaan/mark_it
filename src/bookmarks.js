const isBookmarkUncategorized = bookmark => !bookmark.children;

const createElement = (elementType, className, id = "", body = "") => {
  const element = document.createElement(elementType);
  element.className = className;
  element.id = id;
  element.innerHTML = body;
  return element;
};

const getAchorTag = bookmark => {
  const anchorTag = document.createElement("a");
  anchorTag.innerHTML = bookmark.title;
  anchorTag.className = "bookmark-url";
  anchorTag.href = bookmark.url;
  anchorTag.target = "_blank";
  return anchorTag;
};

const formatBookmark = bookmark => {
  const newBookmark = document.createElement("div");
  const anchorTag = getAchorTag(bookmark);
  newBookmark.className = "bookmark-div";
  newBookmark.appendChild(anchorTag);
  return newBookmark;
};

const createCategorizedBookmarks = bookmarkList => {
  const newCategory = createElement("div", "bookmark-list-body");

  bookmarkList.children.map(bookmark => {
    const newBookmark = formatBookmark(bookmark);
    newCategory.appendChild(newBookmark);
  });

  // const newCategoryHeading = createCategoryHeader(
  //   bookmarkList.title,
  //   bookmarkList.id
  // );

  // newCategory.appendChild(newCategoryBody);
  // newCategory.appendChild(newCategoryHeading);

  document
    .getElementById("categorized-bookmarks-container")
    .appendChild(newCategory);
};

const setupUncategorizedList = bookmark => {
  const bookmarksList = document.getElementById("uncategorized-bookmarks");
  const newBookmark = formatBookmark(bookmark);
  bookmarksList.appendChild(newBookmark);
};

const loadBookmarks = () => {
  chrome.bookmarks.getTree(output => {
    const bookmarks = output[0].children[0].children;

    bookmarks.map(bookmark => {
      if (isBookmarkUncategorized(bookmark)) {
        setupUncategorizedList(bookmark);
      } else {
        createCategorizedBookmarks(bookmark);
      }
    });
    // createUnCategorizedHeader();
  });
};

const initialize = () => {
  loadBookmarks();
};
initialize();