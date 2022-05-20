import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from './Pages/Join/join';
import Chat from './Pages/Chat/chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;