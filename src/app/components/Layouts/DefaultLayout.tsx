import React, { FunctionComponent, useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery'
import { Button, Drawer, DrawerProps, Dropdown, Layout, Menu, theme } from 'antd'
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'

import PageUrls from '../../constants/page-urls'
import { ImageLinks } from '../../constants/image-link'
import { useUser } from '../../hooks/useUser'
import SplashLoadingScreen from '../Loading/SplashLoadingScreen'
import { Box, ThemeProvider } from '@mui/material'
import { createTheme } from '../../themes'
import Modal from '../Modal'
import CircularLoading from '../CircularProgress'
import FeatherIcon from 'feather-icons-react';

const { Header, Sider, Content } = Layout

const drawerProps = {
  placement: 'left',
  width: 220,
} as DrawerProps

interface ISiderOrDrawer {
  collapsed: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const SignOutMenu = () => {
  const navigate = useNavigate()

  const handleClickSignOut = () => {
    navigate(PageUrls.Logout)
    localStorage.clear()
  }

  return (
    <Button
      type="text"
      style={{ background: 'transparent' }}
      onClick={handleClickSignOut}
    >
      ออกจากระบบ
    </Button>
  )
}

const settings = {
  colorPreset: 'green',
  contrast: 'normal',
  direction: 'ltr',
  layout: 'vertical',
  navColor: 'evident',
  paletteMode: 'light',
  responsiveFontSizes: true,
  stretch: false,
}

const themeMui = createTheme({
  colorPreset: settings.colorPreset,
  contrast: settings.contrast,
  direction: settings.direction,
  paletteMode: settings.paletteMode,
  responsiveFontSizes: settings.responsiveFontSizes,
})

const SiderOrDrawer: FunctionComponent<ISiderOrDrawer> = (props) => {
  const {
    children,
    collapsed,
    toggle,
  } = props
  const isSmall = useMediaQuery('(max-width: 1199px)')
  const LogoComponent = useCallback(() => (
    <div
      className="logo"
      style={isSmall ? { margin: '20px 16px' } : { margin: '10px 16px' }}
    >
      <LogoWrapper>
        {(isSmall && !collapsed) || (!isSmall && collapsed) ? (
          <img src={ImageLinks.LOGO} alt="smallLogoCt" height={50} width="100%" />
        ) : (
          <img
            src={ImageLinks.LOGO_HORIZONTAL}
            alt="logoCt"
            height={100}
            className="custom-logo"
          />
        )}
      </LogoWrapper>
    </div>
  ), [isSmall, collapsed])

  return isSmall ? (
    <Drawer
      {...drawerProps}
      open={collapsed}
      closable={false}
      onClose={toggle}
      bodyStyle={{
        padding: 0,
        backgroundColor: '#0A1525',
      }}
      drawerStyle={{
        left: 0,
        width: 220,
      }}
    >
      <LogoComponent />
      {children}
    </Drawer>
  ) : (
    <>
      <Sider width={280} trigger={null} collapsible collapsed={collapsed}
        style={{ display: 'absolute', zIndex: 1, height: '100vh', position: 'fixed' }}
      >
        <LogoComponent />
        <div className="custom-scrollbar"
          style={{
            overflow: 'auto',
            height: 'calc(100vh - 100px)',
            position: 'fixed',
            width: collapsed ? 80 : 280,
            paddingBottom: '50px',
          }}
        >
          {children}
        </div>
      </Sider>
      <div style={{ marginLeft: collapsed ? 80 : 280 }} />
    </>
  )
}

const DefaultLayout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user, loading } = useUser()
  const [state, setState] = useState({
    collapsed: false,
    active: '',
  })
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const handleOnSelect = (e: any) => {
    setState({
      ...state,
      active: e.key,
    })
  }

  const handleToggleCollapse = () => {
    setState({
      ...state,
      collapsed: !state.collapsed,
    })
  }

  const menuItems = [
    {
      label: 'เมนูหลัก',
      key: 'main',
      icon: null,
      children: [
        {
          key: PageUrls.Home,
          icon: <DashboardOutlined />,
          label: <Link to={PageUrls.Home}>ภาพรวมระบบ</Link>,
        },
      ],
      type: 'group',
    },
    {
      label: 'ระบบตอบคอมเม้น',
      key: 'auto-comment-system',
      icon: null,
      children: [
        {
          key: PageUrls.AutoCommentSystem,
          icon: <FeatherIcon icon="mail" />,
          label: <Link to={PageUrls.AutoCommentSystem}>ตั้งค่าระบบตอบคอมเม้น</Link>,
        },
      ],
      type: 'group',
    },
    {
      label: 'ระบบดึงเบอร์โทรจากคนคอมเม้น',
      key: 'phone-number-retrieval-system',
      icon: null,
      children: [
        {
          key: PageUrls.PhoneNumberRetrievalSystem,
          icon: <FeatherIcon icon="phone-incoming" />,
          label: <Link to={PageUrls.PhoneNumberRetrievalSystem}>ดึงเบอร์โทรจากคนคอมเม้น</Link>,
        },
      ],
      type: 'group',
    },
    {
      label: 'ระบบส่งข้อความลูกค้า',
      key: 'customer-messaging-system',
      icon: null,
      children: [
        {
          key: PageUrls.CustomerMessagingSystem,
          icon: <FeatherIcon icon="send" />,
          label: <Link to={PageUrls.CustomerMessagingSystem}>ส่งข้อความลูกค้า</Link>,
        },
      ],
      type: 'group',
    },
  ]

  if (loading) {
    return <SplashLoadingScreen />
  }

  const mainMenu = menuItems?.map((item) => {
    const { ...rest } = item
    return {
      ...rest,
    }
  }).filter(Boolean)

  return (
    <Wrapper>
      <Layout>
        <SiderOrDrawer
          collapsed={state.collapsed}
          toggle={handleToggleCollapse}
        >
          <Menu
            theme="dark"
            mode="inline"
            // inlineIndent={15}
            selectedKeys={[state.active]}
            onClick={handleOnSelect}
            items={mainMenu}
          />
        </SiderOrDrawer>
        <Layout className="site-layout">
          <Header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 20px',
              background: colorBgContainer,
            }}
          >
            {React.createElement(
              state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: handleToggleCollapse,
              },
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'sign-out',
                      label: <SignOutMenu />,
                    },
                  ],
                }}
              >
                <Button
                  icon={
                    <IconWrapper>
                      <UserOutlined />
                    </IconWrapper>
                  }
                  type="link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black',
                  }}
                >
                  <span>{user?.username}</span>
                </Button>
              </Dropdown>
            </Box>
          </Header>
          <CustomContent>
            <ThemeProvider theme={themeMui}>
              <Modal />
              <CircularLoading />
              {children}
            </ThemeProvider>
          </CustomContent>
        </Layout>
      </Layout>
    </Wrapper>
  )
}

export default DefaultLayout

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: #fff;
  font-size: 16px;

  .a {
    color: #fff;
  }
`

const CustomContent = styled(Content)`
  min-height: 100vh;
  margin: 20px 24px;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border: solid 1px gray;
  border-radius: 100%;
`

const LogoWrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`
