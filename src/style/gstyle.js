/*
 * @Author: yewei 
 * @Date: 2018-03-28 16:01:26 
 * @Last Modified by: yewei
 * @Last Modified time: 2018-06-12 18:17:37
 * 
 * 可通用的样式组件
 */
import glamorous from 'glamorous';
import { Modal } from 'antd-mobile';

const Row = glamorous.div(
    {
        display: 'flex'
    },
    ({
        alignItems = 'center',
        justifyContent = 'flex-start',
        marginBottom = 0,
        marginRight = 0,
        marginLeft = 0,
        width
    }) => {
        let styles = {
            alignItems: alignItems,
            justifyContent: justifyContent,
            marginBottom: `${marginBottom / 100}rem`,
            marginRight: `${marginRight / 100}rem`,
            marginLeft: `${marginLeft / 100}rem`
        };

        if (width) {
            styles.width = `${width / 100}rem`;
        }

        return styles;
    }
);

// 可滚动的容器
const ScrollView = glamorous.div(
    {
        flex: 1,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
    },
    ({ paddingBottom = 0 }) => ({
        paddingBottom: `${paddingBottom / 100}rem`
    })
);

// 扩展按钮，利用伪元素扩大点击区域
const ExtendButton = glamorous.div(
    {
        position: 'relative',
        fontSize: 0,
        '&::after': {
            content: `''`,
            position: 'absolute',
            left: '-0.1rem',
            top: '-0.1rem',
            bottom: '-0.1rem',
            right: '-0.1rem'
        }
    },
    ({ right }) => {
        let styles = {};

        if (right) {
            styles.right = `${right / 100}rem`;
        }

        return styles;
    }
);

// 常用Modal
const NormalModal = glamorous(Modal)(
    {
        borderRadius: '0 !important',
        maxHeight: '4.48rem',
        [`& .am-modal-content`]: {
            borderRadius: '0 !important',
            backgroundColor: 'transparent',
            padding: '0 !important'
        },
        [`& .am-modal-body`]: {
            padding: '0 !important'
        }
    },
    ({ isFullWidthContainer }) => ({
        width: isFullWidthContainer ? '100% !important' : 'auto !important'
    })
);

const PrimordialModal = glamorous(Modal)({
    width: 'auto !important',
    borderRadius: '0 !important',

    [`& .am-modal-content`]: {
        borderRadius: '0 !important',
        backgroundColor: '#FFFFFF',
        padding: '0 !important'
    },
    [`& .am-modal-body`]: {
        padding: '0 !important'
    }
});

const OpacityModal = glamorous(Modal)({
    width: '100%',
    [`& .am-modal-content`]: {
        width: '100%',
        borderRadius: '0 !important',
        padding: '0 !important',
        backgroundColor: 'transparent'
    },
    [`& .am-modal-body`]: {
        width: '100%',
        padding: '0 !important',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
});

// 默认商品图片背景
const DefaultIcon = glamorous.div(
    {
        width: '0.5rem',
        height: '0.5rem',
        backgroundColor: '#E8E8E8',
        marginRight: '0.1rem'
    },
    ({ hasIcon, width = 50, height = 50 }) => ({
        backgroundColor: hasIcon ? '#fff' : '#E8E8E8',
        width: `${width / 100}rem`,
        height: `${height / 100}rem`
    })
);

export {
    OpacityModal,
    Row,
    ExtendButton,
    NormalModal,
    DefaultIcon,
    PrimordialModal,
    ScrollView
};
