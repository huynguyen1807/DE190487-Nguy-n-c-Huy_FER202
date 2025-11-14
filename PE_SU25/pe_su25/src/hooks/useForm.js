import { useState } from 'react';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
    setFieldValue,
    setErrors
  };
};
