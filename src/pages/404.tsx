import Layout from '@/app/Layout';
import SEO from '@/app/SEO';
import BackTo from '@/app/BackTo';

const NotFoundPage = () => (
  <Layout>
    <SEO
      title="404: Not found"
      image={{ src: '/api/og', width: 1200, height: 626 }}
    />
    <Layout.Main className="py-20 px-5 md:px-0">
      <h1 className="text-4xl font-bold my-6">Oops..., nothing here.</h1>
      <p>
        <BackTo href="/">Back to home page</BackTo>
      </p>
    </Layout.Main>
  </Layout>
);

export default NotFoundPage;
