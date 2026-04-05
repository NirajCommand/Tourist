// Supabase Client Initialization
// Replace with your credentials
const SUPABASE_URL = 'https://mgmnbpwsxmjajqpidpna.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbW5icHdzeG1qYWpxcGlkcG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MDI0MTIsImV4cCI6MjA5MDk3ODQxMn0.zhqzzv7w3henWTt2KM8juOHDj4a5QfqBh_g6sMGBsX4';

// Mock DB for development/preview
window.mockDB = {
    DESTINATIONS: [
        { DestinationID: 1, DestinationName: 'Paris, France', Description: 'The romantic city of lights with iconic landmarks.', ImageURL: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800' },
        { DestinationID: 2, DestinationName: 'Bali, Indonesia', Description: 'Tropical paradise with serene beaches and lush greenery.', ImageURL: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
        { DestinationID: 3, DestinationName: 'Santorini, Greece', Description: 'Stunning white buildings and breathtaking sunsets.', ImageURL: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800' }
    ],
    PACKAGES: [
        { PackageID: 1, PackageName: 'Bali Adventure', DestinationID: 2, Price: 120000, Duration: 7, Rating: 4.8, ImageURL: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800', Description: 'A complete 7-day tour of Bali including beaches, temples, and forests.', GuideID: 1 },
        { PackageID: 2, PackageName: 'Paris Explorer', DestinationID: 1, Price: 150000, Duration: 5, Rating: 4.9, ImageURL: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', Description: 'Deep dive into the architecture and history of Paris.', GuideID: 2 },
        { PackageID: 3, PackageName: 'Bali Retreat', DestinationID: 2, Price: 85000, Duration: 4, Rating: 4.7, ImageURL: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&q=80&w=800', Description: 'Short but sweet escape to the best of Bali.', GuideID: 1 }
    ],
    HOTELS: [
        { HotelID: 1, HotelName: 'Grand Hyatt Bali', DestinationID: 2, Rating: 4.7, ImageURL: 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66b?auto=format&fit=crop&q=80&w=800' },
        { HotelID: 2, HotelName: 'Paris Ritz', DestinationID: 1, Rating: 4.9, ImageURL: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800' }
    ],
    ROOMS: [
        { RoomID: 1, HotelID: 1, RoomType: 'Deluxe Suite', Price: 15000 },
        { RoomID: 2, HotelID: 1, RoomType: 'Ocean View', Price: 22000 }
    ],
    GUIDES: [
        { GuideID: 1, Name: 'Made Wirawan', Rating: 4.9, Languages: ['English', 'Indonesian'] },
        { GuideID: 2, Name: 'Jean Dupont', Rating: 4.8, Languages: ['English', 'French'] }
    ],
    BOOKINGS: [
        { BookingID: 101, user_id: 1, type: 'package', item_id: 1, total_price: 135000, date: '2024-06-15', Status: 'Confirmed', GuideName: 'Made Wirawan' }
    ],
    REVIEWS: []
};

// API Service Layer
window.supabaseAPI = {
    async getDestinations() { return Promise.resolve(window.mockDB.DESTINATIONS); },
    async getPackages() { return Promise.resolve(window.mockDB.PACKAGES); },
    async getHotels() { return Promise.resolve(window.mockDB.HOTELS); },
    async getBookings(userId) { return Promise.resolve(window.mockDB.BOOKINGS); },
    
    async createBooking(data) {
        data.BookingID = Math.floor(Math.random() * 1000);
        data.Status = 'Pending';
        window.mockDB.BOOKINGS.push(data);
        return Promise.resolve(data);
    },
    
    async cancelBooking(id) {
        const booking = window.mockDB.BOOKINGS.find(b => b.BookingID === id);
        if (booking) booking.Status = 'Cancelled';
        return Promise.resolve({ success: true });
    },

    async createReview(data) {
        window.mockDB.REVIEWS.push({ ...data, date: new Date().toISOString() });
        return Promise.resolve({ success: true });
    }
};
