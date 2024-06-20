import Header from "./components/header";
import Main from "./components/main";
import Modal from "./components/modal";
import { ItemProvider } from "./context/ItemContext";
import { ModalProvider } from "./context/ModalContext";

export default () => {
  return (
    <ItemProvider>
      <ModalProvider>
        <Header />
        <Main />
        <Modal />
      </ModalProvider>
    </ItemProvider>
  );
};
