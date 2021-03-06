//alert("1");

CfgAs={};
Ext.onReady(function(){

   CfgAs.source= {
            '_(name)': 'Properties Grid',
            grouping: false,
            autoFitColumns: true,
            productionQuality: false,
            created: new Date(Date.parse('10/15/2006')),
            startTime: '10:00 AM',
            tested: false,
            version: 0.01,            
            borderWidth: 1,
            cb:'wwe',
            testBool:true
   };

CfgAs.combo = new Ext.form.ComboBox({
    typeAhead: true,
    triggerAction: 'all',
    lazyRender:true,
    mode: 'local',
    store: new Ext.data.ArrayStore({
        id: 0,
        fields: [
            'myId',
            'displayText'
        ],
        data: [[1, 'item1'], [2, 'item2']]
    }),
    valueField: 'myId',
    displayField: 'displayText'
});


   CfgAs.custEditors={
        'startTime': new Ext.grid.GridEditor(new Ext.form.TimeField({selectOnFocus:true})),
        'cb': new Ext.grid.GridEditor(CfgAs.combo),
        'testBool': new Ext.grid.GridEditor(new Ext.form.Checkbox({}))
        
    };
    
   CfgAs.custRenderers={
     testBool:function (v) {   console.log('custRenderers testBool');
     	 if (v==true) return 'Да';
     	 else return 'Нет';
                           }
                       };       
    
   CfgAs.prNames= {
            tested: 'QA',
            borderWidth: 'Border Width'
        };    
   CfgAs.viewConf={
            forceFit: true,
            scrollOffset: 2 // the grid will never have scrollbars
        };     

CfgAs.propsGrid = new Ext.grid.PropertyGrid({
        //renderTo: 'prop-grid',
        width: 300,
        autoHeight: true,
        propertyNames:CfgAs.prNames,
        source: CfgAs.source,
        customEditors:CfgAs.custEditors,
        customRenderers:CfgAs.custRenderers,
        viewConfig :CfgAs.viewConf,
        nameText:'Наименование'
         
		});

CfgAs.cm=CfgAs.propsGrid.getColumnModel();

CfgAs.propsGrid.render('prop-grid');


        
// simulate updating the grid data via a button click
var btn=new Ext.Button({
        renderTo: 'button-container',
        text: 'Update source',
        handler: function(){
            propsGrid.setSource({
                '(name)': 'Property Grid',
                grouping: false,
                autoFitColumns: true,
                productionQuality: true,
                created: new Date(),
                tested: false,
                version: 0.8,
                borderWidth: 2
            });
        }
});        

});

