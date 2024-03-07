import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

mongoose
	.set('strictQuery', false)
	.connect('mongodb://localhost:27017/mern')
	.then(() => console.log('connected to mongoDB'))
	.catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/', (req, res) => {
	res.send('Hey Girl');
});

app.listen(PORT, () => {
	console.log('server running on port 3000');
});
