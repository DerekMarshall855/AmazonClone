//Common
import { BrowserRouter } from 'react-router-dom';

// Components
import Header from './Components/header';
import Footer from './Components/footer';
import Main from './Components/main';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
