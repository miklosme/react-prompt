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
    question: {
      children?: ReactNode;
    };
    answer: {
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
