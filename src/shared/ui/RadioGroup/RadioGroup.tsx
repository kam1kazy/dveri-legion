import styles from './RadioGroup.module.scss';

export interface IRadioOption {
  value: string;
  label: string;
}

export interface IRadioGroup {
  name: string;
  label?: string;
  options: IRadioOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export const RadioGroup = ({
  name,
  label,
  options,
  value,
  onChange,
  required,
  error,
  className,
}: IRadioGroup) => {
  return (
    <fieldset className={`${styles.field} ${className ?? ''}`}>
      {label && (
        <legend className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </legend>
      )}
      <div className={styles.options} role="radiogroup" aria-required={required}>
        {options.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              className={styles.input}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </fieldset>
  );
};
