import express from 'express';
import movieRouter from './routers/movie.router';
import stuRouter from './routers/student.router';
import bankRouter from './routers/bank.router';

const app = express();
app.use(express.json());

app.use('/api/v1/movie', movieRouter);
app.use('/api/v1/student', stuRouter);
app.use('/api/v1/bank', bankRouter);


app.listen(5000, () => {
    console.log("Server is running at port" +5000)
})