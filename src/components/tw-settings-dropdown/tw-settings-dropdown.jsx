import React from 'react';
import { connect } from 'react-redux';
import { openSettingsMenu, closeSettingsMenu, settingsMenuOpen } from '../../reducers/menus.js';
import TwCustomSettingsMenu from './tw-custom-settings-menu.jsx';

const TwSettingsDropdown = (props) => {
    return (
        <TwCustomSettingsMenu
            // 关闭原有放在 Settings 里的语言选择（因为已有独立的地球仪组件）
            canChangeLanguage={false} 
            // 开启暗色主题、主题色、积木颜色等设置项
            canChangeTheme={true} 
            isRtl={props.isRtl}
            onClickDesktopSettings={
                props.onClickDesktopSettings ? 
                () => { props.onClickDesktopSettings(); props.onRequestClose(); } : null
            }
            onOpenCustomSettings={
                props.onClickAddonSettings ? 
                () => { props.onClickAddonSettings('editor-theme3'); props.onRequestClose(); } : null
            }
            onRequestClose={props.onRequestClose}
            onRequestOpen={props.onRequestOpen}
            settingsMenuOpen={props.settingsMenuOpen}
        />
    );
};

const mapStateToProps = state => ({
    settingsMenuOpen: settingsMenuOpen(state),
    isRtl: state.locales.isRtl
});

const mapDispatchToProps = dispatch => ({
    onRequestOpen: () => dispatch(openSettingsMenu()),
    onRequestClose: () => dispatch(closeSettingsMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(TwSettingsDropdown);
