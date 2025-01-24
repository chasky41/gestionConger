export const encryptData = (data) => {
    // Exemple de chiffrement (à adapter)
    return btoa(JSON.stringify(data));
};

export const decryptData = (data) => {
    // Exemple de déchiffrement (à adapter)
    return JSON.parse(atob(data));
};