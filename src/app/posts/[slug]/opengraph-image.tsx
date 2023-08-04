import { ImageResponse } from 'next/server';
import siteMetadata from '@/siteMetadata';

/**
 * Don't use dynamic import as it will bundle all the posts and exceed
 * the bundle size limit. Instead, fetch the post title from the server.
 */
async function getPostTitle(slug: string) {
  const html = await fetch(new URL(`/posts/${slug}`, siteMetadata.origin)).then(
    (res) => res.text(),
  );
  const title = html.match(/<title>([\s\S]+?) \| Kai Hao<\/title>/)?.[1]!;
  return title;
}

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 626,
};
export const contentType = 'image/png';

function PostImage({
  title,
  profileImageSrc,
}: {
  title: string;
  profileImageSrc: string;
}) {
  return (
    <div
      style={{
        backgroundColor: '#121212', // backgroundBlack
        backgroundSize: '150px 150px',
        height: '100%',
        width: '100%',
        display: 'flex',
        textAlign: 'left',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'column',
        flexWrap: 'nowrap',
      }}
    >
      <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
        <div
          style={{
            fontSize: 70,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            color: '#ffffff', // backgroundWhite
            marginTop: 30,
            padding: '0 120px',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap',
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '0 60px 80px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Kai Hao"
          height={100}
          src={profileImageSrc}
          style={{ margin: '0 30px', borderRadius: '50%' }}
          width={100}
        />
        <div
          style={{
            fontSize: 50,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            color: '#f2994a', // mainText
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap',
          }}
        >
          {siteMetadata.title}
        </div>
      </div>
    </div>
  );
}

export default async function Image({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const title = await getPostTitle(slug);

  const profileImageBase64 = await fetch(
    new URL('../../../components/profile.jpeg', import.meta.url),
  )
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => {
      const base64String = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );
      return `data:image/jpeg;base64,${base64String}`;
    });

  return new ImageResponse(
    <PostImage title={title} profileImageSrc={profileImageBase64} />,
    {
      width: 1200,
      height: 626,
    },
  );
}
