import { useCallback, useState } from "react";

export default function useTableScale(defaultValue = 0.85, deltaValue = 0.1, minValue = 0.6, maxValue = 2)
{
    const [tableSizeFactor, setTableSizeFactor] = useState(defaultValue);

    const handleScaleUp = useCallback(
        () =>
        {
            if (tableSizeFactor < maxValue)
                setTableSizeFactor(tableSizeFactor + deltaValue);
        },
        [tableSizeFactor, deltaValue, maxValue],
    )

    const handleScaleDown = useCallback(
        () =>
        {
            if (tableSizeFactor > minValue)
                setTableSizeFactor(tableSizeFactor - deltaValue);
        },
        [tableSizeFactor, deltaValue, minValue],
    )

    const resetScale = useCallback(
        () =>
        {
            setTableSizeFactor(defaultValue);
        },
        [defaultValue],
    )

    return [tableSizeFactor, handleScaleUp, handleScaleDown, resetScale]
}