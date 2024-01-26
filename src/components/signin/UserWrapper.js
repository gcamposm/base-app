import { memo, useState } from 'react';
import Link from 'next/link';
import SVG from 'react-inlinesvg';
import { Row } from 'antd';
import styles from '../../assets/account/form.modules.less';

const UserWrapper = ({
  children,
  registerLink = true,
  marginTop = '20%',
  leftOverride = null,
  rightOverride = null
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <div className={styles.table}>
        <div className={styles.table_cell_form} style={leftOverride}>
          <div className={styles.div_container} style={{ marginTop }}>
            <Row id={styles.signin_header} type="flex" justify="center">
              <p>
                <Link href="/">
                  <a>
                    <img style={{width: '50%', marginLeft: '25%'}} src="../static/logo.svg" alt="logo" />
                  </a>
                </Link>
              </p>
            </Row>
            {typeof children === 'function' ? children(isLoading) : children}
          </div>
        </div>
        <div className={styles.table_cell_svg} style={rightOverride}>
          <div className={styles.div_container}>
            <SVG src="/static/custom_printer.svg" onLoad={() => setIsLoading(false)} />
            <p className={styles.paragraph}>Ahorra tiempo gestionando todo en un solo lugar.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(UserWrapper);
