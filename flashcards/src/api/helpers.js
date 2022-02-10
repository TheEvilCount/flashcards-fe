


export const getPaginationParams = (page, pageSize = 0) =>
{
    return page ? { p: page, ps: pageSize } : {};
}