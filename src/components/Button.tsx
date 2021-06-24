import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    IsOutlined?: boolean
};

export function Button({ IsOutlined = false, ...props }: ButtonProps) {
    return (
        <button 
            className={`button ${IsOutlined && 'outlined'}`} 
            {...props}
        />
    )
}