import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import type { Product } from '../api/products';

interface ProductFormProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    initialValues?: Product | null;
    loading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
    visible,
    onCancel,
    onSubmit,
    initialValues,
    loading,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                form.resetFields();
            }
        }
    }, [visible, initialValues, form]);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                onSubmit(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            open={visible}
            title={initialValues ? 'Edit Product' : 'Add Product'}
            okText={initialValues ? 'Update' : 'Create'}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleOk}
            confirmLoading={loading}
        >
            <Form
                form={form}
                layout="vertical"
                name="product_form"
                initialValues={{ price: 0, stockQuantity: 0 }}
            >
                <Form.Item
                    name="name"
                    label="Product Name"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="sku"
                    label="SKU"
                    rules={[{ required: true, message: 'Please input the SKU!' }]}
                >
                    <Input disabled={!!initialValues} placeholder="Unique SKU" />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        precision={2}
                        prefix="$"
                    />
                </Form.Item>

                <Form.Item
                    name="stockQuantity"
                    label="Stock Quantity"
                    rules={[{ required: true, message: 'Please input the stock quantity!' }]}
                >
                    <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
