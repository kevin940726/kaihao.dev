import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/server';
import siteMetadata from '@/siteMetadata';

export const runtime = 'edge';
export const revalidate = 60 * 60; // 1 hour

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
      tw="bg-backgroundBlack"
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
  const PostModule = await import(`@/posts/${slug}/index.mdx`);
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

  if (!PostModule) {
    return notFound();
  }

  return new ImageResponse(
    (
      <PostImage
        title={PostModule.frontmatter.title}
        profileImageSrc={profileImageBase64}
      />
    ),
    {
      width: 1200,
      height: 626,
    },
  );
}
