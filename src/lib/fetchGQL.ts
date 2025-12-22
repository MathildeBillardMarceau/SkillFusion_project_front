export async function fetchGraphQL<T>(
	query: string,
	variables?: any,
): Promise<T> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query, variables }),
	});

	const fetchBack = await res.json();

	if (fetchBack.errors) {
		throw new Error(fetchBack.errors[0].message);
	}

	return fetchBack.data;
}

// export async function fetchGraphQL<T>(query: string, variables?: any): Promise<T> {
// query est la requête GQL sous forme de string
// variables est optionnel selon les requêtes (dans la pratique on en aura tout le temps)
// <T> est un type générique

//   const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ query, variables }),
//   });
// envoi d'une requête POST à mon endpoint GQL
// on utilise Content-Type parce que GQL veut du JSON

//   const fetchBack = await res.json();
// on récupère le corps de la réponse

//   if (fetchBack.errors) {
//     throw new Error(fetchBack.errors[0].message);
//   }
// si on a des erreurs dans le retour, on throw une erreur

//   return fetchBack.data;
// sinon on return ce que la requête à renvoyé
// }
