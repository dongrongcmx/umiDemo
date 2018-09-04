import React, { Component } from 'react';

class content extends Component {
    componentDidMount() {
        console.log('hello, ');
    }

    render() {
        return <div>single content</div>;
    }
}

content.propTypes = {};

export default content;
