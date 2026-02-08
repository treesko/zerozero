import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a1628 0%, #185b9e 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo Mark */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 450.01 306.82"
          style={{ marginBottom: 32 }}
        >
          <path
            fill="#ffffff"
            d="M296.6,0C278.23,0,260.6,3.24,244.26,9.21c-6.65,2.41-13.06,5.27-19.24,8.55-6.18-3.28-12.59-6.14-19.24-8.55C189.43,3.24,171.79,0,153.42,0,68.82,0,0,68.82,0,153.4c0,84.6,68.82,153.42,153.42,153.42,18.39,0,36.02-3.24,52.37-9.21,6.64-2.41,13.06-5.27,19.23-8.55,6.16,3.28,12.59,6.14,19.22,8.55,16.34,5.97,33.98,9.21,52.37,9.21,84.6,0,153.4-68.82,153.4-153.42C450.01,68.82,381.2,0,296.6,0ZM296.6,246.15h-.21c-6.62-.02-13.08-.72-19.3-2.09-20.8-4.44-39.02-15.89-52.08-31.76-3.81-4.61-7.19-9.61-10.05-14.92-7.09-13.1-11.11-28.08-11.11-43.99s4.02-30.89,11.11-43.99c-12-16.76-30.68-28.42-52.1-31.09-12.53,22.2-19.68,47.82-19.68,75.08s7.15,52.9,19.68,75.1c3.03,5.4,6.39,10.6,10.07,15.57-6.22,1.36-12.68,2.07-19.3,2.09h-.21c-51.13,0-92.75-41.6-92.75-92.75s41.62-92.73,92.75-92.73h.19c6.64.02,13.1.72,19.34,2.07,20.78,4.47,39,15.93,52.06,31.78,3.79,4.61,7.17,9.61,10.05,14.9,7.09,13.1,11.11,28.08,11.11,43.99s-4.02,30.89-11.11,43.99c12,16.76,30.68,28.44,52.1,31.11,12.53-22.2,19.68-47.84,19.68-75.1s-7.15-52.88-19.68-75.08c-3.03-5.4-6.39-10.62-10.09-15.58,6.24-1.35,12.7-2.05,19.34-2.07h.19c51.13,0,92.73,41.6,92.73,92.73s-41.6,92.75-92.73,92.75Z"
          />
        </svg>

        {/* Brand Name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            zerozero
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: '#31aeff',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Accounting
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          Precision. Clarity. Confidence.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
