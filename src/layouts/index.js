/*
 * @Author: yewei 
 * @Date: 2018-04-28 11:01:37 
 * @Last Modified by: yewei
 * @Last Modified time: 2018-06-05 11:03:56
 * 
 * 主布局入口
 */

import React from 'react';
import glamorous from 'glamorous';
// import withRouter from 'umi/withRouter';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

// import { isWexin } from '../utils/helps';

const Container = glamorous.div({
    backgroundColor: '#f6f6f6'
});
const TipContainer = glamorous.div({
    backgroundColor: '#fff',
    paddingTop: '1.25rem',
    textAlign: 'center',
    fontSize: 0
});
const ScanText = glamorous.p({
    fontFamily: 'PingFangSC-Regular',
    fontSize: '0.14rem',
    color: '#606060'
});

export default function(props) {
    // 如果当前环境不是微信环境、则显示相应的提示页面 TODO: isWexin()
    const isWeixin = true;

    return isWeixin ? (
        <Container>{props.children}</Container>
    ) : (
        <TipContainer>
            {/* <ScanIcon src={ICON_WX_SCAN} /> */}
            <ScanText>设备激活请用微信扫一扫哦~</ScanText>
        </TipContainer>
    );
}

// 路由切换动效
// export default withRouter(({ location, children }) => (
//     <TransitionGroup>
//         <CSSTransition key={location.key} classNames="fade" timeout={300}>
//             {children}
//         </CSSTransition>
//     </TransitionGroup>
// ));
