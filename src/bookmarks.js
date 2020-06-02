const isBookmarkUncategorized = bookmark => !bookmark.children;

const extractSource = e => {
  const targetId = e.target.id.split("|");
  const prefix = targetId[0];
  const categoryId = targetId[1];
  const bookmarkId = targetId[2];
  const heading = targetId[3];
  return {
    prefix,
    categoryId,
    bookmarkId,
    heading
  };
};

const removeCategory = categoryId => {
  chrome.bookmarks.removeTree(categoryId.toString(), output =>
    console.log(output)
  );
};

const removeAllUncategorizedBookmarks = () => {
  chrome.bookmarks.getTree(output => {
    const bookmarks = output[0].children[0].children;

    bookmarks.map(bookmark => {
      if (isBookmarkUncategorized(bookmark)) {
        chrome.bookmarks.remove(bookmark.id.toString(), output =>
          console.log(output)
        );
      }
    });
  });
};

const removeBookmarksGroup = e => {
  const {
    prefix,
    categoryId,
    heading
  } = extractSource(e);
  const userConfirmation = prompt(
    "This will delete all the bookmarks of selected Category. \n Please type in the name of the to confirm. "
  );
  if (userConfirmation == heading) {
    if (prefix == "C") {
      removeCategory(categoryId);
      location.reload();
      return;
    }
    removeAllUncategorizedBookmarks();
    location.reload();
  }
};

const rebuildPopup = e => {
  closePopup();
  showPopup(e);
};

const deleteBookmark = e => {
  const {
    bookmarkId
  } = extractSource(e);
  chrome.bookmarks.remove(bookmarkId.toString(), res => {});
  rebuildPopup(e);
};

const closePopup = () => {
  const popup = document.getElementById("category-popup");
  popup.style.width = "0%";
  popup.innerHTML = "";
};

const getAchorTag = bookmark => {
  const anchorTag = document.createElement("a");
  anchorTag.innerHTML = bookmark.title;
  anchorTag.href = bookmark.url;
  anchorTag.target = "_blank";
  return anchorTag;
};

const createElement = (elementType, className, id = "", body = "") => {
  const element = document.createElement(elementType);
  element.className = className;
  element.id = id;
  element.innerHTML = body;
  return element;
};

const formatBookmark = bookmark => {
  const newBookmark = document.createElement("div");
  const anchorTag = getAchorTag(bookmark);

  newBookmark.className = "categorized-bookmark";
  newBookmark.appendChild(anchorTag);
  return newBookmark;
};

const buildPopupHeader = (heading, categoryId) => {
  const popupHeader = createElement("div", "popup-header");
  let prefix = "UC";
  if (categoryId) {
    prefix = "C";
  }
  const popupCategoryRemoveBtn = createElement(
    "button",
    "popup-remove-category-btn",
    `${prefix}|${categoryId}||${heading}`,
    "	&#128465;"
  );
  popupCategoryRemoveBtn.onclick = removeBookmarksGroup;
  popupCategoryRemoveBtn.title = "Delete";

  const popupHeading = createElement("div", "popup-heading", "", heading);
  const popupCloseBtn = createElement(
    "button",
    "popup-close-btn",
    "",
    "&#x274C"
  );
  popupCloseBtn.onclick = closePopup;
  popupCloseBtn.title = "Close";

  popupHeader.appendChild(popupCategoryRemoveBtn);
  popupHeader.appendChild(popupHeading);
  popupHeader.appendChild(popupCloseBtn);

  return popupHeader;
};

const createBookmarkEntity = (bookmarkTitle, bookmarkId, categoryId, title) => {
  let prefix = "UC";
  if (categoryId) {
    prefix = "C";
  }
  const bookmarkEntity = createElement("div", "popup-bookmark");

  const bookmarkBody = createElement(
    "div",
    "popup-bookmark-description",
    "",
    bookmarkTitle
  );

  const deleteButton = createElement(
    "div",
    "popup-bookmark-delete-btn",
    `${prefix}|${categoryId}|${bookmarkId}|${title}`,
    "&#9986"
  );
  deleteButton.onclick = deleteBookmark;
  bookmarkEntity.appendChild(bookmarkBody);
  bookmarkEntity.appendChild(deleteButton);
  return bookmarkEntity;
};

const createCatPopup = (popup, categoryId, heading) => {
  const popupList = document.getElementById("popup-list-div");
  chrome.bookmarks.getChildren(categoryId.toString(), bookmarks => {
    bookmarks.map(bookmark => {
      const bookmarkEntity = createBookmarkEntity(
        bookmark.title,
        bookmark.id,
        categoryId,
        heading
      );
      popupList.appendChild(bookmarkEntity);
    });
  });
  popup.appendChild(popupList);
};

const buildUnCatPopupBody = (popup, heading) => {
  chrome.bookmarks.getTree(output => {
    const bookmarks = output[0].children[0].children;

    bookmarks.map(bookmark => {
      if (isBookmarkUncategorized(bookmark)) {
        const bookmarkEntity = createBookmarkEntity(
          bookmark.title,
          bookmark.id,
          "",
          heading
        );
        popup.appendChild(bookmarkEntity);
      }
    });
  });
};

const showPopup = e => {
  const popup = document.getElementById("category-popup");
  popup.style.width = "50%"; // show popup

  const {
    prefix,
    categoryId,
    heading
  } = extractSource(e);

  const popupHeader = buildPopupHeader(heading, categoryId);
  popup.appendChild(popupHeader);

  if (prefix == "C") {
    createCatPopup(popup, categoryId, heading);
    return;
  }
  buildUnCatPopupBody(popup, heading);
};

const createCategoryHeader = (heading, categoryId) => {
  const category = createElement(
    "div",
    "category-heading",
    `C|${categoryId}||${heading}`,
    heading
  );
  category.onclick = showPopup;
  category.style.cursor = "pointer";
  return category;
};

const setupUncategorizedList = bookmark => {
  const bookmarksList = document.getElementById(
    "uncategorized-bookmarks"
  );
  const anchorTag = getAchorTag(bookmark);

  const newBookmark = document.createElement("div");
  newBookmark.className = "uncategorized-bookmark";
  newBookmark.appendChild(anchorTag);

  bookmarksList.appendChild(newBookmark);
};

const createCategorizedBookmarks = bookmarkList => {
  const newCategory = createElement("div", "category-new");
  const newCategoryBody = createElement("div", "category-body-bookmarks");

  bookmarkList.children.map(bookmark => {
    const newBookmark = formatBookmark(bookmark);
    newCategoryBody.appendChild(newBookmark);
  });

  const newCategoryHeading = createCategoryHeader(
    bookmarkList.title,
    bookmarkList.id
  );

  newCategory.appendChild(newCategoryBody);
  newCategory.appendChild(newCategoryHeading);
  document
    .getElementById("categorized-bookmarks-body")
    .appendChild(newCategory);
};

const createUnCategorizedHeader = () => {
  const unCategorizedBody = document.getElementById(
    "uncategorized-bookmarks"
  );
  const header = createElement(
    "div",
    "uncategorized-bookmarks-body-header",
    `"UC"|||UnCategorized`,
    "UnCategorized"
  );
  header.onclick = showPopup;
  unCategorizedBody.appendChild(header);
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
    createUnCategorizedHeader();
  });
};

const initialize = () => {
  loadBookmarks();
};
initialize();