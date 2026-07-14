export default function SettingsSection({ title, description, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      {description && <p className="text-sm text-text-secondary mt-1 mb-6">{description}</p>}
      <div className="card divide-y divide-border">{children}</div>
    </div>
  );
}