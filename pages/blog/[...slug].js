import { useRouter } from "next/router";

function BlogPostsPage() {
  const router = useRouter();
  return (
    <div>
      <h1>The blog posts</h1>
      <p>{router.query.slug}</p>
    </div>
  );
}

export default BlogPostsPage;
