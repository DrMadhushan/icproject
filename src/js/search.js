function search_keyword(){
    let term = document.getElementById('search').value;
    if (term.length < 3){
        document.getElementById('warning').innerHTML = `Minimum length of a keyword is 3`;
    } else{
        sessionStorage.setItem('search_term', term);
        window.location.href = 'search_results.html';
    }
    
}

function show_results(){
    let api_host = 'http://127.0.0.1:8000/api';

    let xhr = new XMLHttpRequest();
    let term = sessionStorage.getItem('search_term');
    let results_block = document.getElementById('result_status');
    let url = api_host + '/components/items/search?term=' + term;
    console.log(url);
    xhr.open('GET', url);
    xhr.send();

    // console.log("before");
    xhr.onload = () => {
        console.log(typeof xhr.response);
        dict = JSON.parse(xhr.response);
        console.log(dict);
        // info.innerHTML = "Fetched!<br>" + xhr.response;
        if (xhr.status == 200){
            console.log("Status = 200 OK");
            sessionStorage.setItem('search_term', term);
            console.log(typeof dict.length);
            if (dict.length < 1){
                results_block.innerHTML += `<div class="p-2">No matching results found<br>Please try another keyword</div>`;
            } else {
                for (const resultId in dict){
                    console.log(dict[resultId]);
                    results_block.innerHTML += `
                    <div class="row shadow-sm border rounded-3 p-1 mb-2">
                        <div class="col">
                            <a role="button" onclick="openItem(${dict[resultId]['id']})">
                                <div class="h5">${dict[resultId]['title']}</div>
                                <div>
                                    <div class="p-1 ">Brand: ${dict[resultId]['brand']}</div>
                                    <div class="p-1 ">Price: &nbsp${dict[resultId]['price']} LKR</div>
                                </div>
                            </a>
                        </div>
                        <div class="col-2 justify-content-end align-items-end">
                            <!--<div><img src="assets/img/searchpagedemo.png" width="100%" alt="" srcset=""></div>
                            -->
                        </div>
                    </div>
                    `;
                }
            }   
        }   
    }
}

function openItem(itemID){
    sessionStorage.setItem('opened_item', itemID);
    window.location.href = 'item.html';
}