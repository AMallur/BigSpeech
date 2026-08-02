import { ImageResponse } from 'next/og'

export const alt = 'Big Speech personalized speech writer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f8efe5 0%, #fffaf5 55%, #f1ded0 100%)',
          color: '#29231f',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '72px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            background: '#b9513b',
            borderRadius: '999px',
            color: '#fffaf5',
            display: 'flex',
            fontSize: 42,
            height: 92,
            justifyContent: 'center',
            width: 92,
          }}
        >
          B
        </div>
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, marginTop: 28 }}>
          Big Speech
        </div>
        <div
          style={{
            color: '#695f58',
            display: 'flex',
            fontSize: 34,
            lineHeight: 1.35,
            marginTop: 18,
            maxWidth: 900,
          }}
        >
          Heartfelt words for life&apos;s biggest moments — ready in about 20 seconds.
        </div>
      </div>
    ),
    size,
  )
}
