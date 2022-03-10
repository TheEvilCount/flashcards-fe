const errorParse = (error) =>
{
    console.log(error)
    if (error?.code === "ETIMEDOUT")
        return "Connection timed out!";
    if (error?.message)
        return error.message;
    if (error?.data?.message)
        return error.data.message;
    return JSON.stringify(error);
}
export default errorParse;