
import connect from "../../lib/mongodb";
import User from '../../model/schema';
import bcrypt from 'bcryptjs';

connect();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                res.json({ message: 'User not registered' });
            } else {
                const isPasswordMatch = bcrypt.compareSync(password, user.password);
                
                if (isPasswordMatch) {
                    res.json({ message: 'Login successful', user });
                } else {
                    res.json({ message: "Password didn't match" });
                }
            }
        } catch (error) {
            res.json({ message: 'Internal server error.' });
        }
    } else {
        res.json({ message: 'Method not allowed.' });
    }
}
