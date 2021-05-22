import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './data/products.js'
import users from './data/users.js'
import Order from './models/orderSchema.js'
import Product from './models/productSchema.js'
import User from './models/userSchema.js'

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(p => {
            return {...p, user: adminUser}
        })

        await Product.insertMany(sampleProducts);
        console.log('DATA IMPORTED !!!');
        process.exit();
    } catch (error) {
        console.log('ERROR', error.message);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('DATA DESTROYED !!!');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}