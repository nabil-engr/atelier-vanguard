import { Product } from './models';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mayfair Royal Drape',
    slug: 'mayfair-royal-drape',
    category: 'Suits',
    summary: 'Full-canvas two-piece suit with a soft structured shoulder.',
    description:
      'Hand-cut and finished by our master tailors with functional cuffs and a breathable full canvas.',
    fabric: 'Super 150s Merino Wool',
    origin: 'Biella, Italy',
    basePrice: 1650,
    currency: 'USD',
    featured: true,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEkEnh6KcCPtiQYE1yLla07wEoddNEv3V4BAfvKKYQEgnEBVl-M_Hs4sEBRzz2gNZiM3e0INq8NLxhRLQ5v2jgjKN9jXDNe9gjm4gbDjrFbhSlv2G4R8njxgEKMNuC1S7EvN99cHzGJH1Q15RjD9peZq82k0iziHQpzBE1-0fYPk4QjOLwt8Hw2GF1omeuGt5n9WvqOgk88nzv9pf2TcUcswTKVusSUggilMUPHv63xPrPJnU2TDWu',
  },
  {
    id: '2',
    name: 'Gulshan Dinner Jacket',
    slug: 'gulshan-dinner-jacket',
    category: 'Suits',
    summary: 'A precise evening silhouette with hand-finished silk details.',
    description: 'A black-tie staple cut for balance and comfort.',
    fabric: 'Wool & Silk Barathea',
    origin: 'Huddersfield, England',
    basePrice: 1480,
    currency: 'USD',
    featured: true,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABPCrrvVMaSV_jIdOvdlmwu8rtwCQz7AxFMotXUspQEewiVFvvrx2uje2P80Sx9-r6sHtfhIfFOVSaPKybjbH35MMmJ0Slrh-hgUuo34IQxvVXVnMrbeuDy1xxPeXVhF87drxC97aiV_X9d31tNyvqDVEAOTsQQT4YgVPD9anqFT0VLs_C1Ok1rc2_VmX7LlfvHNt_WMageaI6hvJdP-yN2M6SIRfztMVoh4gj1BvmL5tkNmcZ1pqj',
  },
  {
    id: '3',
    name: 'Jamdani Silk Dress',
    slug: 'jamdani-silk-dress',
    category: 'Dresses',
    summary: 'A modern occasion dress woven with heritage Jamdani motifs.',
    description: 'Pure silk, individually woven and shaped to your measurements.',
    fabric: 'Handloom Jamdani Silk',
    origin: 'Dhaka, Bangladesh',
    basePrice: 690,
    currency: 'USD',
    featured: true,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaS2yV_u-WrUsNTK_d_yE8YsJE3mqQ_FuLz0m1jRQdMm1QfiB_QyLsdgWVN_mVnBmL-LTVKa_hxJjlxWOCJxU_ol1XT-EEpwjxGxhzlgFNo2-bkjeCvb4BJruCyKEWTR1r6RkLQ-Be93WTvysUo18KQk_gQOeGqI8LWGZtBL9ATkX9FLb0PUe3QzA2DD7tHk4gUkJMJn8MmZboiLklU70-KK2uWbAqYs0JwwtXDpqPHe5-ayS7wvZz',
  },
  {
    id: '4',
    name: 'Egyptian Cotton Shirt',
    slug: 'egyptian-cotton-shirt',
    category: 'Shirts',
    summary: 'Clean, breathable and made for your exact posture.',
    description: 'Finished with mother-of-pearl buttons and hand-set sleeves.',
    fabric: 'Giza 87 Cotton',
    origin: 'Alexandria, Egypt',
    basePrice: 285,
    currency: 'USD',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBn_-xbDGh9rbCdt8r-4zFRr_3T1kdylHGFjQVREIcUdkdE4QK1NxtrSloBT5AFKT0Naxio2hYqzRyyaWchwa6ojzMbD4PofEfVpQDFITACjgY_Cq2nxEPA9gV4zaYsuiNLAFPnk1oP5ordsOV13Zod9K6olA3yMguS5Pzh0JnD3l5OAZyCeVDy36Leis92ebw8hbastepy-HHWdTCKttgxH-J7YmEV417p3I4ndRDZ0SWJi2MvdROg',
  },
  { id:'5',name:'Belgravia Sovereign Overcoat',slug:'belgravia-sovereign-overcoat',category:'Suits',summary:'A commanding cashmere and wool overcoat with hand-carved structure.',description:'Cut with a generous lapel and hand-set collar for elegant winter protection.',fabric:'Cashmere & Merino Wool',origin:'Biella, Italy',basePrice:2100,currency:'USD',featured:false,imageUrl:'https://lh3.googleusercontent.com/aida-public/AB6AXuCiEcCh09AKJTvsDjnPHtNqhFGPHgjjIhFx3CGy3NnM1TatvJ2RAj-0zlc1ycjv4xxcUyOb0xoCJVp-6oe_mVnck3M2cYHHJBTuq5Mehc9BjgPEJKjaThVRPGyDn8w5tGyu0bhDNcIosRA1-qpA7uQtRXApkAMHFerIJgeFfeR6eW1t_x687IzgeNadSEbVhD7F-hGHd-lC2dV1gS1ddvOv3Y1W8UOmq1fpo82xxDAAn2C8QJTHPf7h'},
  { id:'6',name:'Savile 6x2 Chalkstripe',slug:'savile-chalkstripe',category:'Suits',summary:'A decisive double-breasted silhouette in midnight chalkstripe.',description:'Six-button architectural drape balanced for modern movement.',fabric:'Fox Brothers Worsted Flannel',origin:'Somerset, England',basePrice:1780,currency:'USD',featured:false,imageUrl:'https://lh3.googleusercontent.com/aida-public/AB6AXuDEkEnh6KcCPtiQYE1yLla07wEoddNEv3V4BAfvKKYQEgnEBVl-M_Hs4sEBRzz2gNZiM3e0INq8NLxhRLQ5v2jgjKN9jXDNe9gjm4gbDjrFbhSlv2G4R8njxgEKMNuC1S7EvN99cHzGJH1Q15RjD9peZq82k0iziHQpzBE1-0fYPk4QjOLwt8Hw2GF1omeuGt5n9WvqOgk88nzv9pf2TcUcswTKVusSUggilMUPHv63xPrPJnU2TDWu'},
];
