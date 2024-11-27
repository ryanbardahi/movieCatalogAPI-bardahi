const Movie = require('../models/Movie');

exports.addMovie = async (req, res) => {
    const { title, director, year, description, genre } = req.body;

    try {
        const movie = new Movie({ title, director, year, description, genre });
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add movie' });
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

exports.getMovieById = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
};

exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedMovie) return res.status(404).json({ error: 'Movie not found' });

        res.status(200).json({ message: 'Movie updated successfully', updatedMovie });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update movie' });
    }
};

exports.deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });

        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete movie' });
    }
};

exports.addMovieComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    try {
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });

        movie.comments.push({ userId: req.user.userId, comment });
        await movie.save();

        res.status(200).json({ message: 'Comment added successfully', updatedMovie: movie });
    } catch (error) {
        res.status(400).json({ error: 'Failed to add comment' });
    }
};

exports.getMovieComments = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id).select('comments');
        if (!movie) return res.status(404).json({ error: 'Movie not found' });

        res.status(200).json({ comments: movie.comments });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};