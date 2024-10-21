import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import SideNavbar from "./components/app/SideNavbar";

function App() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex h-screen">
        <SideNavbar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
