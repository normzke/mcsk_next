'use client'

import { OrganizationJsonLd, WebsiteJsonLd } from './JsonLd'

export function SiteStructuredData() {
  return (
    <>
      {/* Structured Data for Organization */}
      <OrganizationJsonLd 
        name="Music Copyright Society of Kenya"
        url="https://mcsk.or.ke"
        logo="https://mcsk.or.ke/images/logo.png"
        sameAs={[
          "https://www.facebook.com/mcskkenya",
          "https://twitter.com/mcsk_kenya",
          "https://www.instagram.com/mcsk_kenya/",
          "https://www.linkedin.com/company/music-copyright-society-of-kenya/"
        ]}
        address={{
          streetAddress: "Musa House, Grevillea Grove, Westlands",
          addressLocality: "Nairobi",
          postalCode: "00100",
          addressCountry: "Kenya"
        }}
        contactPoint={[
          {
            telephone: "+254 20 2375439/40",
            contactType: "customer service",
            email: "info@mcsk.or.ke",
            areaServed: "Kenya"
          }
        ]}
      />
      
      {/* Structured Data for Website */}
      <WebsiteJsonLd
        url="https://mcsk.or.ke"
        name="Music Copyright Society of Kenya"
        description="The Music Copyright Society of Kenya (MCSK) is a collective management organization that protects the rights of music creators and publishers in Kenya."
        publisher={{
          name: "Music Copyright Society of Kenya",
          logo: "https://mcsk.or.ke/images/logo.png"
        }}
      />
    </>
  )
}
