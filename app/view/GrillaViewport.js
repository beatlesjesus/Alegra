Ext.define('AM.view.GrillaViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.grillalist',
    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                    xtype: 'panel',
                    region: 'north',
                    id: 'color',
                    height: 120,
                    top: 180,
                    layout: {
                        type: 'border'
                    },
                    title: 'Buscador',
                    items: [{
                        xtype: 'form',
                        region: 'center',
                        buttons: [{
                                text: 'Buscar',
                                handler: function() {
                                    var form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        form.submit({
                                            method: 'POST',
                                            url: 'http://grupoinelecpro.com.ve/Alegra/public/application/cliente/search',
                                            waitTitle: "Por favor espere",
                                            waitMsg: 'Enviando datos  ...',
                                            success: function(form, action) {
                                                var msg = Ext.Msg.show({
                                                    title: 'Exito',
                                                    msg: 'Iniciando busqueda',
                                                    buttons: Ext.Msg.OK,
                                                    fn: function(key) {
                                                        form.reset();
                                                        var grid = me.down("gridpanel");
                                                        grid.getStore().load();
                                                        grid.getView().refresh();
                                                        me.show();
                                                        return;
                                                    },
                                                    icon: Ext.MessageBox.INFO
                                                });
                                                setTimeout(
                                                    function() {
                                                        msg.hide();
                                                        form.reset();
                                                        var grid = me.down("gridpanel");
                                                        grid.getStore().load();
                                                        grid.getView().refresh();
                                                        me.show();
                                                        return;
                                                    },
                                                    300
                                                );
                                                return;
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert('Fallo', 'Hay un error en el envio de datos');
                                                return;
                                            }
                                        });
                                    } else {
                                        Ext.Msg.alert('Fallo', 'Falta llenar datos en el formulario');
                                    }
                                    return;
                                }
                            },
                            {
                                text: 'Ver todo',
                                handler: function() {
                                    var form = this.up('form').getForm();
                                    form.reset();
                                    if (form.isValid()) {
                                        form.submit({
                                            method: 'POST',
                                            url: 'http://grupoinelecpro.com.ve/Alegra/public/application/cliente/search',
                                            waitTitle: "Por favor espere",
                                            waitMsg: 'Enviando datos  ...',
                                            success: function(form, action) {
                                                var msg = Ext.Msg.show({
                                                    title: 'Exito',
                                                    msg: 'Iniciando busqueda',
                                                    buttons: Ext.Msg.OK,
                                                    fn: function(key) {
                                                        form.reset();
                                                        var grid = me.down("gridpanel");
                                                        grid.getStore().load();
                                                        grid.getView().refresh();
                                                        me.show();
                                                        return;
                                                    },
                                                    icon: Ext.MessageBox.INFO
                                                });
                                                setTimeout(
                                                    function() {
                                                        msg.hide();
                                                        form.reset();
                                                        var grid = me.down("gridpanel");
                                                        grid.getStore().load();
                                                        grid.getView().refresh();
                                                        me.show();
                                                        return;
                                                    },
                                                    300
                                                );
                                                return;
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert('Fallo', 'Hay un error en el envio de datos');
                                                return;
                                            }
                                        });
                                    } else {
                                        Ext.Msg.alert('Fallo', 'Falta llenar datos en el formulario');
                                    }
                                    return;
                                }
                            },
                            {
                                text: 'Nuevo',
                                handler: function() {
                                    var usuario = new AM.view.UsuarioWindow();
                                    usuario.show();
                                }
                            },
                            {
                                text: 'Borrar',
                                handler: function() {
                                    Ext.Ajax.request({
                                        url: 'usuario/delete',
                                        method: 'post',
                                        params: {

                                        },
                                        success: function(response, opts) {
                                            var responseData = null;
                                            try { responseData = response['responseText']; } catch (ex) { responseData = ''; }
                                            var data = null;
                                            try { data = Ext.decode(responseData); } catch (ex) {}
                                            if (data != null) {
                                                Ext.Msg.alert("Mensaje", "Datos borrados");
                                                me.down("gridpanel").getStore().load();
                                                me.down("gridpanel").getView().refresh();
                                            } else {
                                                Ext.Msg.alert("Error", "Hubo un error en el proceso");
                                            }
                                            return;
                                        }
                                    });
                                }
                            }
                        ],
                        frame: true,
                        layout: {
                            type: 'column'
                        },
                        bodyPadding: 10,
                        title: '',
                        items: [{
                                xtype: 'textfield',
                                columnWidth: 0.5,
                                padding: 5,
                                fieldLabel: 'Nombre',
                                name: 'nombre'
                            },
                            {
                                xtype: 'textfield',
                                columnWidth: 0.5,
                                padding: 5,
                                fieldLabel: 'Apellidos',
                                name: 'apellidos'
                            }
                        ]
                    }]
                },
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    title: 'Clientes',
                    id: 'gridpanel',
                    columns: [{
                            xtype: 'gridcolumn',
                            hidden: true,
                            dataIndex: 'id',
                            text: 'id',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'Nombre',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'identification',
                            text: 'Identificación',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'phonePrimary',
                            text: 'Teléfono 1',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'observations',
                            text: 'Observaciones',
                            flex: 1
                        }
                    ],
                    listeners: {
                        'cellclick': function(grid, td, cellIndex, record, tr, rowIndex, event, object) {
                            var id = record.get('id');
                            Ext.Ajax.request({
                                url: 'usuario/select',
                                method: 'post',
                                params: {
                                    'id': id
                                },
                                success: function(response, opts) {
                                    var responseData = null;
                                    try { responseData = response['responseText']; } catch (ex) { responseData = ''; }
                                    var data = null;
                                    try { data = Ext.decode(responseData); } catch (ex) {}
                                    if (data != null) {

                                    } else {
                                        Ext.Msg.alert("Error", "Hubo un error en el proceso");
                                    }
                                    return;
                                }
                            });
                            return;
                        }
                    },
                    store: Ext.create(
                        'Ext.data.Store', {
                            remoteSort: true,
                            pageSize: 200,
                            fields: [
                                'id',
                                'name',
                                'identification',
                                'phonePrimary',
                                'observations'
                            ],
                            proxy: {
                                type: 'ajax',
                                url: 'http://grupoinelecpro.com.ve/Alegra/public/application/cliente/select',
                                reader: {
                                    root: 'items',
                                    totalProperty: 'totalCount'
                                }
                            },
                            autoLoad: false
                        }
                    ),


                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
        afterrender: function(cmp) {
            var grid = this.down('gridpanel');
            grid.getStore().load();
            grid.getView().refresh();
            return;
        },
        activate: function(cmp) {
            var grid = this.down('gridpanel');
            grid.getStore().load();
            grid.getView().refresh();
            return;
        }
    }

});