import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./components/pages/Home";
import Business from "./components/pages/Business";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business/:id" element={<Business />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
