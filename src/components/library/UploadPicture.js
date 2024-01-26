import { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isValidImage = file.type === 'image/png';
  if (!isValidImage) {
    message.error('You can only upload PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isValidImage && isLt2M;
}

const UploadPicture = ({ title, uploadDone, imageLink }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
        setLoading(true);
        if (typeof uploadDone === 'function') {
          uploadDone(imageUrl);
        }
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">{title}</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      // action="//jsonplaceholder.typicode.com/posts/"
      customRequest={({ onSuccess }) => {
        setTimeout(() => {
          onSuccess('ok');
        }, 300);
      }}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageLink ? (
        <img width="100%" src={imageLink} alt="avatar" />
      ) : imageUrl ? (
        <img width="100%" src={imageUrl} alt="avatar" />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadPicture;
