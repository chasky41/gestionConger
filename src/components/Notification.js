import React, { useEffect } from 'react';

function Notification({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // Ferme la notification après 5 secondes

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`notification ${type}`}>
            {message}
            <button onClick={onClose}>×</button>
        </div>
    );
}

export default Notification;