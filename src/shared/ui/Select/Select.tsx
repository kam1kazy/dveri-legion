import { ArrowDownIcon } from '@/shared/ui/Icons';

import styles from './Select.module.scss';

export interface ISelectOption {
  value: string;
  label: string;
}

export interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: ISelectOption[];
  placeholder?: string;
  className?: string;
}

export const Select = ({
  label,
  error,
  options,
  placeholder,
  className,
  id,
  required,
  ...rest
}: ISelect) => {
  const selectId = id || rest.name;

  return (
    <div className={`${styles.field} ${className ?? ''}`}>
      {label && (
        <label className={styles.label} htmlFor={selectId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.wrapper}>
        <select
          id={selectId}
          className={`${styles.select} ${error ? styles['select--error'] : ''}`}
          required={required}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ArrowDownIcon className={styles.arrow} aria-hidden />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
