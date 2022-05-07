import { Card, Divider } from '@mui/material';
import ContentWrapper from 'components/ContentWrapper';
import React from 'react';

export default function HomePage()
{
    return (
        <ContentWrapper>
            <Card className='padded-mobile' style={{ maxWidth: "600px", marginInline: "auto", minHeight: "80vh" }}>
                <div className="text-center mt-2" style={{ height: "100%" }}>
                    <h1 className="text-center">Homepage</h1>
                    <p className="text-center">Welcome to the home page of Flashcards!</p>
                </div>
                <Divider className='mt-3' />
                <div className='mt-3' style={{ justifyContent: "center", display: "grid" }}>
                    <h4>Features:</h4>
                    <ul>
                        <li>Free Flashcards App</li>
                        <li>Create and manage your collections</li>
                        <li>Create and manage (flash)cards within collections</li>
                        <li>Play (Learn) mode</li>
                        <li>Private / Public / Favourite Collections</li>
                        <li>Left / Right card flipping</li>
                    </ul>
                </div>
            </Card >
        </ContentWrapper>
    )
}
