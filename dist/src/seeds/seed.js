"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const faker_1 = require("@faker-js/faker");
const User_1 = __importDefault(require("../models/User"));
const Property_1 = __importDefault(require("../models/Property"));
const Booking_1 = __importDefault(require("../models/Booking"));
const Review_1 = __importDefault(require("../models/Review"));
const Destination_1 = __importDefault(require("../models/Destination"));
const Deal_1 = __importDefault(require("../models/Deal"));
// Common amenities for properties
const AMENITIES = [
    'WiFi',
    'Kitchen',
    'Air conditioning',
    'Heating',
    'TV',
    'Washer',
    'Dryer',
    'Free parking',
    'Pool',
    'Hot tub',
    'Gym',
    'Workspace',
    'Coffee maker',
    'Microwave',
    'Refrigerator',
    'Dishwasher',
    'Balcony',
    'Garden',
    'BBQ grill',
    'Fire pit'
];
// Property title adjectives
const PROPERTY_ADJECTIVES = [
    'Modern', 'Cozy', 'Spacious', 'Luxurious', 'Charming', 'Elegant',
    'Stunning', 'Beautiful', 'Comfortable', 'Stylish', 'Contemporary',
    'Sophisticated', 'Delightful', 'Bright', 'Peaceful'
];
const PROPERTY_TYPES = [
    'Apartment',
    'House',
    'Villa',
    'Condo',
    'Cottage',
    'Cabin',
    'Bungalow',
    'Studio',
    'Loft',
    'Townhouse'
];
// Sample cities in Nigeria
const LOCATIONS = [
    { city: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792 },
    { city: 'Abuja', country: 'Nigeria', lat: 9.0579, lng: 7.4951 },
    { city: 'Port Harcourt', country: 'Nigeria', lat: 4.8156, lng: 7.0498 },
    { city: 'Kano', country: 'Nigeria', lat: 12.0022, lng: 8.5920 },
    { city: 'Ibadan', country: 'Nigeria', lat: 7.3775, lng: 3.9470 },
    { city: 'Kaduna', country: 'Nigeria', lat: 10.5105, lng: 7.4165 },
    { city: 'Benin City', country: 'Nigeria', lat: 6.3350, lng: 5.6037 },
    { city: 'Calabar', country: 'Nigeria', lat: 4.9757, lng: 8.3417 },
    { city: 'Enugu', country: 'Nigeria', lat: 6.4431, lng: 7.4931 },
    { city: 'Jos', country: 'Nigeria', lat: 9.9285, lng: 8.8921 }
];
// Review comments templates
const REVIEW_COMMENTS = [
    'Amazing place! Very clean and comfortable. The host was super responsive and helpful.',
    'Great location with easy access to public transport. The apartment had everything we needed.',
    'Beautiful property with stunning views. Would definitely come back again!',
    'Perfect for a family vacation. Spacious and well-equipped kitchen.',
    'The pictures don\'t do it justice - even better in person! Highly recommend.',
    'Cozy and charming place. Felt like home away from home.',
    'Good value for money. Location was convenient for exploring the city.',
    'Lovely stay! The neighborhood was quiet and safe. Host provided great recommendations.',
    'Modern and stylish apartment. Very comfortable beds and great shower.',
    'Excellent communication from the host. Check-in and check-out were seamless.'
];
// Trending destinations data
const TRENDING_DESTINATIONS = [
    {
        name: 'Lagos',
        country: 'Nigeria',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
        properties: 1547,
        description: 'Economic hub & beaches',
    },
    {
        name: 'Abuja',
        country: 'Nigeria',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
        properties: 892,
        description: 'Federal capital city',
    },
    {
        name: 'Calabar',
        country: 'Nigeria',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
        properties: 543,
        description: 'Tourist paradise',
    },
    {
        name: 'Port Harcourt',
        country: 'Nigeria',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
        properties: 678,
        description: 'Garden city',
    },
    {
        name: 'Ibadan',
        country: 'Nigeria',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
        properties: 487,
        description: 'Historic city',
    },
    {
        name: 'Jos',
        country: 'Nigeria',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        properties: 325,
        description: 'Plateau paradise',
    },
];
// Weekend deals data
const WEEKEND_DEALS = [
    {
        title: 'Luxury Beachfront Villa',
        description: 'Stunning Atlantic ocean views with private beach access',
        location: 'Lekki, Lagos',
        image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
        originalPrice: 750000,
        discountedPrice: 525000,
        discount: 30,
        rating: 4.9,
        propertyType: 'Villa',
        checkInDate: 'Fri, Feb 14',
        checkOutDate: 'Sun, Feb 16',
    },
    {
        title: 'Modern Victoria Island Apartment',
        description: 'Sleek apartment in the heart of the business district',
        location: 'Victoria Island, Lagos',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        originalPrice: 465000,
        discountedPrice: 348750,
        discount: 25,
        rating: 4.7,
        propertyType: 'Apartment',
        checkInDate: 'Fri, Feb 14',
        checkOutDate: 'Sun, Feb 16',
    },
    {
        title: 'Cozy Hilltop Cottage',
        description: 'Perfect retreat on the Jos Plateau with stunning views',
        location: 'Jos, Plateau State',
        image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80',
        originalPrice: 530000,
        discountedPrice: 371000,
        discount: 30,
        rating: 4.8,
        propertyType: 'Cottage',
        checkInDate: 'Fri, Feb 14',
        checkOutDate: 'Sun, Feb 16',
    },
    {
        title: 'Boutique Hotel Suite',
        description: 'Elegant suite with premium amenities and excellent service',
        location: 'Maitama, Abuja',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        originalPrice: 630000,
        discountedPrice: 441000,
        discount: 30,
        rating: 4.9,
        propertyType: 'Hotel',
        checkInDate: 'Fri, Feb 14',
        checkOutDate: 'Sun, Feb 16',
    },
    {
        title: 'Seaside Resort Villa',
        description: 'Luxurious villa with infinity pool and Atlantic ocean views',
        location: 'Elegushi Beach, Lagos',
        image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80',
        originalPrice: 865000,
        discountedPrice: 605500,
        discount: 30,
        rating: 5.0,
        propertyType: 'Villa',
        checkInDate: 'Fri, Feb 14',
        checkOutDate: 'Sun, Feb 16',
    },
    {
        title: 'Urban Penthouse with City Views',
        description: 'Contemporary penthouse overlooking the Garden City',
        location: 'Port Harcourt, Rivers State',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        originalPrice: 680000,
        discountedPrice: 476000,
        discount: 30,
        rating: 4.8,
        propertyType: 'Apartment',
        checkInDate: 'Fri, Feb 14',
        checkOutDate: 'Sun, Feb 16',
    },
];
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');
        // Check if data already exists
        const userCount = await User_1.default.countDocuments();
        if (userCount > 0) {
            console.log('⚠️  Database already contains data. Skipping seed process.');
            console.log(`   Found ${userCount} users in the database.`);
            return;
        }
        // Step 1: Create Users
        console.log('👥 Creating users...');
        const users = [];
        // Create 1 admin
        users.push({
            email: 'admin@booking.com',
            password: 'admin123',
            firstName: 'Admin',
            lastName: 'User',
            phone: faker_1.faker.phone.number(),
            role: 'admin'
        });
        // Create 5 hosts
        for (let i = 0; i < 5; i++) {
            users.push({
                email: faker_1.faker.internet.email().toLowerCase(),
                password: 'password123',
                firstName: faker_1.faker.person.firstName(),
                lastName: faker_1.faker.person.lastName(),
                phone: faker_1.faker.phone.number(),
                role: 'host'
            });
        }
        // Create 10 guests
        for (let i = 0; i < 10; i++) {
            users.push({
                email: faker_1.faker.internet.email().toLowerCase(),
                password: 'password123',
                firstName: faker_1.faker.person.firstName(),
                lastName: faker_1.faker.person.lastName(),
                phone: faker_1.faker.phone.number(),
                role: 'guest'
            });
        }
        // Use create instead of insertMany to trigger pre-save hooks for password hashing
        const createdUsers = [];
        for (const userData of users) {
            const user = await User_1.default.create(userData);
            createdUsers.push(user);
        }
        console.log(`✅ Created ${createdUsers.length} users`);
        // Get hosts and guests separately
        const hosts = createdUsers.filter(u => u.role === 'host');
        const guests = createdUsers.filter(u => u.role === 'guest');
        // Step 2: Create Properties
        console.log('🏠 Creating properties...');
        const properties = [];
        for (let i = 0; i < 25; i++) {
            const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
            const propertyType = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];
            const bedrooms = faker_1.faker.number.int({ min: 1, max: 5 });
            const bathrooms = faker_1.faker.number.int({ min: 1, max: 3 });
            const maxGuests = bedrooms * 2;
            // Price range in Nigerian Naira (₦15,000 - ₦150,000 per night)
            const pricePerNight = faker_1.faker.number.int({ min: 15000, max: 150000 });
            // Select random amenities
            const numAmenities = faker_1.faker.number.int({ min: 5, max: 12 });
            const selectedAmenities = faker_1.faker.helpers.arrayElements(AMENITIES, numAmenities);
            properties.push({
                title: `${PROPERTY_ADJECTIVES[Math.floor(Math.random() * PROPERTY_ADJECTIVES.length)]} ${propertyType} in ${location.city}`,
                description: `${faker_1.faker.lorem.paragraph(3)} This ${propertyType.toLowerCase()} is perfect for your stay in ${location.city}. ${faker_1.faker.lorem.sentence()}`,
                propertyType,
                address: faker_1.faker.location.streetAddress(),
                city: location.city,
                country: location.country,
                coordinates: {
                    lat: location.lat + (Math.random() - 0.5) * 0.1,
                    lng: location.lng + (Math.random() - 0.5) * 0.1
                },
                pricePerNight,
                maxGuests,
                bedrooms,
                bathrooms,
                amenities: selectedAmenities,
                images: [
                    `https://picsum.photos/800/600?random=${i * 3 + 1}`,
                    `https://picsum.photos/800/600?random=${i * 3 + 2}`,
                    `https://picsum.photos/800/600?random=${i * 3 + 3}`
                ],
                hostId: hosts[Math.floor(Math.random() * hosts.length)]._id,
                rules: faker_1.faker.lorem.sentences(2),
                isActive: true
            });
        }
        const createdProperties = await Property_1.default.insertMany(properties);
        console.log(`✅ Created ${createdProperties.length} properties`);
        // Step 3: Create Bookings
        console.log('📅 Creating bookings...');
        const bookings = [];
        const now = new Date();
        for (let i = 0; i < 20; i++) {
            const property = createdProperties[Math.floor(Math.random() * createdProperties.length)];
            const guest = guests[Math.floor(Math.random() * guests.length)];
            // Create bookings in the past, present, and future
            const daysOffset = faker_1.faker.number.int({ min: -60, max: 60 });
            const checkInDate = new Date(now);
            checkInDate.setDate(checkInDate.getDate() + daysOffset);
            const nights = faker_1.faker.number.int({ min: 2, max: 14 });
            const checkOutDate = new Date(checkInDate);
            checkOutDate.setDate(checkOutDate.getDate() + nights);
            const guestsCount = faker_1.faker.number.int({ min: 1, max: property.maxGuests });
            const totalPrice = property.pricePerNight * nights;
            // Determine status based on dates
            let status;
            if (checkOutDate < now) {
                status = Math.random() > 0.1 ? 'completed' : 'cancelled';
            }
            else if (checkInDate < now && checkOutDate > now) {
                status = 'confirmed';
            }
            else {
                status = Math.random() > 0.15 ? 'confirmed' : 'pending';
            }
            bookings.push({
                propertyId: property._id,
                userId: guest._id,
                checkInDate,
                checkOutDate,
                guests: guestsCount,
                totalPrice,
                status
            });
        }
        const createdBookings = await Booking_1.default.insertMany(bookings);
        console.log(`✅ Created ${createdBookings.length} bookings`);
        // Step 4: Create Reviews (only for completed bookings)
        console.log('⭐ Creating reviews...');
        const reviews = [];
        const completedBookings = createdBookings.filter(b => b.status === 'completed');
        for (const booking of completedBookings) {
            // About 80% of completed bookings get reviews
            if (Math.random() > 0.2) {
                const rating = faker_1.faker.number.int({ min: 3, max: 5 });
                const comment = faker_1.faker.helpers.arrayElement(REVIEW_COMMENTS);
                reviews.push({
                    propertyId: booking.propertyId,
                    userId: booking.userId,
                    bookingId: booking._id,
                    rating,
                    comment
                });
            }
        }
        const createdReviews = await Review_1.default.insertMany(reviews);
        console.log(`✅ Created ${createdReviews.length} reviews`);
        // Step 5: Create Destinations
        console.log('🌍 Creating destinations...');
        const createdDestinations = await Destination_1.default.insertMany(TRENDING_DESTINATIONS);
        console.log(`✅ Created ${createdDestinations.length} destinations`);
        // Step 6: Create Deals
        console.log('🏷️  Creating deals...');
        const createdDeals = await Deal_1.default.insertMany(WEEKEND_DEALS);
        console.log(`✅ Created ${createdDeals.length} deals`);
        console.log('');
        console.log('🎉 Database seeding completed successfully!');
        console.log('📊 Summary:');
        console.log(`   - Users: ${createdUsers.length} (1 admin, ${hosts.length} hosts, ${guests.length} guests)`);
        console.log(`   - Properties: ${createdProperties.length}`);
        console.log(`   - Bookings: ${createdBookings.length}`);
        console.log(`   - Reviews: ${createdReviews.length}`);
        console.log(`   - Destinations: ${createdDestinations.length}`);
        console.log(`   - Deals: ${createdDeals.length}`);
        console.log('');
        console.log('🔐 Test credentials:');
        console.log('   Admin: admin@booking.com / admin123');
        console.log('   All other users: <email from DB> / password123');
        console.log('');
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
};
exports.seedDatabase = seedDatabase;
