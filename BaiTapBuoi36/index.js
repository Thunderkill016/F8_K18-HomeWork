const postList = document.getElementById("postList");
const statusElement = document.getElementById("status");
const addPostBtn = document.getElementById("addPostBtn");

let posts = [];

function setStatus(message) {
  statusElement.textContent = message;
}

function renderPosts() {
  postList.innerHTML = "";

  if (!posts.length) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Không có bài post nào.";
    postList.appendChild(emptyItem);
    return;
  }

  posts.forEach((post) => {
    const item = document.createElement("li");
    const title = document.createElement("strong");
    const detailBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    title.textContent = post.title;

    detailBtn.type = "button";
    detailBtn.textContent = "Chi tiết";
    detailBtn.addEventListener("click", () => {
      window.location.href = `./detail.html?id=${post.id}`;
    });

    editBtn.type = "button";
    editBtn.textContent = "Sửa";
    editBtn.addEventListener("click", () => {
      editPost(post.id);
    });

    deleteBtn.type = "button";
    deleteBtn.textContent = "Xóa";
    deleteBtn.addEventListener("click", () => {
      deletePost(post.id);
    });

    item.append(
      title,
      document.createTextNode(" "),
      detailBtn,
      document.createTextNode(" "),
      editBtn,
      document.createTextNode(" "),
      deleteBtn
    );
    postList.appendChild(item);
  });
}

async function fetchPosts() {
  setStatus("Đang tải danh sách bài post...");

  try {
    const response = await axios.get("https://dummyjson.com/posts");
    posts = response.data.posts || [];
    renderPosts();
    setStatus(`Đã tải ${posts.length} bài post.`);
  } catch (error) {
    postList.innerHTML = "";
    setStatus("Không thể tải danh sách bài post.");
    console.error(error);
  }
}

async function addPost() {
  const title = window.prompt("Nhập tiêu đề bài viết mới:");

  if (title === null) {
    return;
  }

  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    window.alert("Tiêu đề không được để trống.");
    return;
  }

  try {
    setStatus("Đang thêm bài post...");

    const response = await axios.post("https://dummyjson.com/posts/add", {
      title: normalizedTitle,
      userId: 1,
    });

    posts = [response.data, ...posts];
    renderPosts();
    setStatus("Đã thêm bài post mới.");
  } catch (error) {
    setStatus("Không thể thêm bài post.");
    console.error(error);
  }
}

async function editPost(postId) {
  const post = posts.find((item) => item.id === postId);

  if (!post) {
    window.alert("Không tìm thấy bài post.");
    return;
  }

  const nextTitle = window.prompt("Sửa tiêu đề bài viết:", post.title);

  if (nextTitle === null) {
    return;
  }

  const normalizedTitle = nextTitle.trim();

  if (!normalizedTitle) {
    window.alert("Tiêu đề không được để trống.");
    return;
  }

  try {
    setStatus("Đang cập nhật bài post...");

    const response = await axios.put(`https://dummyjson.com/posts/${postId}`, {
      title: normalizedTitle,
    });

    posts = posts.map((item) =>
      item.id === postId ? { ...item, ...response.data, title: normalizedTitle } : item
    );

    renderPosts();
    setStatus("Đã cập nhật bài post.");
  } catch (error) {
    setStatus("Không thể cập nhật bài post.");
    console.error(error);
  }
}

async function deletePost(postId) {
  const confirmed = window.confirm("Bạn có chắc chắn muốn xóa bài post này không?");

  if (!confirmed) {
    return;
  }

  try {
    setStatus("Đang xóa bài post...");

    await axios.delete(`https://dummyjson.com/posts/${postId}`);
    posts = posts.filter((item) => item.id !== postId);

    renderPosts();
    setStatus("Đã xóa bài post.");
  } catch (error) {
    setStatus("Không thể xóa bài post.");
    console.error(error);
  }
}

addPostBtn.addEventListener("click", addPost);

fetchPosts();
