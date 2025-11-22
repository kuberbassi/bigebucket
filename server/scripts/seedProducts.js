// seedProducts.js

const products = [
  // 25 Dairy products
  {
    name: 'Amul Taaza Toned Milk',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 29,
    image: 'amul_taaza_toned_milk.png',
    description: 'Fresh toned milk from Amul.'
  },
  // Inserted product: Amul Taaza (from provided document)
  {
    name: 'Amul Taaza',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    unit: '1 L',
    stock: null,
    price: 53999,
    discount: 10,
    pricePerKilo: '53',
    deliveryTime: '20',
    description: 'yha par mera description lga a=do , thik hai lga diya',
    image: 'amul_taaza.png',
    publish: true
  },
  {
    name: 'Amul Gold Full Cream Milk',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 35,
    image: 'amul_gold_full_cream_milk.png',
    description: 'Rich and creamy full-fat milk from Amul.'
  },
  // Inserted product: Amul Gold Full Cream Milk with detailed fields
  {
    name: 'Amul Gold Full Cream Milk',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    unit: '500 ml',
    stock: null,
    price: 35,
    discount: 12,
    pricePerKilo: '35',
    deliveryTime: '15',
    description: 'Amul Gold Full Cream Milk (Polypack) Milk is homogenized toned pasteurized milk. Rich and creamy, this milk is an excellent source of vitamin A and vitamin D that enhances growth and development of the body tissues and the brain.',
    image: 'amul_gold.png',
    publish: true
  },
  {
    name: 'Mother Dairy Classic Pouch Pouch Curd',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 35,
    image: 'mother_dairy_classic_pouch_curd.png',
    description: 'Creamy and delicious pouch curd from Mother Dairy.'
  },
  {
    name: 'Mother Dairy Toned Milk',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 29,
    image: 'mother_dairy_toned_milk.png',
    description: 'Toned milk with a perfect balance of cream and water.'
  },
  {
    name: 'Amul Cow Milk',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 30,
    image: 'amul_cow_milk.png',
    description: 'Pure and nutritious cow milk from Amul.'
  },
  {
    name: 'Paushtaa Multigrain Sourdough Bread',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Bread & Pav',
    price: 35,
    image: 'sourdough_bread.png',
    description: 'Healthy multigrain sourdough bread.'
  },
  {
    name: 'English Oven Zero maida 100% Atta Wheat Bread',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Bread & Pav',
    price: 29,
    image: 'wheat_bread.png',
    description: 'Nutritious wheat bread made with 100% atta.'
  },
  {
    name: 'Amul Masti Pouch Curd',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 40,
    image: 'amul_masti_pouch_curd.png',
    description: 'Delicious and creamy curd from Amul.'
  },
  {
    name: 'Amul Salted Butter',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'amul_salted_butter.png',
    description: 'Rich and creamy salted butter from Amul.'
  },
  {
    name: 'Amul Ghee',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 450,
    image: 'amul_ghee.png',
    description: 'Pure and aromatic ghee from Amul.'
  },
  {
    name: 'Mother Dairy Full Cream Milk',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 40,
    image: 'mother_dairy_full_cream_milk.png',
    description: 'Rich and creamy full cream milk from Mother Dairy.'
  },
  {
    name: 'Britannia Cheese Slices',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'britannia_cheese_slices.png',
    description: 'Delicious and cheesy Britannia cheese slices.'
  },
  {
    name: 'Danish Blue Cheese',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 600,
    image: 'danish_blue_cheese.png',
    description: 'Rich and tangy Danish blue cheese.'
  },
  {
    name: 'Parmesan Cheese',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 700,
    image: 'parmesan_cheese.png',
    description: 'Hard and aged Parmesan cheese.'
  },
  {
    name: 'Mozzarella Cheese',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 350,
    image: 'mozzarella_cheese.png',
    description: 'Soft and creamy mozzarella cheese.'
  },
  {
    name: 'Amul Probiotic Curd',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 45,
    image: 'amul_probiotic_curd.png',
    description: 'Healthy and tasty probiotic curd from Amul.'
  },
  {
    name: 'Mother Dairy Tandoori Roti',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Bread & Pav',
    price: 60,
    image: 'mother_dairy_tandoori_roti.png',
    description: 'Soft and delicious tandoori roti from Mother Dairy.'
  },
  {
    name: 'Amul Butter Milk',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 25,
    image: 'amul_butter_milk.png',
    description: 'Refreshing and tangy butter milk from Amul.'
  },
  {
    name: 'Paneer Tikka',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'paneer_tikka.png',
    description: 'Spicy and flavorful paneer tikka.'
  },
  {
    name: 'Dahi Handi',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 50,
    image: 'dahi_handi.png',
    description: 'Traditional Indian yogurt pot.'
  },
  {
    name: 'Eggless Mayonnaise',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'eggless_mayonnaise.png',
    description: 'Creamy and eggless mayonnaise.'
  },
  {
    name: 'Fruit Yogurt',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 60,
    image: 'fruit_yogurt.png',
    description: 'Delicious fruit-flavored yogurt.'
  },
  {
    name: 'Nutri Choice Digestive Cookies',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 100,
    image: 'nutri_choice_digestive_cookies.png',
    description: 'Healthy and crunchy digestive cookies.'
  },
  {
    name: 'Amul Chocolate',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 50,
    image: 'amul_chocolate.png',
    description: 'Delicious and creamy chocolate from Amul.'
  },
  {
    name: 'Cadbury Dairy Milk Chocolate',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'cadbury_dairy_milk_chocolate.png',
    description: 'Rich and smooth Cadbury Dairy Milk chocolate.'
  },
  {
    name: 'Ferrero Rocher Chocolate',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 700,
    image: 'ferrero_rocher_chocolate.png',
    description: 'Luxurious Ferrero Rocher chocolate.'
  },
  {
    name: 'Toblerone Chocolate',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 600,
    image: 'toblerone_chocolate.png',
    description: 'Exotic chocolate with honey and almond nougat.'
  },
  {
    name: 'Munch Chocolate Bar',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 20,
    image: 'munch_chocolate_bar.png',
    description: 'Crispy and crunchy chocolate bar.'
  },
  {
    name: 'KitKat Chocolate',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 50,
    image: 'kitkat_chocolate.png',
    description: 'Delicious chocolate-covered wafer bar.'
  },
  {
    name: 'Cadbury Celebrations Pack',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 300,
    image: 'cadbury_celebrations_pack.png',
    description: 'Assorted Cadbury chocolates in a festive pack.'
  },
  {
    name: 'Amul Dark Chocolate',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 60,
    image: 'amul_dark_chocolate.png',
    description: 'Rich and intense dark chocolate from Amul.'
  },
  {
    name: 'Silk Chocolate',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 80,
    image: 'silk_chocolate.png',
    description: 'Smooth and creamy Silk chocolate.'
  },
  {
    name: 'Hershey\'s Kisses',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 400,
    image: 'hersheys_kisses.png',
    description: 'Delicious chocolate treats from Hershey\'s.'
  },
  {
    name: 'Nestle Milkybar',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 50,
    image: 'nestle_milkybar.png',
    description: 'Creamy and smooth white chocolate.'
  },
  {
    name: 'Amul Buttermilk',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 25,
    image: 'amul_buttermilk.png',
    description: 'Refreshing and tangy buttermilk from Amul.'
  },
  {
    name: 'Mother Dairy Paneer',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 300,
    image: 'mother_dairy_paneer.png',
    description: 'Fresh and soft paneer from Mother Dairy.'
  },
  {
    name: 'Amul Shrikhand',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 60,
    image: 'amul_shrikhand.png',
    description: 'Delightful and creamy shrikhand from Amul.'
  },
  {
    name: 'Mother Dairy Ice Cream',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'mother_dairy_ice_cream.png',
    description: 'Delicious and creamy ice cream from Mother Dairy.'
  },
  {
    name: 'Britannia Milk Bikis',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 100,
    image: 'britannia_milk_bikis.png',
    description: 'Tasty and crunchy milk bikis biscuits.'
  },
  {
    name: 'Sunfeast Bounce',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'sunfeast_bounce.png',
    description: 'Delicious and creamy chocolate-filled biscuits.'
  },
  {
    name: 'Parle-G Biscuits',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 50,
    image: 'parle_g_biscuits.png',
    description: 'Classic and crunchy Parle-G biscuits.'
  },
  {
    name: 'Happy Happy Biscuits',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 100,
    image: 'happy_happy_biscuits.png',
    description: 'Delicious and crispy Happy Happy biscuits.'
  },
  {
    name: 'Oreo Cookies',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'oreo_cookies.png',
    description: 'Classic Oreo cookies with a creamy filling.'
  },
  {
    name: 'Digestive Creams',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 120,
    image: 'digestive_creams.png',
    description: 'Creamy and crunchy digestive biscuits.'
  },
  {
    name: 'Milk Cake',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'milk_cake.png',
    description: 'Soft and spongy milk cake.'
  },
  {
    name: 'Rasgulla',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'rasgulla.png',
    description: 'Sweet and syrupy rasgulla.'
  },
  {
    name: 'Gulab Jamun',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 300,
    image: 'gulab_jamun.png',
    description: 'Soft and sweet gulab jamun.'
  },
  {
    name: 'Kaju Katli',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 500,
    image: 'kaju_katli.png',
    description: 'Rich and nutty kaju katli.'
  },
  {
    name: 'Peda',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'peda.png',
    description: 'Soft and sweet peda.'
  },
  {
    name: 'Burfi',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 300,
    image: 'burfi.png',
    description: 'Rich and sweet burfi.'
  },
  {
    name: 'Ladoo',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'ladoos.png',
    description: 'Sweet and nutty ladoos.'
  },
  {
    name: 'Chikki',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'chikki.png',
    description: 'Crunchy and nutty chikki.'
  },
  {
    name: 'Puff Pastry',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 80,
    image: 'puff_pastry.png',
    description: 'Flaky and buttery puff pastry.'
  },
  {
    name: 'Cheese Puff',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 100,
    image: 'cheese_puff.png',
    description: 'Delicious cheese-filled puff.'
  },
  {
    name: 'Veg Puff',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 90,
    image: 'veg_puff.png',
    description: 'Spicy and savory vegetable puff.'
  },
  {
    name: 'Chicken Puff',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 120,
    image: 'chicken_puff.png',
    description: 'Savory chicken-filled puff.'
  },
  {
    name: 'Paneer Puff',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 110,
    image: 'paneer_puff.png',
    description: 'Delicious paneer-filled puff.'
  },
  {
    name: 'Fish Puff',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 130,
    image: 'fish_puff.png',
    description: 'Savory fish-filled puff.'
  },
  {
    name: 'Egg Puff',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 100,
    image: 'egg_puff.png',
    description: 'Delicious egg-filled puff.'
  },
  {
    name: 'Spring Roll',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'spring_roll.png',
    description: 'Crispy and savory spring rolls.'
  },
  {
    name: 'Samosa',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 50,
    image: 'samosa.png',
    description: 'Spicy and crispy samosas.'
  },
  {
    name: 'Samosa Chaat',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 70,
    image: 'samosa_chaat.png',
    description: 'Savory samosa chaat.'
  },
  {
    name: 'Paneer Tikka Masala',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'paneer_tikka_masala.png',
    description: 'Spicy paneer tikka masala.'
  },
  {
    name: 'Chicken Tikka Masala',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'chicken_tikka_masala.png',
    description: 'Delicious chicken tikka masala.'
  },
  {
    name: 'Fish Curry',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 300,
    image: 'fish_curry.png',
    description: 'Spicy and tangy fish curry.'
  },
  {
    name: 'Egg Curry',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 100,
    image: 'egg_curry.png',
    description: 'Delicious egg curry.'
  },
  {
    name: 'Mutton Rogan Josh',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 350,
    image: 'mutton_rogan_josh.png',
    description: 'Spicy and flavorful mutton rogan josh.'
  },
  {
    name: 'Chicken Biryani',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 300,
    image: 'chicken_biryani.png',
    description: 'Delicious and aromatic chicken biryani.'
  },
  {
    name: 'Veg Biryani',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'veg_biryani.png',
    description: 'Flavorful and spicy veg biryani.'
  },
  {
    name: 'Prawn Biryani',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 350,
    image: 'prawn_biryani.png',
    description: 'Aromatic and spicy prawn biryani.'
  },
  {
    name: 'Fish Fry',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'fish_fry.png',
    description: 'Crispy and spicy fish fry.'
  },
  {
    name: 'Chicken Fry',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'chicken_fry.png',
    description: 'Crispy and flavorful chicken fry.'
  },
  {
    name: 'Mutton Seekh Kebab',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 300,
    image: 'mutton_seekh_kebab.png',
    description: 'Spicy and juicy mutton seekh kebab.'
  },
  {
    name: 'Chicken Seekh Kebab',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'chicken_seekh_kebab.png',
    description: 'Juicy and flavorful chicken seekh kebab.'
  },
  {
    name: 'Paneer Tikka Kebab',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'paneer_tikka_kebab.png',
    description: 'Spicy and tangy paneer tikka kebab.'
  },
  {
    name: 'Fish Tikka Kebab',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'fish_tikka_kebab.png',
    description: 'Spicy and flavorful fish tikka kebab.'
  },
  {
    name: 'Chicken Nuggets',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'chicken_nuggets.png',
    description: 'Crispy and juicy chicken nuggets.'
  },
  {
    name: 'Veg Nuggets',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 120,
    image: 'veg_nuggets.png',
    description: 'Crispy and tasty veg nuggets.'
  },
  {
    name: 'Spring Onion Pancakes',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 80,
    image: 'spring_onion_pancakes.png',
    description: 'Savory pancakes with spring onions.'
  },
  {
    name: 'Cheese Corn Balls',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 100,
    image: 'cheese_corn_balls.png',
    description: 'Crispy balls filled with cheese and corn.'
  },
  {
    name: 'Veg Manchurian',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'veg_manchurian.png',
    description: 'Spicy and tangy veg manchurian.'
  },
  {
    name: 'Chili Paneer',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'chili_paneer.png',
    description: 'Spicy and tangy chili paneer.'
  },
  {
    name: 'Garlic Bread',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 60,
    image: 'garlic_bread.png',
    description: 'Crispy and buttery garlic bread.'
  },
  {
    name: 'Bruschetta',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 80,
    image: 'bruschetta.png',
    description: 'Crispy bread topped with tomatoes and basil.'
  },
  {
    name: 'Stuffed Mushrooms',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 120,
    image: 'stuffed_mushrooms.png',
    description: 'Mushrooms stuffed with cheese and herbs.'
  },
  {
    name: 'Deviled Eggs',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 100,
    image: 'deviled_eggs.png',
    description: 'Hard-boiled eggs stuffed with yolk and spices.'
  },
  {
    name: 'Mini Quiches',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'mini_quiches.png',
    description: 'Small and savory quiches.'
  },
  {
    name: 'Fruit Salad',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 70,
    image: 'fruit_salad.png',
    description: 'Fresh and healthy fruit salad.'
  },
  {
    name: 'Vegetable Salad',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 60,
    image: 'vegetable_salad.png',
    description: 'Fresh and crunchy vegetable salad.'
  },
  {
    name: 'Greek Salad',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 80,
    image: 'greek_salad.png',
    description: 'Healthy Greek salad with feta cheese.'
  },
  {
    name: 'Caesar Salad',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 90,
    image: 'caesar_salad.png',
    description: 'Classic Caesar salad with croutons and parmesan.'
  },
  {
    name: 'Chicken Salad',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 150,
    image: 'chicken_salad.png',
    description: 'Hearty chicken salad with mayo.'
  },
  {
    name: 'Tuna Salad',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 180,
    image: 'tuna_salad.png',
    description: 'Tasty tuna salad with veggies.'
  },
  {
    name: 'Egg Salad',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 120,
    image: 'egg_salad.png',
    description: 'Creamy egg salad with herbs.'
  },
  {
    name: 'Pasta Salad',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 100,
    image: 'pasta_salad.png',
    description: 'Delicious pasta salad with veggies.'
  },
  {
    name: 'Coleslaw',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 80,
    image: 'coleslaw.png',
    description: 'Creamy coleslaw with cabbage and carrots.'
  },
  {
    name: 'Potato Salad',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 70,
    image: 'potato_salad.png',
    description: 'Hearty potato salad with mayo.'
  },
  {
    name: 'Macaroni Salad',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 90,
    image: 'macaroni_salad.png',
    description: 'Creamy macaroni salad with veggies.'
  },
  {
    name: 'Baked Beans',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 100,
    image: 'baked_beans.png',
    description: 'Savory baked beans in tomato sauce.'
  },
  {
    name: 'Corn on the Cob',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 50,
    image: 'corn_on_the_cob.png',
    description: 'Sweet corn on the cob.'
  },
  {
    name: 'Peas Pulao',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 120,
    image: 'peas_pulao.png',
    description: 'Fragrant peas pulao.'
  },
  {
    name: 'Paneer Butter Masala',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'paneer_butter_masala.png',
    description: 'Rich and creamy paneer butter masala.'
  },
  {
    name: 'Dal Makhani',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'dal_makhani.png',
    description: 'Creamy and buttery dal makhani.'
  },
  {
    name: 'Chana Masala',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 120,
    image: 'chana_masala.png',
    description: 'Spicy and tangy chana masala.'
  },
  {
    name: 'Rajma Masala',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 130,
    image: 'rajma_masala.png',
    description: 'Delicious rajma masala.'
  },
  {
    name: 'Aloo Gobi',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 100,
    image: 'aloo_gobi.png',
    description: 'Spicy and flavorful aloo gobi.'
  },
  {
    name: 'Bhindi Masala',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 110,
    image: 'bhindi_masala.png',
    description: 'Spicy and tangy bhindi masala.'
  },
  {
    name: 'Baingan Bharta',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 120,
    image: 'baingan_bharta.png',
    description: 'Smoky and spicy baingan bharta.'
  },
  {
    name: 'Methi Thepla',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 80,
    image: 'methi_thepla.png',
    description: 'Spiced fenugreek flatbread.'
  },
  {
    name: 'Palak Paneer',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'palak_paneer.png',
    description: 'Creamy spinach and paneer curry.'
  },
  {
    name: 'Kadai Paneer',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 160,
    image: 'kadai_paneer.png',
    description: 'Spicy and flavorful kadai paneer.'
  },
  {
    name: 'Butter Chicken',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'butter_chicken.png',
    description: 'Rich and creamy butter chicken.'
  },
  {
    name: 'Chicken Curry',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'chicken_curry.png',
    description: 'Spicy and flavorful chicken curry.'
  },
  {
    name: 'Fish Curry',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 220,
    image: 'fish_curry.png',
    description: 'Tangy and spicy fish curry.'
  },
  {
    name: 'Egg Curry',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 100,
    image: 'egg_curry.png',
    description: 'Spicy and tangy egg curry.'
  },
  {
    name: 'Mutton Curry',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 300,
    image: 'mutton_curry.png',
    description: 'Rich and flavorful mutton curry.'
  },
  {
    name: 'Chicken Biryani',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 350,
    image: 'chicken_biryani.png',
    description: 'Aromatic and spicy chicken biryani.'
  },
  {
    name: 'Veg Biryani',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 300,
    image: 'veg_biryani.png',
    description: 'Flavorful and spicy veg biryani.'
  },
  {
    name: 'Prawn Biryani',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 400,
    image: 'prawn_biryani.png',
    description: 'Aromatic and spicy prawn biryani.'
  },
  {
    name: 'Fish Fry',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'fish_fry.png',
    description: 'Crispy and spicy fish fry.'
  },
  {
    name: 'Chicken Fry',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'chicken_fry.png',
    description: 'Crispy and flavorful chicken fry.'
  },
  {
    name: 'Mutton Seekh Kebab',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 300,
    image: 'mutton_seekh_kebab.png',
    description: 'Spicy and juicy mutton seekh kebab.'
  },
  {
    name: 'Chicken Seekh Kebab',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'chicken_seekh_kebab.png',
    description: 'Juicy and flavorful chicken seekh kebab.'
  },
  {
    name: 'Paneer Tikka Kebab',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'paneer_tikka_kebab.png',
    description: 'Spicy and tangy paneer tikka kebab.'
  },
  {
    name: 'Fish Tikka Kebab',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 250,
    image: 'fish_tikka_kebab.png',
    description: 'Spicy and flavorful fish tikka kebab.'
  },
  {
    name: 'Chicken Nuggets',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'chicken_nuggets.png',
    description: 'Crispy and juicy chicken nuggets.'
  },
  {
    name: 'Veg Nuggets',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 120,
    image: 'veg_nuggets.png',
    description: 'Crispy and tasty veg nuggets.'
  },
  {
    name: 'Spring Onion Pancakes',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 80,
    image: 'spring_onion_pancakes.png',
    description: 'Savory pancakes with spring onions.'
  },
  {
    name: 'Cheese Corn Balls',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 100,
    image: 'cheese_corn_balls.png',
    description: 'Crispy balls filled with cheese and corn.'
  },
  {
    name: 'Veg Manchurian',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'veg_manchurian.png',
    description: 'Spicy and tangy veg manchurian.'
  },
  {
    name: 'Chili Paneer',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 200,
    image: 'chili_paneer.png',
    description: 'Spicy and tangy chili paneer.'
  },
  {
    name: 'Garlic Bread',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 60,
    image: 'garlic_bread.png',
    description: 'Crispy and buttery garlic bread.'
  },
  {
    name: 'Bruschetta',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 80,
    image: 'bruschetta.png',
    description: 'Crispy bread topped with tomatoes and basil.'
  },
  {
    name: 'Stuffed Mushrooms',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 120,
    image: 'stuffed_mushrooms.png',
    description: 'Mushrooms stuffed with cheese and herbs.'
  },
  {
    name: 'Deviled Eggs',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 100,
    image: 'deviled_eggs.png',
    description: 'Hard-boiled eggs stuffed with yolk and spices.'
  },
  {
    name: 'Mini Quiches',
    category: 'Dairy, Bread & Eggs',
    subCategory: 'Milk',
    price: 150,
    image: 'mini_quiches.png',
    description: 'Small and savory quiches.'
  },
  {
    name: 'Apple',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 50,
    image: 'apple.png',
    description: 'Fresh apples.'
  },
  {
    name: 'Banana',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 20,
    image: 'banana.png',
    description: 'Ripe and sweet bananas.'
  },
  {
    name: 'Orange',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 30,
    image: 'orange.png',
    description: 'Juicy and tangy oranges.'
  },
  {
    name: 'Grapes',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 40,
    image: 'grapes.png',
    description: 'Fresh and sweet grapes.'
  },
  {
    name: 'Papaya',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 35,
    image: 'papaya.png',
    description: 'Ripe and juicy papaya.'
  },
  {
    name: 'Pineapple',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 60,
    image: 'pineapple.png',
    description: 'Sweet and tangy pineapple.'
  },
  {
    name: 'Alphonso Mango',
    category: 'Fruits & Vegetables',
    subCategory: 'mangoes_melons',
    price: 120,
    image: 'alphonso_mango.png',
    description: 'Premium quality Alphonso mangoes.'
  },
  {
    name: 'Kesar Mango',
    category: 'Fruits & Vegetables',
    subCategory: 'mangoes_melons',
    price: 100,
    image: 'kesar_mango.png',
    description: 'Sweet and aromatic Kesar mangoes.'
  },
  {
    name: 'Watermelon',
    category: 'Fruits & Vegetables',
    subCategory: 'mangoes_melons',
    price: 45,
    image: 'watermelon.png',
    description: 'Refreshing and juicy watermelon.'
  },
  {
    name: 'Tata Tea Premium',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Tea',
    price: 120,
    image: 'tata_tea_premium.png',
    description: 'Premium quality tea from Tata.'
  },
  {
    name: 'Society Elaichi Instant Tea Premix',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Tea',
    price: 110,
    image: 'society_elaichi.png',
    description: 'Instant tea premix with cardamom flavor.'
  },
  {
    name: 'Tata Tea Gold',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Tea',
    price: 130,
    image: 'tata_tea_gold.png',
    description: 'Rich and aromatic Tata Tea Gold.'
  },
  {
    name: 'Tata Tea Agni Special Blend Tea',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Tea',
    price: 120,
    image: 'tata_tea_agni.png',
    description: 'Special blend tea for a strong and invigorating taste.'
  },
  {
    name: 'Tata Tea Premium Tea',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Tea',
    price: 110,
    image: 'tata_tea_premium.png',
    description: 'Premium quality tea for a refreshing experience.'
  },
  {
    name: 'Wagh Bakri Premium',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Tea',
    price: 130,
    image: 'wagh_bakri.png',
    description: 'Premium quality tea from Wagh Bakri.'
  },
  {
    name: 'Nescafe Classic',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Coffee',
    price: 150,
    image: 'coffee.png',
    description: 'Classic instant coffee from Nescafe.'
  },
  {
    name: 'Nescafe Classic',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Coffee',
    price: 140,
    image: 'nescafe_classic.png',
    description: 'Rich and aromatic Nescafe Classic.'
  },
  {
    name: 'Nescafe Gold Blend ',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Coffee',
    price: 160,
    image: 'nescafe_gold.png',
    description: 'Premium quality Nescafe Gold Blend coffee.'
  },
  {
    name: 'Aashirvaad Select',
    category: 'Atta, Rice & Dal',
    subCategory: 'Atta',
    price: 120,
    image: 'aashirvaad_select.png',
    description: 'Select quality wheat flour (atta) from Aashirvaad.'
  },
  {
    name: 'Aashirvaad Select',
    category: 'Atta, Rice & Dal',
    subCategory: 'Atta',
    price: 130,
    image: 'aashirvaad_shudh.png',
    description: 'Pure and wholesome wheat flour (atta) from Aashirvaad.'
  },
  {
    name: 'Right Shift Multigrain Atta with Soya',
    category: 'Atta, Rice & Dal',
    subCategory: 'Atta',
    price: 120,
    image: 'right_shift_multigrain_atta.png',
    description: 'Nutritious multigrain atta with soya flour.'
  },
  {
    name: 'Daawat Rozana Super Basmati Rice',
    category: 'Atta, Rice & Dal',
    subCategory: 'Rice',
    price: 150,
    image: 'daawat_rozana.png',
    description: 'Super basmati rice for a delightful meal.'
  },
  {
    name: 'Fortune Hamesha Mini Dubar Basmati Rice',
    category: 'Atta, Rice & Dal',
    subCategory: 'Rice',
    price: 140,
    image: 'fortune_hamesha.png',
    description: 'Mini dubar basmati rice for everyday cooking.'
  },
  {
    name: '24 Mantra Organic Puffed Rice',
    category: 'Atta, Rice & Dal',
    subCategory: 'Rice',
    price: 160,
    image: 'mantra_organic.png',
    description: 'Organic puffed rice for a healthy snack.'
  },
  {
    name: 'Whole Farm Premium Parmal Rice',
    category: 'Atta, Rice & Dal',
    subCategory: 'Rice',
    price: 160,
    image: 'natureland_murmure.png',
    description: 'Premium parmal rice for a delicious meal.'
  },
  {
    name: 'Aashirvaad Select',
    category: 'Masala, Oil & More',
    subCategory: 'Oil',
    price: 120,
    image: 'aashirvaad_select.png',
    description: 'Select quality cooking oil from Aashirvaad.'
  },
  {
    name: 'Aashirvaad Select',
    category: 'Masala, Oil & More',
    subCategory: 'Oil',
    price: 130,
    image: 'aashirvaad_shudh.png',
    description: 'Pure and wholesome cooking oil from Aashirvaad.'
  },
  {
    name: 'Right Shift Multigrain Atta with Soya',
    category: 'Masala, Oil & More',
    subCategory: 'Oil',
    price: 120,
    image: 'right_shift_multigrain_atta.png',
    description: 'Nutritious multigrain oil with soya.'
  },
  {
    name: 'Daawat Rozana Super Basmati Rice',
    category: 'Masala, Oil & More',
    subCategory: 'Dry Fruits',
    price: 150,
    image: 'daawat_rozana.png',
    description: 'Super basmati rice for a delightful meal.'
  },
  {
    name: 'Fortune Hamesha Mini Dubar Basmati Rice',
    category: 'Masala, Oil & More',
    subCategory: 'Dry Fruits',
    price: 140,
    image: 'fortune_hamesha.png',
    description: 'Mini dubar basmati rice for everyday cooking.'
  },
  {
    name: '24 Mantra Organic Puffed Rice',
    category: 'Masala, Oil & More',
    subCategory: 'Dry Fruits',
    price: 160,
    image: 'mantra_organic.png',
    description: 'Organic puffed rice for a healthy snack.'
  },
  {
    name: 'Whole Farm Premium Parmal Rice',
    category: 'Masala, Oil & More',
    subCategory: 'Dry Fruits',
    price: 160,
    image: 'natureland_murmure.png',
    description: 'Premium parmal rice for a delicious meal.'
  },
  {
    name: 'Green Chilli',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 20,
    image: 'green_chilli.png',
    description: 'Fresh and spicy green chillies.'
  },
  {
    name: 'Lemon',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 15,
    image: 'lemon.png',
    description: 'Juicy lemons rich in vitamin C.'
  },
  {
    name: 'Onion',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 25,
    image: 'onion.png',
    description: 'Fresh red onions for everyday cooking.'
  },
  {
    name: 'Potato',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 30,
    image: 'potato.png',
    description: 'Farm-fresh potatoes.'
  },
  {
    name: 'Cauliflower',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 35,
    image: 'cauliflower.png',
    subCategory: 'Tea',
    price: 120,
    image: 'tata_tea_agni.png',
    description: 'Special blend tea for a strong and invigorating taste.'
  },
  {
    name: 'Tata Tea Premium Tea',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Tea',
    price: 110,
    image: 'tata_tea_premium.png',
    description: 'Premium quality tea for a refreshing experience.'
  },
  {
    name: 'Wagh Bakri Premium',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Tea',
    price: 130,
    image: 'wagh_bakri.png',
    description: 'Premium quality tea from Wagh Bakri.'
  },
  {
    name: 'Nescafe Classic',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Coffee',
    price: 150,
    image: 'coffee.png',
    description: 'Classic instant coffee from Nescafe.'
  },
  {
    name: 'Nescafe Classic',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Coffee',
    price: 140,
    image: 'nescafe_classic.png',
    description: 'Rich and aromatic Nescafe Classic.'
  },
  {
    name: 'Nescafe Gold Blend ',
    category: 'Tea, Coffee & Health Drink',
    subCategory: 'Coffee',
    price: 160,
    image: 'nescafe_gold.png',
    description: 'Premium quality Nescafe Gold Blend coffee.'
  },
  {
    name: 'Aashirvaad Select',
    category: 'Atta, Rice & Dal',
    subCategory: 'Atta',
    price: 120,
    image: 'aashirvaad_select.png',
    description: 'Select quality wheat flour (atta) from Aashirvaad.'
  },
  {
    name: 'Aashirvaad Select',
    category: 'Atta, Rice & Dal',
    subCategory: 'Atta',
    price: 130,
    image: 'aashirvaad_shudh.png',
    description: 'Pure and wholesome wheat flour (atta) from Aashirvaad.'
  },
  {
    name: 'Right Shift Multigrain Atta with Soya',
    category: 'Atta, Rice & Dal',
    subCategory: 'Atta',
    price: 120,
    image: 'right_shift_multigrain_atta.png',
    description: 'Nutritious multigrain atta with soya flour.'
  },
  {
    name: 'Daawat Rozana Super Basmati Rice',
    category: 'Atta, Rice & Dal',
    subCategory: 'Rice',
    price: 150,
    image: 'daawat_rozana.png',
    description: 'Super basmati rice for a delightful meal.'
  },
  {
    name: 'Fortune Hamesha Mini Dubar Basmati Rice',
    category: 'Atta, Rice & Dal',
    subCategory: 'Rice',
    price: 140,
    image: 'fortune_hamesha.png',
    description: 'Mini dubar basmati rice for everyday cooking.'
  },
  {
    name: '24 Mantra Organic Puffed Rice',
    category: 'Atta, Rice & Dal',
    subCategory: 'Rice',
    price: 160,
    image: 'mantra_organic.png',
    description: 'Organic puffed rice for a healthy snack.'
  },
  {
    name: 'Whole Farm Premium Parmal Rice',
    category: 'Atta, Rice & Dal',
    subCategory: 'Rice',
    price: 160,
    image: 'natureland_murmure.png',
    description: 'Premium parmal rice for a delicious meal.'
  },
  {
    name: 'Aashirvaad Select',
    category: 'Masala, Oil & More',
    subCategory: 'Oil',
    price: 120,
    image: 'aashirvaad_select.png',
    description: 'Select quality cooking oil from Aashirvaad.'
  },
  {
    name: 'Aashirvaad Select',
    category: 'Masala, Oil & More',
    subCategory: 'Oil',
    price: 130,
    image: 'aashirvaad_shudh.png',
    description: 'Pure and wholesome cooking oil from Aashirvaad.'
  },
  {
    name: 'Right Shift Multigrain Atta with Soya',
    category: 'Masala, Oil & More',
    subCategory: 'Oil',
    price: 120,
    image: 'right_shift_multigrain_atta.png',
    description: 'Nutritious multigrain oil with soya.'
  },
  {
    name: 'Daawat Rozana Super Basmati Rice',
    category: 'Masala, Oil & More',
    subCategory: 'Dry Fruits',
    price: 150,
    image: 'daawat_rozana.png',
    description: 'Super basmati rice for a delightful meal.'
  },
  {
    name: 'Fortune Hamesha Mini Dubar Basmati Rice',
    category: 'Masala, Oil & More',
    subCategory: 'Dry Fruits',
    price: 140,
    image: 'fortune_hamesha.png',
    description: 'Mini dubar basmati rice for everyday cooking.'
  },
  {
    name: '24 Mantra Organic Puffed Rice',
    category: 'Masala, Oil & More',
    subCategory: 'Dry Fruits',
    price: 160,
    image: 'mantra_organic.png',
    description: 'Organic puffed rice for a healthy snack.'
  },
  {
    name: 'Whole Farm Premium Parmal Rice',
    category: 'Masala, Oil & More',
    subCategory: 'Dry Fruits',
    price: 160,
    image: 'natureland_murmure.png',
    description: 'Premium parmal rice for a delicious meal.'
  },
  {
    name: 'Green Chilli',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 20,
    image: 'green_chilli.png',
    description: 'Fresh and spicy green chillies.'
  },
  {
    name: 'Lemon',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 15,
    image: 'lemon.png',
    description: 'Juicy lemons rich in vitamin C.'
  },
  {
    name: 'Onion',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 25,
    image: 'onion.png',
    description: 'Fresh red onions for everyday cooking.'
  },
  {
    name: 'Potato',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 30,
    image: 'potato.png',
    description: 'Farm-fresh potatoes.'
  },
  {
    name: 'Cauliflower',
    category: 'Fruits & Vegetables',
    subCategory: 'fresh_fruits',
    price: 35,
    image: 'cauliflower.png',
    description: 'Fresh and tender cauliflower.'
  }
];

