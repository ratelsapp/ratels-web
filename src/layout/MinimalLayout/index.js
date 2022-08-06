import PropTypes from "prop-types";

const MinimalLayout = ({ children }) => {
  return <main>{children}</main>;
};

MinimalLayout.propTypes = {
  children: PropTypes.node,
};

export default MinimalLayout;
