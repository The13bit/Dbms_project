import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/Admin'  element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
