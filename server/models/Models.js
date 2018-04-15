const Models = {
    businesses: [
        {
            id: 1,
            businessName: 'Mortiz Global',
            category: 'Entertainment',
            state: 'Lagos'
        },
        {
            id: 2,
            businessName: 'Suruzar Global',
            category: 'Food',
            state: 'Benue'
        },
        {
            id: 3,
            businessName: 'ES International',
            category: 'Fashion',
            state: 'Rivers'
        },
        {
            id: 4,
            businessName: 'Dreamzone Limited',
            category: 'Hospitality',
            state: 'Kano'
        }
    ],
    reviews: [
        {
            id: 1,
            businessId: 2,
            reveiwer: 'Doe John',
            review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 2,
            businessId: 2,
            reveiwer: 'Zoe John',
            review: 'Sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 3,
            businessId: 4,
            reveiwer: 'Antilama Jovua',
            review: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
            id: 4,
            businessId: 1,
            reveiwer: 'Spindinmo Zon',
            review: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            id: 5,
            businessId: 3,
            reveiwer: 'Altiza Bashek',
            review: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            id: 6,
            businessId: 3,
            reveiwer: 'Zebedi Moraz',
            review: 'Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
            id: 7,
            businessId: 2,
            reveiwer: 'Sigma Abliz',
            review: 'Duis aute irure dolor in reprehenderit in Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
        },
        {
            id: 8,
            businessId: 4,
            reveiwer: 'Torinfa Sapdi',
            review: 'Consectetur adipisicing elit, sed do eiusmod tempor sint occaecat cupidatat non proident.'
        },
        {
            id: 9,
            businessId: 4,
            reveiwer: 'Ayotunde Dogara',
            review: 'Consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum mollit anim id est laborum.'
        },
        {
            id: 10,
            businessId: 1,
            reveiwer: 'Bamisori Anzima',
            review: 'magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elitanim id est laborum.'
        }
    ],
    users: [
        {
            id: 1,
            username: 'john123',
            email: 'mailings@mailings.com',
            password: 'pass123'
        },
        {
            id: 2,
            username: 'paul123',
            email: 'paul@mailings.com',
            password: 'pass123'
        },
        {
            id: 3,
            username: 'edith456',
            email: 'edith@mailings.com',
            password: 'pass456'
        },
        {
            id: 4,
            username: 'elena7410',
            email: 'elena@mailings.com',
            password: 'pass245'
        }
    ]
};

export default Models;
