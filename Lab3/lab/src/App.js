import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import FooterPage from './pages/FooterPage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <HomePage />
      {/* Uncomment below to show AccountPage instead */}
      {/* <AccountPage /> */}
      <FooterPage />
    </div>
  );
}

export default App;
