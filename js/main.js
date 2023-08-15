$("#document").ready(function() {
    var format = 'image/png';
    var bounds = [801793.8309999127,1283149.3740178514,823388.1959999055,1309516.9560182001];
    var vung = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/kt_1/wms',
            params:{
                'FORMAT': format,   
                'VERSION': '1.1.0',
                STYLE:'',
                LAYERS: 'kt_1:HientrangSDD',
            }
        })
    });
    var duong = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/kt_1/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.0',
                STYLES:'',
                LAYERS: 	'kt_1:Giaothong_bo',
            }
    
        })
    });
    var diem = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/kt_1/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.0',
                STYLES:'',
                LAYERS: 'kt_1:UybanHC',
            }
        })
    })
    
    var projection = new ol.proj.Projection({
        code: 'EPSG:3405',
    units: 'm',
    axisOrientation: 'neu'
    });
    var map = new ol.Map({
    target: 'map',
    layers: [
    vung,duong,diem
    ],
    view: new ol.View({
       projection: projection
    })
    });
    map.getView().fit(bounds, map.getSize());
           $("#chbvung").change(function(){
            if($("#chbvung").is(":checked")){
                vung.setVisible(true)
            }
            else{
                vung.setVisible(false)
            }
           });
    
           $("#chbduong").change(function(){
            if($("#chbduong").is(":checked")){
                duong.setVisible(true)
            }
            else{
                duong.setVisible(false)
            }
           });
           $("#chbdiem").change(function(){
            if($("#chbdiem").is(":checked")){
                diem.setVisible(true)
            }
            else{
                diem.setVisible(false)
            }
           });
           map.on('singleclick', function (evt) {
            document.getElementById('info').innerHTML = "Loading...please wait...";
            var view = map.getView();
            var viewResolution = view.getResolution();
            var source = vung.getSource();
            var url = source.getFeatureInfoUr(evt.coordinate, viewResolution,
                view.getProjection(),{ 'INFO_FOMAT': 'application/json', 'FEATURE_COUNT': 50});
                if(url){
                    $ajax({
                        tyoe: "POST",
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        success: function (n) {
                            var content = "<table>";
                            for (var i = 0; i < n.feature.length; i++) {
                                var feature = n.feature[i];
                            var featureAttr = feature.properties;
                        content += "<tr><td>Loại đất: "+ featureAttr["txtmemo"]
    +"</td><td>Diện tích: " + featureAttr["shape_area"]
                    + "</td></tr>"
                            }
                conten += "</table>";
                $("#info").html(content);
                var vectorSource = new ol.source.Vector({
                    features: (new_ol.fomat.GeoJson()).readFeatures(n)
    
                });
                    vectorLayer.setSource(vectorSource);
                            }
                        })
                    }
                });
           var style = {
            'MultiPolygon': new ol.style.Style({
                stroke: new ol.style.Stroke({
                color: 'yellow',
                width: 5
            })
            })
           };
           var styleFunction = function (feature) {
            return styles[feature.getGeometry().getType()];
           };
           var vectorLayer = new ol.layer.Vector({
            style: styleFunction
           });
           map.addLayer(vectorLayer);
           features: (new ol.format.GeoJSON()).readFeatures(n)
                    });
                    vectorLayer.setSource(vectorSource);
                    var searchBox = document.getElementById('searchBox');

                    searchBox.addEventListener('keydown', function(event) {
                        if (event.keyCode === 13) {
                            var searchQuery = searchBox.value;
                            map.getView().fit(feature.getGeometry(), {
                                size: map.getSize(),
                                padding: [50, 50, 50, 50],
                                duration: 500
                            });
                        }
                    });x
                

