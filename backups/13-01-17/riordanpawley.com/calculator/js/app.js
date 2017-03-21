requirejs.config({
    "baseUrl": "js/libs",
    paths: {
        "tether": "tether.min",
        "bootstrap": "bootstrap.min",
        "app": "../app",
        "jquery": "jquery"
    },
    shim: {
        "bootstrap": ["jquery"]
    }
});
requirejs(['app/main', 'bootstrap']);
requirejs(['tether'], function(Tether) {
    window.Tether = Tether;
});