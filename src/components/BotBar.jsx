export default function BotBar({ children }) {
    return (
        <div className="botbar">
            {children}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="393"
                height="60"
                viewBox="0 0 393 60"
                fill="none"
            >
                <path
                    d="M0 0C0 0 38 0 98.25 0C158.5 0 151.5 35.5 196.5 35.5C241.5 35.5 232.5 0 294.75 0C357 0 393 0 393 0V60H0V0Z"
                    fill="#596A3A"
                />
            </svg>
        </div>
    );
}
