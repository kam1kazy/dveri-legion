import styles from './Checkbox.module.scss';

export interface ICheckbox extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  error?: string;
  className?: string;
}

export const Checkbox = ({ label, error, className, id, ...rest }: ICheckbox) => {
  const checkboxId = id || rest.name;

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <input id={checkboxId} className={styles.input} type="checkbox" {...rest} />
      <label className={styles.label} htmlFor={checkboxId}>
        {label}
      </label>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
