import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React Quill styles

const PostBlog = ({ visible, onCancel, onPost }) => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [content, setContent] = useState('');

  const handleImageUpload = ({ fileList }) => {
    setImageList(fileList);
  };

  const handleSubmit = (values) => {
    const formData = { ...values, content, images: imageList };
    onPost(formData);
    form.resetFields();
    setImageList([]);
    setContent(''); // Reset the content field
    messageApi.success('Blog posted successfully!');
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={visible}
        title="Post Blog"
        onCancel={onCancel}
        footer={[
          <Button
            key="back"
            onClick={onCancel}
            style={{ background: '#f44336', color: 'white', border: 'none' }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            style={{
              background: 'linear-gradient(to right, #4CAF50, #2E7D32)',
              color: 'white',
              border: 'none',
            }}
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
            shortDescription: '',
          }}
        >
          <Form.Item
            name="title"
            label="Blog Title"
            rules={[{ required: true, message: 'Please enter the blog title!' }]}
          >
            <Input />
          </Form.Item>

          {/* Replace TextArea with React Quill for rich text */}
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter the content of the blog!' }]}
          >
            <ReactQuill
              value={content}
              onChange={setContent} // Set the content when changed
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: '1' }, { header: '2' }, { font: [] }],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  ['link', 'image'],
                  ['blockquote', 'code-block'],
                  ['clean'],
                ],
              }}
            />
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
                <UploadOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                <div>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PostBlog;
