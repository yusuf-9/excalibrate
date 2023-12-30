import { ThemeToggle } from "@/components/theme";
import WelcomeForm from "@/components/welcome-form";

const WelcomePage = () => {
    return (
        <>
            <WelcomeForm />
            <ThemeToggle className="absolute right-1 top-2 !text-white" />
        </>
    );
};

export default WelcomePage;
