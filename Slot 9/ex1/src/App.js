import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import MyFooter from './Components/Footer/MyFooter';
import FooterPage from './Page/FooterPage';
import HomePage from './Page/HomePage';
function App() {
  return (
    <div> 
      <HomePage/>
      <FooterPage/>
    </div>
   
  );
}

export default App;
