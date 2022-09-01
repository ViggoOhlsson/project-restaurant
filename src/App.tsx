import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layouts/AdminLayout";
import { HomeLayout } from "./components/layouts/HomeLayout";
import { Layout } from "./components/layouts/Layout";
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
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />}></Route>
            <Route path="/admin/add-new" element={<AdminAdd />}></Route>
            <Route
              path="/admin/edit-booking/:id"
              element={<AdminEdit />}
            ></Route>
          </Route>

          <Route path="/" element={<Layout />}>
            <Route path="/book" element={<Booking />}></Route>
            <Route path="/cancel/:id" element={<CustomerCancel />}></Route>
          </Route>

          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
