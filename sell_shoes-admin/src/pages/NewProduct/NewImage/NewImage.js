import React from "react";
import PropTypes from "prop-types";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const NewImage = (props) => {
  const { onchange } = props;
  return (
    <React.Fragment>
      <Upload
        name="image"
        maxCount={5}
        listType="picture"
        accept="image/*"
        multiple
        beforeUpload={(file) => {
          onchange(file);
        }}
      >
        <Button className="upload__btn" icon={<UploadOutlined />}>
          Click to Upload
        </Button>
      </Upload>
    </React.Fragment>
  );
};
NewImage.propTypes = {
  onchange: PropTypes.func.isRequired,
};

export default NewImage;
