
import React, { useState, useEffect } from 'react';
import LeaveRequestForm from './components/LeaveRequestForm';
import LeaveRequestList from './components/LeaveRequestList';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import SignUp from './components/SignUp'; // Importez le composant SignUp
import './App.css';

function App() {
    const [demandes, setDemandes] = useState([]);
    const [user, setUser] = useState(null); // { username: 'john', role: 'admin' ou 'user' }
    const [rhDemandes, setRHDemandes] = useState([]); // Demandes approuvées pour le système RH
    const [notifications, setNotifications] = useState([]); // Liste des notifications
    const [showSignUp, setShowSignUp] = useState(false); // État pour afficher le formulaire d'inscription

    // Fonction pour ajouter une notification
    const addNotification = (message, type) => {
        const id = Date.now(); // Identifiant unique pour la notification
        setNotifications((prev) => [...prev, { id, message, type }]);
    };

    // Fonction pour supprimer une notification
    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    // Fonction pour gérer la connexion
    const handleLogin = (username, password) => {
        // Simule une connexion réussie
        if (username === 'admin_ges' && password === 'test123@') {
            setUser({ username, role: 'admin' });
            addNotification("Connexion réussie en tant qu'administrateur !", 'success');
        } else {
            setUser({ username, role: 'user' });
            addNotification("Connexion réussie en tant qu'utilisateur !", 'success');
        }
    };

    // Fonction pour gérer la création de compte
    const handleSignUp = (userData) => {
        setUser(userData); // Mettre à jour l'état de l'utilisateur
        setShowSignUp(false); // Masquer le formulaire d'inscription
        addNotification("Compte créé avec succès !", 'success');
    };

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        setUser(null);
        addNotification("Déconnexion réussie !", 'info');
    };

    // Fonction pour soumettre une demande
    const handleSubmit = async (formData) => {
        try {
            const mappedData = {
                employe: formData.employee_name,
                type_conge: formData.leave_type,
                date_debut: formData.start_date,
                date_fin: formData.end_date,
                comments: formData.comments,
                statut: 'En attente'
            };

            const response = await fetch('http://localhost:5000/api/demandes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mappedData)
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la soumission de la demande");
            }

            const data = await response.json();
            setDemandes([...demandes, data.demande]);
            addNotification("Demande soumise avec succès !", 'success');
        } catch (error) {
            console.error("Erreur :", error);
            addNotification("Erreur lors de la soumission de la demande.", 'error');
        }
    };

    // Fonction pour approuver une demande
    const handleApprove = async (id, motif) => {
        try {
            const response = await fetch(`http://localhost:5000/api/demandes/${id}/approve`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ motif })
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'acceptation de la demande");
            }

            const updatedDemandes = demandes.map(d =>
                d.id === id ? { ...d, statut: 'Acceptée', motif } : d
            );
            setDemandes(updatedDemandes);

            // Enregistrer la demande approuvée dans le système RH
            const demandeApprouvee = demandes.find(d => d.id === id);
            setRHDemandes([...rhDemandes, demandeApprouvee]);

            addNotification("Demande acceptée avec succès !", 'success');
        } catch (error) {
            console.error("Erreur :", error);
            addNotification("Erreur lors de l'acceptation de la demande.", 'error');
        }
    };

    // Fonction pour rejeter une demande
    const handleReject = async (id, motif) => {
        try {
            const response = await fetch(`http://localhost:5000/api/demandes/${id}/reject`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ motif })
            });

            if (!response.ok) {
                throw new Error("Erreur lors du rejet de la demande");
            }

            const updatedDemandes = demandes.map(d =>
                d.id === id ? { ...d, statut: 'Rejetée', motif } : d
            );
            setDemandes(updatedDemandes);

            addNotification("Demande rejetée avec succès !", 'success');
        } catch (error) {
            console.error("Erreur :", error);
            addNotification("Erreur lors du rejet de la demande.", 'error');
        }
    };

    // Charger les demandes au démarrage
    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/demandes');
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des demandes");
                }
                const data = await response.json();
                setDemandes(data);
            } catch (error) {
                console.error("Erreur :", error);
                addNotification("Erreur lors de la récupération des demandes.", 'error');
            }
        };

        fetchDemandes();
    }, []);

    return (
        <div>
            {/* Afficher les notifications */}
            <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
                {notifications.map((n) => (
                    <Notification
                        key={n.id}
                        message={n.message}
                        type={n.type}
                        onClose={() => removeNotification(n.id)}
                    />
                ))}
            </div>

            <Navbar user={user} onLogout={handleLogout} />
            {!user ? (
                <>
                    {!showSignUp ? (
                        <>
                            <Login onLogin={handleLogin} />
                            <button onClick={() => setShowSignUp(true)}>Créer un compte</button>
                        </>
                    ) : (
                        <SignUp onSignUp={handleSignUp} />
                    )}
                </>
            ) : user.role === 'admin' ? (
                <Dashboard
                    requests={demandes}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            ) : (
                <>
                    <LeaveRequestForm onSubmit={handleSubmit} />
                    <h2>Mes demandes</h2>
                    <LeaveRequestList
                        requests={demandes.filter(d => d.employe === user.username)}
                    />
                </>
            )}
        </div>
    );
}

export default App;