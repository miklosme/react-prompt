export function createReconciler(config: ReconcilerConfig) {
  return new ReconcilerInstance(config);
}

class ReconcilerInstance {
  config: ReconcilerConfig;
  element: JSX.Element | null;

  constructor(config: ReconcilerConfig) {
    this.config = config;
    this.element = null;
  }

  render(element: JSX.Element): ReconcilerInstance {
    if (this.element) {
      throw new Error('Already rendered');
    }

    this.element = element;

    return this;
  }

  async send() {
    const result = await this.config.resolve(this.toString(), this.config);
    return result;
  }

  toString(): string {
    return renderToString(this.element);
  }
}

function renderToString(element: JSX.Element | null): string {
  //   throw new Error('Not implemented');
  return '[prompt placeholder]';
}

interface ReconcilerConfig {
  models: {
    [key: string]: {
      description: string;
      capability: 'low' | 'medium' | 'high';
    };
  };
  resolve: (prompt: string, config: ReconcilerConfig) => Promise<string>;
}
