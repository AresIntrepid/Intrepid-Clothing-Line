const mongoose = require('mongoose');
const Product = require('./models/Product');
const config = require('./modules/config');

const products = [
    {
        name: "TECH HOODIE",
        price: 120,
        category: "Tops",
        imageUrl: "/images/tech_hoodie.png"
    },
    {
        name: "CARGO PANTS",
        price: 150,
        category: "Bottoms",
        imageUrl: "/images/cargo_pants.png"
    },
    {
        name: "LONG TEE",
        price: 65,
        category: "Tops",
        imageUrl: "/images/long_tee.png"
    },
    {
        name: "TECHNICAL JACKET",
        price: 180,
        category: "Tops",
        imageUrl: "/images/technical_jacket.png"
    },
    {
        name: "URBAN SHORTS",
        price: 85,
        category: "Bottoms",
        imageUrl: "/images/shorts.png"
    },
    {
        name: "CROSS BODY BAG",
        price: 70,
        category: "Accessories",
        imageUrl: "/images/crossbody_bag.png"
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(config.mongoURI);
        
        // Clear existing products
        await Product.deleteMany({});
        
        // Insert new products
        await Product.insertMany(products);
        
        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
