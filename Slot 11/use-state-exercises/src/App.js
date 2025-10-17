import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import AccountSearch from './components/AccountSearch';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ background: '#1976d2', color: 'white', padding: '20px 0', marginBottom: '30px' }}>
        <h1>Exercise useState Hook Demo</h1>
        <p style={{ margin: 0, fontSize: '16px' }}>Bài tập thực hành useState Hook trong React</p>
      </header>
      
      <div style={{ background: '#f8f9fa', minHeight: 'calc(100vh - 200px)', padding: '20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Exercise 1 */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '20px' }}>
              Exercise 1: Bộ đếm đa năng
            </h3>
            <CounterComponent />
          </div>
          
          {/* Exercise 2 */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '20px' }}>
              Exercise 2: Bật/tắt trạng thái
            </h3>
            <LightSwitch />
          </div>
          
          {/* Exercise 3 */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '20px' }}>
              Exercise 3: Form đăng nhập
            </h3>
            <LoginForm />
          </div>
          
          {/* Exercise 4 */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '20px' }}>
              Exercise 4: Form đăng nhập với Object State
            </h3>
            <LoginForm2 />
          </div>
          
          {/* Exercise 5 */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '20px' }}>
              Exercise 5: Tìm kiếm và lọc dữ liệu
            </h3>
            <SearchItem />
          </div>
          
          {/* Exercise 6 */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '20px' }}>
              Exercise 6: Tìm kiếm Account theo Username
            </h3>
            <AccountSearch />
          </div>
          
          {/* Exercise 7 */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '20px' }}>
              Exercise 7: Form đăng ký với Validation
            </h3>
            <RegisterForm />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
