import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import Modal from "./components/modal";
import { ItemProvider } from "./context/ItemContext";

export default () => (
  <Router>
    <ItemProvider>
      <Header />
      <RoutesComponent />
    </ItemProvider>
  </Router>
);

const RoutesComponent = () => {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/:modalType" element={<Modal />} />
        </Routes>
      )}
    </>
  );
};
