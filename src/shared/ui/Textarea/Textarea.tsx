import styles from './Textarea.module.scss';

export interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Textarea = ({ label, error, className, id, required, ...rest }: ITextarea) => {
  const textareaId = id || rest.name;

  return (
    <div className={`${styles.field} ${className ?? ''}`}>
      {label && (
        <label className={styles.label} htmlFor={textareaId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`${styles.textarea} ${error ? styles['textarea--error'] : ''}`}
        required={required}
        {...rest}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
