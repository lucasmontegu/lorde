import Providers from "@/components/providers";
import { fontVariables } from "@/lib/font";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "../index.css";
export const dynamic = "force-dynamic";
const META_THEME_COLORS = {
	light: "#ffffff",
	dark: "#09090b",
};

export const metadata: Metadata = {
	title: "Next Shadcn",
	description: "Basic dashboard with Next.js and Shadcn",
};

export const viewport: Viewport = {
	themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<Script id="set-theme-color" strategy="beforeInteractive">
					{`
            try {
              if (
                localStorage.theme === 'dark' ||
                ((!('theme' in localStorage) || localStorage.theme === 'system') &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
              ) {
                document
                  .querySelector('meta[name="theme-color"]')
                  .setAttribute('content', '${META_THEME_COLORS.dark}');
              }
            } catch (_) {}
          `}
				</Script>
			</head>
			<body
				className={cn(
					"overflow-hidden overscroll-none bg-background font-sans antialiased",
					fontVariables,
				)}
			>
				<NextTopLoader showSpinner={false} />
				<NuqsAdapter>
					<Providers>{children}</Providers>
				</NuqsAdapter>
			</body>
		</html>
	);
}
