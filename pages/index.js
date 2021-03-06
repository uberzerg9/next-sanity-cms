import Head from 'next/head'
import Link from 'next/link';
import { sanityClient, SanityClient, urlFor } from '../lib/sanity';

// groq sanity (REST API from sanity cms)
const recipesQuery = `*[_type == "recipe"] {
  _id,
  name,
  slug,
  mainImage
}`;

// HOME component
export default function Home({recipes}) {

  recipes.map((recipe) => {
    console.log(recipe.name)
  })

  return (

    <div>

      <Head>
        <title>Kap`s Kitchen</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to Kap`s Kitchen</h1>

      <ul className='recipes-list'>
        {recipes?.length > 0 && 
         recipes.map((recipe) => (
          <li key={recipe._id} className="recipe-card">
            <Link href={`/recipes/${recipe.slug.current}`}>
              <a>
                <img src={urlFor(recipe.mainImage).url()} alt={recipe.name}/>
                <span>{recipe.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>

    </div>

  )
}

// get props from groq sanity cms
export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipesQuery);

  return {
    props: {
      recipes
    }
  }
}