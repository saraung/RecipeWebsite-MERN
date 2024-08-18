import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Card, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const RecipeSlider = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const response = await axios.get('https://recipe-website-mern-api.vercel.app/randomrec');
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching random recipes:', error);
        setLoading(false); 
      }
    };

    fetchRandomRecipes();
  }, []);

  if (loading) {
    return <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />;
  }

  return (
    <div>
      <h1 style={{ color: 'Black', textAlign: 'center' }}>Discover Our Top Recipes</h1> 

      <Splide
        options={{
          perPage: 4,
          gap: '1rem',
          autoplay: true,
          pauseOnHover: true,
          type: 'loop',
          pagination: false,
          arrows: true,
          drag: 'free',
          snap: true,
          wheel: true,
          breakpoints: {
            768: {
              perPage: 1, // Show 1 slide per page on mobile devices
              gap: '0.5rem', // Adjust gap for mobile view
            },
            1024: {
              perPage: 2, // Show 2 slides per page on tablets
            },
          },
        }}
      >
        {recipes.map((recipe) => (
          <SplideSlide key={recipe._id}>
            <Card className="recipe-card">
              <Link to={"/recipe/" + recipe._id}>
                <img src={recipe.image} alt={recipe.title} className="recipe-card-image" />
                <h3 className="recipe-card-title">{recipe.title}</h3>
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default RecipeSlider;
