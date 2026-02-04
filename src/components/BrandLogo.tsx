export default function BrandLogo({ className = "h-8 w-8" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ display: 'block' }} // Prevent inline layout issues
        >
            <defs>
                <linearGradient id="chewGradient" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0%" stopColor="#FF0000" />
                    <stop offset="100%" stopColor="#D20000" />
                </linearGradient>
            </defs>
            <path
                d="M20 10C14.4772 10 10 14.4772 10 20V80C10 85.5228 14.4772 90 20 90H80C85.5228 90 90 85.5228 90 80V50C90 50 80 55 75 45C70 35 85 30 90 25V20C90 14.4772 85.5228 10 80 10H20Z"
                fill="url(#chewGradient)"
            />
            <path
                d="M40 35L70 50L40 65V35Z"
                fill="white"
            />
        </svg>
    );
}
