import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShopOutlined, AppstoreOutlined, LogoutOutlined, UserOutlined, MoreOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Header, Content, Sider } = Layout;

export const AppLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [collapsed, setCollapsed] = React.useState(false);

    const items = [
        {
            key: '/',
            icon: <AppstoreOutlined />,
            label: <Link to="/">Products</Link>,
        },
        {
            key: '/sales',
            icon: <ShopOutlined />,
            label: <Link to="/sales">Sales</Link>,
        },
    ];

    const userMenu = {
        items: [
            {
                key: 'logout',
                label: 'Log out',
                icon: <LogoutOutlined />,
                onClick: logout,
                className: 'logout-menu-item',
            },
        ],
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                trigger={null}
                width={260}
                style={{ background: '#1f1f1f', boxShadow: '2px 0 8px rgba(0,0,0,0.1)' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{
                        height: 64,
                        margin: 16,
                        background: 'linear-gradient(135deg, #6C63FF 0%, #4834D4 100%)',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: collapsed ? 24 : 20,
                        fontWeight: 700,
                        letterSpacing: collapsed ? 0 : 1,
                        transition: 'all 0.2s',
                        flexShrink: 0
                    }}>
                        {collapsed ? 'P' : 'PosBuzz'}
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={[location.pathname]}
                            items={items}
                            style={{ background: 'transparent', borderRight: 0 }}
                        />
                    </div>

                    {/* User Profile Section */}
                    <div style={{ padding: collapsed ? '16px 8px' : '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <Dropdown menu={userMenu as any} placement="topLeft" trigger={['click']}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                padding: 8,
                                borderRadius: 8,
                                transition: 'background 0.3s',
                                justifyContent: collapsed ? 'center' : 'flex-start'
                            }}
                                className="user-profile-trigger"
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <Avatar size="large" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} icon={<UserOutlined />} style={{ flexShrink: 0 }} />
                                {!collapsed && (
                                    <div style={{ marginLeft: 12, overflow: 'hidden' }}>
                                        <div style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>{user?.name || 'User'}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {user?.email || 'user@example.com'}
                                        </div>
                                    </div>
                                )}
                                {!collapsed && <MoreOutlined style={{ color: 'rgba(255,255,255,0.6)', marginLeft: 'auto' }} />}
                            </div>
                        </Dropdown>
                    </div>

                    {/* Custom Trigger Area */}
                    <div
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            height: 48,
                            background: '#6C63FF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'background 0.3s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#5a52d5'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#6C63FF'}
                    >
                        {collapsed ? <div style={{ transform: 'rotate(180deg)', fontWeight: 'bold' }}>{'<'}</div> : <div style={{ fontWeight: 'bold' }}>{'<'}</div>}
                    </div>
                </div>
            </Sider>
            <Layout style={{ background: '#f7f9fc' }}>
                <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', zIndex: 1, height: 64 }}>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>Dashboard</div>
                </Header>
                <Content style={{ margin: '24px 24px', padding: 0, minHeight: 280, background: 'transparent' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
