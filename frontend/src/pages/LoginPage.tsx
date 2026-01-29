import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Link } = Typography;

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login', values);
            const { access_token, user } = response.data;
            login(access_token, user);
            message.success('Welcome back!');
            navigate('/');
        } catch (error: any) {
            console.error(error);
            message.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fbfbfb' }}>

            {/* Top Brand Branding */}
            <div style={{ marginBottom: 24, textAlign: 'center', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                    width: 32,
                    height: 32,
                    background: '#6C63FF',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 'bold'
                }}>
                    PB
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f' }}>PosBuzz - A POS System</span>
            </div>

            <Card
                style={{
                    width: 400,
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #eaeaea'
                }}
                bodyStyle={{ padding: 32 }}
            >
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title level={3} style={{ margin: '0 0 8px 0', fontSize: 24 }}>Welcome to PosBuzz</Title>
                    <Text type="secondary">Enter your credentials to access your account</Text>
                </div>

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark={false}
                    size="large"
                >
                    <Form.Item
                        label={<span style={{ fontWeight: 500 }}>Email</span>}
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Invalid email!' }]}
                        style={{ marginBottom: 20 }}
                    >
                        <Input placeholder="me@possbuzz.com" style={{ fontSize: 14 }} />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontWeight: 500 }}>Password</span>}
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        style={{ marginBottom: 24 }}
                    >
                        <Input.Password placeholder="••••••••" style={{ fontSize: 14 }} />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 24 }}>
                        <Button type="primary" htmlType="submit" block loading={loading} style={{ height: 40, fontSize: 14, fontWeight: 500, background: '#6C63FF', borderColor: '#6C63FF' }}>
                            Login
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center', fontSize: 14 }}>
                        <Text type="secondary">Don't have an account? </Text>
                        <Link onClick={() => message.info('Sign up is currently API-only. Use Postman!')} style={{ fontWeight: 500, color: '#6C63FF' }}>Sign up</Link>
                    </div>
                </Form>
            </Card>

            <div style={{ marginTop: 24, textAlign: 'center', maxWidth: 350 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                    By clicking continue, you agree to our <Link href="#" style={{ color: '#666', textDecoration: 'underline' }}>Terms of Service</Link> and <Link href="#" style={{ color: '#666', textDecoration: 'underline' }}>Privacy Policy</Link>.
                </Text>
            </div>
        </div>
    );
};
