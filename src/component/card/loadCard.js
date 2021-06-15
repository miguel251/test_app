import { Skeleton } from '@material-ui/lab';
import styled from 'styled-components';
import React from 'react';
import { Card } from '@material-ui/core';


const LoadCard = () => (
        <Container>
            <Skeleton/>
            <Skeleton animation={false}/>
            <Skeleton animation="wave"/>
        </Container>
);

const Container = styled.div `
    max-width: 350px;
    border: 1px solid #D2D7D3;
    background-color: #D2D7D3};
    box-shadow: -4px -1px 17px -1px rgba(0,0,0,0.75);
    border-radius:0.25rem;
    min-height: 100px;
    margin:auto;
    padding: 2rem 1rem;
`;

export default LoadCard;