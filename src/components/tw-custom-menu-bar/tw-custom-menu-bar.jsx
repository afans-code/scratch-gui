import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './tw-custom-menu-bar.css';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import TwLanguageDropdown from '../tw-language-dropdown/tw-language-dropdown.jsx';
import TwSettingsDropdown from '../tw-settings-dropdown/tw-settings-dropdown.jsx';

const CustomMenuBar = (props) => {
    const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
    const fileMenuRef = useRef(null);

    // 点击外部区域关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (fileMenuRef.current && !fileMenuRef.current.contains(event.target)) {
                setIsFileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={classNames(styles.menuBar, props.className)}>
            {/* 左侧：Logo 与 标题 */}
            <div className={styles.leftSection}>
                <div className={styles.logoWrapper}>
                    <div className={styles.logoInner}>
                        <div className={styles.logoTop}></div>
                        <div className={styles.logoBottom}></div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.projectTitle}>
                    飞机大战 (无限循环)
                </div>
            </div>

            {/* 右侧：操作按钮与工具栏 */}
            <div className={styles.rightSection}>
                <button className={classNames(styles.btn, styles.btnWhite)} onClick={props.onOpenTaskTips}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    任务提示
                </button>

                <button className={classNames(styles.btn, styles.btnOutline)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" /></svg>
                    重置
                </button>

                <button className={classNames(styles.btn, styles.btnOrange)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                    交作业
                </button>

                <button className={classNames(styles.btn, styles.btnOutline)} onClick={props.onOpenCourseNav}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" /></svg>
                    课程导航
                </button>

                {/* 文件夹图标与下拉菜单 */}
                <div className={styles.fileMenuWrapper} ref={fileMenuRef}>
                    <div
                        className={classNames(styles.dropdownGroup, { [styles.active]: isFileMenuOpen })}
                        onClick={() => setIsFileMenuOpen(!isFileMenuOpen)}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" /></svg>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
                    </div>

                    {isFileMenuOpen && (
                        <div className={styles.dropdownMenu}>
                            <SB3Downloader>
                                {(_className, downloadProjectCallback, extended) => (
                                    <div
                                        className={styles.menuItem}
                                        onClick={() => {
                                            // 优先调用扩展对象的 smartSave（TurboWarp/Scratch 3 推荐），回退则调用默认
                                            if (extended && extended.smartSave) {
                                                extended.smartSave();
                                            } else {
                                                downloadProjectCallback();
                                            }
                                            setIsFileMenuOpen(false);
                                        }}
                                    >
                                        保存到电脑
                                    </div>
                                )}
                            </SB3Downloader>
                        </div>
                    )}
                </div>

                {/* 语言/地球图标切换组件 */}
                <TwLanguageDropdown />

                {/* 设置图标下拉（原始主题与积木颜色设置） */}
                <TwSettingsDropdown
                    onClickDesktopSettings={props.onClickDesktopSettings}
                    onClickAddonSettings={props.onClickAddonSettings}
                />

                {/* 退出按钮 */}
                <button className={classNames(styles.iconBtn, styles.iconBtnWhite)} onClick={props.onLogOut}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
                </button>
            </div>
        </div>
    );
};

export default CustomMenuBar;
