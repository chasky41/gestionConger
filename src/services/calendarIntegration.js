export const addToGoogleCalendar = async (event) => {
    const response = await fetch('http://localhost:5000/api/google-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    });
    return response.json();
};

export const addToOutlookCalendar = async (event) => {
    const response = await fetch('http://localhost:5000/api/outlook-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    });
    return response.json();
};