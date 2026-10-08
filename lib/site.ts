export const site = {
  name: 'O-Bee',
  operator: 'Ouransoft Group',
  email: 'contact@ors.vn',
  website: 'https://ors.vn',
  consultationSubject: 'Tư vấn triển khai O-Bee',
} as const;

export const consultationHref = `mailto:${site.email}?subject=${encodeURIComponent(site.consultationSubject)}`;

export const supportHref = `mailto:${site.email}?subject=${encodeURIComponent('Hỗ trợ sử dụng O-Bee')}`;

export const privacyHref = `mailto:${site.email}?subject=${encodeURIComponent('Yêu cầu về dữ liệu cá nhân trên O-Bee')}`;
