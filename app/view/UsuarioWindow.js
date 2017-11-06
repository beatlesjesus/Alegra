Ext.define('AM.view.UsuarioWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.userwindows',
    modal: true,

    autoShow: true,
    height: 320,
    width: 400,

    closeAction: 'hide',
    title: 'Usuario',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                region: 'center',
                buttons: [{
                        text: 'Guardar',
                        handler: function() {
                            var form = this.up('form').getForm();
                            var grid = Ext.getCmp('gridpanel');
                            if (form.isValid()) {
                                form.submit({
                                    method: 'POST',
                                    url: 'http://grupoinelecpro.com.ve/Alegra/public/application/cliente/seave',
                                    waitTitle: "Por favor espere",
                                    waitMsg: 'Enviando datos  ...',
                                    success: function(form, action) {
                                        var data = action.response.responseText;
                                        var response = Ext.decode(data);
                                        if (response['success'] == 'true') {
                                            var msg = Ext.Msg.show({
                                                title: 'Exito',
                                                msg: 'Iniciando guardado',
                                                buttons: Ext.Msg.OK,
                                                fn: function(key) {
                                                    form.reset();
                                                    me.hide();

                                                    grid.getStore().load();
                                                    grid.getView().refresh();
                                                    return;
                                                },
                                                icon: Ext.MessageBox.INFO
                                            });
                                            setTimeout(
                                                function() {
                                                    form.reset();
                                                    me.hide();
                                                    msg.hide();
                                                    grid.getStore().load();
                                                    grid.getView().refresh();
                                                    return;
                                                },
                                                300
                                            );
                                        } else {
                                            Ext.Msg.alert('Fallo', 'Datos no guardados');
                                            grid.getStore().load();
                                            grid.getView().refresh();
                                        }
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
                        text: 'Cancelar',
                        handler: function() {
                            var form = this.up('form').getForm();
                            form.reset();
                            me.hide();
                            var grid = Ext.getCmp('gridpanel');
                            grid.getStore().load();
                            grid.getView().refresh();
                            return;
                        }
                    }
                ],
                frame: true,
                bodyPadding: 10,
                title: '',
                items: [{
                        xtype: 'textfield',
                        anchor: '100%',
                        fieldLabel: 'Identification',
                        name: 'identificacion',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        anchor: '100%',
                        fieldLabel: 'Nombre',
                        name: 'nombre'
                    },
                    {
                        xtype: 'textfield',
                        anchor: '100%',
                        fieldLabel: 'Apellidos',
                        name: 'apellidos'
                    },
                    {
                        xtype: 'numberfield',
                        anchor: '100%',
                        fieldLabel: 'Telefono',
                        name: 'telefono',
                        hideTrigger: true
                    },
                    {
                        xtype: 'numberfield',
                        anchor: '100%',
                        fieldLabel: 'Celular',
                        name: 'celular',
                        hideTrigger: true
                    },
                    {
                        xtype: 'textareafield',
                        anchor: '100%',
                        name: 'descripcion',
                        fieldLabel: 'Descripcion'
                    }
                ]
            }]
        });

        me.callParent(arguments);
    }

});