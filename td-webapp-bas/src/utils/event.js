const EventManager = {
  guid: 1,
  /**
   * 事件处理-添加事件
   * 参数：
   * element：html元素
   * type：事件类型
   * handler：事件处理回调
   * 说明：
   * written by Dean Edwards, 2005
   * with input from Tino Zijdel, Matthias Miller, Diego Perini
   * http://dean.edwards.name/weblog/2005/10/add-event/
   */
  addEvent(el, type, h) {
    const handler = h;
    const element = el;
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else {
      // assign each event handler a unique ID
      if (!handler.$$guid) handler.$$guid = this.guid++;
      // create a hash table of event types for the element
      if (!element.events) element.events = {};
      // create a hash table of event handlers for each element/event pair
      let handlers = element.events[type];
      if (!handlers) {
        handlers = element.events[type] = {};
        // store the existing event handler (if there is one)
        if (element[`on${type}`]) {
          handlers[0] = element[`on${type}`];
        }
      }
      // store the event handler in the hash table
      handlers[handler.$$guid] = handler;
      // assign a global event handler to do all the work
      element[`on${type}`] = this.handleEvent;
    }
  },
  /**
   * 事件处理-移除事件
   * 参数：
   * element：html元素
   * type：事件类型
   * handler：事件处理回调
   * 说明：
   * written by Dean Edwards, 2005
   * with input from Tino Zijdel, Matthias Miller, Diego Perini
   * http://dean.edwards.name/weblog/2005/10/add-event/
   */
  removeEvent(el, type, handler) {
    const element = el;
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else {
      // delete the event handler from the hash table
      if (element.events && element.events[type]) {
        delete element.events[type][handler.$$guid];
      }
    }
  },
  handleEvent(e) {
    let event = e;
    let returnValue = true;
    // grab the event object (IE uses a global event object)
    event = event || ((eve) => {
      const ev = eve;
      // add W3C standard event methods
      ev.preventDefault = function () {
        this.returnValue = false;
      };
      ev.stopPropagation = function () {
        this.cancelBubble = true;
      };
      return ev;
    })(((this.ownerDocument || this.document || this).parentWindow || window).event);
    // get a reference to the hash table of event handlers
    const handlers = this.events[event.type];
    // execute each event handler
    for (const i in handlers) {
      if (handlers[i]) {
        this.$$handleEvent = handlers[i];
        if (this.$$handleEvent(event) === false) {
          returnValue = false;
        }
      }
    }
    return returnValue;
  },
};

export default EventManager;
