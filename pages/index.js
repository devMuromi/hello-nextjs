function HomePage(props) {
  // Next pre-render every page that has no dynamic data
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// this function will run on the server and not shown on the client
export async function getStaticProps(context) {
  return {
    props: {
      products: [
        { id: "p1", title: "Product 1" },
        { id: "p2", title: "Product 2" },
      ],
    },
  };
}

export default HomePage;
