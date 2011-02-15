(function(appRoot) {
    registerNamespace("core");
    appRoot.core.registerNs = registerNamespace;


    function registerNamespace (namespace) {
        var names = namespace.split('.');
        var root = appRoot;

        for (var i = 0, namesCount = names.length, name; i < namesCount; ++i) {
            name = names[i];

            if (!(name in root)) {
                root[name] = {};
            }
            root = root[name];
        }
    }

})(window.w = {});
