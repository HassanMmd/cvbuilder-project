import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from "react-router-dom";
import "./allsections.css"
import { useMediaQuery } from 'react-responsive';


function AllSections() {

    const [start,setStart]=React.useState(false)
    const [stepStyle, setStepStyle] = React.useState({})
    const theStyle = {
        '.Mui-disabled': { color: "white"},
        '.Mui-completed': { color: 'green'},
        '.Mui-active': { color: "rgb(218, 98, 77)"},
        '.MuiStepLabel-label .Mui-active': { color: 'rgb(218, 98, 77)'}
    }


    const [step, setStep] = React.useState(0)
    const navigate = useNavigate();
    const steps = [
        'Personal Info',
        'Work Experience',
        'Education',
        'Languages',
        'Contact',
        'Build your CV'
    ];


    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
      })
      const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
      const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
      const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
      const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })



    console.log(step)
    function increaseStep() {
        if (step === -1) {
            navigate("CV-Builder/PersonalList", { replace: true });
            setStep(step + 1)
            setStepStyle(theStyle)
        }
        if (step > 5) {
            setStep(5)
        }
        if (step === 0) {
            navigate("CV-Builder/WorkList", { replace: true });
            setStep(step + 1)
            setStepStyle(theStyle)

        }
        if (step === 1) {
            navigate("CV-Builder/EducationList", { replace: true });
            setStep(step + 1)
            setStepStyle(theStyle)

        }
        if (step === 2) {
            navigate("CV-Builder/LanguagesList", { replace: true });
            setStep(step + 1)
            setStepStyle(theStyle)

        }
        if (step === 3) {
            navigate("CV-Builder/ContactList", { replace: true });
            setStep(step + 1)
            setStepStyle(theStyle)

        }
        if (step === 4) {
            navigate("CV-Builder/BuildYourCV", { replace: true });
            setStep(step + 1)
            setStepStyle(theStyle)

        }
    }

    function decreaseStep() {
        if (step === 6) {
            navigate("CV-Builder/BuildYourCV", { replace: true });
            setStep(step - 1)
            setStepStyle(theStyle)

        }
        if (step < 0) {
            setStep(0)
        }
        if (step === 1) {
            navigate("CV-Builder/PersonalList", { replace: true });
            setStep(step - 1)
            setStepStyle(theStyle)

        }
        if (step === 2) {
            navigate("CV-Builder/WorkList", { replace: true });
            setStep(step - 1)
            setStepStyle(theStyle)

        }
        if (step === 3) {
            navigate("CV-Builder/EducationList", { replace: true });
            setStep(step - 1)
            setStepStyle(theStyle)

        }
        if (step === 4) {
            navigate("CV-Builder/LanguagesList", { replace: true });
            setStep(step - 1)
            setStepStyle(theStyle)
        }
        if (step === 5) {
            navigate("CV-Builder/ContactList", { replace: true });
            setStep(step - 1)
            setStepStyle(theStyle)
        }
    }


    function clicked(){
        setStart(true)
        setStepStyle(theStyle)
        navigate("CV-Builder/PersonalList", { replace: true });
    }

    return (
        <div className='all-sections' >
            {isDesktopOrLaptop &&<Box className="box" sx={{ width: '100%' }} >
                <Stepper sx={stepStyle} activeStep={step} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label} >
                            <StepLabel >{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>}
           {isTabletOrMobile && <Box className="box" sx={{ width: "100%"}} >
                <Stepper sx={stepStyle} activeStep={step}  orientation="vertical">
                    {steps.map((label) => (
                        <Step key={label} >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>}
            <div className='next-end-btn'>
                {!start && <button className="btn-submit btn btn-outline-light" onClick={clicked}>Start</button>}
                {start &&<button className="btn-submit btn btn-outline-light" onClick={decreaseStep} disabled={step < 1}>Back</button>}
                {start &&<button className="btn-submit btn btn-outline-light" onClick={increaseStep} disabled={step > 4} >Next</button>}
                </div>
        </div>
    );
}

export default AllSections;

/*alternativeLabel*/