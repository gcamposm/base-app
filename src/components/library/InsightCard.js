import { Card, Typography } from 'antd';
import styles from '~/src/assets/library/Insights.modules.less';

const { Text, Title } = Typography;

const cardStyle = assessment => {
  const percentValue = parseInt(percent.replace('%', ''), 10);
  let textStyleColor = '';
  if (percentValue <= minLimit) {
    textStyleColor = positiveCorrelation ? 'card_selected_red' : 'card_selected';
  } else if (percentValue > minLimit && percentValue <= maxLimit) {
    textStyleColor = 'card_selected_yellow';
  } else {
    textStyleColor = positiveCorrelation ? 'card_selected' : 'card_selected_red';
  }
  return textStyleColor;
};

const InsightCard = ({ data, analyticStyle: { minLimit, maxLimit, positiveCorrelation } }) => (
  <Card
    className={
      styles[cardStyle({ percent: data.percent, minLimit, maxLimit, positiveCorrelation })]
    }
    size="small"
    style={{ minHeight: '7.8rem' }}
  >
    <Text>
      <div
        className={
          styles[
            cardStyle({
              percent: data.percent,
              minLimit,
              maxLimit,
              positiveCorrelation
            })
          ]
        }
      >
        Tienes menos envíos atrasados que el promedio de los clientes: 1,6% (vs 7,0%).
      </div>
    </Text>
  </Card>
);

export default InsightCard;
