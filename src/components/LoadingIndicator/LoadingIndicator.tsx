export default function LoadingIndicator() {
    return(<>
        <div role="status" className="space-y-10 space-x-10  animate-pulse w-full h-full">
            <span className="sr-only">Loading...</span>
        </div>
     </>);
}