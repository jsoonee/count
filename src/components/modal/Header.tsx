import { IconButton, TablerX } from "../../lib/Icons";

interface IModalHeaderProps {
  title: string;
  closeModal: (isAdded: boolean) => any;
}

export default ({ title, closeModal }: IModalHeaderProps) => {
  return (
    <header className="modal-header">
      <h1 className="modal-title">{title}</h1>
      <IconButton className="icon-button-square button-alt x-button" onClick={() => closeModal(false)}>
        <TablerX />
      </IconButton>
    </header>
  );
};
