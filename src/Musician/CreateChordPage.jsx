import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import SearchAppBar from '../component/SearchAppBar';

function CreateChordPage() {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const [data, setData] = useState({
        chord_name: '',
        description: '',
        image: null,
    });

    const steps = ['Chord Name', 'Description', 'Image', 'Finish'];

    const isFormValid = () => {
        if (activeStep === 0) {
            return data.chord_name !== '';
        } else if (activeStep === 1) {
            return data.description !== '';
        } else if (activeStep === 2) {
            return data.image !== null;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("chord_name", data.chord_name);
        formData.append("description", data.description);
        formData.append("image", data.image);

        axios.post(`${apiUrl}/createChord`, formData)
            .then(() => navigate('/SongMusician'))
            .catch(err => console.log(err));
    };

    const handleNext = () => {
        if (isFormValid()) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClose = () => {
        navigate('/chordMusician');
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <div className="d-flex flex-column w-100 align-items-center">
                        <label className="form-label">Chord Name:</label>
                        <TextField
                            required
                            id="outlined-required"
                            label="Chord Name"
                            fullWidth
                            value={data.chord_name}
                            onChange={(e) => setData({ ...data, chord_name: e.target.value })}
                        />
                    </div>
                );

            case 1:
                return (
                    <div className="d-flex flex-column w-100 align-items-center">
                        <label className="form-label">Description:</label>
                        <TextField
                            required
                            id="outlined-required"
                            label="Description"
                            fullWidth
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="d-flex flex-column w-100 align-items-center">
                        <label className="form-label">Image:</label>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            <input type="file" onChange={(e) => setData({ ...data, image: e.target.files[0] })} />
                        </Button>
                    </div>
                );
            case 3:
                return (
                    <div className='d-flex flex-column align-items-center pt-5'>
                        <p>Create successfully !</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-4'>
                <h3 className="d-flex justify-content-center">NEW CHORD</h3>
            </div>
            <div className='d-flex flex-column align-items-center justify-content-center pt-5' style={{ minHeight: '60vh' }}>
                <div className='step-container'>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <div className='step-content'>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                                        <Button variant="contained" onClick={handleClose} color="secondary">
                                            Close
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <div>
                                    {renderStepContent()}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 2 }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                    </Box>
                                </div>
                            )}
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default CreateChordPage;
