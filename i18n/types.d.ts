interface InternationalizedStrings {
  tagline: string;
}

declare module '*.yml' {
  const strings: InternationalizedStrings;
  export default strings;
}
