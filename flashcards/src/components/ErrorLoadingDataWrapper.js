import { Alert, Box, Button, CircularProgress, Fade } from '@mui/material'
import React from 'react'

const ErrorLoadingDataWrapper = ({ error, isLoading, children, retryRequest }) =>
{
    return (
        <>
            <Box sx={{ height: 40 }} style={{ display: "flex", flexDirection: "column", alignContent: "center" }}>
                <Fade
                    in={isLoading}
                    style={{
                        transitionDelay: isLoading ? '800ms' : '0ms',
                        margin: "auto"
                    }}
                    unmountOnExit
                >
                    <CircularProgress />
                </Fade>
            </Box>
            {
                error &&
                <Box style={{ display: "flex", flexDirection: "column", alignContent: "center", margin: "auto" }}>
                    <Alert severity="error" style={{ borderRadius: "1em", width: "fit-content", border: " 2px dashed #fe4e4e", alignSelf: "center" }}>
                        <div>Error: {error?.message + " status: " + error.code || "Unexpected error"}</div>
                        {retryRequest && <Button style={{ marginTop: "1em" }} variant='contained' onClick={retryRequest}>Retry</Button>}
                    </Alert>
                </Box>
            }
            {!isLoading && !error && children}
        </>
    )
}

export default ErrorLoadingDataWrapper;