import React from 'react';

function LeaveRequestList({ requests, onEdit, onCancel, onApprove, isAdmin }) {
    return (
        <div className="request-list">
            <h2>Liste des demandes</h2>
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
                                {isAdmin ? (
                                    <>
                                        <button className="approve" onClick={() => onApprove(request.id)}>
                                            Accepter
                                        </button>
                                        <button className="cancel" onClick={() => onCancel(request.id)}>
                                            Annuler
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit" onClick={() => onEdit(request.id)}>
                                            Modifier
                                        </button>
                                        <button className="cancel" onClick={() => onCancel(request.id)}>
                                            Annuler
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeaveRequestList;