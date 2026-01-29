import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Typography, Card, Skeleton } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProducts';
import { ProductForm } from '../components/ProductForm';
import type { Product } from '../api/products';

const { Title } = Typography;

export const ProductListPage: React.FC = () => {
    const { data: products, isLoading } = useProducts();
    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();
    const deleteMutation = useDeleteProduct();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: number) => `$${text}`,
        },
        {
            title: 'Stock',
            dataIndex: 'stockQuantity',
            key: 'stockQuantity',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Product) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setEditingProduct(record);
                            setIsModalVisible(true);
                        }}
                    />
                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => deleteMutation.mutate(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleCreateOrUpdate = (values: any) => {
        if (editingProduct) {
            updateMutation.mutate(
                { id: editingProduct.id, data: values },
                {
                    onSuccess: () => {
                        setIsModalVisible(false);
                        setEditingProduct(null);
                    },
                }
            );
        } else {
            createMutation.mutate(values, {
                onSuccess: () => {
                    setIsModalVisible(false);
                },
            });
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingProduct(null);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Products</Title>
                    <Typography.Text type="secondary">Manage your inventory and stock</Typography.Text>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => {
                        setEditingProduct(null);
                        setIsModalVisible(true);
                    }}
                >
                    Add Product
                </Button>
            </div>

            <Card bordered={false} style={{ borderRadius: 8 }}>
                {isLoading ? (
                    <Skeleton active paragraph={{ rows: 5 }} />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={products}
                        rowKey="id"
                        pagination={{ pageSize: 8 }}
                    />
                )}
            </Card>

            <ProductForm
                visible={isModalVisible}
                onCancel={handleCancel}
                onSubmit={handleCreateOrUpdate}
                initialValues={editingProduct}
                loading={createMutation.isPending || updateMutation.isPending}
            />
        </div>
    );
};
