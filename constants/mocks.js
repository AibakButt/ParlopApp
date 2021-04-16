const categories = [
    {
      _id: '1',
      name: 'Body Polish',
      icon: require('../assets/images/nails.png'),
      image: require('../assets/images/facial.png'),
    },
    {
      _id: '2',
      name: 'Facial',
      icon: require('../assets/images/nails.png'),
      image: require('../assets/images/facial.png'),
    },
    {
      _id: '3',
      name: 'Hair',
      icon: require('../assets/images/nails.png'),
      image: require('../assets/images/facial.png'),
    },
    {
        _id: '4',
        name: 'Nail Polish',
        icon: require('../assets/images/nails.png'),
        image: require('../assets/images/facial.png'),
    },
    {
        _id: '5',
        name: 'Scrub',
        icon: require('../assets/images/nails.png'),
        image: require('../assets/images/facial.png'),
    },
    {
      _id: '6',
      name: 'Nail Polish',
      icon: require('../assets/images/nails.png'),
      image: require('../assets/images/facial.png'),
  },
  {
      _id: '7',
      name: 'Scrub',
      icon: require('../assets/images/nails.png'),
      image: require('../assets/images/facial.png'),
  },
  ];

const services = [
  {
    _id: "1",
    category: {
      _id: '3',
      name: 'Hair',
      icon: require('../assets/images/nails.png'),
      image: require('../assets/images/nails.png'),
    },
    name: "Head Massage",
    price: 1000,
    addons: [
      {
        name: "Extra Massage",
        price: 200
      }
    ]
  },
  {
    _id: "2",
    category: {
      _id: '3',
      name: 'Hair',
      icon: require('../assets/images/nails.png'),
      image: require('../assets/images/nails.png'),
    },
    name: "Head Massage",
    price: 1000,
    addons: [
      {
        name: "Extra Massage",
        price: 200
      }
    ]
  },{
    _id: "3",
    category: {
      _id: '3',
      name: 'Hair',
      icon: require('../assets/images/nails.png'),
      image: require('../assets/images/nails.png'),
    },
    name: "Head Massage",
    price: 1000,
    addons: [
      {
        name: "Extra Massage",
        price: 200
      }
    ]
  },
  {
    _id: "4",
    category: {
      _id: '3',
      name: 'Hair',
      icon: require('../assets/images/nails.png'),
      image: require('../assets/images/nails.png'),
    },
    name: "Head Massage",
    price: 1000,
    addons: [
      {
        name: "Extra Massage",
        price: 200
      }
    ]
  }
]
  const profile = {
    username: "react-ui-kit",
    location: "Europe",
    email: "contact@react-ui-kit.com",
    budget: 1000,
    monthly_cap: 5000,
    notifications: true,
    newsletter: false
  };
  
  export {categories ,profile, services};