import PropTypes from 'prop-types';
import './GridStyles.scss';
function GridStyles({ children }) {
    return children;
}
GridStyles.prototype = {
    children: PropTypes.node.isRequired,
};
export default GridStyles;
