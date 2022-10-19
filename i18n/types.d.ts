interface InternationalizedStrings {
  tagline: string;
  [name: string]: string;
}

declare module '*.yml' {
  const strings: InternationalizedStrings;
  export default strings;
}
