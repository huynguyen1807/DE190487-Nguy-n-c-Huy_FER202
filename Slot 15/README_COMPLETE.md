# 🎬 Movies JSON Server - React Application

## 📋 Tổng quan dự án
Ứng dụng React quản lý phim với json-server backend, được phát triển cho môn FER202 - Slot 15.

## ✅ Các yêu cầu đã hoàn thành

### 🔐 **Hệ thống đăng nhập**
- [x] **Login với db.json**: Đọc dữ liệu accounts từ file db.json
- [x] **Enhanced Validation**: Form.Control.Feedback hiển thị lỗi validation
- [x] **Error Handling**: Alert hiển thị khi đăng nhập sai
- [x] **Welcome Dialog**: Hộp thoại chào mừng khi đăng nhập thành công
- [x] **Auto Redirect**: Chuyển hướng đến trang movie list sau login thành công
- [x] **Account Structure**: username, password, email, role, status

### 🎯 **Header & Authentication**
- [x] **User Display**: Hiển thị thông tin đăng nhập ở Header component
- [x] **Role-based UI**: Giao diện khác nhau theo vai trò (admin/user)
- [x] **Logout Function**: Chức năng đăng xuất

### 📽️ **CRUD Operations**
- [x] **Create**: Thêm phim mới (chỉ admin)
- [x] **Read**: Xem danh sách phim
- [x] **Update**: Sửa phim (chỉ admin)
- [x] **Delete**: Xóa phim (chỉ admin)
- [x] **Role Permissions**: Admin full access, User read-only

### 🧠 **Context Management**
- [x] **MovieContext**: Quản lý state phim với useReducer
- [x] **AuthContext**: Quản lý authentication state
- [x] **Persistent Login**: Lưu trạng thái đăng nhập qua localStorage

### 🔍 **FilterBar Component**
- [x] **Search Function**: Tìm kiếm phim theo tên
- [x] **Genre Filter**: Lọc theo thể loại phim
- [x] **Duration Filter**: Lọc theo thời lượng (ngắn/trung bình/dài)
- [x] **Sort Function**: Sắp xếp theo tên tăng dần/giảm dần
- [x] **Clear Filters**: Xóa tất cả bộ lọc

### 👁️ **View Details Features**
- [x] **View Details Modal**: Hộp thoại xem chi tiết phim
- [x] **View Details Page**: Trang riêng cho từng phim với routing
- [x] **Back to List**: Nút quay lại danh sách phim
- [x] **Complete Movie Info**: Hiển thị đầy đủ thông tin phim

## 🛠️ **Công nghệ sử dụng**
- **Frontend**: React 18.2.0, React Bootstrap 2.8.0, React Router DOM
- **Backend**: json-server (Mock REST API)
- **State Management**: Context API + useReducer
- **HTTP Client**: Axios 1.4.0
- **Styling**: Bootstrap 5.3.0, Font Awesome icons

## 📊 **Cấu trúc dữ liệu**

### Movies (9 phim)
```json
{
  "id": 1,
  "title": "Avatar",
  "poster": "https://image.url",
  "description": "Mô tả phim...",
  "genreId": 1,
  "year": 2009,
  "country": "USA", 
  "duration": 162
}
```

### Accounts (2 tài khoản)
```json
{
  "id": 1,
  "username": "admin",
  "password": "admin123",
  "email": "admin@movies.com",
  "name": "Administrator",
  "role": "admin",
  "status": "active"
}
```

### Genres (9 thể loại)
```json
{
  "id": 1,
  "name": "Action"
}
```

## 🚀 **Hướng dẫn chạy ứng dụng**

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Cài đặt json-server (global)
```bash
npm install -g json-server
```

### Bước 3: Chạy json-server (Terminal 1)
```bash
json-server --watch db.json --port 3001
```

### Bước 4: Chạy React app (Terminal 2)
```bash
npm start
```

### Bước 5: Truy cập ứng dụng
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 👥 **Tài khoản demo**
- **Admin**: `admin` / `admin123` (Có thể CRUD phim)
- **User**: `user` / `user123` (Chỉ xem phim)

## 📁 **Cấu trúc project**
```
src/
├── api/
│   └── movieAPI.js          # Axios configuration
├── components/
│   ├── Header.jsx           # Header với user info
│   ├── Login.jsx            # Login form với validation
│   ├── MovieForm.jsx        # Form thêm/sửa phim
│   ├── MovieTable.jsx       # Table hiển thị phim
│   ├── MovieDetails.jsx     # Modal chi tiết phim
│   └── FilterBar.jsx        # Thanh tìm kiếm và lọc
├── contexts/
│   ├── AuthContext.jsx      # Authentication context
│   └── MovieContext.jsx     # Movie management context
├── pages/
│   ├── MovieManager.jsx     # Trang chính quản lý phim
│   └── ViewDetailsPage.jsx  # Trang chi tiết phim
├── reducers/
│   └── movieReducers.jsx    # Reducer cho movie state
└── App.js                   # Main app với routing
```

## 🎯 **Các tính năng chính**

### 🔐 **Authentication Features**
- Form validation với error feedback
- Welcome dialog sau khi login thành công
- Role-based access control
- Persistent login session

### 🎬 **Movie Management**
- CRUD operations với role-based permissions
- Advanced filtering và search
- Sort functionality
- Modal và page view cho chi tiết

### 🎨 **UI/UX Features**
- Responsive design với React Bootstrap
- Loading states và error handling
- Icon integration với Font Awesome
- Clean và intuitive interface

## 📝 **Lưu ý quan trọng**
- Đảm bảo json-server chạy trên port 3001
- React app chạy trên port 3000
- Dữ liệu được lưu trong db.json
- Hình ảnh poster sử dụng URL externals

## 🔄 **Workflow sử dụng**
1. **Login** → Nhập username/password
2. **Welcome** → Xem thông báo chào mừng
3. **Browse** → Xem danh sách phim
4. **Filter** → Tìm kiếm và lọc phim
5. **View Details** → Xem chi tiết qua modal hoặc page
6. **Manage** → CRUD operations (chỉ admin)
7. **Logout** → Đăng xuất hệ thống

## ✨ **Demo Screenshots**
- Login với validation errors
- Welcome dialog success
- Movie list với filter bar
- View details modal/page
- Admin CRUD operations
- User read-only interface

---
**Phát triển bởi**: DE190487 - Nguyễn Đức Huy  
**Môn học**: FER202 - Client-Server Communication  
**Slot**: 15 - SU25