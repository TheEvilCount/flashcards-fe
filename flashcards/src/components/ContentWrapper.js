const ContentWrapper = ({ children, ...p }) =>
{
    return (
        <div className="content" {...p}>
            {children}
        </div>
    );
}
export default ContentWrapper;