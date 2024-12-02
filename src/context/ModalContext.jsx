import { createContext, useContext, useState } from "react";
import { Modal } from "../components/Modal/Modal";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    text: "",
  });
  const [resolveCallback, setResolveCallback] = useState(null);

  const openModal = ({ title, text }) => {
    setModalContent({ title, text });
    setIsOpen(true);

    // Devuelve una promesa que se resolverá cuando el usuario confirme o cancele
    return new Promise((resolve) => {
      setResolveCallback(() => resolve); // Almacena el resolve de la promesa
    });
  };

  const closeModal = (confirmed) => {
    setIsOpen(false);
    setModalContent(null);

    if (resolveCallback) {
      resolveCallback(confirmed); // Resuelve la promesa con el valor (true o false)
    }
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {isOpen && (
        <Modal>
          <h2 className="text-2xl font-bold text-center">
            {modalContent.title}
          </h2>
          <p className="text-xl text-slate-400">{modalContent.text}</p>

          <div className="mt-4 flex justify-center gap-5">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => closeModal(true)}
            >
              Confirmar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => closeModal(false)}
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
