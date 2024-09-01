import ThemeProvider from "./theme";
import ToastProvider from "./toast";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      {children}
      <ToastProvider position="top-right" duration={5000} />
    </ThemeProvider>
  );
}
