import React, { useState } from 'react';
import { Row, Col, Card, Form, Select, InputNumber, Button, Table, Typography, Statistic, Skeleton } from 'antd';
import { useSales, useCreateSale } from '../hooks/useSales';
import { useProducts } from '../hooks/useProducts';

const { Title, Text } = Typography;
const { Option } = Select;

export const SalesPage: React.FC = () => {
    const [form] = Form.useForm();
    const { data: sales, isLoading: salesLoading } = useSales();
    const { data: products } = useProducts();
    const createSaleMutation = useCreateSale();

    const [selectedProductPrice, setSelectedProductPrice] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const handleProductChange = (productId: number) => {
        const product = products?.find(p => p.id === productId);
        setSelectedProductPrice(product ? product.price : null);
    };

    const onFinish = (values: any) => {
        createSaleMutation.mutate(values, {
            onSuccess: () => {
                form.resetFields();
                setSelectedProductPrice(null);
                setQuantity(1);
            },
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (text: string) => <Text type="secondary">#{text}</Text>,
        },
        {
            title: 'Product',
            dataIndex: ['product', 'name'],
            key: 'productName',
            render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>,
        },
        {
            title: 'Qty',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text: string) => <span style={{ color: '#6C63FF', fontWeight: 600 }}>${Number(text).toFixed(2)}</span>,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => <Text type="secondary" style={{ fontSize: 13 }}>{new Date(text).toLocaleString()}</Text>,
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0 }}>Sales</Title>
                <Text type="secondary">Process new orders and track sales history</Text>
            </div>

            <Row gutter={24}>
                <Col span={8}>
                    <Card
                        title={<span style={{ fontWeight: 600 }}>New Sale</span>}
                        bordered={false}
                        style={{ borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', height: '100%' }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={{ quantity: 1 }}
                            size="large"
                        >
                            <Form.Item
                                name="productId"
                                label={<span style={{ fontWeight: 500 }}>Product</span>}
                                rules={[{ required: true, message: 'Please select a product' }]}
                            >
                                <Select
                                    placeholder="Select item"
                                    onChange={handleProductChange}
                                    showSearch
                                    optionFilterProp="children"
                                    style={{ width: '100%' }}
                                >
                                    {products?.map(p => (
                                        <Option key={p.id} value={p.id} disabled={p.stockQuantity <= 0}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>{p.name}</span>
                                                <span style={{ color: '#888' }}>${p.price}</span>
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="quantity"
                                label={<span style={{ fontWeight: 500 }}>Quantity</span>}
                                rules={[{ required: true, message: 'Please input quantity' }]}
                            >
                                <InputNumber
                                    min={1}
                                    style={{ width: '100%' }}
                                    onChange={(val) => setQuantity(val || 1)}
                                />
                            </Form.Item>

                            <div style={{
                                marginTop: 24,
                                marginBottom: 24,
                                padding: 20,
                                background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.05) 0%, rgba(72, 52, 212, 0.05) 100%)',
                                borderRadius: 12,
                                border: '1px solid rgba(108, 99, 255, 0.1)',
                                textAlign: 'center'
                            }}>
                                <Statistic
                                    title={<span style={{ fontSize: 13, color: '#666' }}>ESTIMATED TOTAL</span>}
                                    value={(selectedProductPrice || 0) * quantity}
                                    precision={2}
                                    prefix={<span style={{ color: '#6C63FF' }}>$</span>}
                                    valueStyle={{ color: '#6C63FF', fontWeight: 700, fontSize: 32 }}
                                />
                            </div>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    loading={createSaleMutation.isPending}
                                    style={{ height: 48, fontSize: 16, fontWeight: 600, background: '#6C63FF', borderColor: '#6C63FF', boxShadow: '0 4px 14px rgba(108, 99, 255, 0.3)' }}
                                >
                                    Confirm Sale
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                <Col span={16}>
                    <Card
                        title={<span style={{ fontWeight: 600 }}>Recent Transactions</span>}
                        bordered={false}
                    >
                        {salesLoading ? (
                            <Skeleton active paragraph={{ rows: 5 }} />
                        ) : (
                            <Table
                                dataSource={sales}
                                columns={columns}
                                rowKey="id"
                                pagination={{ pageSize: 6, showSizeChanger: false }}
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
