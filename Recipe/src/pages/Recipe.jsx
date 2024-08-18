import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../components/Authcontext';
import { Button, List, ListItem, ListItemText, Snackbar, TextField, Typography } from '@mui/material';

const Recipe = () => {
    const [recData, setRecData] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState([]);
    const { rec_id } = useParams();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { authData } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3010/detailrec/${rec_id}`)
            .then((res) => {
                setRecData(res.data);
                setReviews(res.data.reviews || []);
            })
            .catch((err) => {
                setError('Failed to load recipe details.');
            });
    }, [rec_id]);

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleReviewSubmit = (event) => {
        event.preventDefault();
        
        axios.post(`http://localhost:3010/addreview/${rec_id}`, { review, rating, user: authData.userId })
            .then((res) => {
                setReviews([...reviews, res.data.review]);
                setReview('');
                setRating(1);
                setSuccess('Review submitted successfully!');
            })
            .catch((err) => {
                setError('Failed to submit review.');
            });
    };

    return (
        <div className='recipe-detail' style={{ margin: '0px' }}>
            {recData ? (
                <div>
                    <Typography variant="h3" sx={{
                        fontSize: { xs: '1.5rem', md: '2.5rem' },
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>
                        {recData.title}
                    </Typography>
                    <img 
                        src={recData.image} 
                        alt={recData.title} 
                        style={{ 
                            width: '50%', 
                            maxHeight: '400px', 
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }} 
                    />
                    <Typography variant="h4" sx={{ fontSize: { xs: '1.2rem', md: '1.8rem' } }}>Ingredients</Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                        {recData.ingredients}
                    </Typography>
                    <Typography variant="h4" sx={{ fontSize: { xs: '1.2rem', md: '1.8rem' }, marginTop: '20px' }}>Making</Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                        {recData.description}
                    </Typography>
                </div>
            ) : (
                <Typography variant="h6">Loading...</Typography>
            )}

            <div style={{ marginTop: '20px' }}>
                <form onSubmit={handleReviewSubmit}>
                    <TextField
                        label="Your Review"
                        value={review}
                        onChange={handleReviewChange}
                        fullWidth
                        multiline
                        sx={{ marginBottom: '20px' }}
                    />
                    <TextField
                        label="Rating"
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        fullWidth
                        inputProps={{ min: 1, max: 5 }}
                        sx={{ marginBottom: '20px' }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit Review
                    </Button>
                </form>
            </div>

            <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Reviews:</Typography>
                <List>
                    {reviews.map((r, index) => (
                        <ListItem key={index}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6" style={{ marginRight: '8px' }}>•</Typography>
                                <ListItemText
                                    primary={"Review: " + r.review}
                                    secondary={"Rating: " + r.rating}
                                />
                            </div>
                        </ListItem>
                    ))}
                </List>
            </div>

            {/* Snackbar for success/error messages */}
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError('')}
                message={error}
            />
            <Snackbar
                open={!!success}
                autoHideDuration={6000}
                onClose={() => setSuccess('')}
                message={success}
            />
        </div>
    );
};

export default Recipe;
