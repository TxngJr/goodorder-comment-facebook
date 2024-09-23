import React from 'react';
import TextField from '@mui/material/TextField';

interface MinValueFieldProps {
  minValue: number;
  setMinValue: (value: number) => void;
}

export const MinValueField: React.FC<MinValueFieldProps> = ({ minValue, setMinValue }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(Number(event.target.value));
  };

  return (
    <TextField
      label="กรอกค่าต่ำสุด"
      type="number"
      value={minValue}
      onChange={handleChange}
      InputProps={{ inputProps: { min: 0 } }}
      fullWidth
    />
  );
};

interface MaxValueFieldProps {
  maxValue: number;
  minValue: number;
  setMaxValue: (value: number) => void;
}

export const MaxValueField: React.FC<MaxValueFieldProps> = ({ maxValue, minValue, setMaxValue }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(Number(event.target.value));
  };

  return (
    <TextField
      label="กรอกค่าสูงสุด"
      type="number"
      value={maxValue}
      onChange={handleChange}
      InputProps={{ inputProps: { min: minValue || 0 } }}
      fullWidth
    />
  );
};