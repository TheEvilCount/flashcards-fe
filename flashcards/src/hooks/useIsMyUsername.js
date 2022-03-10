import { useEffect, useState } from "react";
import selectors from "state/selectors/authSelectors";

const { useSelector } = require("react-redux")


const useIsMyUsername = (toCheck) =>
{
    const [isMU, setisMU] = useState(false);
    const username = useSelector(selectors.getLoggedUserUsername);

    useEffect(() =>
    {
        setisMU(username === toCheck);
    }, [toCheck, username])


    return isMU;
}
export default useIsMyUsername;