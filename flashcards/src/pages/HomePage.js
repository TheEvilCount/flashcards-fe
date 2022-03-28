import { Card } from '@mui/material';
import ContentWrapper from 'components/ContentWrapper';
import React from 'react';

export default function HomePage()
{
    return (
        <ContentWrapper padded>
            <Card style={{ maxWidth: "600px", marginInline: "auto", minHeight: "80vh" }}>
                <div className="text-center mt-2" style={{ height: "100%" }}>
                    <h1 className="text-center">Homepage</h1>
                    <p className="text-center">Welcome to the home page of Flashcards!</p>
                </div>
            </Card >
        </ContentWrapper>
    )
}
