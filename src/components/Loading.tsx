import { useTheme } from "../hooks/useTheme";
import ClipLoader from "react-spinners/ClipLoader";

import '../styles/loading.scss';

export function Loading() {
    const { theme } = useTheme();

    return (
        <div className={`loading ${theme}`}>
            <ClipLoader color={theme === 'dark' ? '#f8f8f8' : '#333'} loading={true} size={150} />
        </div>
    )
}