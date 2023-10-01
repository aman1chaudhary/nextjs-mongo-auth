import connect from "../../lib/mongodb";
import User from '../../model/schema';
import bcrypt from 'bcryptjs';

connect();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                res.json({ message: 'User already registered' });
            } else {
                // Hash the password
                const hashedPassword = bcrypt.hashSync(password, 10);

                // Create the user in your MongoDB
                const newUser = new User({
                    name,
                    email,
                    password: hashedPassword,
                });

                await newUser.save();

                res.json({ message: 'Successfully Registered, Please login now.' });
            }
        } catch (error) {
            res.json({ message: 'Internal server error.' });
        }
    } else {
        res.json({ message: 'Method not allowed.' });
    }
}

