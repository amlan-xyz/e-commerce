const Product=require('../models/products.model')

const products=[
    {
      "name": "iPhone 14 Pro Max",
      "price": 10990,
      "category": "electronics",
      "image": "https://store.apple.com/xc/product/MMXD3AM/A/iphone-14-pro-max"
    },
    {
      "name": "AirPods Pro",
      "price": 2490,
      "category": "electronics",
      "image": "https://www.apple.com/airpods-pro/"
    },
    {
      "name": "Nike Air Force 1 Low",
      "price": 1000,
      "category": "clothing",
      "image": "https://www.nike.com/t/air-force-1-low-mens-shoe-Gz776z"
    },
    {
      "name": "Levi's 501 Jeans",
      "price": 500,
      "category": "clothing",
      "image": "https://www.levi.com/US/en_US/clothing/men/jeans/501-original-fit-jeans/p/28833004"
    },
    {
      "name": "Adidas Yeezy Boost 350 V2",
      "price": 2200,
      "category": "clothing",
      "image": "https://www.adidas.com/us/yeezy-boost-350-v2-shoes/GW3774.html"
    },
    {
      "name": "Nike LeBron 19",
      "price": 1800,
      "category": "sports",
      "image": "https://www.nike.com/t/lebron-19-mens-basketball-shoe-Gz776w"
    },
    {
      "name": "Wilson Ultra Team Tennis Racquet",
      "price": 1000,
      "category": "sports",
      "image": "https://www.wilson.com/en-us/tennis/racquets/ultra-team"
    },
    {
      "name": "Callaway Rogue ST Max Driver",
      "price": 5000,
      "category": "sports",
      "image": "https://www.callawaygolf.com/products/drivers/rogue-st-max/"
    },
    {
      "name": "Puma Future Z 1.3 FG Soccer Cleats",
      "price": 1500,
      "category": "sports",
      "image": "https://www.puma.com/us/en/product/future-z-1-3-fg-soccer-cleats/105560-01.html"
    },
    {
      "name": "Nike Air Zoom Pegasus 39 Running Shoes",
      "price": 1200,
      "category": "sports",
      "image": "https://www.nike.com/t/air-zoom-pegasus-39-mens-running-shoe-Gz776s"
    }
  ]
  

const seedProducts=async()=>{
    for(let i=0;i<products.length;i++){
        const newProduct=new Product(products[i]);
        await newProduct.save();
        console.log("Product added:"+ newProduct.name);
    }
}

module.exports=seedProducts;