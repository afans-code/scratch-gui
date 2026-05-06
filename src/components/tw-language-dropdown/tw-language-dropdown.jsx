import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import locales from '@turbowarp/scratch-l10n';
import { selectLocale } from '../../reducers/locales.js';
import styles from './tw-language-dropdown.css';

const TwLanguageDropdown = ({ currentLocale, onChangeLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 点击外部区域关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 选中语言后切换并关闭菜单
    const handleSelect = (locale) => {
        onChangeLanguage(locale);
        setIsOpen(false);
    };

    return (
        <div className={styles.languageWrapper} ref={dropdownRef}>
            {/* 触发区域：地球图标 + 箭头 */}
            <div 
                className={classNames(styles.dropdownGroup, { [styles.active]: isOpen })} 
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 013.33-3.56c-.6.11-1.06.31-1.38 3.56zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
                </svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z"/>
                </svg>
            </div>
            
            {/* 下拉菜单面板 */}
            {isOpen && (
                <div className={styles.dropdownMenu}>
                    {['en', 'zh-cn'].map(locale => (
                        <div 
                            key={locale}
                            className={classNames(styles.menuItem, {
                                [styles.selected]: currentLocale === locale
                            })}
                            onClick={() => handleSelect(locale)}
                        >
                            {locales[locale].name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    // 从 Redux state 中获取当前选择的语言代码 (如 'en', 'zh-cn')
    currentLocale: state.locales.locale
});

const mapDispatchToProps = dispatch => ({
    // 派发切换语言的 Action
    onChangeLanguage: locale => dispatch(selectLocale(locale))
});

export default connect(mapStateToProps, mapDispatchToProps)(TwLanguageDropdown);
