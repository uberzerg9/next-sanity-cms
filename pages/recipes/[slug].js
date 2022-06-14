import {
    sanityClient, 
    urlFor, 
    usePreviewSubscription, 
    PortableText
} from '../../lib/sanity';

// groq sanity (REST API from sanity cms)
const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
    _id,
    name,
    slig,
    mainImage,
    ingredient[] {
        unit,
        wholeNumber,
        fraction,
        ingredient -> {
            name
        }
    },
    instructions
}`;

// slug component
export default function OneRecipe({data}) {
    const {recipe} = data;

    return (
        <article className='recipe'>
            <h1>{recipe.name}</h1>
            <main className='content'>
                <img src={urlFor(recipe?.mainImage).url()} alt={recipe.name}/>
                <div className='breakdown'>
                    <ul className='ingredients'>
                        {recipe.ingredient?.map((ingredient, index) => (                            
                            <li key={index + 1} className='ingredient'>
                                {ingredient?.wholeNumber} {ingredient?.fraction} {ingredient?.unit}
                                <br/>
                                {ingredient?.ingredient.name}
                            </li>
                        ))}
                    </ul>
                    <div>
                        <PortableText value={recipe?.instructions} className='instructions'/>
                    </div>
                </div>
            </main>
        </article>
    )
}

// get path by slug
export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
        `*[_type == "recipe" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
    );

    return {
        paths,
        fallback: true,
    }
}

// get slug from params
export async function getStaticProps({params}) {
    const {slug} = params;
    const recipe = await sanityClient.fetch(recipeQuery, {slug})

    return {
        props: {
            data: {
                recipe
            }
        }
    }
}

// 2:02:30