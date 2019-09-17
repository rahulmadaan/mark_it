const createNewCategory = title => console.log(title);
const isBookmarkUncategorized = bookmark => !bookmark.children;

const getAchorTag = bookmark => {
  const anchorTag = document.createElement("a");
  anchorTag.innerHTML = bookmark.title;
  anchorTag.href = bookmark.url;
  anchorTag.target = "_blank";
  return anchorTag;
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
  const newCategory = document.createElement("div");
  newCategory.className = "category-new";
  bookmarkList.children.map(bookmark => {
    const newBookmark = document.createElement("div");
    const anchorTag = getAchorTag(bookmark);
    newBookmark.className = "categorized-bookmark";
    newBookmark.appendChild(anchorTag);
    newCategory.appendChild(newBookmark);
  });
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
loadBookmarks();
