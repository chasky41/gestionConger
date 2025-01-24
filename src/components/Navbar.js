import React from 'react';

function Navbar({ user, onLogout, onBackToLogin }) {
    return (
        <nav>
            <h1>Gestion des congés</h1>
            {user ? (
                <div>
                    <span>Connecté en tant que {user.username}</span>
                    <button onClick={onLogout}>Déconnexion</button>
                </div>
            ) : (
                onBackToLogin && <button onClick={onBackToLogin}>Retour à la connexion</button>
            )}
        </nav>
    );
}

export default Navbar;