const Margin = ({ children, style = null }) => (
  <div style={{ margin: '20px', marginBottom: '40px', background: 'white', ...style }}>
    {children}
  </div>
);
export default Margin;
