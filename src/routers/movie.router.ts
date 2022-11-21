import express from "express";
import validate from "../middlewares/validate";
import { movieSchema, movieSchemaType } from "../zod_schema/movie.schema";

const router = express.Router();
const movies: movieSchemaType[] = [];


router.get('/', (req, res) => {
    return res.status(200).json(movies)
});

router.post('/', validate(movieSchema), (req, res) => {
    const newMovie = req.body as movieSchemaType;
    movies.push(newMovie);
    return res.status(201).json({
        message: 'Movie added :)'
    })
})

router.put('/:id', validate(movieSchema), (req, res) => {
    const updatedMovie = req.body as movieSchemaType;
    const {id} = req.params;
    let flag = false;
    for (let i=0; i<movies.length; i++){
        if(movies[i].id === id){
            movies[i] = updatedMovie;
            flag=true;
        }  
    }
    if (flag){
        return res.status(200).json({
            message: 'Movie updated :)'
        })
    } else {
        return res.status(404).json({
            message: 'Movie not found :)'
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let flag = false;
    for (let i=0; i<movies.length; i++){
        if(movies[i].id === id){
            movies.splice(i, 1);
            flag = true;
        }  
    }
    if (flag){
        return res.status(200).json({
            message: 'Movie deleted :)'
        })
    } else {
        return res.status(404).json({
            message: 'Movie not found :)'
        })
    }
})

router.get('/name/:name', (req, res) => {
    const name = req.params.name;
    const movieName = name.replace('-',' ');
    const searchArr = movies.filter((item)=>{
        return item.name.toLowerCase().includes(movieName)
    })
    if(searchArr.length === 0){
        return res.status(404).json({
            message: 'There are no matching movies'
        });
    } else {
        return res.status(200).json(searchArr);
    }
})


router.get('/genre/:genre', (req, res) => {
    const genre = req.params.genre;
    const searchArr = movies.filter((item)=>{
        return item.genre.toLowerCase().includes(genre.toLowerCase())
    })
    if(searchArr.length === 0){
        return res.status(404).json({
            message: 'There are no matching movies'
        });
    } else {
        return res.status(200).json(searchArr);
    }
})

export default router;
