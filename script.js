// Clock

document.addEventListener("DOMContentLoaded", function() {
    let c = document.getElementById("clock");

    function updateClock() {
        let date = new Date();
        let h = date.getHours() % 12 || 12; 
        let m = date.getMinutes();
        let s = date.getSeconds();

        if (h < 10) {
            h = "0" + h;
        }

        if (m < 10) {
            m = "0" + m;
        }

        if (s < 10) {
            s = "0" + s;
        }

        c.innerHTML = h + ":" + m + ":" + s;
    }

    setInterval(updateClock, 1000);
    updateClock();
});

// Forms

document.getElementById("form").addEventListener("submit", estimateDelivery);

function estimateDelivery(event) {
    event.preventDefault();
    let linn = document.getElementById("linn");
    let delivery = document.querySelector('input[name="delivery"]:checked');
    if (fname.value === "" || !/^[a-zA-Z]+$/.test(fname.value)) {
        alert("Palun sisestage kehtiv eesnimi.");
        fname.focus();
        return;
    }

    if (lname.value === "" || !/^[a-zA-Z]+$/.test(lname.value)) {
        alert("Palun sisestage kehtiv perekonnanimi.");
        lname.focus();
        return;
    }

   
    if (linn.value === "") {
        alert("Palun valige linn nimekirjast.");
        linn.focus();
        return;
    }

    
    if (!delivery) {
        alert("Palun valige tarneliik.");
        return;
    }

    let deliveryCost = 0;
    if (linn.value === "trt" || linn.value === "nrv") {
        deliveryCost = 2.5;
    } else if (linn.value === "prn") {
        deliveryCost = 3;
    }

    if (document.getElementById("v1").checked) {
        deliveryCost += 5;
    }
    if (document.getElementById("v2").checked) {
        deliveryCost += 1;
    }

    if (delivery.value === "express") {
        deliveryCost += 10;
    } else if (delivery.value === "standard") {
        deliveryCost += 5;
    }

    let deliveryElement = document.getElementById("delivery");
    deliveryElement.innerHTML = deliveryCost.toFixed(2) + " €";
}

// Map

let mapAPIKey = "YOUR_BING_MAPS_API_KEY";
let map;

function GetMap() {
    "use strict";

   
    let tartuCoordinates = new Microsoft.Maps.Location(58.38104, 26.71992);
    let tartuPushpin = new Microsoft.Maps.Pushpin(tartuCoordinates, {
        title: 'Tartu Ülikool',
    });

  
    let tallinnCoordinates = new Microsoft.Maps.Location(59.397982, 24.671887); 
    let tallinnPushpin = new Microsoft.Maps.Pushpin(tallinnCoordinates, {
        title: 'Tallinna Ülikool',
    });

  
    let tartuInfobox = new Microsoft.Maps.Infobox(tartuCoordinates, {
        title: 'Tartu Ülikool',
        description: 'Tartu Ülikool lisaleht.',
    });

    let tallinnInfobox = new Microsoft.Maps.Infobox(tallinnCoordinates, {
        title: 'Tallinna Ülikool',
        description: 'Tallinna Ülikool lisaleht.',
    });

    
    let boundingBox = Microsoft.Maps.LocationRect.fromLocations([tartuCoordinates, tallinnCoordinates]);

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: boundingBox.center,
        bounds: boundingBox, 
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    
    map.entities.push(tartuPushpin);
    map.entities.push(tallinnPushpin);

   
    map.entities.push(tartuInfobox);
    map.entities.push(tallinnInfobox);

    
    tartuInfobox.setOptions({ visible: false });
    tallinnInfobox.setOptions({ visible: false });

    
    Microsoft.Maps.Events.addHandler(tartuPushpin, 'click', function () {
        tartuInfobox.setOptions({ visible: true });
    });

    Microsoft.Maps.Events.addHandler(tallinnPushpin, 'click', function () {
        tallinnInfobox.setOptions({ visible: true });
    });
}