// Shared by Input, Textarea, PasswordInput, SearchBar — label/helper/error
// chrome defined once so no field reimplements its own error styling.
export default function FieldWrapper({ label, error, helperText, required, children, id }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="error-inline">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-text-tertiary">{helperText}</p>
      ) : null}
    </div>
  );
}