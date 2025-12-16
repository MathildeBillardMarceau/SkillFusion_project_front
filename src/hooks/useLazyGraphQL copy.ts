import { useCallback, useState } from "react";

export function useLazyGraphQL<T>(
	defaultQuery?: string,
	defaultVariables?: any,
) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	console.log("0. defaultQuery", defaultQuery);
	console.log("0. defaultVariables", defaultVariables);
	const fetchData = useCallback(
		async ({ query, variables }: { query?: string; variables?: any }) => {
			setLoading(true);

			console.log("query", query);
			console.log("defaultQuery", defaultQuery);
			console.log("variables", variables);
			console.log("defaultVariables", defaultVariables);
			const finalQuery = query || defaultQuery;
			const finalVariables = variables || defaultVariables;

			try {
				// on fetch le endpoint graphQL
				const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						query: finalQuery,
						variables: finalVariables,
					}), // en lui envoyant la query + variables
					cache: "no-store",
				});

				const json = await res.json();

				if (json.errors) {
					setError(json.errors[0].message);
					setLoading(false);
					console.error("XXXXXX GraphQL errors:", json.errors);
					return null;
				}

				setData(json.data);
				setLoading(false);
				console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Fetched data:", json.data);
				return json.data;
			} catch (e: any) {
				setError(e.message);
				setLoading(false);
				console.error("XXXXXX errors:", json.errors);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[defaultQuery],
	);

	// if (defaultQuery) {
	// 	fetchData({ query: defaultQuery, variables: defaultVariables }); // appel initial si une query par défaut est fournie
	// }

	// on renvoir data, loading et error
	return { data, loading, error, fetchData };
}

/*
S'utilise comme ceci : 

const { data, loading, error, fetchData } = useLazyGraphQL(`#graphql
  query ($slug: String!) {
    courseBySlug(slug: $slug) { id title }
  }
`, { slug: "slug-du-cours" });

ou alors on peut passer les variables à l'appel de la fonction fetchData :
const { data, loading, error, fetchData } = useLazyGraphQL();


// plus tard dans le code	
fetchData(`#graphql
  query ($slug: String!) {
    courseBySlug(slug: $slug) { id title }
  }
`, { slug: "slug-du-cours" })
*/
