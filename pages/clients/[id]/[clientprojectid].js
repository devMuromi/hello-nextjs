import { useRouter } from "next/router";

function SelectedClientProjectPage() {
  const router = useRouter();
  return (
    <div>
      <h1>The Project Page for a Specific Project for a Selected Client</h1>
      <p>
        {router.query.id} {router.query.clientprojectid}
      </p>
    </div>
  );
}

export default SelectedClientProjectPage;
