import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Market } from "./components/Pages/Market";
import { Subscriber } from "./components/Pages/Subscriber";
import { Provider } from "./components/Pages/Provider";
import { ClientsProvider } from "./context/clientCtx";

function App() {
  return (
    <>
      <ClientsProvider>
        <Router>
          <NavBar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/market" element={<Market />} />
              <Route path="/subscriber" element={<Subscriber />} />
              <Route path="/provider" element={<Provider />} />
            </Routes>
          </div>
        </Router>
      </ClientsProvider>
    </>
  );
}

export default App;
