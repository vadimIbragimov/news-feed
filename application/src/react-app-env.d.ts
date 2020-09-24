/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="@types/react-relay/hooks"/>

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module 'react-relay/hooks' {
  export * from '@types/react-relay/hooks';
  export const loadQuery: {
    loadQuery<TQuery extends OperationType, TEnvironmentProviderOptions = any>(
      environment: IEnvironment,
      preloadableRequest: PreloadableConcreteRequest<TQuery>,
      variables: TQuery['variables'],
      options?: PreloadOptions | null,
      environmentProviderOptions?: TEnvironmentProviderOptions | null,
    ): PreloadedQuery<TQuery, TEnvironmentProviderOptions>
    useTrackLoadQueryInRender(): void;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
