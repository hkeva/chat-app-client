import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import ChatRoom from "./pages/chatRoom";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/room" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
