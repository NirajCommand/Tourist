// Toast Notification Component
(function() {
    window.showToast = (title, message, type = 'success') => {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastId = 'toast_' + Date.now();
        const toastHtml = `
            <div id="${toastId}" class="toast glassmorphism border-0 shadow-lg mb-3" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-transparent border-0 py-3">
                    <i class="bi bi-${type === 'success' ? 'check-circle text-success' : 'exclamation-circle text-danger'} me-2 fs-5"></i>
                    <strong class="me-auto poppins-semibold">${title}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body pt-0 pb-3 inter-regular text-muted">
                    ${message}
                </div>
            </div>
        `;

        toastContainer.insertAdjacentHTML('beforeend', toastHtml);
        const toastEl = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
        
        toastEl.addEventListener('hidden.bs.toast', () => {
            toastEl.remove();
        });

        toast.show();
    };
})();
