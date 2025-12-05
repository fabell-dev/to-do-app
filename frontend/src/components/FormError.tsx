export default function FormError({ error }: { error?: string[] | string }) {
  if (!error) return null;
  return <div className="text-red-500">{error}</div>;
}