// Seed script: ensure categories and subcategories exist and save products with ObjectId refs
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/product.model.js';
import CategoryModel from '../models/category.model.js';
import SubCategoryModel from '../models/subCategory.model.js';
import processImages from '../utils/uploadSeedImages.js';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: path.join(process.cwd(), '.env') });

async function seed() {
  const assetsDir = path.join(process.cwd(), '..', 'client', 'src', 'assets');
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/BigebucketDB';
    console.log('Seeding database at:', uri);
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    for (const p of products) {
      // p.category in this file is often a string like 'Dairy, Bread & Eggs'
      const categoryName = typeof p.category === 'string' ? p.category : (Array.isArray(p.category) && p.category.length ? p.category[0] : null);
      const subCategoryName = typeof p.subCategory === 'string' ? p.subCategory : (Array.isArray(p.subCategory) && p.subCategory.length ? p.subCategory[0] : null);

      let categoryDoc = null;
      if (categoryName) {
        categoryDoc = await CategoryModel.findOne({ name: { $regex: categoryName, $options: 'i' } });
        if (!categoryDoc) {
          categoryDoc = await CategoryModel.create({ name: categoryName });
        }
      }

      let subCategoryDoc = null;
      if (subCategoryName) {
        subCategoryDoc = await SubCategoryModel.findOne({ name: { $regex: subCategoryName, $options: 'i' } });
        if (!subCategoryDoc) {
          subCategoryDoc = await SubCategoryModel.create({ name: subCategoryName, category: categoryDoc ? [categoryDoc._id] : [] });
        } else if (categoryDoc && !subCategoryDoc.category.includes(categoryDoc._id)) {
          subCategoryDoc.category.push(categoryDoc._id);
          await subCategoryDoc.save();
        }
      }

      // Upload images to Cloudinary
      const imagesToUpload = Array.isArray(p.image) ? p.image : (p.image ? [p.image] : []);
      const cloudinaryUrls = await processImages(imagesToUpload, assetsDir);

      const productData = {
        name: p.name,
        image: cloudinaryUrls,
        category: categoryDoc ? [categoryDoc._id] : [],
        subCategory: subCategoryDoc ? [subCategoryDoc._id] : [],
        unit: p.unit || '',
        stock: p.stock === undefined ? null : p.stock,
        price: p.price || 0,
        discount: p.discount || 0,
        pricePerKilo: p.pricePerKilo || '',
        deliveryTime: p.deliveryTime || '',
        description: p.description || p.desc || '',
        more_details: p.more_details || {},
        publish: typeof p.publish === 'boolean' ? p.publish : true
      };

      // Avoid duplicates: try to find by name + category
      const exists = await Product.findOne({ name: productData.name, category: { $in: productData.category } });
      if (!exists) {
        await Product.create(productData);
        console.log('Inserted product:', productData.name);
      } else {
        console.log('Skipping existing product:', productData.name);
      }
    }

    console.log('Seeding complete');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

// Run the seeder when this file is executed directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  seed();
}

export default products;