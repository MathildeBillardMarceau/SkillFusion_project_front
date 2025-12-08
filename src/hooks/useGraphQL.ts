import { useEffect, useState } from "react";

export function useGraphQL<T>(query: string, variables?: any) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // biome-ignore lint: correctnes/useExhaustiveDependencies <faux positif avec JSON.stringify(variables)>
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, variables }),
          cache: "no-store",
        });

        const json = await res.json();

        if (json.errors) {
          setError(json.errors[0].message);
        } else {
          setData(json.data);
        }
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [query, JSON.stringify(variables)]);

  return { data, loading, error };
}

/*
S'utilise comme ceci : 

const { data, loading, error } = useGraphQL(`#graphql
  query ($slug: String!) {
    courseBySlug(slug: $slug) { 
      id 
      title 
    }
  }
`, { slug });
*/
