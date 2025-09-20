import { builder, BuilderComponent } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export async function generateStaticParams() {
  return []; // no prebuilt pages yet
}

export default async function Page({ params }: { params: { page?: string[] } }) {
  const urlPath = '/' + (params.page?.join('/') || '');
  const page = await builder
    .get('page', { userAttributes: { urlPath } })
    .toPromise();

  if (!page) return <h1>Page not found</h1>;

  return <BuilderComponent model="page" content={page} />;
}
