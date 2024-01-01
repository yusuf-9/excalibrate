import { ThemeToggle } from "@/components/theme";
import WelcomeForm from "@/components/welcome-form";

const WelcomePage = ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
  return (
    <>
      <WelcomeForm searchParams={searchParams} />
      <ThemeToggle className="absolute right-1 top-2 !text-white" />
    </>
  );
};

export default WelcomePage;
