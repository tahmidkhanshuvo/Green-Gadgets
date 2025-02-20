import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const PostBlogForm = ({ visible, onCancel, onPost }) => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const handleImageUpload = ({ fileList }) => {
    setImageList(fileList);
  };

  const handleSubmit = (values) => {
    const formData = { ...values, images: imageList };
    onPost(formData);
    form.resetFields();
    setImageList([]);
    messageApi.success("Blog posted successfully!");
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={visible}
        title="Post Blog"
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel} style={{ background: '#f44336', color: 'white', border: 'none' }}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            style={{ background: 'linear-gradient(to right, #4CAF50, #2E7D32)', color: 'white', border: 'none' }}
          >
            Post
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            title: '',
            content: '',
          }}
        >
          <Form.Item
            name="title"
            label="Blog Title"
            rules={[{ required: true, message: 'Please enter the blog title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter the content of the blog!' }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>

          <Form.Item
            name="shortDescription"
            label="Short Description"
            rules={[{ required: true, message: 'Please enter a short description for the blog!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Upload Images">
            <Upload
              action="/upload"
              listType="picture-card"
              fileList={imageList}
              onChange={handleImageUpload}
              onPreview={(file) => window.open(file.url)}
              multiple
            >
              <div>
                <UploadOutlined style={{ fontSize: 24, color: "#1890ff" }} />
                <div>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PostBlogForm;
