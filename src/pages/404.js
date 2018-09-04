import React from 'react';
import glamorous from 'glamorous';

const Container = glamorous.div({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
});
const Title = glamorous.p({
    fontSize: '0.4rem'
});
const SubTitle = glamorous.p({
    fontSize: '0.32rem'
});

export default () => {
    return (
        <Container>
            <Title>oh! 404</Title>
            <SubTitle>Not Found</SubTitle>
        </Container>
    );
};
