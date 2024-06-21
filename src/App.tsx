import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Modal from "./components/modal";
import { ItemProvider } from "./context/ItemContext";
import { ModalProvider } from "./context/ModalContext";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

export default () => {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  return (
    <ItemProvider>
      <ModalProvider>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes> 
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/:modalType" element={<Modal />} />
          </Routes>
        )}
      </ModalProvider>
    </ItemProvider>
  );
};
