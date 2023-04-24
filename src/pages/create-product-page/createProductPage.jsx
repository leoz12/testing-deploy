import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  Popconfirm,
  Table,
  Space,
} from "antd";
import { productCategory, productFreshness } from "./constansts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteProduct,
  useGetProducts,
  usePostProduct,
  useUpdateProduct,
} from "./hooks/useProducts";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "./query/product-query";
export default function CreateProductPage() {
  const { TextArea } = Input;
  const [formProduct] = Form.useForm();
  const [editData, setEditData] = useState({
    isEdit: false,
    data: null,
  });
  const [isLoadingGetProducts, dataProducts, getProducts] = useGetProducts();
  const [isLoadingCreateProduct, postProduct] = usePostProduct();
  const [isLoadingUpdateProduct, updateProduct] = useUpdateProduct();
  const [isLoadingDeleteProduct, deleteProduct] = useDeleteProduct();
  const { data, isLoading, error } = useQuery(GET_PRODUCT);
  console.log(data);
  const token = JSON.parse(localStorage.getItem("token"));
  const [] = useDeleteProduct();
  const navigate = useNavigate();

  const handleEdit = (values) => {
    setEditData({ isEdit: true, data: values });
    formProduct.setFieldsValue(values);
  };

  const handleCancel = () => {
    formProduct.resetFields();
    setEditData({ isEdit: false, data: null });
  };

  const handleDelete = (values) => {
    deleteProduct(values.id, () => {
      getProducts();
      handleCancel();
    });
  };

  const onFinish = (values) => {
    if (editData.isEdit) {
      const newData = {
        no: editData.data.no,
        ...values,
      };
      updateProduct(editData.data.id, newData, () => {
        getProducts();
        handleCancel();
      });
    } else {
      const newData = {
        no: Math.floor(Math.random() * 1000) + 1,
        ...values,
      };
      postProduct(newData, () => {
        getProducts();
        handleCancel();
      });
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (text, record) => (
        <a
          onClick={() => {
            navigate(`/product/${text}`, { state: record });
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Product Category",
      dataIndex: "productCategory",
    },
    {
      title: "Product Freshness",
      dataIndex: "productFreshness",
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
    },
    {
      title: "Action",
      render: (_, record) =>
        token.role === "admin" ? (
          <Space size="middle">
            <Popconfirm
              title="Delete this Data"
              description={`Are you sure to delete ${record.productName} ?`}
              onConfirm={() => {
                handleDelete(record);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" style={{ backgroundColor: "#DC3545" }}>
                Delete
              </Button>
            </Popconfirm>
            <Button
              type="primary"
              style={{ backgroundColor: "#198754" }}
              onClick={() => {
                handleEdit(record);
              }}
            >
              Edit
            </Button>
          </Space>
        ) : (
          <span> No Access</span>
        ),
    },
  ];
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "auto", marginTop: 50 }}>
      {token.role === "admin" && (
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 300,
          }}
          form={formProduct}
          onFinish={onFinish}
        >
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Product Name"
            name="productName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Product Category"
            name="productCategory"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select Product Category">
              {productCategory.map((item, idx) => (
                <Select.Option value={item} key={idx}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Product Freshness"
            name="productFreshness"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group>
              <Space direction="vertical">
                {productFreshness.map((item, idx) => (
                  <Radio value={item} key={idx}>
                    {item}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Additional Description"
            name="additionalDescription"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Product Price"
            name="productPrice"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            {editData.isEdit ? (
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#198754" }}
                loading={isLoadingUpdateProduct}
              >
                Save
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoadingCreateProduct}
              >
                Submit
              </Button>
            )}
            {editData.isEdit ? (
              <Button type="text" onClick={handleCancel}>
                Cancel
              </Button>
            ) : null}
          </Form.Item>
        </Form>
      )}
      <Table
        rowKey="id"
        dataSource={dataProducts}
        columns={columns}
        loading={isLoadingGetProducts || isLoadingDeleteProduct}
      />
      ;
    </div>
  );
}
