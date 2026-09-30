import styles from './Input.module.scss';

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Input = ({ label, error, className, id, required, ...rest }: IInput) => {
  const inputId = id || rest.name;

  return (
    <div className={`${styles.field} ${className ?? ''}`}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`${styles.input} ${error ? styles['input--error'] : ''}`}
        required={required}
        {...rest}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
