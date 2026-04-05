// Rating Component
(function() {
    window.renderRating = (stars) => {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<i class="bi bi-star${i <= Math.floor(stars) ? '-fill' : (i - 0.5 <= stars ? '-half' : '')} text-warning me-1"></i>`;
        }
        return `
            <div class="d-inline-flex align-items-center">
                ${starsHtml}
                <span class="ms-1 small text-muted poppins-medium">${stars}</span>
            </div>
        `;
    };
})();
