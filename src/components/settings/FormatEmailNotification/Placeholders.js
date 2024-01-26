/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { EditorState, Modifier } from 'draft-js';

export default class Placeholders extends PureComponent {
  state = {
    open: false
  };

  openPlaceholderDropdown = () => this.setState({ open: !this.state.open });

  addPlaceholder = placeholder => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      placeholder,
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };

  placeholderOptions = [
    { key: 'buyer', value: '{buyer_name}', text: 'Comprador' },
    { key: 'trackingNumber', value: '{tracking_number}', text: 'Nº Seguimiento' },
    { key: 'packageReference', value: '{package_reference}', text: 'ID Pedido Cliente' },
    { key: 'courier', value: '{package_courier}', text: 'Courier' }
  ];

  listItem = this.placeholderOptions.map(item => (
    <li
      onClick={this.addPlaceholder.bind(this, item.value)}
      key={item.key}
      className="rdw-dropdownoption-default placeholder-li"
      onMouseEnter={e => {
        e.target.className = 'rdw-dropdownoption-default rdw-dropdownoption-highlighted';
      }}
      onMouseLeave={e => {
        e.target.className = 'rdw-dropdownoption-default';
      }}
    >
      {item.text}
    </li>
  ));

  render() {
    const { open } = this.state;
    return (
      <div
        onClick={this.openPlaceholderDropdown}
        className="rdw-block-wrapper"
        aria-label="rdw-block-control"
      >
        <div
          style={{ width: '150px' }}
          className="rdw-dropdown-wrapper rdw-block-dropdown"
          aria-label="rdw-dropdown"
        >
          <div className="rdw-dropdown-selectedtext" title="Placeholders">
            <span>Tags</span>
            <div className={`rdw-dropdown-caretto${this.state.open ? 'close' : 'open'}`} />
          </div>
          <ul
            style={{ display: open ? 'block' : 'none' }}
            className={`rdw-dropdown-optionwrapper ${this.state.open ? '' : 'placeholder-ul'}`}
          >
            {this.listItem}
          </ul>
        </div>
      </div>
    );
  }
}
