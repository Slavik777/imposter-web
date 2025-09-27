// src/words.ts
export type Category = 'all' | 'food' | 'animals' | 'places' | 'objects' | 'people';

export const WORDS_BY_CATEGORY: Record<Category, string[]> = {
  food: [
    'Pizza','Burger','Hotdog','Sandwich','Sushi','Steak','Salad','Soup','Fries','Kebab',
    'Bread','Bun','Croissant','Waffle','Pancake','Bagel','Brownie','Muffin','Donut','Cookie',
    'Apple','Pear','Peach','Plum','Banana','Orange','Lemon','Lime','Grapes','Cherry',
    'Strawberry','Blueberry','Raspberry','Melon','Watermelon','Pineapple','Mango','Coconut','Kiwi','Apricot',
    'Coffee','Tea','Milk','Yogurt','Juice','Cocoa','Smoothie','Lemonade','Cola','Water',
    'Cheese','Butter','Egg','Bacon','Sausage','Ham','Chicken','Fish','Salmon','Tuna',
    'Rice','Pasta','Spaghetti','Lasagna','Noodles','Ramen','Dumplings','Gnocchi','Taco','Tortilla',
    'Potato','Carrot','Cabbage','Cucumber','Tomato','Onion','Garlic','Pepper','Corn','Mushroom',
    'Honey','Sugar','Salt','Chocolate','Jam','Peanut','Almond','Walnut','Hazelnut','Pistachio',
  ],

  animals: [
    'Cat','Dog','Fox','Wolf','Bear','Lion','Tiger','Leopard','Cheetah','Panther',
    'Horse','Cow','Pig','Sheep','Goat','Deer','Rabbit','Hedgehog','Squirrel','Mouse',
    'Rat','Bat','Raccoon','Koala','Panda','Camel','Giraffe','Elephant','Rhino','Hippo',
    'Kangaroo','Otter','Seal','Walrus','Moose','Bison','Buffalo','Antelope','Boar','Chimpanzee',
    'Gorilla','Monkey','Parrot','Eagle','Owl','Hawk','Swan','Duck','Goose','Chicken',
    'Turkey','Penguin','Flamingo','Peacock','Seagull','Shark','Whale','Dolphin','Octopus','Squid',
    'Crab','Lobster','Jellyfish','Starfish','Turtle','Frog','Toad','Snake','Lizard','Crocodile',
    'Bee','Butterfly','Ant','Spider','Scorpion','Snail','Worm','Dragonfly','Mosquito','Fly',
  ],

  places: [
    'City','Village','Capital','Harbor','Port','Airport','Station','Subway','Highway','Bridge',
    'Park','Garden','Forest','Beach','Desert','Valley','Canyon','Island','Peninsula','Coast',
    'Mountain','Glacier','Volcano','Waterfall','River','Lake','Pond','Ocean','Sea','Bay',
    'School','University','Kindergarten','Library','Museum','Theater','Cinema','Aquarium','Stadium','Gym',
    'Hospital','Clinic','Pharmacy','Police','FireStation','Court','Bank','PostOffice','Hotel','Hostel',
    'Shop','Supermarket','Market','Cafe','Restaurant','Bakery','Bar','Nightclub','Office','Factory',
    'Apartment','House','Cottage','Cabin','Castle','Palace','Temple','Church','Mosque','Monastery',
    'Rooftop','Basement','Garage','Attic','Balcony','Playground','Square','Fountain','Ferry','Lighthouse',
  ],

  objects: [
    'Phone','Computer','Laptop','Tablet','Keyboard','Mouse','Monitor','Headphones','Camera','Drone',
    'TV','Remote','Speaker','Radio','Microscope','Telescope','Projector','Printer','Scanner','Router',
    'Table','Chair','Sofa','Armchair','Stool','Desk','Wardrobe','Shelf','Drawer','Bed',
    'Lamp','Bulb','Candle','Mirror','Clock','Watch','Calendar','Notebook','Pen','Pencil',
    'Paper','Book','Map','Globe','Ruler','Scissors','Glue','Tape','Clip','Envelope',
    'Bottle','Glass','Cup','Plate','Bowl','Fork','Knife','Spoon','Pan','Pot',
    'Backpack','Suitcase','Wallet','Key','Umbrella','Hat','Cap','Glasses','Mask','Gloves',
    'Bicycle','Scooter','Skateboard','Rollerblades','Car','Bus','Truck','Train','Plane','Boat',
    'Ball','Balloon','Kite','Dice','Domino','Chess','Cards','Toy','TeddyBear','YoYo',
    'Brush','Broom','Bucket','Shovel','Rope','Ladder','Hammer','Saw','Drill','Wrench',
  ],

  people: [
    'Teacher','Student','Doctor','Nurse','Surgeon','Dentist','Pharmacist','Scientist','Engineer','Programmer',
    'Designer','Architect','Artist','Musician','Singer','Actor','Director','Writer','Journalist','Photographer',
    'Chef','Waiter','Baker','Barista','Bartender','Farmer','Fisherman','Butcher','Driver','Pilot',
    'PoliceOfficer','Firefighter','Soldier','Judge','Lawyer','Detective','Guard','Coach','Athlete','Referee',
    'Mechanic','Electrician','Plumber','Carpenter','Builder','Miner','Tailor','Hairdresser','MakeupArtist','Beautician',
    'Manager','Accountant','Economist','Cashier','Seller','Courier','Postman','Librarian','Translator','TourGuide',
    'Priest','Monk','Nun','King','Queen','Prince','Princess','Knight','Wizard','Magician',
  ],

  // 'all' заповнимо нижче об’єднанням усіх списків
  all: [],
};

// об’єднати все в 'all'
WORDS_BY_CATEGORY.all = [
  ...WORDS_BY_CATEGORY.food,
  ...WORDS_BY_CATEGORY.animals,
  ...WORDS_BY_CATEGORY.places,
  ...WORDS_BY_CATEGORY.objects,
  ...WORDS_BY_CATEGORY.people,
];

// утиліти
export const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'food', label: 'Food' },
  { value: 'animals', label: 'Animals' },
  { value: 'places', label: 'Places' },
  { value: 'objects', label: 'Objects' },
  { value: 'people', label: 'People & Roles' },
];

export const pickRandom = <T,>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
