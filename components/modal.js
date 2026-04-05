// Modal UI Component
(function() {
    window.showAlertModal = ({ title, message, confirmText = 'Confirm', onConfirm, type = 'teal' }) => {
        const modalId = 'alertModal_' + Date.now();
        const modalHtml = `
            <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content glassmorphism border-0 shadow-lg p-3">
                        <div class="modal-header border-0 pb-0">
                            <h5 class="modal-title poppins-bold">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body py-4 inter-regular text-muted">
                            ${message}
                        </div>
                        <div class="modal-footer border-0 pt-0">
                            <button type="button" class="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-${type} rounded-pill px-4 shadow-sm" id="confirmBtn_${modalId}">${confirmText}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modalEl = document.getElementById(modalId);
        const modal = new bootstrap.Modal(modalEl);
        
        modalEl.querySelector(`#confirmBtn_${modalId}`).addEventListener('click', () => {
            if (onConfirm) onConfirm();
            modal.hide();
        });

        modalEl.addEventListener('hidden.bs.modal', () => {
            modalEl.remove();
        });

        modal.show();
    };
})();
