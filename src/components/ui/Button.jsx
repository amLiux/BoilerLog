import React from 'react'

export const Button = ({group, warning=false, text}) => {
    return (
        <button className={`btn pointer mt-1 mb-5 ${warning ? 'btn__warning' : 'btn__primary' } ${group ? 'btn__group' : 'btn__block'} `} type="submit">{text}</button>
    )
}
