const Place = require('../models/Place');
const Package = require('../models/Package');

// @desc    Get all places
// @route   GET /api/places
// @access  Public
exports.getPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
exports.getPackages = async (req, res) => {
    try {
        const packages = await Package.find().populate('places');
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Seed initial data (For development)
// @route   POST /api/content/seed
// @access  Admin
exports.seedContent = async (req, res) => {
    try {
        // Clear existing
        await Place.deleteMany();
        await Package.deleteMany();

        const placesData = [
            {
                slug: 'dwarka-mandir',
                title: 'Dwarkadhish Mandir',
                subtitle: 'The Main Temple of Dwarka',
                description: 'The Dwarkadhish Temple, also known as Jagat Mandir, is a 2500+ year old temple dedicated to Lord Krishna. The 5-storey structure stands on 72 pillars and features intricate carvings. One of the Char Dham pilgrimage sites.',
                image: 'dwarka-mandir.png',
                details: [
                    { icon: 'mdi:clock-outline', label: 'Darshan Timings', value: '6:30 AM – 1:00 PM, 5:00 PM – 9:30 PM' },
                    { icon: 'mdi:calendar-star', label: 'Best Time', value: 'Janmashtami (Aug/Sep)' },
                    { icon: 'mdi:walk', label: 'From City Center', value: 'Walking distance' }
                ]
            },
            {
                slug: 'gomti-ghat',
                title: 'Gomti Ghat',
                subtitle: 'Sacred River Confluence',
                description: 'Gomti Ghat is where the sacred Gomti River meets the Arabian Sea. Pilgrims take a holy dip here before visiting the Dwarkadhish Temple. The evening aarti is a mesmerizing experience with hundreds of floating diyas.',
                image: 'gomti-ghat.png',
                details: [
                    { icon: 'mdi:weather-sunset', label: 'Evening Aarti', value: 'Sunset (6:00 – 7:00 PM)' },
                    { icon: 'mdi:swim', label: 'Holy Dip', value: 'Safe bathing ghats' },
                    { icon: 'mdi:walk', label: 'From Mandir', value: '5 min walk' }
                ]
            }
            // Add more if needed...
        ];

        const savedPlaces = await Place.insertMany(placesData);

        const packagesData = [
            {
                title: 'Complete Dwarka Darshan',
                description: 'Visit all the sacred sites in Dwarka in one day.',
                price: 1500,
                duration: '1 Day',
                image: 'dwarka-mandir.png',
                places: savedPlaces.map(p => p._id)
            }
        ];

        await Package.insertMany(packagesData);

        res.json({ message: 'Content seeded successfully', places: savedPlaces.length });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
