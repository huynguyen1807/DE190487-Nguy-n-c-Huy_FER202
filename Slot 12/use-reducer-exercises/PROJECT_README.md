# useReducer Hook Exercises

Dự án này được tạo để thực hành và minh họa cách sử dụng `useReducer` Hook trong React, bao gồm các bài tập từ cơ bản đến nâng cao.

## 🚀 Cài đặt và Chạy

```bash
# Clone hoặc tải về dự án
cd use-reducer-exercises

# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 📚 Nội dung Bài Tập

### Exercise 1: CounterComponent
- **Mô tả**: Bộ đếm đa năng sử dụng useReducer
- **Tính năng**: Tăng, giảm, reset giá trị
- **Khái niệm**: Hiểu cơ bản về useReducer, action, reducer function

### Exercise 2: ToggleComponent  
- **Mô tả**: Component bật/tắt trạng thái
- **Tính năng**: Chuyển đổi trạng thái, đếm số lần chuyển đổi, reset
- **Khái niệm**: Quản lý trạng thái phức tạp hơn với multiple state values

### Exercise 3: LoginForm
- **Mô tả**: Form đăng nhập với validation và loading state
- **Tính năng**: 
  - Validation form
  - Loading state khi submit
  - Error handling
  - Success state sau khi đăng nhập
- **Demo account**: username = "admin", password = "123456"
- **Khái niệm**: useReducer cho form management, async operations

### Exercise 4: SignUpForm
- **Mô tả**: Form đăng ký tài khoản với validation phức tạp
- **Tính năng**:
  - Multi-field form (họ, tên, email, phone, ngày sinh)
  - Password confirmation với show/hide
  - Email format validation
  - Phone number validation  
  - Age validation (>=16 tuổi)
  - Terms agreement checkbox
  - Duplicate email check simulation
  - Complete form reset functionality
- **Demo**: Email "admin@test.com" đã được sử dụng (để test)
- **Khái niệm**: Complex form state management, field validation, async validation

### Exercise 5: QuestionBank (Basic)
- **Mô tả**: Quiz trắc nghiệm cơ bản
- **Tính năng**:
  - Hiển thị câu hỏi và đáp án
  - Chọn đáp án
  - Tính điểm
  - Restart quiz
- **Khái niệm**: Quản lý trạng thái phức tạp với nhiều thuộc tính

### Exercise 6: QuestionBankAdvanced (Advanced)
- **Mô tả**: Quiz trắc nghiệm nâng cao với nhiều tính năng
- **Tính năng nâng cao**:
  - ✅ **Phản hồi tức thì**: Hiển thị đúng/sai ngay khi chọn đáp án
  - 📊 **Thanh tiến trình**: Hiển thị tiến độ làm bài (1/5, 2/5...)
  - ⏰ **Đồng hồ đếm ngược**: Mỗi câu có 10 giây, cảnh báo màu đỏ khi <5s
  - 🏆 **Lưu điểm cao**: Sử dụng localStorage để lưu high score
  - 🎨 **UI/UX tốt hơn**: Icons, colors, responsive design
  - 📈 **Thống kê chi tiết**: Phần trăm đúng, đánh giá kết quả

### Bonus: QuestionBankConfigurable
- **Mô tả**: Quiz có thể tùy chỉnh hoàn toàn với data management
- **Tính năng đặc biệt**:
  - 🎛️ **Cấu hình linh hoạt**: Chọn chủ đề, độ khó, số câu, thời gian
  - 📚 **Data Management**: Tách riêng dữ liệu ra file questionsData.js
  - 🔀 **Câu hỏi ngẫu nhiên**: Tự động chọn câu hỏi theo tiêu chí
  - 🏷️ **Phân loại**: Hiển thị category và difficulty cho mỗi câu
  - ⚙️ **UI cấu hình**: Giao diện setting với slider và dropdown
  - 🔄 **Linh hoạt**: Có thể quay lại cấu hình hoặc làm lại với setting cũ

## 🛠️ Technologies Used

- **React 18**: JavaScript library for building user interfaces
- **React Bootstrap**: UI component library
- **React Icons**: Icon library for beautiful icons
- **useReducer Hook**: For state management
- **localStorage**: For persisting high scores
- **CSS3**: For custom styling

## 📁 Cấu trúc Project

```
src/
├── components/
│   ├── CounterComponent.jsx         # Exercise 1
│   ├── ToggleComponent.jsx          # Exercise 2  
│   ├── LoginForm.jsx               # Exercise 3
│   ├── SignUpForm.jsx              # Exercise 4
│   ├── QuestionBank.jsx            # Exercise 5 (Basic)
│   ├── QuestionBankAdvanced.jsx    # Exercise 6 (Advanced)
│   └── QuestionBankConfigurable.jsx # Bonus (Configurable)
├── data/
│   └── questionsData.js            # Centralized question data
├── App.js                          # Main app with navigation
├── App.css                         # App styles
└── index.js                        # Entry point
```

## 🎯 Mục tiêu Học tập

1. **Hiểu về useReducer**: Khi nào dùng useReducer thay vì useState
2. **Reducer Pattern**: Cách viết reducer function và action types
3. **State Management**: Quản lý trạng thái phức tạp trong React
4. **Best Practices**: Code organization, naming conventions
5. **Real-world Applications**: Áp dụng vào các tình huống thực tế

## 🔍 Các Khái niệm Chính

### useReducer Syntax
```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

### Reducer Function Pattern
```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, /* updates */ };
    default:
      return state;
  }
}
```

### Action Dispatch
```javascript
dispatch({ type: 'ACTION_TYPE', payload: data });
```

### Data Management Best Practices
```javascript
// questionsData.js - Centralized data
export const questionsData = [...];
export const getQuestionsByCategory = (category) => {...};
export const getRandomQuestions = (count) => {...};
```

## 🚨 Lưu ý

- Mỗi component đều sử dụng useReducer thay vì useState
- Code có comments chi tiết bằng tiếng Việt
- Responsive design, hoạt động tốt trên mobile
- Error handling và input validation
- Local storage để persist data

## 📝 Bài Tập Thêm

Có thể mở rộng dự án với:
- Shopping Cart component
- Todo List với filter/sort
- Form wizard với multiple steps
- Chat application với message history

## 👨‍💻 Tác giả

Dự án được tạo theo yêu cầu từ **traltb@fe.edu.vn** - FER202 Course