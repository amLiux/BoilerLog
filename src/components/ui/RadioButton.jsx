import React from 'react'

export const RadioButton = ({opcion, label}) => {
    return (
        <div className="radio-button mb-5">
            <input type="radio" name="card" />
            <label className="radio-button__label" htmlFor="card">
                <h5 className="radio-button__label-heading">{label}:</h5>
                <h2><span className="radio-button__label-subheading">4:00PM - 4:30PM</span></h2>
            </label>
        </div>
    )
}
