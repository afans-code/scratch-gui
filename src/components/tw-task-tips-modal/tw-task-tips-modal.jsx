import React, { useState } from 'react';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import styles from './tw-task-tips-modal.css';

const TaskTipsModal = ({ isVisible, onClose }) => {
    // 状态：是否收起
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!isVisible) return null;

    const toggleCollapse = (e) => {
        // 阻止事件冒泡，防止触发 Draggable 的拖拽
        e.stopPropagation();
        setIsCollapsed(!isCollapsed);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        onClose();
        // 关闭时重置为展开状态，方便下次打开
        setTimeout(() => setIsCollapsed(false), 300); 
    };

    const playAudio = () => {
        // 在这里对接真实的音频播放逻辑
        console.log('播放语音提示...');
        // 示例：new Audio('xxx.mp3').play();
    };

    return (
        // 使用 react-draggable 实现任意拖拽，指定 handle 属性让它只有按住 header 时才可拖拽
        <Draggable handle=".drag-handle" bounds="parent">
            <div className={classNames(styles.modalOverlay, { [styles.collapsed]: isCollapsed })}>
                
                {/* 头部 (拖拽手柄) */}
                <div className={classNames(styles.header, "drag-handle")}>
                    <div className={styles.headerLeft}>
                        {/* 坐标图标 */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        任务提示
                    </div>
                    <div className={styles.headerRight}>
                        <button 
                            className={styles.headerBtn} 
                            onMouseDown={(e) => e.stopPropagation()} 
                            onClick={toggleCollapse}
                        >
                            {/* 收起/展开 图标 */}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d={isCollapsed ? "M7 14l5-5 5 5z" : "M7 10l5 5 5-5z"}/>
                            </svg>
                            {isCollapsed ? '展开' : '收起'}
                        </button>
                        <button 
                            className={styles.headerBtn} 
                            onMouseDown={(e) => e.stopPropagation()} 
                            onClick={handleClose}
                        >
                            {/* 关闭 图标 */}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                            关闭
                        </button>
                    </div>
                </div>
                
                {/* 内容主体 */}
                <div className={styles.body}>
                    <div className={styles.textRow}>
                        <button className={styles.speakerBtn} onClick={playAudio} title="播放语音">
                            {/* 喇叭图标 */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            </svg>
                        </button>
                        <div>
                            敌人就要来了！请使用【发射子弹】代码帮我打败他们吧！成功后，别忘了提交作业哦~
                        </div>
                    </div>
                    
                    <div className={styles.imageContainer}>
                        {/* 实际开发中这里可以替换为真实的 img 标签 */}
                        <div className={styles.imagePlaceholder}>
                            [ 示例代码图片加载区域 ]
                        </div>
                    </div>
                </div>

            </div>
        </Draggable>
    );
};

export default TaskTipsModal;
