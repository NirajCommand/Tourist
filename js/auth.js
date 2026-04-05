// Authentication Logic
const login = async (email, password) => {
    try {
        const data = await window.supabaseAPI.signIn(email, password);
        if (data.user) {
            // Fetch profile for role
            const profile = await window.supabaseAPI.getUserProfile(data.user.id);
            const userSession = {
                id: data.user.id,
                email: data.user.email,
                role: profile.role
            };
            localStorage.setItem('user', JSON.stringify(userSession));
            return { success: true, user: userSession };
        }
    } catch (error) {
        console.error('Login error:', error.message);
        return { success: false, error: error.message };
    }
};

const signup = async (email, password, role) => {
    try {
        const data = await window.supabaseAPI.signUp(email, password, role);
        if (data.user) {
            const userSession = {
                id: data.user.id,
                email: data.user.email,
                role: role
            };
            localStorage.setItem('user', JSON.stringify(userSession));
            return { success: true, user: userSession };
        }
    } catch (error) {
        console.error('Signup error:', error.message);
        return { success: false, error: error.message };
    }
};

const logout = async () => {
    await window.supabaseAPI.signOut();
    localStorage.removeItem('user');
    window.location.href = '../pages/auth.html';
};

window.authAPI = { login, signup, logout };
