$(document).ready(function(){

    const data = randomArr;

    addRows(data);

    $(".add-row").click(function() {
        addRows();
    });

    $("#data").click(function(){
        addRows(data);
    });


    $(".delete-row").click( deleteRows );

    $("#btn-clear-table").click( clearTable );

    $('#clear-row').click(function(e) {
        deleteRow(e.target);
    });

    $(".sort-order").click(sortClick());

    $("#search").keyup(function () {
        search_table($(this).val());
    });

    $('#mySelect').change(function(){
        let gander = $(this).val();
        let filteredArr = filterGander(gander);
        clearTable();
        addRows(filteredArr);
    });

    function addRows(dataArr) {
        let markup = "", tmp;
        if (dataArr) {
            for(let i = 0; i < dataArr.length; i++) {
                tmp = dataArr[i];
                markup = markup + template(tmp.id, tmp.first_name, tmp.last_name, tmp.email, tmp.gender, tmp.ip_address);
            }
        }
        $("table tbody").append(markup);
    }

    function clearTable() {
        $('#table tbody tr').remove();
    }

    function deleteRow(ctl) {
        $(ctl).parents("tr").remove();
    }

    function deleteRows() {
        $("table tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    }

    function sortClick() {
        let toggleSort = false;
        function sort() {
            console.log(event);
            console.log($(this).attr("class").split(' '));
            if (toggleSort) {
                $(this).find( "i" ).toggleClass('fas fa-caret-down');
            } else {
                $(this).find( "i" ).toggleClass('fas fa-caret-up');
            }
            const columnName = $(this).data("column-name");
            const comparator = getComparator(columnName, toggleSort);
            data.sort(comparator);
            clearTable();
            addRows(data);
            toggleSort = !toggleSort;
        }
        return sort;
    };


    function template(id, f_name, l_name, email, gander, ip) { //todo поміняти скобки
        return  "<tr>" +
        "<td>" + id + "</td>" +
        "<td>" + f_name + "</td>" +
        "<td>" + l_name + "</td>" +
        "<td>" + email + "</td>" +
        "<td>" + gander + "</td>" +
        "<td>" + ip + "</td>" +
        '<td><button type="button" onclick="$(this).parents(\'tr\').remove()" class="clear-row">Delete Row</button></td>' +
        "</tr>";
    }

    function search_table(value) {
        $('#table tr').each(function () {
            let found = 'false';
            $(this).each(function () {
                if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){
                    found = 'true';
                }
            });
            if(found == 'true'){
                $(this).show();
            }else {
                $(this).hide();
            }

        });
    }

    function filterGander(gander) {
        return  data.filter( element => element.gender === gander );
    };

    function getComparator(columnName, order) {
        let asc = order ? 1 : -1;
        let desc = !order ? 1 : -1;
        return function(a, b){ return a[columnName] > b[columnName] ? asc : a[columnName] < b[columnName] ? desc : 0;}
    };

});

