'use client'

import { useEffect } from 'react'

type OrganizationProps = {
  name: string
  url: string
  logo: string
  sameAs: string[]
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion?: string
    postalCode: string
    addressCountry: string
  }
  contactPoint?: {
    telephone: string
    contactType: string
    email?: string
    areaServed?: string
  }[]
}

type WebsiteProps = {
  url: string
  name: string
  description: string
  publisher: {
    name: string
    logo: string
  }
}

type BreadcrumbProps = {
  items: {
    name: string
    item: string
  }[]
}

type EventProps = {
  name: string
  startDate: string
  endDate: string
  location: {
    name: string
    address: string
  }
  description: string
  image: string
  url: string
  organizer: {
    name: string
    url: string
  }
}

type NewsArticleProps = {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: {
    name: string
  }
  publisher: {
    name: string
    logo: string
  }
  url: string
  mainEntityOfPage: string
}

type FAQProps = {
  questions: {
    question: string
    answer: string
  }[]
}

export function OrganizationJsonLd({ name, url, logo, sameAs, address, contactPoint }: OrganizationProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name,
      url,
      logo,
      sameAs,
      ...(address && { address: {
        '@type': 'PostalAddress',
        ...address
      }}),
      ...(contactPoint && { contactPoint: contactPoint.map(point => ({
        '@type': 'ContactPoint',
        ...point
      }))})
    })
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [name, url, logo, sameAs, address, contactPoint])

  return null
}

export function WebsiteJsonLd({ url, name, description, publisher }: WebsiteProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url,
      name,
      description,
      publisher: {
        '@type': 'Organization',
        name: publisher.name,
        logo: publisher.logo
      }
    })
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [url, name, description, publisher])

  return null
}

export function BreadcrumbJsonLd({ items }: BreadcrumbProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.item
      }))
    })
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [items])

  return null
}

export function EventJsonLd({ name, startDate, endDate, location, description, image, url, organizer }: EventProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name,
      startDate,
      endDate,
      location: {
        '@type': 'Place',
        name: location.name,
        address: location.address
      },
      description,
      image,
      url,
      organizer: {
        '@type': 'Organization',
        name: organizer.name,
        url: organizer.url
      }
    })
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [name, startDate, endDate, location, description, image, url, organizer])

  return null
}

export function NewsArticleJsonLd({ headline, description, image, datePublished, dateModified, author, publisher, url, mainEntityOfPage }: NewsArticleProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline,
      description,
      image,
      datePublished,
      dateModified,
      author: {
        '@type': 'Person',
        name: author.name
      },
      publisher: {
        '@type': 'Organization',
        name: publisher.name,
        logo: {
          '@type': 'ImageObject',
          url: publisher.logo
        }
      },
      url,
      mainEntityOfPage
    })
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [headline, description, image, datePublished, dateModified, author, publisher, url, mainEntityOfPage])

  return null
}

export function FAQJsonLd({ questions }: FAQProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map(q => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    })
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [questions])

  return null
}
