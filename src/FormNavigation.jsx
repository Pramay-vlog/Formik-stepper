import { Button } from "@mui/material"
import PropTypes from 'prop-types';

const FormNavigation = (props) => {

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-end",
                marginTop: "1rem"
            }}
        >
            {props.hasPrevious && (
                <Button
                    color="primary"
                    variant="contained"
                    onClick={props.onBackClick}
                    style={{ marginRight: "1rem" }}
                >
                    Back
                </Button>
            )}

            <Button
                color="primary"
                variant="contained"
                type="submit"
            >
                {props.isLastStep ? "Submit" : "Next"}
            </Button>

        </div>
    )

}
FormNavigation.propTypes = {
    hasPrevious: PropTypes.bool,
    onBackClick: PropTypes.func,
    isLastStep: PropTypes.bool
};

export default FormNavigation