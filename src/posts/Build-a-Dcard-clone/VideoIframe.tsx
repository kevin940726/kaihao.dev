export default function VideoIframe({ src }: { src: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: 0,
        position: 'relative',
        paddingBottom: '56.962%',
        marginBottom: '20px',
      }}
    >
      <iframe
        src={src}
        frameBorder="0"
        width="100%"
        height="100%"
        allowFullScreen
        allow="autoplay"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          overflow: 'hidden',
        }}
      ></iframe>
    </div>
  );
}
