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

## le fonctionnement du hook


### le post

En GQL on envoie toujours un POST avec {query, variables}
_(même si on veut faire un get)_
```ts
export function useGraphQL<T>(query: string, variables?: any)`
```

### le useEffect
va refaire la requête à chaque fois que query ou variables changent (quand le contenu de l'objet change)

```ts
useEffect(() => { ... }, [query, JSON.stringify(variables)]);`
```

### les useState
Gèrent la valeur des données et les modifient à l'affichage si nécéssaire

```ts
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string| null>(null);
```

### La requête depuis la page

```ts
const { data: CoursesData, loading, error } = useGraphQL(
    `query { courses { id title slug image createdAt description }}`,
    {},
);
```
La constante contient mes 3 useState
Je donne une valeur à data (ici CoursesData par exemple)
Via `useGraphQL` je concatène une query choisie (ici courses) avec les champs que je souhaite en retour (la liste dans le {}) et je précise les variables dans le second `{}` 

exemple:
```ts
	const {
		data: messagesDataFromDB,
		loading,
		error,
	} = useGraphQL(
		`#graphql
    query MessagesByCourseSlug($slug: String!) {
       messagesByCourseSlug(slug: $slug) {
        id
        content
        user {
          firstName
          lastName
          id
        }
        course {
          title
        }
        createdAt
        updatedAt
    }
  }`,
		{ slug: params.slug },
	);
```
Correspond aux variables dans appolo server

```ts
{
  "slug": "title-2"
}
```


## utiliser le hook

### déclarer le retour du hook

Rappel:
```tsx
const { data: CoursesData, loading, error,} = 
useGraphQL(
		`#graphql
    query {
      courses { id title slug image createdAt description
      }
    }
  `,
		{},
	);
```

La constante est déclarée de façon déstructurée car graphQL renvoie forcément un objet avec 3 composants

`const { data: CoursesData, loading, error,}`

Ici on a choisi d'attribuer au retour data le nom CourseData (soit un alias) pour envoie pouvoir faire `CoursesData.machin` etc...

On aurait aussi pu mettre 
`const { data, loading, error,}`
et appeler ensuite `data.machin`

Si on a plusieurs retours c'est plus clair