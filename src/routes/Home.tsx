import ToogleDarkMode from "../components/ToogleDarkMode";

export default function Home() {
    return (
        <>
            <div className="fixed top-0 w-full bg-secondary dark:bg-secondaryDark flex items-center justify-between px-4">
                <img src="./src/assets/logo.png" alt="logo" className="max-h-32 m-2" />
                <ToogleDarkMode />
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">Unlock Your Property&apos;s Potential with PropertEase!</h1>
            </div>

        </>
    );
}
