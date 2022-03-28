import PropTypes from "prop-types"

const ContentWrapper = ({ children, padded = false, ...p }) =>
{
    let classes = "content";
    if (padded) classes += " padded";

    return (
        <div className={classes} style={{ backgroundColor: "gray" }} {...p}>
            {children}
        </div>
    );
}

ContentWrapper.propTypes = {
    children: PropTypes.any,
    padded: PropTypes.bool
}
export default ContentWrapper;