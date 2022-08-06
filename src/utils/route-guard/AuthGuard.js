import PropTypes from "prop-types";

const AuthGuard = ({ children }) => {
  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
