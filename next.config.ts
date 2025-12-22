import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : null;

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
			},
			...(supabaseHostname
				? [
						{
							protocol: "https",
							hostname: supabaseHostname,
						} as RemotePattern,
					]
				: []),
		],
	},
};

export default nextConfig;
