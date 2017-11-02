Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    views: [
        'GrillaViewport',
        'UsuarioWindow'
    ],
    autoCreateViewport: true,
    name: 'AM',
    appFolder: '/Proyecto Alegra/app',

});