import React, { useState } from 'react';

function LeaveRequestForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        employee_name: '',
        leave_type: 'payé',
        start_date: '',
        end_date: '',
        comments: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-container">
            <h2>Déposer une demande</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="employee_name"
                    placeholder="Nom de l'employé"
                    value={formData.employee_name}
                    onChange={handleChange}
                    required
                />
                <select
                    name="leave_type"
                    value={formData.leave_type}
                    onChange={handleChange}
                    required
                >
                    <option value="payé">Payé</option>
                    <option value="maladie">Maladie</option>
                    <option value="sans solde">Sans solde</option>
                </select>
                <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="comments"
                    placeholder="Commentaires"
                    value={formData.comments}
                    onChange={handleChange}
                />
                <button type="submit">Soumettre</button>
            </form>
        </div>
    );
}

export default LeaveRequestForm;