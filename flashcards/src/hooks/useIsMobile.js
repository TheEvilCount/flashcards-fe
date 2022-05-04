import { useMediaQuery } from '@material-ui/core';

export default function useIsMobile()
{
    return useMediaQuery("screen and (max-width: 779px)");
}