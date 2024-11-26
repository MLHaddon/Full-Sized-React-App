import express from 'express';
import { getUsers, getUser, Register, Login, Logout } from '../controllers/Users.js';
import { getProducts, updateProduct } from '../controllers/Products.js';
import { refreshToken } from '../controllers/RefreshToken.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();

// Portfolio Routes
router.get('/users', verifyToken, getUsers);
router.get('/user', verifyToken, getUser);
router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);
router.get('/token', refreshToken);
router.get('/verify-token', verifyToken, (req, res) => res.sendStatus(200));

// eCommerce Routes
router.get('/products/get', getProducts);
// router.get('/productpage', getProduct);
// router.post('/products/create', createProducts);
router.put('/products/update', updateProduct);


export default router;