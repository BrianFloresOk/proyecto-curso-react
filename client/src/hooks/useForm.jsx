import React from 'react';
import { useState } from 'react';

function useForm (initialState = {}) {
    
    const [ formValues, setFormValues ] = useState(initialState)
    
    const handleInputChange = ({target}) =>{
        setFormValues({
            ...formValues,
            [target.name] : target.value
        })
    };

    const reset = () => {
        setFormValues(initialState)
    };

    return { 
        formValues,
        setFormValues,
        handleInputChange,
        reset
    };
}

export default useForm;