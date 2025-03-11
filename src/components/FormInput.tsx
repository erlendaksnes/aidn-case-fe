import React from "react";
import "../styles/main.scss";

type FormInputProps = {
  label: string;
  subLabel?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  subLabel,
  type = "number",
  value,
  onChange,
}) => (
  <div className="form-group">
    <label>{label}</label>
    <small>{subLabel}</small>
    <input type={type} value={value} onChange={onChange} />
  </div>
);

export default FormInput;
