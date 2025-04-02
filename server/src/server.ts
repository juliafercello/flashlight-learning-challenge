
import express from 'express'
import { getStudentRouter } from './students/handlers';
import cors from 'cors';
import pool, { createTable } from './db';

const app = express();

app.use(cors({ origin: ["http://localhost:5173"] }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getStudentRouter())

createTable().then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}).catch((err) => {
    console.log('Failed to startup', err.message)
})

process.on('SIGINT', () => {
    console.log('Shutting down...');
    pool.end()
    process.exit(0);
});