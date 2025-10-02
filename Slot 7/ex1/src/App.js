import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './component/Banner';
import GridDemo from './component/GridDemo';

function App() {
  return (
    <div style={{backgroundColor: '#e9ecef', minHeight: '100vh'}}>
      
      <Banner />
     
      <GridDemo />
    </div>
  );
}

export default App;