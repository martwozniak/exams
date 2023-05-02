export default function LoadingIndicator() {
  return (
    <>
      <div
        role="status"
        className="h-full w-full  animate-pulse space-x-10 space-y-10"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}
