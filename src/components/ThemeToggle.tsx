import { useTheme } from "../hooks/useTheme"

import '../styles/theme-toggle.scss';

export function ThemeToggle() {
    const {theme, toggleTheme} = useTheme()
    
    return (
            <label className="switch">
                <input type="checkbox" checked={theme === 'dark'} onChange={() => toggleTheme()}/>
                <span className="slider round"></span>
                <p className='theme-name'>{theme}</p>
            </label>
    )
}