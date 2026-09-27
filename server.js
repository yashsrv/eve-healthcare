import app from './src/app.js';

const { PORT, HOST } = process.env;

app.listen(PORT, HOST, () => {
	console.log(`Server is running on http://${HOST}:${PORT}`);
});