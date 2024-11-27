const express = require('express');
const {
    addMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
    addMovieComment,
    getMovieComments,
} = require('../controllers/movie');
const { authenticate, isAdmin } = require('../auth');

const router = express.Router();

router.post('/addMovie', authenticate, isAdmin, addMovie);
router.get('/getMovies', getAllMovies);
router.get('/getMovie/:id', getMovieById);
router.patch('/updateMovie/:id', authenticate, isAdmin, updateMovie);
router.delete('/deleteMovie/:id', authenticate, isAdmin, deleteMovie);
router.patch('/addComment/:id', authenticate, addMovieComment);
router.get('/getComments/:id', getMovieComments);

module.exports = router;