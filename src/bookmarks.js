const isBookmarkUncategorized = bookmark => !bookmark.children;

const getAchorTag = bookmark => {
  const anchorTag = document.createElement("a");
  anchorTag.innerHTML = bookmark.title;
  anchorTag.href = bookmark.url;
  anchorTag.target = "_blank";
  return anchorTag;
};

const formatBookmark = bookmark => {
  const newBookmark = document.createElement("div");
  const anchorTag = getAchorTag(bookmark);
  newBookmark.className = "categorized-bookmark";
  newBookmark.appendChild(anchorTag);
  return newBookmark;
};

const createNewCategory = () => {
  const category = document.createElement("div");
  category.className = "category-new";
  return category;
};

const createCategoryHeading = heading => {
  const category = document.createElement("div");
  category.className = "category-heading";
  category.innerHTML = heading;
  return category;
};
const createCategoryBody = () => {
  const category = document.createElement("div");
  category.className = "category-body-bookmarks";
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
  const newCategory = createNewCategory();
  const newCategoryHeading = createCategoryHeading(bookmarkList.title);
  const newCategoryBody = createCategoryBody();

  bookmarkList.children.map(bookmark => {
    const newBookmark = formatBookmark(bookmark);
    newCategoryBody.appendChild(newBookmark);
  });

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
        console.log("bookmark is", bookmark);
        createCategorizedBookmarks(bookmark);
      }
    });
  });
};
loadBookmarks();
