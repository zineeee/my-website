const loginForm = document.getElementById("loginForm");
const uploadForm = document.getElementById("uploadForm");
const uploadSection = document.getElementById("uploadSection");
const loginSection = document.getElementById("loginSection");
const assignmentList = document.getElementById("assignmentList");
const logoutButton = document.getElementById("logoutButton");

let assignments = []; // Mảng lưu trữ các bài tập

// Tên đăng nhập và mật khẩu giảng viên
const teacherUsername = "teacher";
const teacherPassword = "12345";

// Xử lý đăng nhập
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Kiểm tra thông tin đăng nhập
    if (username === teacherUsername && password === teacherPassword) {
        loginSection.style.display = "none"; // Ẩn form đăng nhập
        uploadSection.style.display = "block"; // Hiện phần đăng bài tập
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
});

// Xử lý đăng xuất
logoutButton.addEventListener("click", () => {
    uploadSection.style.display = "none";
    loginSection.style.display = "block";
    loginForm.reset(); // Xóa dữ liệu đăng nhập
});

// Xử lý khi giảng viên nhấn nút "Đăng Bài Tập"
uploadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const assignmentName = document.getElementById("assignmentName").value;
    const assignmentDescription = document.getElementById("assignmentDescription").value;
    const assignmentFile = document.getElementById("assignmentFile").files[0];
    
    if (assignmentFile) {
        const fileUrl = URL.createObjectURL(assignmentFile);
        
        // Thêm bài tập vào mảng và hiển thị trên giao diện
        assignments.push({ name: assignmentName, description: assignmentDescription, fileUrl });
        renderAssignments();
        
        // Xóa các trường nhập liệu
        uploadForm.reset();
    } else {
        alert("Vui lòng chọn file để đăng bài tập.");
    }
});

// Hàm hiển thị các bài tập
function renderAssignments() {
    assignmentList.innerHTML = ""; // Xóa nội dung cũ

    assignments.forEach((assignment, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <h3>${assignment.name}</h3>
            <p>${assignment.description}</p>
            <a href="${assignment.fileUrl}" download>Tải Về</a>
        `;
        assignmentList.appendChild(listItem);
    });
}

// Ban đầu ẩn phần đăng bài tập cho giảng viên
uploadSection.style.display = "none";
