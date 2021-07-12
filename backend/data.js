import bcrypt from 'bcryptjs';

const data = {
    users: [{
        name: 'Derek',
        email: 'fake@email.com',
        password: bcrypt.hashSync('123', 8), // Auto salt password with 8
        isAdmin: true,
        },
        {
            name: 'Guy',
            email: 'Might@guy.com',
            password: bcrypt.hashSync('123', 8), // Auto salt password with 8
            isAdmin: false,
            },
    ],
    products: [
        {
            name:'Nike Slim Shirt',
            category: 'Shirts',
            image: './images/product-1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'High Quality shirt made by Nike',
            countInStock: 5,
        },
        {
            name:'Adidas Fit Shirt',
            category: 'Shirts',
            image: './images/product-2.jpg',
            price: 80,
            brand: 'Adidas',
            rating: 4,
            numReviews: 15,
            description: 'High Quality fitness shirt made by Adidas',
            countInStock: 8,
        },
        {
            name:'Plane Color Shirt',
            category: 'Shirts',
            image: './images/product-3.jpg',
            price: 60,
            brand: 'No Name',
            rating: 3.5,
            numReviews: 32,
            description: 'Medium Quality shirt made by No Name',
            countInStock: 0,
        },
        {
            name:'Nike Slim Pants',
            category: 'Pants',
            image: './images/product-4.jpg',
            price: 150,
            brand: 'Nike',
            rating: 5,
            numReviews: 12,
            description: 'High Quality pants made by Nike',
            countInStock: 3,
        },
        {
            name:'Puma Slim Pants',
            category: 'Pants',
            image: './images/product-5.jpg',
            price: 130,
            brand: 'Puma',
            rating: 5,
            numReviews: 7,
            description: 'High Quality pants made by Puma',
            countInStock: 2,
        },
        {
            name:'Adidas Fit Pants',
            category: 'Pants',
            image: './images/product-6.jpg',
            price: 100,
            brand: 'Adidas',
            rating: 3,
            numReviews: 42,
            description: 'High Quality pants made by Adidas',
            countInStock: 4,
        },
    ],
};

export default data;