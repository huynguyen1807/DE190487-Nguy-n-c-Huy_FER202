# movies-json-server

Thiết lập demo React + json-server cho bài tập Client-Server Communication.

## 🎯 Yêu cầu đã thực hiện:
- ✅ React app `movies-json-server` sử dụng React Bootstrap
- ✅ json-server mô phỏng API (db.json) trên cổng 3001
- ✅ Sử dụng Axios với instance `src/api/movieAPI.js`
- ✅ Contexts: MovieContext (useReducer) và AuthContext
- ✅ CRUD đầy đủ (create, read, update, delete) với movie resource
- ✅ Login system với phân quyền: Admin vs User
- ✅ Hiển thị thông tin user ở Header với role-based access

## 🔐 Phân quyền:
- **Admin** (`admin/admin123`): Có thể thêm/sửa/xóa phim
- **User** (`user/user123`): Chỉ xem danh sách phim

## 📊 Dữ liệu:
- **9 phim** với đầy đủ thông tin (title, description, poster, genre, year, country, duration)
- **9 thể loại** (Sci-Fi, Comedy, Drama, Horror, Romance, Action, Thriller, Animation, Fantasy)
- **2 accounts** với roles khác nhau

## 🚀 Cách chạy (Windows PowerShell):

1) Cài dependencies:
```powershell
cd "e:/FPT/Major 5/FER202/1.SU25/Code/Slot 15"
npm install
```

2) Chạy json-server (mở 1 terminal):
```powershell
npm run server
# hoặc: json-server --watch db.json --port 3001
```

3) Chạy React app (mở terminal khác):
```powershell
npm start
# Mở http://localhost:3000
```

## 🌐 Endpoints có sẵn:
- `http://localhost:3001/movies` - Danh sách phim
- `http://localhost:3001/genres` - Danh sách thể loại
- `http://localhost:3001/accounts` - Danh sách tài khoản

## 🎬 Tính năng chính:
1. **Authentication flow**: Login → redirect to movie list
2. **Role-based permissions**: Admin có CRUD, User chỉ xem
3. **CRUD operations**: Create, Read, Update, Delete movies
4. **Form validation**: Bootstrap validation với error handling
5. **File upload**: Support upload poster images
6. **Responsive design**: Bootstrap responsive table và forms

## 📝 Bài tập:
- Chụp hình project kết quả và nộp lên slot 15
- (Lab5) Hoàn thiện AuthContext, MovieContext với persistent login
