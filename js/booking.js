// Booking Logic & Calculations
const BookingRules = {
    PACKAGE: {
        GUIDE_FEE: 0.1,
        ADMIN_FEE: 0.1,
        TAX_RATE: 0.05
    },
    HOTEL: {
        PLATFORM_FEE: 0.2,
        TAX_RATE: 0.05
    }
};

const calculatePackageTotal = (base, hotel) => {
    const subtotal = base + hotel;
    const guide = subtotal * BookingRules.PACKAGE.GUIDE_FEE;
    const admin = subtotal * BookingRules.PACKAGE.ADMIN_FEE;
    const tax = subtotal * BookingRules.PACKAGE.TAX_RATE;
    return subtotal + guide + admin + tax;
};

const calculateHotelTotal = (roomRate) => {
    const platform = roomRate * BookingRules.HOTEL.PLATFORM_FEE;
    const tax = roomRate * BookingRules.HOTEL.TAX_RATE;
    return roomRate + platform + tax;
};

window.bookingCalculations = { calculatePackageTotal, calculateHotelTotal };
