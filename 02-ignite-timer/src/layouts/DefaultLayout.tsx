import { Outlet } from "react-router-dom";

import Header from "../components/Header";

export default function DefaultLayout() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
}
