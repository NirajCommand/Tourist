// Authentication Logic
const login = (email, password) => {
    // Mock Auth for Tourist for demo
    if (email.includes('tourist')) {
        localStorage.setItem('user', JSON.stringify({ email, role: 'Tourist' }));
        return true;
    }
    return false;
};

const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '../pages/auth.html';
};

window.authAPI = { login, logout };
