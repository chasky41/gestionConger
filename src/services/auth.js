export const hasPermission = (userRole, requiredPermission) => {
    const permissions = {
        employe: ['submit_leave'],
        manager: ['approve_leave', 'view_leave'],
        rh: ['view_all', 'manage_leave']
    };
    return permissions[userRole]?.includes(requiredPermission);
};