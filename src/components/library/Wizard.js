import { memo } from 'react';
import { Steps, Row } from 'antd';
import Padding from './Padding';

const { Step } = Steps;

const Wizard = ({
  steps,
  current,
  setCurrent,
  type = 'default',
  size = null,
  customStepsStyle = null,
  customStyle = null,
  ...restProps
}) => {
  const STEP_CONTENT = {
    ...steps.map(step => step.content)
  };

  const Content = STEP_CONTENT[current];

  return (
    <Padding>
      <Steps
        size={size}
        current={current}
        // onChange={setCurrent}
        type={type}
        style={customStepsStyle}
      >
        {steps.map(item => (
          <Step key={item.key} title={item.title} {...item.stepConf} />
        ))}
      </Steps>
      <Row type="flex" justify="center" style={customStyle}>
        <Content current={current} setCurrent={setCurrent} {...restProps} />
      </Row>
    </Padding>
  );
};

export default memo(Wizard);
