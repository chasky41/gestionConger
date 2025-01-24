import React, { useState } from 'react';

function Dashboard({ requests, onApprove, onReject }) {
    const [motif, setMotif] = useState('');

    const handleApprove = (id) => {
        if (!motif) {
            alert("Veuillez entrer un motif avant d'approuver la demande.");
            return;
        }
        onApprove(id, motif);
        setMotif(''); // Réinitialiser le champ de motif
    };

    const handleReject = (id) => {
        if (!motif) {
            alert("Veuillez entrer un motif avant de rejeter la demande.");
            return;
        }
        onReject(id, motif);
        setMotif(''); // Réinitialiser le champ de motif
    };

    return (
        <div className="container">
            <h2>Dashboard Administrateur</h2>
            <div>
                <label>Motif :</label>
                <input
                    type="text"
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                    placeholder="Entrez un motif"
                />
            </div>
            <ul>
                {requests.map((request, index) => (
                    <li key={index}>
                        <div>
                            <strong>Employé :</strong> {request.employe}
                        </div>
                        <div>
                            <strong>Type de congé :</strong> {request.type_conge}
                        </div>
                        <div>
                            <strong>Date de début :</strong> {request.date_debut}
                        </div>
                        <div>
                            <strong>Date de fin :</strong> {request.date_fin}
                        </div>
                        <div>
                            <strong>Statut :</strong> {request.statut}
                        </div>
                        {request.statut === 'En attente' && (
                            <div>
                                <button onClick={() => handleApprove(request.id)}>
                                    Approuver
                                </button>
                                <button onClick={() => handleReject(request.id)}>
                                    Rejeter
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;