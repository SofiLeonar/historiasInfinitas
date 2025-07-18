import ReactDOM from "react-dom";

export function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">{children}</div>
    </div>,
    document.getElementById("modal")
  );
}
