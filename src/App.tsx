import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { Admin } from "./components/pages/Admin";
import { AdminAdd } from "./components/pages/AdminAdd";
import { AdminEdit } from "./components/pages/AdminEdit";
import { Booking } from "./components/pages/Booking";
import { CustomerCancel } from "./components/pages/CustomerCancel";
import { Home } from "./components/pages/Home";
import "./scss/main.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/" element={<Layout />}>
            <Route path="/book" element={<Booking />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/admin/add-new" element={<AdminAdd />}></Route>
            <Route path="/edit-booking/:id" element={<AdminEdit />}></Route>
            <Route path="/cancel/:id" element={<CustomerCancel />}></Route>
          </Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
