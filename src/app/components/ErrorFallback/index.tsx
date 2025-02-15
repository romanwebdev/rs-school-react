type ErrorFallbackProps = {
  error?: Error;
};

export default function ErrorFallback({ error }: ErrorFallbackProps) {
  return <p>{error?.message || 'Unknown error'}</p>;
}
