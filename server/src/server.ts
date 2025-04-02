
import express from 'express'
import { getStudentRouter } from './students/handlers';
import cors from 'cors';

const app = express();


app.use(cors({ origin: ["http://localhost:5173"] }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getStudentRouter())

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

