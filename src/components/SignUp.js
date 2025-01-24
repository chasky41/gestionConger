import React, { useState } from 'react';

function SignUp({ onSignUp, onBackToLogin }) {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignUp(formData.nom, formData.prenom, formData.email, formData.password);
    };

    return (
        <div className="form-container">
            <h2>Créer un compte</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="button">Créer un compte</button>
            </form>
            <div className="back-button">
                <button onClick={onBackToLogin} className="button secondary">Retour à la connexion</button>
            </div>
        </div>
    );
}

export default SignUp;