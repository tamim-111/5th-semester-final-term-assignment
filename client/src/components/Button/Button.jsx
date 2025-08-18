const Button = ({ label, onClick, disabled, type = 'button', wideFull = false }) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}
            className={
                `btn btn-info 
                disabled:cursor-not-allowed
                ${wideFull ? 'w-full' : ''}`
            }>{label}</button>
    )
}

export default Button
