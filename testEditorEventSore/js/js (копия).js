//alert("1");

/*
Типы:
Число - 1
Цвет - 2
Строка - 3
Логика - 4
*/

Ext.onReady(function(){
Ext.QuickTips.init();
var store = new Ext.data.JsonStore({
    // store configs
    autoDestroy: true,
    autoLoad:false,
    root:'results',	
    data:[	
{name:"name1",price:80,isReady:true},
{name:"name2",price:70,isReady:true},
{name:"name3",price:60,isReady:true},
{name:"name4",price:20,isReady:true}
],
    idPeoperty:'name',
    totalProperty:'total',
    storeId: 'myStore',
    // reader configs
    idIndex: 0,  
    fields: ['name','price','isReady']
});

var sD={results:[
{name:"name1",price:80,isReady:true},
{name:"name2",price:70,isReady:true},
{name:"name3",price:60,isReady:true},
{name:"name4",price:20,isReady:true}
],total:4};
//store.loadData(sD);



var myData=[
 ['3m Co',71.72, true,'15.01.2018',0,''],
 ['Intel',23.45, true,'30.06.2016',0,''],
 ['Apple',78.56, true,'08.09.2012',0,''],
 ['Google',81.74, true,'24.10.2011',0,''],
 ['varBool',0, false,'24.10.2011',4,'true']
 
];

//store.loadData(myData);

 var cm = new Ext.grid.ColumnModel({
        // specify any defaults for each column
        defaults: {
            sortable: true // columns are not sortable by default           
        },
        columns:[{
                id       :'company',
                header   : 'Company', 
                width    : 160, 
                sortable : true, 
                dataIndex: 'company'
            },
            {
                header   : 'Price', 
                width    : 75, 
                sortable : true, 
                renderer : 'usMoney', 
                dataIndex: 'price'
            },
            {   xtype: 'checkcolumn',
                header   : 'Готов?', 
                dataIndex: 'isRedy',
                width    : 75
            },

            {
                header   : 'Дата', 
                width    : 85, 
                sortable : true, 
                renderer : Ext.util.Format.dateRenderer('d.m.Y'), 
                dataIndex: 'd'
            },
            {
               header:'Тип',
               width: 50,
               dataIndex:'type'            
            
            },
            {
               header:'Variant',
               width: 50,
               dataIndex:'var',
               renderer:varRenderer            
            
            }
        ]
});      

var grid = new Ext.grid.EditorGridPanel({
        store: store,
        clicksToEdit: 1,
        cm:cm,
        stripeRows: true,
        autoExpandColumn: 'company',
        height: 350,
        width: 600,
        title: 'Array Grid',
        // config options for stateful behavior
        stateful: true,
        stateId: 'grid'
});

    // render the grid to the specified div in the page
    grid.render('ext-grid');

 
 
var combo = new Ext.form.ComboBox({
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


   var custEditors={
        'startTime': new Ext.grid.GridEditor(new Ext.form.TimeField({selectOnFocus:true})),
        'cb': new Ext.grid.GridEditor(combo),
        'testBool': new Ext.grid.GridEditor(new Ext.form.Checkbox({}))
        
    };
    
   var custRenderers={
     testBool:function (v) {   console.log('custRenderers testBool');
     	 if (v==true) return 'Да';
     	 else return 'Нет';
                           }
                       };

  function varRenderer (value, metaData, record, rowIndex, colIndex, store) {
  	  var type=record.get('type');
  	  if (type==4) {
  	  	  metaData.css += ' x-grid3-check-col-td';
  	  	  //if (value=='true') metaData.css += '_on';
  	  	  return String.format('<div class="x-grid3-check-col{0}">&#160;</div>', value=='true' ? '-on' : '');
  	  }	
  	  return value;
  }	

});

