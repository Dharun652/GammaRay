import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ClassPage from "./pages/ClassPage.jsx";
import Doubts from "./pages/Doubts.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/class/:id"
          element={<ProtectedRoute><ClassPage /></ProtectedRoute>}
        />
        <Route
          path="/doubts/:classId"
          element={<ProtectedRoute><Doubts /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
