// example: https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/three-types.ts
// read: https://www.typescriptlang.org/docs/handbook/jsx.html
// https://github.com/pmndrs/react-three-fiber/blob/master/docs/tutorials/typescript.mdx


declare namespace JSX {
  // @ts-ignore
  import { ReactNode, Ref } from 'react';
  // import template, {
  //   TemplateBuilderOptions,
  //   PublicReplacements
  //   // @ts-ignore
  // } from '@babel/template';
  // @ts-ignore
  // import { Path } from '..';

  interface IntrinsicElements {
    model: {
      capability: 'low' | 'medium' | 'high';
      temperature: number;
      children?: ReactNode;
    };
    instruction: {
      label?: string;
      children?: ReactNode;
    };
    output: {
      label?: string;
      children?: ReactNode;
    };
    list: {
      label?: string;
      children?: ReactNode;
    };
    bot: {
      label?: string;
      children?: ReactNode;
    };
    human: {
      label?: string;
      children?: ReactNode;
    };
    input: {
      label?: string;
      children?: ReactNode;
    };
    template: {
      label?: string;
      children?: ReactNode;
    };

    // Ast: {
    //   ref?: Ref<any>;
    // };
    // Expression: {
    //   ref?: Ref<any>;
    // };
    // File: {
    //   ref?: Ref<any>;
    //   children?: ReactNode;
    // };
    // Program: {
    //   ref?: Ref<any>;
    // };
    // Smart: {
    //   bodyPath?: Path;
    //   children?: ReactNode;
    //   code: string;
    //   options?: TemplateBuilderOptions;
    //   parentBodyPath?: Path;
    //   ref?: Ref<any>;
    //   replacements?: PublicReplacements;
    //   scopePath?: Path;
    // };
  }
}
