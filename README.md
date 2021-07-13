# Launching the site

The site is now available at: https://webstore-clone.netlify.app/

Each product is just a placeholder and nothing is for sale.

## Description

A project designed to help me improve my skills in full stack web development. I used typescript on the frontend and vanilla JS on the backend.
The project is built with the MERN stack and uses Mongoose. Currently most features are added and working, but the admin features still require implementation.
React-redux was used to make the site stateful.

## Features

API for loading products
API for updating, creating, and logging into users
API for order information and PayPal connection
Dynamically rendered webpage capable of running in all sizes
Reactive frontend that updates as inputs are entered
JWT authentication for admin and logged in users
Private, Public and Admin paths for security
React redux store to keep track of user and cart info during a session

### Todo

- Create admin frontend pages
    - userlist
    - productlist
    - orderlist
    - dashboard
- Create API for admin to delete users/orders/products from userlist, orderlist, productlist
- Create API for admin to add users/orders/products from userlist, orderlist, productlist
- Create API for admin to edit users/orders/products from userlist, orderlist, productlist
- dockerize application and host on AWS or Google Cloud