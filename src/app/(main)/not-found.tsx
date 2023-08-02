/**
 * This file currently doesn't work for some reason
 */
import BackTo from '@/components/BackTo';

export const metadata = {
  title: '404: Not found',
};

export default function NotFound() {
  return (
    <>
      <h1 className="text-4xl font-bold my-6">Oops..., nothing here.</h1>
      <p>
        <BackTo href="/">Back to home page</BackTo>
      </p>
    </>
  );
}
