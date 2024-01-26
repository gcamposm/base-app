import { Component } from 'react';
import { Input } from 'antd';
import styles from '../../assets/library/Header.modules.less';

class Header extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed
    });
  };

  render() {
    const { collapsed } = this.state;
    return <Input />;
  }
}

export default Header;
