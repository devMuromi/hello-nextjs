import path from "path";
import fs from "fs/promises";

import { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // if (!loadedProduct) {
  //   return <p>Loading...</p>;
  // }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // 이때 현재 /pages가 아닌 / 디렉토리를 가리킴
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// 동적 라우팅시에는 어떤 페이지를 생성할지 react가 알 수 없기 때문에 getStaticPaths를 사용해야함
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    // fallback :true는 사전생성 하지 않고도 페이지를 생성하게 만듦, 문제는 Link를 통해 이동하지 않고 직접 주소창에 입력하면 오류 발생
    // 즉 위에 loadedProduct가 로드되지 않았을 때 fallback 페이지를 보여주게 만들어둬야함
    // fallback: true,
    fallback: "blocking", // 이러면 Nest가 페이지가 다 생성될 떄 까지 기다림. 즉 로딩 페이지가 없어도 됨. 이경우엔 불안정한 페이지를 보여주지 않는 대신 데이터 페칭동안 페이지 로드를 기다려야함
  };
}

export default ProductDetailPage;
