//áp dụng ThemeProvider và AuthProvider để bao bọc toàn bộ ứng dụng
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import LightSwitch from "./components/LightSwitch";
import CounterComponent from "./components/CounterComponent";
import LoginForm from "./components/LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}>
          <LoginForm />
          <hr style={{ margin: '40px 0' }} />
          <CounterComponent />
          <LightSwitch />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
