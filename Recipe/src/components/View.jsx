import { Box, Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const backendUrl = import.meta.env.VITE_BACKEND_URL;


const View = () => {
    const [Recipe, setRecipe] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${backendUrl}/userrec/${id}`)
            .then((res) => {
                console.log(res.data);
                setRecipe(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const delValue = (id) => {
        console.log("delete clicked", id);
        axios.delete(`${backendUrl}/${id}`)
            .then((res) => {
                console.log(res);
                alert(res.data.message);
                window.location.reload(true);
            })
            .catch((err) => console.log(err));
    };

    const updateValue = (val) => {
        console.log("clicked", val);
        navigate('/addrec', { state: { val } });
    };

    return (
        <Box
            sx={{
                marginTop: "60px",
                padding: { xs: '1rem', sm: '2rem' },
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
            }}
        >
            <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center">
                        Recipe List
                    </Typography>
                    {/* Mobile View */}
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        {Recipe.map((val) => (
                            <Box
                                key={val._id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginBottom: '1rem',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    boxShadow: 2,
                                }}
                            >
                                <Typography variant="h6">{val.title}</Typography>
                                <Typography variant="body1"><strong>Ingredients:</strong> {val.ingredients}</Typography>
                                <Typography variant="body1"><strong>Description:</strong> {val.description}</Typography>
                                <img src={val.image} alt={val.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                                <Typography variant="body1"><strong>Category:</strong> {val.category}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                                    <Button variant="contained" color="error" onClick={() => delValue(val._id)}>
                                        Delete
                                    </Button>
                                    <Button variant="contained" color="success" onClick={() => updateValue(val)}>
                                        Update
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    {/* Desktop View */}
                    <TableContainer sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant="h6">Title</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Ingredients</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Description</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Image</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Category</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Actions</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Recipe.map((val) => (
                                    <TableRow key={val._id}>
                                        <TableCell>{val.title}</TableCell>
                                        <TableCell>{val.ingredients}</TableCell>
                                        <TableCell>{val.description}</TableCell>
                                        <TableCell>
                                            <img src={val.image} alt={val.title} style={{ width: '100px', height: 'auto', borderRadius: '8px' }} />
                                        </TableCell>
                                        <TableCell>{val.category}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                                                <Button variant="contained" color="error" onClick={() => delValue(val._id)}>
                                                    Delete
                                                </Button>
                                                <Button variant="contained" color="success" onClick={() => updateValue(val)}>
                                                    Update
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
}

export default View;
