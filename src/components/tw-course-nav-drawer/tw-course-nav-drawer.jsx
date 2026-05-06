import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './tw-course-nav-drawer.css';

// 模拟课程列表数据（后期可以通过 Props 从外部业务接口传入）
const MOCK_COURSES = [
    { id: 1, type: 'video', title: '冒险启程', status: 'completed' },
    { id: 2, type: 'video', title: '最终效果演示', status: 'completed' },
    { id: 3, type: 'game', title: '玩一玩1', status: 'completed' },
    { id: 4, type: 'video', title: '编程界面介绍', status: 'completed' },
    { id: 5, type: 'game', title: '玩一玩2', status: 'completed' },
    { id: 6, type: 'video', title: '编程基本操作介绍', status: 'completed' },
    { id: 7, type: 'doc', title: '练一练：捡帽子', status: 'current' }, // 当前进度
    { id: 8, type: 'video', title: '新功能解析', status: 'pending' },
    { id: 9, type: 'game', title: '玩一玩3', status: 'pending' },
    { id: 10, type: 'doc', title: '课后总结', status: 'pending' },
];

// 集中管理 SVG 图标
const Icons = {
    check: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>,
    current: <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>,
    video: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>,
    game: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>,
    doc: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
};

const CourseNavDrawer = ({ isVisible, onClose }) => {
    // 引用：用于控制滚动条自动定位到当前章节
    const activeItemRef = useRef(null);

    // 监听弹窗打开状态，自动滚动
    useEffect(() => {
        if (isVisible && activeItemRef.current) {
            // 延迟 300ms 保证抽屉滑出的动画播放完毕后再触发滚动
            setTimeout(() => {
                activeItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }, [isVisible]);

    const renderStatusIcon = (status) => {
        if (status === 'completed') return <div className={classNames(styles.iconWrapper, styles.completed)}>{Icons.check}</div>;
        if (status === 'current') return <div className={classNames(styles.iconWrapper, styles.current)}>{Icons.current}</div>;
        return <div className={classNames(styles.iconWrapper, styles.pending)} />;
    };

    return (
        <React.Fragment>
            {/* 隐藏层背景遮罩，点击时触发关闭事件 */}
            {isVisible && <div className={styles.backdrop} onClick={onClose} />}
            
            {/* 右侧抽屉面板容器 */}
            <div className={classNames(styles.drawerOverlay, { [styles.visible]: isVisible })}>
                <div className={styles.header}>
                    第一课 飞机大战 (无限循环)
                </div>
                
                <div className={styles.scrollContainer}>
                    {MOCK_COURSES.map((item, index) => {
                        const isCurrent = item.status === 'current';
                        return (
                            <div 
                                key={item.id} 
                                className={styles.courseItem}
                                // 如果是当前进度章节，则绑定 ref 用于自动滚动
                                ref={isCurrent ? activeItemRef : null}
                            >
                                {/* 左侧时间轴区域 */}
                                <div className={styles.timelineCol}>
                                    {renderStatusIcon(item.status)}
                                    {index !== MOCK_COURSES.length - 1 && <div className={styles.line}></div>}
                                </div>
                                
                                {/* 右侧内容卡片区 */}
                                <div className={classNames(styles.contentCard, { [styles.activeCard]: isCurrent })}>
                                    <div className={classNames(styles.typeIcon, styles[item.type])}>
                                        {Icons[item.type]}
                                    </div>
                                    <div className={styles.itemTitle}>{item.title}</div>
                                </div>
                            </div>
                        );
                    })}
                    
                    {/* 底部双箭头提示下拉动画 */}
                    <div className={styles.scrollDownHint}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                            <path d="M16.59 13.59L12 18.17 7.41 13.59 6 15l6 6 6-6z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CourseNavDrawer;
