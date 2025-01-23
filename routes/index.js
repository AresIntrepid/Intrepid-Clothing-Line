const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const config = require('../modules/config');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().limit(3);
        res.render('home', {
            title: config.appName,
            products,
            currentYear: new Date().getFullYear()
        });
    } catch (err) {
        res.status(500).render('error', { error: err.message });
    }
});

router.get('/shop', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('shop', {
            title: `${config.appName} - Shop`,
            isShop: true,
            products,
            currentYear: new Date().getFullYear()
        });
    } catch (err) {
        res.status(500).render('error', { error: err.message });
    }
});

router.get('/drops', (req, res) => {
    const upcomingDrops = [
        {
            name: "SUMMER 2024 COLLECTION",
            dropDate: "June 1st, 2024",
            description: "Experience the fusion of technical wear and street style with our upcoming summer collection.",
            imageUrl: "/api/placeholder/400/500"
        },
        {
            name: "TECHNICAL ESSENTIALS",
            dropDate: "July 15th, 2024",
            description: "Elevate your everyday with our new line of technical essentials.",
            imageUrl: "/api/placeholder/400/500"
        }
    ];

    const pastDrops = [
        {
            name: "SPRING 2024",
            imageUrl: "/api/placeholder/400/500"
        },
        {
            name: "WINTER ESSENTIALS",
            imageUrl: "/api/placeholder/400/500"
        }
    ];

    res.render('drops', {
        title: `${config.appName} - Drops`,
        isDrops: true,
        upcomingDrops,
        pastDrops,
        currentYear: new Date().getFullYear()
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: `${config.appName} - About`,
        isAbout: true,
        currentYear: new Date().getFullYear()
    });
});

router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/cart', (req, res) => {
    res.render('cart', {
        title: `${config.appName} - Cart`,
        currentYear: new Date().getFullYear()
    });
});

module.exports = router;
