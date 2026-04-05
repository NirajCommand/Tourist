// Generic Card Component
(function() {
    window.renderCard = (data) => {
        return `
            <div class="card border-0 shadow-sm rounded-4 h-100 card-hover">
                <img src="${data.ImageURL}" class="card-img-top rounded-top-4" alt="${data.Title}">
                <div class="card-body p-4">
                    <h5 class="card-title poppins-semibold">${data.Title}</h5>
                    <p class="text-muted inter-regular small">${data.Description}</p>
                    <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                        <span class="fs-5 poppins-bold text-teal">₹${data.Price}</span>
                        <a href="${data.Url}" class="btn btn-outline-brand rounded-pill btn-sm px-4">View</a>
                    </div>
                </div>
            </div>
        `;
    };
})();
