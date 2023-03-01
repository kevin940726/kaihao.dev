import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';
import { darkTheme } from '@/app/theme';
import profileImage from '@/app/profile.jpeg';
import siteMetadata from '@/siteMetadata';

export const config = {
  runtime: 'edge',
};

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
        backgroundColor: darkTheme.colors.background,
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
            color: darkTheme.colors.contentText,
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
            color: darkTheme.colors.mainText,
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

function DefaultImage({ profileImageSrc }: { profileImageSrc: string }) {
  return (
    <div
      style={{
        backgroundColor: darkTheme.colors.background,
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
          color: darkTheme.colors.mainText,
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
          color: darkTheme.colors.contentText,
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

export default function (request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const isPost = searchParams.has('title');
  const profileImageSrc = `${origin}${profileImage.src}`;

  return new ImageResponse(
    isPost ? (
      <PostImage
        title={searchParams.get('title')!}
        profileImageSrc={profileImageSrc}
      />
    ) : (
      <DefaultImage profileImageSrc={profileImageSrc} />
    ),
    {
      width: 1200,
      height: 626,
    }
  );
}
