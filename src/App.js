import Calendar from "./components/Calendar";
import AdminCalendar from "./components/AdminCalendar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./components/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/admin" element={<AdminCalendar />} />
        <Route path="/" element={<Calendar />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
