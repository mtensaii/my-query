import { Form, FormInstance, Select, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';
import './TagsDropDown.scss';

interface TagsDropDownProps {
  form: FormInstance;
  label?: string;
}

const TagsDropDown: FunctionComponent<TagsDropDownProps> = ({
  form,
  label,
}) => {
  const options = [
    { value: 'math' },
    { value: 'calculus' },
    { value: 'java' },
    { value: 'javascript' },
    { value: 'integral' },
    { value: 'algebra' },
    { value: 'probability' },
    { value: 'discrete' },
  ];

  const tagRender = (props: CustomTagProps) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={'gold'}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, borderRadius: 4 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Form.Item name={'tagDropDown'} label={label} labelCol={{ span: 24 }}>
      <Select
        clearIcon={label ? false : true}
        placeholder={'Tags'}
        mode='multiple'
        showArrow
        tagRender={tagRender}
        style={{ width: '100%' }}
        options={options}
        allowClear
        onBlur={() => !label && form.submit()}
        onClear={() => !label && form.submit()}
        suffixIcon={
          <Icon
            icon='fluent:tag-16-regular'
            style={{
              color: '#b5b5b5',
              fontSize: 16,
              transform: `${label ? 'translateX(2px)' : 'translateX(-3px)'}`,
            }}
          />
        }
      />
    </Form.Item>
  );
};

export default TagsDropDown;