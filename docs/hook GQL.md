# Comment fonctionne le hook GQL

La doc précise s'utilise comme ceci : 

```ts
const { data, loading, error } = useGraphQL(`#graphql
  query ($slug: String!) {
    courseBySlug(slug: $slug) { 
      id 
      title 
    }
  }
`, { slug });
```

## le post

En GQL on envoie toujours un POST avec {query, variables}
_(même si on veut faire un get)_
```ts
export function useGraphQL<T>(query: string, variables?: any)`
```

## le useEffect
va refaire la requête à chaque fois que query ou variables changent (quand le contenu de l'objet change)

```ts
useEffect(() => { ... }, [query, JSON.stringify(variables)]);`
```

## les useState
Gèrent la valeur des données et les modifient à l'affichage si nécéssaire

```ts
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string| null>(null);
```

## La requête depuis la page

```ts
const { data: CoursesData, loading, error } = useGraphQL(
    `query { courses { id title slug image createdAt description }}`,
    {},
);
```
La constante contient mes 3 useState
Je donne une valeur à data (ici CoursesData par exemple)
Via `useGraphQL` je concatène une query choisie (ici courses) avec les champs que je souhaite en retour (la liste dans le {}) et je précise que j'ai un objet en retour avec `{}` (il contiendra la liste des éléments précédemment listés)