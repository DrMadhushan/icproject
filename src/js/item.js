function loadItem(){
    let api_host = 'http://127.0.0.1:8000/api';
    let itemID = sessionStorage.getItem('opened_item');
    let item_details = document.getElementById('item_details');
    let url = api_host + '/components/items/' + itemID;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
        closeOverlay();
        console.log(typeof xhr.response);
        item = JSON.parse(xhr.response);
        console.log(item.id);
        item_details.innerHTML = `
        <!-- Item details block -->
            <div class="col-sm border rounded shadow-sm m-1">
                <div class="h2 mt-1">${item.title}</div>
                <div class="h3">Item#${item.id}</div>
                <div class="h6">Brand: ${item.brand}</div>
                <div class="h6">Product Code: ${item.productCode}</div>
                <div class="h6">Specifications: ${item.specifications}</div>
                <div class="h6">Available to borrow: ${item.isAvailable == 1 ? 'Yes' : 'No'}</div>
                <div class="h6">Description:</div>
                <div class="pb-1">${item.description}</div>
                
            </div>

            <!-- Side block for docs -->
            <div class="col-sm">
                <!-- Documentation links -->
                <div class="border rounded shadow-sm m-1 mb-3">
                    <div class="row d-flex align-items-center justify-content-center p-3">
                        <div class="col doc-block text-center">
                            <a onclick="showDataSheet()" role="button"><i class="fas fa-file-invoice h1 text-primary"></i></a>
                            <div class="h6">Data Sheet</div>
                        </div>
                        <div class="col doc-block text-center">
                            <a onclick="showVideo()" role="button"><i class="fab fa-youtube h1 text-danger"></i></a>
                            <div class="h6">Video Tutorial</div>
                        </div>
                    </div>
                    <div class="row d-flex align-items-center justify-content-center p-3">
                        <div class="col doc-block text-center">
                            <a onclick="showWikiDoc()" role="button"><i class="fas fa-vial h1 text-success"></i></a>
                            <div class="h6">Documentation</div>
                        </div>
                    </div>
                </div>
                

                <!-- Navigation area -->
                <div class="border rounded shadow-sm m-1">
                    <div class="row d-flex align-items-center justify-content-center p-3">
                        <div class="col doc-block text-center">
                            <i class="fas fa-map-marked-alt h3 text-secondary"></i>
                            <div class="h6">Locate</div>
                        </div>
                        <div class="nav-gif justify-content-center align-middle align-items-center d-flex">
                            <img src="assets/img/navigator.gif" alt="" srcset="">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function closeOverlay(){
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    return false;
}

function openOverlay(){
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
}

function showDataSheet() {
    openOverlay();
    let overlay_content = document.getElementById('overlay');
    overlay_content.innerHTML =`
    <div class="overlay">
        <div class="d-flex justify-content-center align-items-center m-1 mb-3" style="text-align: center;" id="logout_block">
            <a class="btn btn-sm mt-2 m-2 w-25"  onclick="closeOverlay()" id="closebutton" role="button"><i class="h1 far fa-times-circle"></i></a>
        </div>
        <div class="d-flex justify-content-center align-items-center m-1 mb-3" style="text-align: center;" id="logout_block">
            <iframe src="https://www.farnell.com/datasheets/1682209.pdf" frameborder="1" style="width: 90%; height: 550px;"></iframe>
        </div>
    </div>
    `;
}

function showVideo() {
    openOverlay();
    let overlay_content = document.getElementById('overlay');
    overlay_content.innerHTML =`
    <div class="overlay">
        <div class="d-flex justify-content-center align-items-center m-1 mb-3" style="text-align: center;" id="logout_block">
            <a class="btn btn-sm mt-2 m-2 w-25"  onclick="closeOverlay()" id="closebutton" role="button"><i class="h1 far fa-times-circle"></i></a>
        </div>
        <div class="d-flex justify-content-center align-items-center m-1 mb-3" style="text-align: center;" id="logout_block">
            <iframe src="https://www.youtube.com/watch?v=nL34zDTPkcs" frameborder="2" style="border: 2px solid gray; width: 978px; height: 550px;"></iframe>
        </div>
    </div>
    `;
}

function showWikiDoc() {
    openOverlay();
    let overlay_content = document.getElementById('overlay');
    overlay_content.innerHTML =`
    <div class="overlay">
        <div class="d-flex justify-content-center align-items-center m-1 mb-3" style="text-align: center;" id="logout_block">
            <a class="btn btn-sm mt-2 m-2 w-25"  onclick="closeOverlay()" id="closebutton" role="button"><i class="h1 far fa-times-circle"></i></a>
        </div>
        <div class="d-flex justify-content-center align-items-center m-1 mb-3" style="text-align: center;" id="logout_block">
            <iframe src="https://www.arduino.cc/en/Guide/ArduinoUno/" frameborder="1" style="width: 90%; height: 550px;"></iframe>
        </div>
    </div>
    `;
}