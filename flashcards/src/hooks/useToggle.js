import { useCallback, useState } from "react";

/**
 * Hook for toggle value
 * @param {boolean} initialValue boolean - is toggled by default
 * @returns [isToggleOn, toggle]
 */
export default function useToggle(initialValue = false)
{
    const [isToggleOn, setToggleOn] = useState(initialValue);

    const toggle = useCallback(() => setToggleOn(!isToggleOn), [isToggleOn,]);

    return [isToggleOn, toggle];
}