import PropTypes from "prop-types"
const ContentWrapper = ({ children, ...p }) =>
{
    return (
        <div className="content" {...p}>
            {children}
        </div>
    );
}

ContentWrapper.propTypes = {
    children: PropTypes.any
}
export default ContentWrapper;