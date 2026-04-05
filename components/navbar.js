(function() {
    window.renderNavbar = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const navContainer = document.getElementById('navbar-container');
        if (!navContainer) return;

        const navHtml = `
            <nav class="navbar navbar-expand-lg fixed-top transition-all" id="mainNav">
                <div class="container">
                    <a class="navbar-brand poppins-bold fs-3 text-teal" href="../pages/user-home.html">
                        <i class="bi bi-compass me-2"></i>Wanderlust
                    </a>
                    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navContent">
                        <ul class="navbar-nav ms-auto align-items-center gap-2">
                            <li class="nav-item">
                                <a class="nav-link inter-medium" href="../pages/packages.html">Packages</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link inter-medium" href="../pages/hotels.html">Hotels</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link inter-medium" href="../pages/my-trips.html">My Trips</a>
                            </li>
                            <li class="nav-item ms-lg-3">
                                <div class="dropdown">
                                    <div class="d-flex align-items-center gap-2 cursor-pointer dropdown-toggle" data-bs-toggle="dropdown">
                                        <div class="bg-teal text-white rounded-circle d-flex justify-content-center align-items-center" style="width: 35px; height: 35px;">
                                            ${user ? user.email[0].toUpperCase() : 'U'}
                                        </div>
                                        <span class="inter-medium d-none d-md-block">${user ? user.email.split('@')[0] : 'User'}</span>
                                    </div>
                                    <ul class="dropdown-menu dropdown-menu-end glassmorphism border-0 shadow-lg mt-2">
                                        <li><a class="dropdown-item" href="../pages/profile.html"><i class="bi bi-person me-2"></i>Profile</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item text-danger" href="#" id="logoutBtn"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
        navContainer.innerHTML = navHtml;

        // Navbar Scroll Logic
        const nav = document.getElementById('mainNav');
        const handleScroll = () => {
            if (window.scrollY > 50) {
                nav.classList.add('bg-white', 'shadow-sm', 'bg-opacity-95');
                nav.classList.remove('bg-opacity-40');
            } else {
                nav.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-95');
                nav.classList.add('bg-opacity-40');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = '../pages/auth.html';
        });
    };
    
    document.addEventListener('DOMContentLoaded', window.renderNavbar);
})();
