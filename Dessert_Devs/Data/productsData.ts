// constants/productsData.ts
export const productsData = [
  {
    id: '1',
    name: 'Molten lava cake',
    description: 'A delicate chocolate cake with a rich, gooey molten center.',
    images: [
      'https://cdn.craft.cloud/224393fa-1975-4d80-9067-ada3cb5948ca/assets/detail_White_Cocoa_Oatmeal_Hot_Lava_Cake.png',
      'https://hips.hearstapps.com/hmg-prod/images/strawberry-cheesecake-1648487650.jpg',
    ],
    price: 12.00,
    sugarLevel: 60,
    sugarFree: false,
    hasEgg: true,
    type: 'Chocolate Cake',
    rating: 4.6,
    calories: 250,
    category: 'Specialty',
    tag: 'BEST SELLER'
  },
  {
    id: '2',
    name: 'Strawberry Cheesecake',
    description: 'Smooth, creamy cheesecake with a golden crust and topped with fresh strawberries.',
    images: [
      'https://hips.hearstapps.com/hmg-prod/images/strawberry-cheesecake-1648487650.jpg',
    ],
    price: 15.00,
    tag: '30% OFF',
    sugarLevel: 50,
    sugarFree: false,
    hasEgg: true,
    type: 'Strawberry Cake',
    rating: 5.0,
    calories: 200,
    category: 'Celebration'
  },
  {
    id: '3',
    name: 'Baklava',
    description: 'Traditional Middle Eastern dessert made with layers of flaky phyllo pastry.',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRgqytQcxPCjXV4SEB0796nVfVPLTtomBjUg&s',
    ],
    price: 8.00,
    tag: '20% OFF',
    sugarLevel: 80,
    hasEgg: false,
    sugarFree: false,
    type: 'Pastry',
    rating: 3.5,
    calories: 190,
    category: 'Specialty'
  },
  {
    id: '4',
    name: 'Macarons',
    description: 'Elegant French cookies made from almond flour, meringue, and filled with rich cream.',
    images: [
      'https://mealsbymolly.com/wp-content/uploads/2021/08/Raspberry-Macarons-1320x1440.jpg',
    ],
    price: 5.00,
    sugarLevel: 30,
    sugarFree: true,
    hasEgg: true,
    type: 'Cookie',
    rating: 4.4,
    calories: 180,
    category: 'Celebration'
  },
  {
    id: '5',
    name: 'Kunafa',
    description: 'Sweet and cheesy Middle Eastern dessert made from shredded filo dough.',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu8EPlP-u5ObtyzqzoRSwTEww4aXWx0UMHkA&s',
    ],
    price: 9.00,
    sugarLevel: 10,
    hasEgg: true,
    sugarFree: false,
    type: 'Middle Eastern',
    rating: 2.5,
    calories: 160,
    category: 'Specialty'
  },
  {
    id: '6',
    name: 'Tiramisu',
    description: 'Italian classic made with espresso-soaked ladyfingers layered with mascarpone cream.',
    images: [
      'https://www.bakinglikeachef.com/wp-content/uploads/italian-tiramisu.jpg',
    ],
    price: 11.00,
    tag: 'NEW',
    sugarLevel: 0,
    hasEgg: false,
    sugarFree: false,
    type: 'Italian',
    rating: 4.8,
    calories: 90,
    category: 'Celebration'
  }
];

// export const allCakes = [
//   {
//     id: '1',
//     name: 'Choco Truffle Cake',
//     description: 'Pure Chocolate Cake',
//     calories: '550 Calories',
//     price: 175.08,
//     rating: 4.8,
//     category: 'Birthday',
//     tag: 'BEST SELLER',
//     images: ['https://thebrowniestudio.com/cdn/shop/files/2_747d9d2b-9408-4c70-82e0-81dd39710399.jpg?v=1716804119&width=1100']
//   },
//   {
//     id: '2',
//     name: 'Choco Oreo Cake',
//     description: 'Chocolate Oreo Mix',
//     calories: '720 Calories',
//     price: 175.08,
//     rating: 4.2,
//     category: 'Birthday',
//     tag: 'NEW',
//     images: ['https://example.com/choco-oreo.jpg']
//   },
//   {
//     id: '3',
//     name: 'Red Velvet Cake',
//     description: 'Classic red velvet with cream cheese',
//     calories: '600 Calories',
//     price: 185.50,
//     rating: 4.7,
//     category: 'Anniversary',
//     images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_xsol5JS-ngzdagKL1eyVb0lGiE04c67_g&s']
//   },
//   {
//     id: '4',
//     name: 'Strawberry Shortcake',
//     description: 'Fresh strawberries with whipped cream',
//     calories: '480 Calories',
//     price: 165.00,
//     rating: 4.5,
//     category: 'Wedding',
//     tag: '30% OFF',
//     images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdro8govsejIfzJgIdL3zBpgrRhAUYGJb6Uw&s']
//   },
//   {
//     id: '5',
//     name: 'Vanilla Dream Cake',
//     description: 'Classic vanilla cake with buttercream',
//     calories: '420 Calories',
//     price: 165.00,
//     rating: 4.6,
//     category: 'Birthday',
//     images: ['https://www.lifeloveandsugar.com/wp-content/uploads/2023/05/Raspberry-Dream-Cake3E.jpg']
//   },
//   {
//     id: '6',
//     name: 'Matcha Green Tea Cake',
//     description: 'Japanese-inspired green tea flavored cake',
//     calories: '380 Calories',
//     price: 195.00,
//     rating: 4.9,
//     category: 'Specialty',
//     tag: 'NEW',
//     images: ['https://example.com/matcha-cake.jpg']
//   }
// ];

// export const dealOfTheDay = [
//   {
//     id: '1',
//     name: 'Double Chocolate Fudge Cake',
//     price: 22.99,
//     originalPrice: 32.99,
//     discount: '30% OFF',
//     description: 'Rich double chocolate cake with fudge icing and chocolate chips',
//     calories: '480 per slice',
//     deliveryTime: '45 mins',
//     image: 'https://example.com/double-chocolate-fudge.jpg',
//     rating: 4.8,
//     tag: 'HOT DEAL'
//   }
// ];

export const categories = [
  'Birthday', 
  'Anniversary', 
 'Wedding',
 'Specialty',
 'Celebration',
 'Summer'
];

export const offers = [
 {
   id: '1',
   title: 'Weekend Special',
   description: '25% off all cakes this weekend',
   code: 'WEEKEND25',
   validUntil: '2025-06-15'
 },
 {
   id: '2',
   title: 'Family Bundle',
   description: 'Buy 2 large cakes get 1 small cake free',
   code: 'FAMILYCAKE',
   validUntil: '2025-05-31'
  }
];