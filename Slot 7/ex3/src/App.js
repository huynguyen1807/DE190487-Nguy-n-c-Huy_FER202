import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './Component/Banner';
import Navbar from './Component/Navbar';
import GridDemo from './Component/GridDemo';

function App() {
  return (
    <div style={{backgroundColor: '#e9ecef', minHeight: '100vh'}}>
      
      <Banner />
      <Navbar />
      <GridDemo />
    </div>
  );
}

export default App;
