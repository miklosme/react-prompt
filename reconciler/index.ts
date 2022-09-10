export function createReconciler(config: ReconcilerConfig) {
  return {
    render: (element: ReactElement) => {
      return new ReconcilerInstance(config, element);
    },
  };
}

class ReconcilerInstance {
  constructor(config: ReconcilerConfig, element: ReactElement) {
    this.config = config;
    this.element = element;
  }

  async send() {
    const result = await this.config.resolve(this.toString(), this.config);
    return result;
  }

  toString() {
    return renderToString(this.element);
  }
}

function renderToString(element: ReactElement) {
  throw new Error("Not implemented");
}

interface ReconcilerConfig<T> {
  models: {
    [key: string]: {
      description: string;
      capability: "low" | "medium" | "high";
    };
  };
  resolve: (prompt: string, config: ReconcilerConfig) => Promise<T>;
}

interface ReactElement {
  type: string;
  props: {
    [key: string]: any;
  };
}
