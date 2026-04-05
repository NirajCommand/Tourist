// Supabase Client Initialization
const SUPABASE_URL = 'https://mgmnbpwsxmjajqpidpna.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbW5icHdzeG1qYWpxcGlkcG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MDI0MTIsImV4cCI6MjA5MDk3ODQxMn0.zhqzzv7w3henWTt2KM8juOHDj4a5QfqBh_g6sMGBsX4';

// Initialize Supabase Client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mock DB for development/preview fallback
window.mockDB = {
    // ... (rest of mockDB content)
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
    BOOKINGS: [],
    REVIEWS: []
};

// API Service Layer
window.supabaseAPI = {
    // Auth Methods
    async signUp(email, password, role) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        // Save role in profiles table
        if (data.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{ id: data.user.id, email: email, role: role }]);
            if (profileError) console.error('Error creating profile:', profileError);
        }
        return data;
    },

    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    },

    async getUserProfile(uid) {
        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', uid)
            .single();
        if (error) return { role: 'Tourist' }; // Default fallback
        return data;
    },

    async signOut() {
        return await supabase.auth.signOut();
    },

    // Data Methods (with mock fallback if table doesn't exist)
    async getDestinations() { 
        const { data } = await supabase.from('DESTINATIONS').select('*');
        return data || window.mockDB.DESTINATIONS;
    },
    async getPackages() { 
        const { data } = await supabase.from('PACKAGES').select('*');
        return data || window.mockDB.PACKAGES;
    },
    async getHotels() { 
        const { data } = await supabase.from('HOTELS').select('*');
        return data || window.mockDB.HOTELS;
    },
    async getBookings(userId) { 
        const { data } = await supabase.from('BOOKINGS').select('*').eq('user_id', userId);
        return data || window.mockDB.BOOKINGS;
    },
    
    async createBooking(bookingData) {
        const { data, error } = await supabase.from('BOOKINGS').insert([bookingData]);
        if (error) {
            // Mock fallback
            bookingData.BookingID = Math.floor(Math.random() * 1000);
            window.mockDB.BOOKINGS.push(bookingData);
            return bookingData;
        }
        return data[0];
    },
    
    async createReview(reviewData) {
        const { data, error } = await supabase.from('REVIEWS').insert([reviewData]);
        return error ? { success: false } : { success: true };
    }
};
