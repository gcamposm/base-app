const Padding = ({ children, style = null, padding = '15px' }) => (
  <div style={{ ...style, padding }}>{children}</div>
);

export default Padding;
