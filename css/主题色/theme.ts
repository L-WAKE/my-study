

import { defineStore } from 'pinia';
import styles from "@/assets/style/theme.module.scss";
export const themeStore = defineStore('theme-store', {
    state: () => ({
        themeName: sessionStorage.getItem("theme") ? sessionStorage.getItem("theme") : 'light',
        commonTheme: {//全局配置项
            name: 'light',
            style: {},
            theme: {
                dark: {
                    '--filterLogin': 0.8,/*登录页背景亮度*/
                    '--commonBgColor': '#18181C',/* 通用背景颜色 */
                    '--commonFintColor333': '#fff',/* 333字体颜色 */
                    '--commonButtonColor': '#70C0E8',/*通用按钮颜色*/
                    "--commonFintColor": "#FFFFFF",/* 通用字体颜色 */
                    "--panelBgColor": "#48484E",/* 面板背景颜色 */
                    "--tagListColor": "#f5f5f5",/* tags标签字体颜色 */
                    "--frameColor": "#18181C",/* 框架背景颜色 */
                    "--logoFontColor": "#ffffff",/* logo标题颜色 */
                    "--menuFontColor": "#f5f5f5",/* 菜单字体颜色 */
                    "--subMenuFontColor": "#f5f5f5",/* 二级菜单字体颜色 */
                    "--titleFontColor": "#2e302e",/* 标题颜色 */
                    "--secondFontColor": "#FFFFFF",/* 二级字体颜色 */
                    "--thirdFontColor": "#737373",/* 三级字体颜色 */
                    "--containerBorderColor": "#e9e9e9",/* 边框颜色 */
                    "--mainBgColor": "#101014",/* 主体部分背景色与部分阴影色 */
                    "--ctrlElementBorderColor": "#e0e0e6",/* 表单控件元素边框颜色 */
                    "--confirmBtnBgColor": "#409eff",/* 确认按钮背景颜色 */
                    "--pageBgColor": "#18181C",
                    "--menuTagTextColor": "#1890FF",
                    "--menuTagBgImg": styles.darkTabActiveBg,
                    "--menuTagHoverBgImg": styles.darkHoverBg,
                    "--menuActiveBgColor": "#1E293D",
                    "--menuActiveColor": "#448EF7",
                    "--titleBorderColor": "#0671BE",/*标题边框颜色*/
                    "--commonTitleColor": "#fff"/*通用标题颜色*/
                },
                light: {
                    '--filterLogin': 1,/*登录页背景亮度*/
                    '--commonBgColor': '#fff',/* 通用背景颜色 */
                    '--commonFintColor333': '#333',/* 字体颜色333 */
                    '--commonButtonColor': '#409eff',/*通用按钮颜色*/
                    "--commonFintColor": "#2e302e",/* 通用字体颜色 */
                    "--panelBgColor": "#fff",/* 面板背景颜色 */
                    "--tagListColor": "#2e302e",/* tags标签字体颜色 */
                    "--frameColor": "#0671BE",/* 框架背景颜色 */
                    "--logoFontColor": "#ffffff",/* logo标题颜色 */
                    "--menuFontColor": "#f5f5f5",/* 菜单字体颜色 */
                    "--subMenuFontColor": "#f5f5f5",/* 二级菜单字体颜色 */
                    "--titleFontColor": "#2e302e",/* 标题颜色 */
                    "--secondFontColor": "#2b2b30",/* 二级字体颜色 */
                    "--thirdFontColor": "#737373",/* 三级字体颜色 */
                    "--containerBorderColor": "#e9e9e9",/* 边框颜色 */
                    "--mainBgColor": "#eeeeee",/* 主体部分背景色与部分阴影色 */
                    "--ctrlElementBorderColor": "#e0e0e6",/* 表单控件元素边框颜色 */
                    "--confirmBtnBgColor": "#409eff",/* 确认按钮背景颜色 */
                    "--pageBgColor": "#FFFFFF",
                    "--menuTagTextColor": "#2e302e",
                    "--menuTagBgImg": styles.lightTabActiveBg,
                    "--menuTagHoverBgImg": styles.lightHoverBg,
                    "--menuActiveBgColor": "#0357a2",
                    "--menuActiveColor": "#FFFFFF",
                    "--titleBorderColor": "#0671BE",/*标题边框颜色*/
                    "--commonTitleColor": "#666666"/*通用标题颜色*/
                }
            }
        },
        sidebar: {//侧边栏
            name: 'light',
            style: {},
            theme: {
                dark: {
                    '--sideBgColor': '#18181C',/* 侧边栏和背景颜色 */
                    '--sideChooseColor': '#2a3d49 ',/* 侧边栏和选中颜色 */
                },
                light: {
                    '--sideBgColor': '#0671BE',/* 侧边栏和背景颜色 */
                    '--sideChooseColor': '#0357a2 ',/* 侧边栏和选中颜色 */
                }
            }
        },
        header: {//头部
            name: 'light',
            style: {},
            theme: {
                dark: {
                    '--headerBgColor': '#18181C',/* 头部背景颜色 */
                    '--headerChooseColor': '#2a3d49 ',/* 头部选中颜色 */
                },
                light: {
                    '--headerBgColor': '#0671BE',/* 头部背景颜色 */
                    '--headerChooseColor': '#0357a2 ',/* 头部选中颜色 */
                }
            }
        },
    }),
    getters: {
        getthemeName() {
            return this.themeName
        }
    },
    actions: {
        setTheme(theme: string) {
            this.themeName = theme
        },
        // 设置是否深色
        setAllTheme(name: string, type: string) {
            this[type].name = name
            this[type].style = this[type].theme[name]
            const styles = this[type].style
            for (let key in styles) {
                window.document.documentElement.style.setProperty(key, styles[key])
            }
        }
    }
})