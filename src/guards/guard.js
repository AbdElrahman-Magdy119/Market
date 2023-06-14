export function requireAdminAuth(to, from, next) {
    const isAuthenticated = function () {
        return !!localStorage.getItem('token');
    }
    const isAdmin = function () {
        return localStorage.getItem('role') === 'admin';
    }

    if (isAuthenticated() && isAdmin()) {
        // User is authenticated and is an admin
        next();
    } else {
        next({ path: "/404" }); // Redirect to 404 Not Found page
    }
}

export function requireAuth(to, from, next) {
    const isAuthenticated = function () {
        return !!localStorage.getItem('token');
    }

    if (isAuthenticated()) {
        // User is authenticated
        next();
    } else {
        next({ path: "/login" }); // Redirect to login page
    }
}
