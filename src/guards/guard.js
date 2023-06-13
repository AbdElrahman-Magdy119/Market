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
