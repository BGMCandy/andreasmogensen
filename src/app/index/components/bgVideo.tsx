'use client';

export default function BgVideo() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -1,
      backgroundColor: 'red' // Test background
    }}>
      <video
        src="https://files.andreasmogensen.dk/%5BFREE%20download%5D%20andreas%20mogensen%20astronaut%20cute%20floating%20around%20in%20space.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
      />
    </div>
  );
}