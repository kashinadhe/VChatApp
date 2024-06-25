import React, { useState } from 'react'

export default function GenderCheckbox({onRadioChange, selectedGender}) {

    const [gender, setGender] = useState('male');
  return (
    <div className='flex m-auto'>
        <div className="form-control flex flex-row m-auto">
            <label className={`label gap-2 cursor-pointer`}>
                <span className="label-text">Male</span>
                <input type="radio" name="radio-2" className="radio radio-primary" 
                checked={selectedGender === "male"}
                onChange={() => onRadioChange("male")}/>
            </label>
            <label className={`label gap-2 cursor-pointer`}>
                <span className="label-text">Female</span>
                <input type="radio" name="radio-2" className="radio radio-primary"
                checked={selectedGender === "female"} 
                onChange={() => onRadioChange("female")}/>
            </label>
        </div>
    </div>
  )
}
