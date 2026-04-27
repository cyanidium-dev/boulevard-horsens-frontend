export const SERVICES_QUERY = `*[_type == "service"] | order(_createdAt asc){
  _id,
  title,
  "slug": slug.current,
  description,
  "homePageImage": homePageImage{
    ...,
    "alt": alt
  },
  "servicesPageImageMobile": servicesPageImageMobile{
    ...,
    "alt": alt
  },
  "servicesPageImageDesktop": servicesPageImageDesktop{
    ...,
    "alt": alt
  },
  button{
    label,
    url
  },
  desktopImageSide
}`;

export const WORKING_HOURS_QUERY = `*[_type == "workingHours"][0]{
  _id,
  title,
  from,
  to
}`;

export const RESULTS_QUERY = `*[_type == "results"][0]{
  _id,
  title,
  cards[]{
    _type,
    _key,
    image{
      ...,
      "alt": alt,
      "dimensions": asset->metadata.dimensions
    },
    beforeImage{
      ...,
      "alt": alt
    },
    afterImage{
      ...,
      "alt": alt
    }
  }
}`;

export const GIFT_CARDS_QUERY = `*[_type == "giftCard"] | order(order asc){
  _id,
  amount,
  description,
  "image": image{
    ...,
    "alt": alt
  },
  popular,
  primary,
  stripeCheckoutUrl,
  stripePriceId,
  order
}`;

export const TEAM_MEMBERS_QUERY = `*[_type == "teamMember"] | order(order asc){
  _id,
  order,
  name,
  position,
  "photo": photo{
    ...,
    "alt": alt
  }
}`;

export const HOME_FAQ_QUERY = `*[_type == "homeFaq"][0]{
  _id,
  title,
  "faq": faqSection{
    ...,
    items[]{
      ...
    }
  }
}`;

export const SERVICES_FAQ_QUERY = `*[_type == "servicesFaq"][0]{
  _id,
  title,
  "faq": faqSection{
    ...,
    items[]{
      ...
    }
  }
}`;

export const HOME_PAGE_SEO_QUERY = `*[_type == "homePageSeo"][0]{
  "seo": seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const SERVICES_PAGE_SEO_QUERY = `*[_type == "servicesPageSeo"][0]{
  "seo": seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const ALL_BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(_createdAt desc){
  "createdAt": _createdAt,
  "updatedAt": _updatedAt,
  heroTitle,
  heroDescription,
  "heroDesktopImage": heroDesktopImage{
    ...,
    "alt": alt
  },
  "heroMobileImage": heroMobileImage{
    ...,
    "alt": alt
  },
  "slug": slug.current,
  content[]{
    ...,
    _type == "block" => {
      ...,
      children[]{
        ...,
        marks[]
      }
    },
    _type == "image" => {
      _key,
      _type,
      asset,
      crop,
      hotspot,
      alt
    },
    _type == "table" => {
      _key,
      _type,
      rows[]{
        cells[]
      }
    },
    markDefs[]{
      ...,
      _type == "link" => {
        _key,
        _type,
        href,
        blank
      }
    }
  },
  faq{
    _type,
    "type": _type,
    description,
    items[]{
      _key,
      question,
      answer,
      buttons
    }
  },
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[
  _type == "blogPost" &&
  slug.current == $slug
][0]{
  "createdAt": _createdAt,
  "updatedAt": _updatedAt,
  heroTitle,
  heroDescription,
  "heroDesktopImage": heroDesktopImage{
    ...,
    "alt": alt
  },
  "heroMobileImage": heroMobileImage{
    ...,
    "alt": alt
  },
  "slug": slug.current,
  content[]{
    ...,
    _type == "block" => {
      ...,
      children[]{
        ...,
        marks[]
      }
    },
    _type == "image" => {
      _key,
      _type,
      asset,
      crop,
      hotspot,
      alt
    },
    _type == "table" => {
      _key,
      _type,
      rows[]{
        cells[]
      }
    },
    markDefs[]{
      ...,
      _type == "link" => {
        _key,
        _type,
        href,
        blank
      }
    }
  },
  faq{
    _type,
    "type": _type,
    description,
    items[]{
      _key,
      question,
      answer,
      buttons
    }
  },
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;
