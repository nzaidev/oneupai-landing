/**
 * Template URL mappings for Next.js rewrites
 * Add your template configurations here
 */

export interface TemplateConfig {
  name: string;
  url: string;
}

export const templates: TemplateConfig[] = [
  {
    name: "fractional-ai-website-template",
    url: "https://fractional.waiboom.com",
  },
  {
    name: "lawncare-ai-website-template",
    url: "https://lawncare.waiboom.com",
  },
  {
    name: "movers-ai-website-template",
    url: "https://moving.waiboom.com",
  },
  {
    name: "hvac-ai-website-template",
    url: "https://hvac.waiboom.com",
  },
  {
    name: "contractor-ai-website-template",
    url: "https://contractor-tmplate.vercel.app",
  },
  {
    name: "cleaning-ai-website-template",
    url: "https://master-template-nine.vercel.app",
  },
  // Add more templates here:
  // {
  //   name: "template-slug",
  //   url: "https://example.com",
  // },
];
