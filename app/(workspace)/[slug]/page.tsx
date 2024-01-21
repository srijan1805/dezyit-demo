export default function WorkspacePage({
  params,
}: {
  params: { slug: string };
}) {
  return <div>My Workspace: {params.slug}</div>;
}
