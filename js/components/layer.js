(function(app) {
    app.core.registerNs('components.layer')
    app.components.layer = function() {
        return {
            getDomNode: function() {
                return document.createElement("div");
            }
        };
    };
})(w);