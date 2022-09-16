import * as React from 'react'
import ReactReconciler from 'react-reconciler';

class Node {
  constructor({ type, props, root = false, text = null }) {
    this.type = type;
    this.props = props;
    this.root = root;
    this.text = text;
    this.children = [];
  }
  appendChild(child) {
    this.children.push(child);
  }
  removeChild(child) {
    this.children.splice(this.children.indexOf(child), 1);
  }
  insertBefore(child, beforeChild) {
    this.children.splice(this.children.indexOf(beforeChild), 0, child);
  }
}

const reconciler = ReactReconciler({
  createInstance(type, props) {
    const el = new Node({ type, props });
    // console.log(el)

    return el;
  },
  createTextInstance(text, rootContainerInstance) {
    return new Node({ text, props: null });
  },

  removeChild(container, child) {
    container.removeChild(child);
  },
  appendChild(container, child) {
    container.appendChild(child);
    // console.log('appended', container)
  },
  appendInitialChild(container, child) {
    container.appendChild(child);
    // console.log('appended', container)
  },
  appendChildToContainer: (container, child) => {
    container.appendChild(child);
    // console.log('appended', container)
  },

  insertBefore(parent, child, beforeChild) {
    parent.insertBefore(child, beforeChild);
  },
  insertInContainerBefore(container, child, beforeChild) {
    container.insertBefore(child, beforeChild);
  },

  supportsMutation: true,
  // isPrimaryRenderer: false,
  // supportsPersistence: false,
  // supportsHydration: false,
  // noTimeout: -1,

  removeChildFromContainer: (container, child) => {},
  getRootHostContext: (...args) => {
    // console.log('getRootHostContext', ...args);
    return {};
  },
  getChildHostContext: (parentHostContext) => parentHostContext,
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
  commitUpdate(instance, updatePayload, type, oldProps, newProps, fiber) {
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
  createReconciler: ({ models, resolve }) => {
    const root = new Node({ root: true });
    const self = {
      // feels like 2011 all over again
      async render(jsx) {
        const container = reconciler.createContainer(root, false, false);
        reconciler.updateContainer(jsx, container, null, null);
      },
      toString() {
        return '[prompt ReactPrompt]';
      },
      async send() {
        const payload = {
          prompt: self.toString(),
          model: 'whatever-model-001',
        };
        return await resolve(payload);
      },
    };

    return self;
  },
};

export default ReactPrompt;
