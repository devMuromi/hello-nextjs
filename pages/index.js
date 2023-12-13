import path from "path";
import fs from "fs/promises"; // react will not include this in the client side bundle

import Link from "next/link";

function HomePage(props) {
  // Next pre-render every page that has no dynamic data
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// this function will run on the server and not shown on the client
export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // 이때 현재 /pages가 아닌 / 디렉토리를 가리킴
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (data.products.length === 0) {
    return { notFound: true }; // 404 page
  }
  return {
    props: {
      products: data.products,
    },
    // Incremental Static Generation
    // in development mode, this will be ignored and always re-generated
    revalidate: 10, // regenerate every 10 seconds
  };
}

export default HomePage;
