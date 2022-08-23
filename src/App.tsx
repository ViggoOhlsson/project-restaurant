import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { Admin } from "./components/pages/Admin";
import { AdminEdit } from "./components/pages/AdminEdit";
import { Booking } from "./components/pages/Booking";
import { Home } from "./components/pages/Home";
import "./scss/main.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/book" element={<Booking />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/edit-booking/:id" element={<AdminEdit />}></Route>
          </Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
