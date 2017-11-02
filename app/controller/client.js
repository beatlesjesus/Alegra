Ext.define('AM.controller.client', {
    extend: 'Ext.app.Controller',
    views: [
        'GrillaViewport',
        'UsuarioWindow'
    ],
    init: function() {
        this.control({
            'viewport > panel': {
                render: this.onPanelRendered
            }
        });
    },

    onPanelRendered: function() {
        console.log('The panel was rendered');
    }

});