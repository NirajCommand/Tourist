// Role-Based Redirection
const RolePaths = {
    Tourist: '../pages/user-home.html',
    Hotel: '../pages/hotel-dashboard.html',
    Guide: '../pages/guide-dashboard.html',
    Admin: '../pages/admin-dashboard.html'
};

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const requiredRole = document.body.dataset.requiredRole;

    if (requiredRole && (!user || user.role !== requiredRole)) {
        window.location.href = '../pages/auth.html';
        return;
    }

    if (user && window.location.pathname.includes('auth.html')) {
        window.location.href = RolePaths[user.role] || '../index.html';
    }
});
