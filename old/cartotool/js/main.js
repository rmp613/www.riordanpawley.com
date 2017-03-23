    const TOOL_DESELECT = "Deselect";
    const TOOL_CLEAR = "Clear";
    const TOOL_SELECT = "Select";
    const TOOL_NONE = "";
    var loadingFeatures = 0;
    var featuresLoading = [];
    var activeTool = "";
    var selectedDataTypes = [];
    var selected = [];
    var polygons = {};
    // function ToggleCursorWait(){
    //     var wait = 'progress';
    //     var def = 'default';
    //     document.getElementById("map").style.cursor = document.getElementById("map").style.cursor == wait ? def : wait;
    // }


    function AddInfo(selected, feature, propertyName) {
        var ele = document.createElement("li");
        ele.appendChild(document.createTextNode(feature[propertyName]));
        var id = document.createAttribute("id");
        id.value = "feature" + feature.cartodb_id;
        var eleID = "feature" + feature.cartodb_id;
        ele.setAttributeNode(id);
        document.getElementById("featurelist").appendChild(ele);
        $(eleID).click(function() {
            ZoomToFeatureFromHTML(selected, ele);
            console.log("here2");
        });
    }

    function RemoveInfo(id) {
        var ele = document.getElementById("feature" + id);
        ele.parentElement.removeChild(ele);
    }

    function GetIDFromEle(ele) {
        return id = ele.id.match(/\d+$/)[0];
    }

    function ZoomToFeatureFromHTML(selected, ele) {
        var id = GetIDFromEle(ele);
        var feature = GetFeatureSelected(selected, id);
        var sql = new cartodb.SQL({
            user: 'rmp613'
        });
        console.log("here1");
        sql.getBounds("SELECT * FROM australia_adm2 WHERE cartodb_id IN (" + id + ")").done(function(bounds) {
            map_object.fitBounds(bounds);
            console.log("here");
        });
    }

    function ToggleInfoDisplay(infoType) {
        var index = selectedDataTypes.indexOf(infoType);
        if (index === -1) {
            selectedDataTypes.push(infoType);
        } else {
            selectedDataTypes.splice(index, 1);
        }
        RefreshInfoDisplay();
    }

    function RefreshInfoDisplay() {
        var nodes = document.getElementById('featurelist').childNodes;
        var num = 1;
        for (i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.id == "toggleinfotypes" || node.id === undefined) continue;
            node.innerHTML = "Feature " + num;
            for (j = 0; j < selectedDataTypes.length; j++) {
                var dataType = selectedDataTypes[j];
                node.innerHTML += "<br>" + dataType + ": " + GetFeatureFromID(GetIDFromEle(node))[dataType];
            }
            num++;
        }
    }

    function FeatureSelected(selected, id) {
        for (var i = 0; i < selected.length; i++) {
            var feature = selected[i];
            if (feature.cartodb_id == id) {
                return true;
            }
        }
        return false;
    }

    function GetFeatureIndexSelected(selected, id) {
        for (var i = 0; i < selected.length; i++) {
            var feature = selected[i];
            if (feature.cartodb_id == id) {
                return i;
            }
        }
        return -1;
    }

    function GetFeatureFromID(id) {
        for (var i = 0; i < selected.length; i++) {
            var feature = selected[i];
            if (feature.cartodb_id == id) {
                return feature;
            }
        }
        return null;
    }

    function RemoveCursorInteraction(layer) {
        layer.off('featureOver');
        layer.off('featureOut');
        layer.off('mouseup');
        layer.off('mousedown');
        $('#map').off('mousedown');
    }

    function AddInfoTypeOptions(feature) {
        for (var infoType in feature) {
            var infoTypesEle = document.getElementById("infotypes");
            var div = document.createElement("div");
            var id = document.createAttribute("id");
            id.value = "infotype-" + infoType;
            div.setAttributeNode(id);
            var cla = document.createAttribute("class");
            cla.value = "ck-button";
            div.setAttributeNode(cla);
            var label = document.createElement("label");
            var input = document.createElement("input");
            var id1 = document.createAttribute("id");
            id1.value = "infotype-input-" + infoType;
            input.setAttributeNode(id1);
            var type = document.createAttribute("type");
            type.value = "checkbox";
            input.setAttributeNode(type);
            var value = document.createAttribute("value");
            value.value = infoType;
            input.setAttributeNode(value);
            var span = document.createElement("span");
            var textNode = document.createTextNode(infoType);
            span.appendChild(textNode);
            label.appendChild(input);
            label.appendChild(span);
            div.appendChild(label);
            infoTypesEle.appendChild(div);
            input.onchange = function() {
                var it = this.id.replace("infotype-input-", "");
                ToggleInfoDisplay(it);
            }
        }
    }

    function GetFeatureSelected(selected, id) {
        for (var i = 0; i < selected.length; i++) {
            var feature = selected[i];
            if (feature.cartodb_id == id) {
                return feature;
            }
        }
        return new Feature();
    }

    function SetUpDataTypesAndFeature(sql, tableName) {
        sql.execute("SELECT ST_asGeoJSON(the_geom) as the_geom FROM " + tableName + " LIMIT 1").done(function(the_geom) {
            var polygon = L.geoJson(JSON.parse(the_geom.rows[0].the_geom), {
                style: {
                    color: "#000",
                    weight: 1,
                    fillColor: "#FFF"
                }
            });
            Feature['polygon'] = polygon;
        });
        sql.execute("SELECT * FROM " + tableName + " LIMIT 1").done(function(data) {
            var i = 0;
            for (var field in data.fields) {
                Feature[field] = data.rows[i];
                i++;
            }
            AddInfoTypeOptions(Feature);
        });
    }

    function OpenNav() {
        document.getElementById("openinfobtn").innerHTML = "<< Info";
        document.getElementById("info1").style.border = "1px inset";
        document.getElementById("info1").style.width = "20%";
        document.getElementById("main").style.marginLeft = "20%";
        document.getElementById("main").style.width = "80%";
    }

    function ToggleNav() {
        if (document.getElementById("info1").style.width == "20%") {
            CloseNav();
        } else {
            OpenNav();
        }
    }

    function CloseNav() {
        CloseInfoTypes();
        document.getElementById("openinfobtn").innerHTML = ">> Info";
        document.getElementById("info1").style.border = "none";
        document.getElementById("info1").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("main").style.width = "100%";
    }

    function OpenInfoTypes() {
        document.getElementById("toggleinfotypes").innerHTML = "Info Displayed >>";
        document.getElementById("infotypes").style.border = "1px inset";
        document.getElementById("infotypes").style.width = "15%";
        document.getElementById("main").style.marginLeft = "35%";
        document.getElementById("main").style.width = "65%";
    }

    function ToggleInfoTypes() {
        if (document.getElementById("infotypes").style.width == "15%") {
            CloseInfoTypes();
        } else {
            OpenInfoTypes();
        }
    }

    function CloseInfoTypes() {
        document.getElementById("toggleinfotypes").innerHTML = "Info Displayed <<";
        document.getElementById("infotypes").style.border = "0px none";
        document.getElementById("infotypes").style.width = "0%";
        document.getElementById("main").style.marginLeft = "20%";
        document.getElementById("main").style.width = "80%";
    }
    var Feature = function Feature() {}

    var map_object;

    function main() {
        document.getElementById("toggleinfotypes").onclick = ToggleInfoTypes;
        document.getElementById("openinfobtn").onclick = ToggleNav;


        //TODO: CHECK IF MAKIGN ALL POLYGONS THEN TOGGLING THEM INSTEAD OF MAKING THEM ON DEMAND IMPROVES PERFOMANCE
        var map;
        var events = [];
        var baton;
        var infoTypesDictionary = {}
        var sql = new cartodb.SQL({
            user: 'rmp613'
        });
        var sqlData = "cartodb_id, ST_asGeoJSON(the_geom) as the_geom, albers_sqm" //  center and zoom level
        var options = {
            center: [-26.38, 133.18],
            zoom: 5,
        };
        map_object = new L.Map('map', options);
        // set basemap
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        }).addTo(map_object);
        // cartodb createLayer https://rmp613.carto.com/api/v2/viz/a2b81b32-ac72-11e6-bd49-0e05a8b3e3d7/viz.json
        cartodb.createLayer(map_object, 'https://rmp613.carto.com/api/v2/viz/a2b81b32-ac72-11e6-bd49-0e05a8b3e3d7/viz.json').addTo(map_object).on('done', function(layer) {
            var v = cdb.vis.Overlay.create('search', map_object.viz, {});
            v.show();
            $('#map').append(v.render().el);
            document.getElementById("map").style.cursor = "default";
            // set interaction of the CartoDB layer (allow you to click on it)
            layer.setInteraction(true);
            $('#select').click(function() {
                SwitchTool(layer, TOOL_SELECT);
            });
            $('#clear').click(function() {
                SwitchTool(layer, TOOL_CLEAR)
            });
            $('#deselect').click(function() {
                SwitchTool(layer, TOOL_DESELECT);
            });
            PreloadPolygons();
        });

        function PreloadPolygons() {
            var then = Date.now();
            console.log("start");
            sql.execute("SELECT cartodb_id, ST_asGeoJSON(the_geom) as the_geom FROM australia_adm2").done(function(data) {
                for (var i = 0; i < data.length - 1; i++) {
                    console.log("1");
                    var polygon = L.geoJson(JSON.parse(data.rows[i].the_geom), {
                        style: {
                            color: "#000",
                            weight: 0,
                            fillColor: "#FFF",
                            cursor: "default"
                        }
                    });
                    polygons[i] = polygon;
                }
                console.log("done in: " + (Date.now() - then) / 1000 + "seconds");
                console.log(polygons);
            });
        }
        // function that stores the values from the sql api and shows the values on the console
        function Select(the_geom, data) {
            var polygon = L.geoJson(JSON.parse(the_geom.rows[0].the_geom), {
                style: {
                    color: "#000",
                    weight: 1,
                    fillColor: "#FFF",
                    cursor: "default"
                }
            }).addTo(map_object);
            var feature = Object.create(Feature);
            feature.polygon = polygon;
            for (var field in data.rows[0]) {
                feature[field] = data.rows[0][field];
            }
            polygon.on('click', function() {
                if (activeTool == TOOL_DESELECT) {
                    Deselect(feature); //how does this work???? feature is after this line lol
                }
            });
            selected.push(feature);
            AddInfo(selected, feature);
            RefreshInfoDisplay();
        }

        function Deselect(feature) {
            //checks have already occured
            console.log(feature.name);
            console.log(feature);
            map_object.removeLayer(feature.polygon);
            RemoveInfo(feature.cartodb_id);
            events.splice(events.indexOf(feature.cartodb_id), 1);
            selected.splice(GetFeatureIndexSelected(selected, feature.cartodb_id), 1)
        }

        function SwitchTool(layer, name) {
            switch (name) {
                case TOOL_SELECT:
                    SelectTool(layer);
                    break;
                case TOOL_DESELECT:
                    DeselectTool(layer);
                    break;
                case TOOL_CLEAR:
                    ClearTool(layer);
                    break;
                case TOOL_NONE:
                    NoneTool(layer);
                    break;
            }
            var ele = document.getElementById('currentTool');
            ele.innerHTML = "Current Tool: " + name;
        }

        function SelectTool(layer) {
            //TODO: try preload with an onclick for each feature which makes cursor wait cursor
            if (activeTool == TOOL_SELECT) return;
            activeTool = TOOL_SELECT;
            layer.off('featureClick');
            //AddCursorInteraction(layer);
            $('#map').on('mousedown', function() {
                loadingFeatures++;
                document.getElementById("map").style.cursor = "progress";
            });
            layer.on('featureClick', function(e, latlng, pos, data) {
                // data1 stores the cartodb_id value of the selected polygon
                data1 = data.cartodb_id;
                if (events.indexOf(data1) == -1) {
                    // if element is not inside array, add it inside the array
                    events.push(data1);
                    // use SQL API to extract the attribute values from the selected polygons
                    // select the attribute tables to extract from CartoDB table
                    sql.execute("SELECT cartodb_id, ST_asGeoJSON(the_geom) as the_geom FROM australia_adm2 WHERE cartodb_id IN (" + data1 + ")").done(function(the_geom) {
                        sql.execute("SELECT * FROM australia_adm2 WHERE cartodb_id IN (" + data1 + ")").done(function(data) {
                            Select(the_geom, data);
                            loadingFeatures--;
                            if (loadingFeatures <= 0) {
                                document.getElementById("map").style.cursor = 'default';
                            }
                        });
                    });
                } else {
                    loadingFeatures--;
                    if (loadingFeatures <= 0) {
                        document.getElementById("map").style.cursor = 'default';
                    }
                    // if element exists inside the array, doesn't add it into the array
                    console.log("It already contains" + data1);
                }

            });
        }

        function DeselectTool(layer) {
            if (activeTool == TOOL_DESELECT) return;
            RemoveCursorInteraction(layer);
            activeTool = TOOL_DESELECT;
            layer.off('featureClick');
            layer.on('featureClick', function(e, latlng, pos, data) {
                var id = data.cartodb_id;
                Deselect(id);
            });
        }

        function ClearTool(layer) {
            if (activeTool != TOOL_CLEAR) RemoveCursorInteraction(layer);
            activeTool = TOOL_CLEAR;
            events = [];
            layer.off('featureClick');
            for (var i = 0; i < selected.length; i++) {
                Deselect(selected[i]);
                i--;
            }
        }

        function NoneTool(layer) {
            if (activeTool == TOOL_NONE) return;
            RemoveCursorInteraction(layer);
            activeTool = TOOL_NONE;
            layer.off('featureClick');
        }
        SetUpDataTypesAndFeature(sql, "australia_adm2");
    }

    window.onload = main;