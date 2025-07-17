'use client'

export default function SimplePage() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        Music Copyright Society of Kenya
      </h1>
      <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
        Welcome to MCSK - Kenya's premier collective management organization for musical works, 
        protecting and promoting the rights of composers, authors, and publishers.
      </p>
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
          Our Services
        </h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Music Copyright Protection</li>
          <li style={{ marginBottom: '10px' }}>Royalty Collection and Distribution</li>
          <li style={{ marginBottom: '10px' }}>Music Licensing for Businesses</li>
          <li style={{ marginBottom: '10px' }}>Member Support and Education</li>
        </ul>
      </div>
    </div>
  )
}
