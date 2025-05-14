export const typographyVariants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'caption'] as const;

export type TypographyVariant = typeof typographyVariants[number];