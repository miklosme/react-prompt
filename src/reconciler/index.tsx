import ReactReconciler from 'react-reconciler';

class Node {
  constructor({ text }) {
    this.text = text;
    this.foo = 42;
  }
}

const reconciler = ReactReconciler({
  createInstance(type, props) {
    const el = new Node({});

    return el;
  },
  createTextInstance(text, rootContainerInstance) {
    return new Node({ text });
  },

  removeChild(container, child) {
    // container.removeChild(child);
  },
  appendChild(container, child) {
    // container.appendChild(child);
  },
  appendInitialChild(container, child) {
    // container.appendChild(child);
  },
  appendChildToContainer: (container, child) => {
    // container.appendChild(child);
  },

  insertBefore(parent, child, before) {
    // parent.insertBefore(child, before);
  },
  insertInContainerBefore(container, child, beforeChild) {
    // container.insertBefore(child, beforeChild);
  },

  supportsMutation: false,
  // isPrimaryRenderer: false,
  // supportsPersistence: false,
  // supportsHydration: false,
  // noTimeout: -1,

  removeChildFromContainer: (container, child) => {},
  getRootHostContext: (...args) => {
    console.log('getRootHostContext', ...args);
    return {};
  },
  getChildHostContext: parentHostContext => parentHostContext,
  finalizeInitialChildren(instance) {},

  prepareUpdate(instance, _type, oldProps, newProps) {
    // const payload = {};

    // ['className', 'src', 'alt', 'href', 'target', 'rel'].forEach(attr => {
    //   if (oldProps[attr] !== newProps[attr]) {
    //     payload[attr] = newProps[attr];
    //   }
    // });

    // if (oldProps.onClick !== newProps.onClick) {
    //   payload.onClick = newProps.onClick;
    // }

    // if (oldProps.bgColor !== newProps.bgColor) {
    //   payload.newBgColor = newProps.bgColor;
    // }

    // return payload;
  },
  commitUpdate(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    fiber,
  ) {
    // ['className', 'src', 'alt', 'href', 'target', 'rel'].forEach(attr => {
    //   if (updatePayload[attr]) {
    //     instance[attr] = updatePayload[attr];
    //   }
    // });

    // if (updatePayload.onClick) {
    //   instance.removeEventListener('click', oldProps.onClick);
    //   instance.addEventListener('click', updatePayload.onClick);
    // }

    // if (updatePayload.newBgColor) {
    //   instance.style.backgroundColor = updatePayload.newBgColor;
    // }
  },

  // commitMount(instance, _type, _props, _int) {},
  // getPublicInstance: instance => instance,
  prepareForCommit: () => null,
  // preparePortalMount: container => {},
  resetAfterCommit: () => {},
  shouldSetTextContent: () => false,
  clearContainer: () => false,
  // hideInstance(instance) {},
  // unhideInstance(instance, props) {},
  // hideTextInstance() {},
  // unhideTextInstance() {},
  // getCurrentEventPriority: () => {},
  // beforeActiveInstanceBlur: () => {},
  // afterActiveInstanceBlur: () => {},
  detachDeletedInstance: () => {},
  // now: performance.now,
  // scheduleTimeout: setTimeout,
  // cancelTimeout: clearTimeout,
});

const ReactPrompt = {
  createReconciler: ({ models, resolve }) => ({
    render(jsx) {
      const container = reconciler.createContainer(target, false, false);
      reconciler.updateContainer(jsx, container, null, null);
      debugger;
    },
  }),
};

export default ReactPrompt;
