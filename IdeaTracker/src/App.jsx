import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { UserProvider } from "./context/user";
import { IdeasProvider } from "./context/ideas"; // Import IdeasProvider
import "./App.css";
import Navbar from "./Navbar";

function App() {
  const [count, setCount] = useState(0);
  const isLoginPage = window.location.pathname === "/login";

  return (
    <>
      <div>
        <UserProvider>
          <Navbar />
          <main>
            {/* Wrap Home with IdeasProvider */}
            {isLoginPage ? <Login /> : (
              <IdeasProvider>
                <Home />
              </IdeasProvider>
            )}
          </main>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
