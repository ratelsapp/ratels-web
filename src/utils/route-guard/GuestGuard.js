import PropTypes from "prop-types";

const GuestGuard = ({ children }) => {
  return children;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
