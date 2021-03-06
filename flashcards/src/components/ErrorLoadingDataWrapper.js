import { Alert, Box, Button, CircularProgress, Fade, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';

const ErrorLoadingDataWrapper = ({ error, isLoading, children, retryRequest, title }) =>
{
    return (
        <>
            <Box style={{ display: "grid", justifyContent: "center" }}>
                <Fade
                    in={isLoading}
                    style={{
                        transitionDelay: isLoading ? '800ms' : '0ms',
                        margin: "2em"
                    }}
                    unmountOnExit
                >
                    <CircularProgress />
                </Fade>
                {
                    error &&
                    <Alert severity="error" style={{ marginTop: "1em", borderRadius: "1em", width: "fit-content", border: " 2px dashed #fe4e4e", alignSelf: "center" }}>
                        <Typography>
                            {title}
                        </Typography>
                        <div>{"Error: " + (error?.message || error)}</div>
                        {retryRequest && <Button style={{ marginTop: "1em" }} variant='contained' onClick={retryRequest}>Retry</Button>}
                    </Alert>
                }
            </Box>
            {!isLoading && !error && children}
        </>
    )
}
ErrorLoadingDataWrapper.propTypes = {
    error: PropTypes.object,
    isLoading: PropTypes.bool,
    children: PropTypes.any,
    retryRequest: PropTypes.func,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
}
export default ErrorLoadingDataWrapper;