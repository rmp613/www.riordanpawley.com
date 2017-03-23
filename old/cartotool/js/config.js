require.config({
    paths: {
        "jquery": "libs/jquery-3.1.1.min",
        "cartodb": "http://libs.cartocdn.com/cartodb.js/v3/3.15/cartodb"
    },
    shim: {
        "jquery": "$"
    },
    waitSeconds: 15
});