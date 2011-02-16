(function(app) {
    app.core.registerNs('core.observer');
    app.core.observer = function() {
        var events = {};

        return {
            register: function(name) {
                registerEvents(name, false);
            },

            registerOneTime: function(name) {
                registerEvents(name, true);
            },

            listen: function(name, callback) {
                validateEvent(name, "Trying to listen for nonregistered event '" + name + "'");

                events[name].listeners.push(callback);

                return (function(name, id) {
                    triggerCallbackForFiredOneTimeEvent(name, id)

                    return {
                        unsubscribe: function() {
                            stopListening(name, id);
                        }
                    };
                })(name, events[name].listeners.length - 1);
            },

            fire: fireEvent
        };

        function validateEvent(name, errorMessage) {
            if (!isRegistered(name)) {
                throw new Error(errorMessage || "Event '" + name + "' is not registered");
            }
        }

        function registerEvents(name, oneTime) {
            registerEvent(name, oneTime);
            registerParentEvents(name, oneTime);
        }

        function registerEvent(name, oneTime) {
            events[name] = {
                listeners: [],
                oneTime: oneTime,
                fired: false,
                data: null
            };
        }

        function registerParentEvents(name, oneTime) {
            for (var parentEventName = name; parentEventName = getParentEventName(parentEventName);) {
                if (!isRegistered(parentEventName)) {
                    registerEvent(parentEventName, oneTime);
                }
            }
        }

        function fireEvent(name, data) {
            validateEvent(name, "Trying to fire nonregistered event '" + name + "'");

            storeData(name, data);

            for (var id = 0, count = events[name].listeners.length; id < count; ++id) {
                runCallback(name, id, data);
            }

            fireParentEvent(name, data);
        }

        function fireParentEvent(name, data) {
            var parentEventName = getParentEventName(name);

            if (parentEventName) {
                fireEvent(parentEventName, data);
            }
        }

        function getParentEventName(name) {
            if (name.indexOf('.') != -1) {
                return name.split('.').slice(0, -1).join('.');
            }

            return false;
        }

        function triggerCallbackForFiredOneTimeEvent(name, id) {
            if (events[name].fired) {
                setTimeout(function() {
                    runCallback(name, id, events[name].data);
                }, 1);
            }
        }

        function isRegistered(name) {
            return name in events;
        }

        function runCallback(name, id, data) {
            if (typeof events[name].listeners[id] == 'function') {
                events[name].listeners[id].call(this, data);

                if (events[name].oneTime) {
                    stopListening(name, id);
                }
            }
        }

        function stopListening(name, id) {
            events[name].listeners[id] = null;
        }

        function storeData(name, data) {
            events[name].data = data;
            events[name].fired = true;
        }

    };
})(w);