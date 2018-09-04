import React, { Component } from 'react';
import { Tabs, DefaultTabBar } from 'rmc-tabs';
import 'rmc-tabs/assets/index.css';

import Content from './content';

const tabData = [
    { key: 1, title: 'title 1' },
    { key: 2, title: 'title 2' },
    { key: 3, title: 'title 3' }
];

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scData: JSON.stringify({ index: 0, tab: { title: 't1' } })
        };
    }

    render() {
        return (
            <div>
                <Tabs
                    tabs={tabData}
                    onChange={(tab, index) => {
                        this.setState({
                            scData: JSON.stringify({
                                index: index + Math.random(),
                                tab
                            })
                        });
                    }}
                    prerenderingSiblingsNumber={0}
                    initialPage={0}
                    renderTabBar={props => <DefaultTabBar {...props} />}
                >
                    <Content key={1} />
                    <Content key={2} />
                    <Content key={3} />
                </Tabs>
            </div>
        );
    }
}

Test.propTypes = {};

export default Test;
