import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Enregistrer les composants de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ReportingPage({ requests }) {
    const [filters, setFilters] = useState({
        employe: '',
        type_conge: '',
        statut: ''
    });
    const [filteredRequests, setFilteredRequests] = useState(requests);
    const [reportType, setReportType] = useState('mensuel'); // 'mensuel' ou 'annuel'
    const [chartData, setChartData] = useState({});

    // Appliquer les filtres
    useEffect(() => {
        const filtered = requests.filter(request => {
            return (
                (filters.employe ? request.employe.includes(filters.employe) : true) &&
                (filters.type_conge ? request.type_conge === filters.type_conge : true) &&
                (filters.statut ? request.statut === filters.statut : true)
            );
        });
        setFilteredRequests(filtered);
    }, [filters, requests]);

    // Générer les données pour le graphique
    useEffect(() => {
        const data = generateChartData(filteredRequests, reportType);
        setChartData(data);
    }, [filteredRequests, reportType]);

    // Fonction pour générer les données du graphique
    const generateChartData = (requests, type) => {
        const labels = type === 'mensuel' 
            ? ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
            : Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i); // 5 dernières années

        const datasets = [
            {
                label: 'Demandes Approuvées',
                data: labels.map((label, index) => {
                    return requests.filter(request => {
                        const date = new Date(request.date_debut);
                        return (
                            (type === 'mensuel' ? date.getMonth() === index : date.getFullYear() === label) &&
                            request.statut === 'Approuvée'
                        );
                    }).length;
                }),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Demandes Rejetées',
                data: labels.map((label, index) => {
                    return requests.filter(request => {
                        const date = new Date(request.date_debut);
                        return (
                            (type === 'mensuel' ? date.getMonth() === index : date.getFullYear() === label) &&
                            request.statut === 'Rejetée'
                        );
                    }).length;
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Demandes en Attente',
                data: labels.map((label, index) => {
                    return requests.filter(request => {
                        const date = new Date(request.date_debut);
                        return (
                            (type === 'mensuel' ? date.getMonth() === index : date.getFullYear() === label) &&
                            request.statut === 'En attente'
                        );
                    }).length;
                }),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
        ];

        return {
            labels,
            datasets,
        };
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Suivi et Reporting</h2>

            {/* Filtres */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Filtrer les demandes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employé</label>
                        <input
                            type="text"
                            value={filters.employe}
                            onChange={(e) => setFilters({ ...filters, employe: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            placeholder="Filtrer par employé"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type de congé</label>
                        <select
                            value={filters.type_conge}
                            onChange={(e) => setFilters({ ...filters, type_conge: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Tous</option>
                            <option value="Congé annuel">Congé annuel</option>
                            <option value="Congé maladie">Congé maladie</option>
                            <option value="Congé maternité">Congé maternité</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Statut</label>
                        <select
                            value={filters.statut}
                            onChange={(e) => setFilters({ ...filters, statut: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Tous</option>
                            <option value="Approuvée">Approuvée</option>
                            <option value="Rejetée">Rejetée</option>
                            <option value="En attente">En attente</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Graphique */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Rapport {reportType === 'mensuel' ? 'Mensuel' : 'Annuel'}</h3>
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => setReportType('mensuel')}
                        className={`px-4 py-2 rounded ${reportType === 'mensuel' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Mensuel
                    </button>
                    <button
                        onClick={() => setReportType('annuel')}
                        className={`px-4 py-2 rounded ${reportType === 'annuel' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Annuel
                    </button>
                </div>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: `Rapport ${reportType === 'mensuel' ? 'Mensuel' : 'Annuel'} des demandes de congé`,
                            },
                        },
                    }}
                />
            </div>

            {/* Liste des demandes filtrées */}
            <div>
                <h3 className="text-xl font-semibold mb-2">Demandes filtrées</h3>
                <ul className="space-y-4">
                    {filteredRequests.map((request, index) => (
                        <li key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div><strong>Employé :</strong> {request.employe}</div>
                            <div><strong>Type de congé :</strong> {request.type_conge}</div>
                            <div><strong>Date de début :</strong> {request.date_debut}</div>
                            <div><strong>Date de fin :</strong> {request.date_fin}</div>
                            <div><strong>Statut :</strong> {request.statut}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ReportingPage;