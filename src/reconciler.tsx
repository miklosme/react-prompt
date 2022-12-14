import * as React from 'react';
import ReactReconciler from 'react-reconciler';
import { DefaultEventPriority, ConcurrentRoot } from 'react-reconciler/constants.js';
import act from './act';

const REACT_INTERNAL_PROPS = ['ref', 'key', 'children'];
function getInstanceProps(props: ReactReconciler.Fiber['pendingProps']) {
  const instanceProps = {};

  for (const key in props) {
    if (!REACT_INTERNAL_PROPS.includes(key)) instanceProps[key] = props[key];
  }

  return instanceProps;
}

const hostConfig = {
  createInstance: (type, props) => ({ type, props: getInstanceProps(props), children: [] }),
  createTextInstance: (value) => ({ type: 'text', props: { value }, children: [] }),

  appendInitialChild: (parent, child) => parent.children.push(child),
  appendChild: (parent, child) => parent.children.push(child),
  appendChildToContainer: (container, child) => (container.head = child),
  insertBefore: (parent, child, beforeChild) => parent.children.splice(parent.children.indexOf(beforeChild), 0, child),
  removeChild: (parent, child) => parent.children.splice(parent.children.indexOf(child), 1),
  removeChildFromContainer: (container) => (container.head = null),

  supportsMutation: true,
  // isPrimaryRenderer: false,
  // supportsPersistence: false,
  // supportsHydration: false,
  // noTimeout: -1,

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
  commitUpdate: (instance, _, __, ___, props) => (instance.props = getInstanceProps(props)),

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
  getCurrentEventPriority: () => DefaultEventPriority,
  // beforeActiveInstanceBlur: () => {},
  // afterActiveInstanceBlur: () => {},
  detachDeletedInstance: () => {},
  // now: performance.now,
  // scheduleTimeout: setTimeout,
  // cancelTimeout: clearTimeout,
};

class ReactPrompt {
  constructor({ models, resolve }) {
    this.models = models;
    this.resolve = resolve;
    this.reconciler = ReactReconciler(hostConfig);
    this.container = { head: null };
    this.root = this.reconciler.createContainer(
      this.container,
      ConcurrentRoot,
      null,
      false,
      null,
      '',
      console.error,
      null,
    );

    // TODO
    // this.queue = [];
  }

  render = async (element: React.ReactNode) => {
    const result = await act(async () => {
      this.reconciler.updateContainer(element, this.root, null, undefined);
      return this;
    });

    return result;
  }

  toString = () => {
    if (this.container.head === null) throw new Error('No head element found');
    return JSON.stringify(this.container, null, 2);
  }

  send = async () => {
    const payload = {
      prompt: this.toString(),
      model: 'whatever-model-001',
    };
    return await this.resolve(payload);
  }
}

export function createReconciler(config) {
  return new ReactPrompt(config);
}
