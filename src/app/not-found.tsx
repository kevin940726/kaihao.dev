/**
 * This file has to live under the root app/ directory for some reason
 */
import BackTo from '@/components/BackTo';
import Main from '@/components/Main';
import MainLayout from './(main)/layout';
import { metadata as rootMetadata } from './layout';

export const metadata = {
  ...rootMetadata,
  title: '404: Not found',
};

export default function NotFound() {
  return (
    <MainLayout>
      <Main className="mt-10">
        <h1 className="text-4xl font-bold my-6">Oops..., nothing here.</h1>
        <p>
          <BackTo href="/">Back to home page</BackTo>
        </p>
      </Main>
    </MainLayout>
  );
}
