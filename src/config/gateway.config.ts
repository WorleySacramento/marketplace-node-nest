export const serviceConfig = {
    users:{
        url: process.env.USERS_URL || 'http://localhost:3000',
        timeout: 10000,
    },
    products:{
        url: process.env.PRODUCTS_URL || 'http://localhost:3001',
        timeout: 10000,
    },
    checkout:{
        url: process.env.CHECKOUT_URL || 'http://localhost:3003',
        timeout: 10000,
    },
    payments:{
        url: process.env.PAYMENTS_URL || 'http://localhost:3004',
        timeout: 10000,
    },

} as const;
