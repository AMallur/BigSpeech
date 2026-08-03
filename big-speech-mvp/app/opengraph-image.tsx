import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FBF3EA',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 220,
              height: 220,
              borderRadius: 48,
              backgroundColor: '#B74F43',
            }}
          >
            <div
              style={{
                display: 'flex',
                position: 'relative',
                width: 132,
                height: 108,
                borderRadius: 26,
                backgroundColor: '#FFF9F2',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  left: 26,
                  bottom: -18,
                  width: 0,
                  height: 0,
                  borderTop: '22px solid #FFF9F2',
                  borderRight: '18px solid transparent',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  left: 26,
                  top: 34,
                  width: 12,
                  height: 24,
                  borderRadius: 6,
                  backgroundColor: '#B74F43',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  left: 60,
                  top: 22,
                  width: 12,
                  height: 48,
                  borderRadius: 6,
                  backgroundColor: '#B74F43',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  left: 94,
                  top: 30,
                  width: 12,
                  height: 32,
                  borderRadius: 6,
                  backgroundColor: '#B74F43',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                display: 'flex',
                fontSize: 92,
                fontWeight: 700,
                color: '#3D2A22',
                letterSpacing: -2,
              }}
            >
              Big Speech
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 34,
                color: '#7A6455',
              }}
            >
              Ready to read in 20 seconds
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
