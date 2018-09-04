import React, { Component } from 'react';
import glamorous from 'glamorous';

const Container = glamorous.div({
    fontSize: '0.17rem',
    backgroundColor: '#f6f688'
});

class Hello extends Component {
    render() {
        return <Container>hello</Container>;
    }
}

Hello.propTypes = {};

export default Hello;
