function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}
const hasObserverCfg = (value) => typeof value == 'object' && value instanceof Object;
const isValidProperty = (value) => hasAnObserverFn(value) || value instanceof Function;
const hasAnObserverFn = (value) => value instanceof Object && ('type','observer') in value;
const isPrimitive = (test) => test !== Object(test)

const dashToCamelCase = (name) => name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());

const proxyHandler = {
  set (target, prop, value) {
    const oldVal = target[prop];
    Reflect.set(target, prop, value);
    onChange(target, prop, oldVal, value);
    return true;
  }
};

class base {}
export const ObservableMixin = (base) => class extends base {

  constructor() {
    super();
    this._initProps();
  }

  _initProps() {
    const Class = this.constructor;
    const proto = Class.prototype;
    for (let [key, entry] of entries(Class.props || {})) {
      let params = { obj: proto, key };
      if (!(key in proto)) {
        if (hasObserverCfg(entry)) {
          if ('value' in entry) {
            params.initialValue = entry;
          }
          if (hasAnObserverFn(entry)) {
            let value = entry.type();
            if (!isPrimitive(value)) {
              let proxy = new Proxy(value, proxyHandler);
              params.proxy = proxy;
              params.cb = entry.observer;
            }
          }
        }
        this._defineObjectProperty(params);
      }
    }
  }

  _defineObjectProperty({obj, key, initialValue, cb, proxy}) {
    let cfg = {
      configurable: true,
      get() {
        let innerKey = `_${key}`;
        if (initialValue && !this[innerKey]) {
          let ret = initialValue.value();
          this[innerKey] = ret;
          return ret;
        }
        return this[innerKey];
      },
      set(value) {
        let innerKey = `_${key}`;
        if (this[innerKey] !== value) {
          this[innerKey] = proxy && value ? new Proxy(value, {}) : value;
          if (cb) {
            cb.call(this, this[innerKey]);
          }
        }
      }
    };
    Object.defineProperty(obj, key, cfg);
  }
}
