import { ImageResponse } from 'next/og';
import siteMetadata from '@/siteMetadata';

export const runtime = 'edge';
export const revalidate = 3600; // 1 hour

export const size = {
  width: 1200,
  height: 626,
};
export const contentType = 'image/png';

function DefaultImage({ profileImageSrc }: { profileImageSrc: string }) {
  return (
    <div
      style={{
        backgroundColor: '#121212', // backgroundBlack
        backgroundSize: '150px 150px',
        height: '100%',
        width: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'nowrap',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          justifyItems: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Kai Hao"
          height={200}
          src={profileImageSrc}
          style={{ margin: '0 30px', borderRadius: '50%' }}
          width={200}
        />
      </div>
      <div
        style={{
          fontSize: 62,
          fontStyle: 'normal',
          letterSpacing: '-0.025em',
          color: '#f2994a', // mainText
          marginTop: 20,
          padding: '0 120px',
          lineHeight: 1.4,
          whiteSpace: 'pre-wrap',
        }}
      >
        {siteMetadata.title}
      </div>
      <div
        style={{
          fontSize: 34,
          fontStyle: 'normal',
          letterSpacing: '-0.025em',
          color: '#ffffff', // backgroundWhite
          padding: '0 120px',
          lineHeight: 1.4,
          whiteSpace: 'pre-wrap',
        }}
      >
        {siteMetadata.description}
      </div>
    </div>
  );
}

export default async function Image() {
  const profileImageBase64 = await fetch(
    new URL('../components/profile.jpeg', import.meta.url),
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
    <DefaultImage profileImageSrc={profileImageBase64} />,
    {
      width: 1200,
      height: 626,
    },
  );
}
