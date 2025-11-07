import { FaLock } from "react-icons/fa";

export default function Error403() {
    return (
        <div className="error-page">
            <FaLock size={80} className="mb-4 text-danger"/>
            <h1>Error 403</h1>
            <p>No tienes permiso para acceder a esta sección.</p>
            <p>Contacta al administrador si crees que es un error.</p>
        </div>
    );
}
