import { useCallback, useState } from "react";

export function useLazyGraphQL<T>(defaultQuery?: string) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(
		async ({ query, variables }: { query?: string; variables?: any }) => {
			setLoading(true);

			const finalQuery = query || defaultQuery;

			try {
				// on fetch le endpoint graphQL
				const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ query: finalQuery, variables }), // en lui envoyant la query + variables
					cache: "no-store",
				});

				const json = await res.json();

				if (json.errors) {
					setError(json.errors[0].message);
				} else {
					setData(json.data);
				}
			} catch (e: any) {
				setError(e.message);
			}
			setLoading(false);
		},
		[defaultQuery],
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
