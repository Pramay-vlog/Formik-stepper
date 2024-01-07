import { Form, Formik } from "formik"
import React, { useState } from "react"
import FormNavigation from "./FormNavigation"
import PropTypes from 'prop-types';
import { Step, StepLabel, Stepper } from "@mui/material";

const MultiStepForm = ({ children, initialValues, onSubmit }) => {
    const [stepNumber, setStepNumber] = useState(0)
    const steps = React.Children.toArray(children)

    // updated initial values for the form
    const [snapShot, setSnapShot] = useState(initialValues)

    const currentStep = steps[stepNumber]
    const totalSteps = steps.length
    const isLastStep = stepNumber === totalSteps - 1
    const isFirstStep = stepNumber === 0

    const next = (values) => {
        if (isLastStep) return
        setSnapShot(values)
        setStepNumber(stepNumber + 1)
    }

    const previous = (values) => {
        if (isFirstStep) return
        setSnapShot(values)
        setStepNumber(stepNumber - 1)
    }

    const handleSubmit = async (values, actions) => {
        if (currentStep.props.onSubmit) {
            await currentStep.props.onSubmit(values)
        }
        if (isLastStep) {
            return onSubmit(values, actions)
        } else {
            actions.setTouched({})
            next(values)
        }
    }

    return (
        <div>
            <Formik
                initialValues={snapShot}
                onSubmit={handleSubmit}
                validationSchema={currentStep.props.validationSchema}
            >
                {(formik) => {
                    return (
                        <Form onSubmit={formik.handleSubmit} >

                            <Stepper activeStep={stepNumber} alternativeLabel >
                                {
                                    steps.map(currentStep => {
                                        const label = currentStep.props.stepName

                                        return <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    })
                                }
                            </Stepper>

                            {currentStep}

                            <FormNavigation
                                isLastStep={isLastStep}
                                hasPrevious={!isFirstStep}
                                onBackClick={() => previous(formik.values)}
                            />
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

MultiStepForm.propTypes = {
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func,
    children: PropTypes.node
};

export default MultiStepForm

export const FormStep = ({ stepName = "", children }) => {
    console.log('Current stepName:', stepName)
    return children;
}