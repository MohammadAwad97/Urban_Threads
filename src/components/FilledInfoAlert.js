import classNames from "classnames"

function FilledInfoAlert({ children, icon, className }) {

    const classNameIcon = classNames('flex justify-start items-center text-red-800 text-sm gap-1', className )


    return (
        <label className={classNameIcon}>
            {icon} 
            <label>{children}</label>
        </label>
    )
}

export default FilledInfoAlert;