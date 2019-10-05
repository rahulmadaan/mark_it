const isBookmarkUncategorized = bookmark => !bookmark.children;

const removeCategory = e => {
  const categoryId = e.target.id;
  chrome.bookmarks.remove(categoryId.toString(), output => console.log(output));
  location.reload();
};

const closePopup = () => {
  document.getElementById("category-popup").style.width = "0%";
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

const showPopup = e => {
  const categoryId = e.target.id;
  const popup = document.getElementById("category-popup");
  const heading = e.target.innerHTML;

  const popupCategoryRemoveBtn = createElement(
    "button",
    "popup-remove-category-btn",
    categoryId,
    "Delete"
  );
  popupCategoryRemoveBtn.onclick = removeCategory;
  const popupCloseBtn = createElement(
    "button",
    "popup-close-btn",
    "",
    "close X"
  );
  popupCloseBtn.onclick = closePopup;
  const popupHeading = createElement("div", "popup-heading", "", heading);
  const popupHeader = createElement("div", "popup-header");

  popupHeader.appendChild(popupCategoryRemoveBtn);
  popupHeader.appendChild(popupHeading);
  popupHeader.appendChild(popupCloseBtn);

  popup.appendChild(popupHeader);
  popup.style.width = "50%"; // show popup

  const popupBody = document.createElement("div");
  popupBody.className = "popup-body";
  chrome.bookmarks.getChildren(categoryId.toString(), bookmarks => {
    bookmarks.map(bookmark => {
      const entity = document.createElement("div");
      entity.className = "popup-bookmark";

      const element = document.createElement("div");
      element.className = "popup-bookmark-description";
      element.innerHTML = bookmark.title;

      const deleteButton = createElement(
        "div",
        "popup-bookmark-delete-btn",
        bookmark.id,
        "X"
      );
      entity.appendChild(element);
      entity.appendChild(deleteButton);
      popup.appendChild(entity);
    });
  });
};

const createCategoryHeader = (heading, categoryId) => {
  const category = createElement(
    "div",
    "category-heading",
    categoryId,
    heading
  );
  category.onclick = showPopup;
  category.style.cursor = "pointer";
  return category;
};

const setupUncategorizedList = bookmark => {
  const bookmarksList = document.getElementById("uncategorized-bookmarks-body");
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
  });
};

const initialize = () => {
  loadBookmarks();
};
initialize();
