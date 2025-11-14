# React Router Learning - Bài Tập Thực Hành

Dự án này được thiết kế để học và thực hành các tính năng chính của React Router v6 thông qua 3 bài tập có độ khó tăng dần.

## 🎯 Mục Tiêu Học Tập

- **Bài Tập 1**: Hiểu và sử dụng routing cơ bản với NavLink
- **Bài Tập 2**: Áp dụng dynamic routing với useParams và useNavigate
- **Bài Tập 3**: Triển khai nested routes với Outlet component

## 🚀 Cài Đặt và Chạy Dự Án

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Chạy ứng dụng
```bash
npm start
```

Ứng dụng sẽ chạy tại: http://localhost:3000

## 📁 Cấu Trúc Dự Án

```
src/
├── components/
│   └── Navbar.js              # Navigation bar chính
├── pages/
│   ├── Home.js               # Trang chủ
│   ├── Products.js           # Danh sách sản phẩm
│   ├── Contact.js            # Trang liên hệ
│   ├── ProductDetail.js      # Chi tiết sản phẩm (dynamic route)
│   ├── DashboardLayout.js    # Layout cho dashboard (nested routes)
│   ├── DashboardHome.js      # Trang chủ dashboard
│   ├── Settings.js           # Trang cài đặt
│   ├── Reports.js            # Trang báo cáo
│   └── NotFound.js           # Trang 404
├── App.js                    # Cấu hình routes chính
├── App.css                   # Styles
└── index.js                  # Entry point với BrowserRouter
```

## 📚 Chi Tiết Các Bài Tập

### Bài Tập 1: Routing Cơ Bản và Điều Hướng ✅

**Mục tiêu**: Hiểu cách định nghĩa Route và sử dụng Link/NavLink

**Tính năng đã triển khai**:
- ✅ 3 routes cơ bản: `/`, `/san-pham`, `/lien-he`
- ✅ Navigation bar với NavLink có highlighting
- ✅ Components: Home, Products, Contact
- ✅ Active state styling cho navigation

**Kiến thức áp dụng**:
- `BrowserRouter` wrapper trong `index.js`
- `Routes` và `Route` components
- `NavLink` với `isActive` function
- CSS styling cho active state

### Bài Tập 2: Dynamic Routing và Programmatic Navigation ✅

**Mục tiêu**: Sử dụng tham số động và điều hướng bằng code

**Tính năng đã triển khai**:
- ✅ Dynamic route: `/san-pham/:productId`
- ✅ Component `ProductDetail` sử dụng `useParams()`
- ✅ Danh sách sản phẩm với Link đến chi tiết
- ✅ Nút "Quay lại" sử dụng `useNavigate()`
- ✅ Mock data và error handling

**Kiến thức áp dụng**:
- URL parameters với `useParams()` hook
- Programmatic navigation với `useNavigate()` hook
- Dynamic Link generation
- Error handling cho invalid IDs

### Bài Tập 3: Nested Routes và Layout ✅

**Mục tiêu**: Áp dụng Nested Routes để xây dựng layout quản trị

**Tính năng đã triển khai**:
- ✅ Nested routes cho `/dashboard`
- ✅ `DashboardLayout` với sidebar navigation
- ✅ `Outlet` component để render child routes
- ✅ Index route cho `/dashboard`
- ✅ Child routes: `/dashboard/settings`, `/dashboard/reports`
- ✅ Các component: DashboardHome, Settings, Reports

**Kiến thức áp dụng**:
- Nested route configuration
- `Outlet` component usage
- Index routes
- Layout components
- Shared navigation trong nested routes

## 🔍 Demo Routes và Tính Năng

### Routes Available:

1. **`/`** - Trang chủ với thông tin welcome
2. **`/san-pham`** - Danh sách 3 sản phẩm (ID: 101, 102, 103)
3. **`/san-pham/:productId`** - Chi tiết sản phẩm với mock data
4. **`/lien-he`** - Thông tin liên hệ
5. **`/dashboard`** - Dashboard home với statistics cards
6. **`/dashboard/settings`** - Form cài đặt với checkboxes và select
7. **`/dashboard/reports`** - Báo cáo với table và data switching
8. **`/*`** - 404 Not Found page

### Tính Năng Đặc Biệt:

- **Navigation Highlighting**: NavLink tự động highlight trang hiện tại
- **Responsive Design**: Adaptive layout cho mobile và desktop
- **Interactive Components**: 
  - Settings form với state management
  - Reports với dynamic data switching
  - Product detail với mock database
- **Error Handling**: 404 page và invalid product ID handling
- **Professional Styling**: Modern UI với hover effects và transitions

## 💡 Phân Tích: Tại Sao Nested Routes Tốt Hơn?

### So sánh `/dashboard/settings` vs `/dash-settings`:

**✅ Ưu điểm Nested Routes:**
1. **Chia sẻ Layout**: `DashboardLayout` được tái sử dụng cho tất cả dashboard pages
2. **URL Hierarchy**: Cấu trúc URL rõ ràng, thể hiện mối quan hệ parent-child
3. **Code Organization**: Dễ quản lý và bảo trì code
4. **Shared State**: Có thể chia sẻ state/context giữa parent và children
5. **Navigation**: Sidebar navigation được duy trì khi chuyển đổi giữa các trang con
6. **SEO Friendly**: URL structure tốt hơn cho SEO

**❌ Nhược điểm Flat routes:**
- Duplicate layout code
- Khó bảo trì khi có nhiều dashboard pages
- URL không thể hiện được mối quan hệ logic
- Phải rerender toàn bộ layout mỗi lần chuyển trang

## 🛠 Công Nghệ Sử Dụng

- **React 18.2.0**
- **React Router DOM 6.x**
- **JavaScript ES6+**
- **CSS3 với Flexbox/Grid**

## 📝 Ghi Chú Kỹ Thuật

- Sử dụng functional components với React Hooks
- CSS-in-JS cho một số styling động
- Mock data thay vì API calls (để tập trung vào routing)
- Responsive design principles
- Modern React Router v6 patterns (không dùng useHistory deprecated)

## 🎓 Kết Luận

Dự án này minh họa đầy đủ các khái niệm cốt lõi của React Router:
- Basic routing với Routes/Route
- Navigation với Link/NavLink
- Dynamic routing với useParams
- Programmatic navigation với useNavigate
- Nested routing với Outlet
- Error handling với catch-all routes

Tất cả đều được triển khai theo best practices và với UI/UX chuyên nghiệp.
