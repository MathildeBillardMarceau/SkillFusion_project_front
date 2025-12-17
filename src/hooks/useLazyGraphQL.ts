import { useCallback, useState } from "react";

export function useLazyGraphQL<T>() {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(
		async ({ query, variables }: { query?: string; variables?: any }) => {
			setLoading(true);

			try {
				// on fetch le endpoint graphQL
				const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ query, variables }), // en lui envoyant la query + variables
					cache: "no-store",
				});

				const json = await res.json();

				if (json.errors) {
					setError(json.errors[0].message);
					setLoading(false);
					return null;
				}

				setData(json.data);
				setLoading(false);
				return json.data;
			} catch (e: any) {
				setError(e.message);
				setLoading(false);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	// on renvoir data, loading et error
	return { data, loading, error, fetchData };
}

/*
S'utilise comme ceci : 

const { data, loading, error, fetchData } = useLazyGraphQL(`#graphql
  query ($slug: String!) {
    courseBySlug(slug: $slug) { 
      id 
      title 
    }
  }
`);

fetchData({slug: "slug-du-cours"})
*/
