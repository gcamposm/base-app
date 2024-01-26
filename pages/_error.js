import React from 'react';
import { Result, Button } from 'antd';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <p>
        {this.props.statusCode ? (
          <Result
            status={this.props.statusCode}
            title="Ups!"
            subTitle="Algo fue mal"
            extra={
              <span>
                <Button
                  type="primary"
                  onClick={() => {
                    window.location.replace('/');
                  }}
                >
                  Volver a la página principal
                </Button>
              </span>
            }
          />
        ) : (
          <Result
            status="404"
            title="Ups!"
            subTitle="Hubo un problema inesperado, recargue la página para intentar nuevamente"
            extra={
              <span>
                <Button
                  type="primary"
                  onClick={() => {
                    window.location.reload(true);
                  }}
                >
                  Recargar página
                </Button>
              </span>
            }
          />
        )}
      </p>
    );
  }
}

export default Error;
