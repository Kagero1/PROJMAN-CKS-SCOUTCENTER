const dataSetKey = Object.keys(dataSet)
console.log(dataSet)

var dataArray = [];
dataSetKey.forEach((index) => {
    dataArray[index] = [dataSet.name, dataSet.type, dataSet.cquantity, dataSet.tquantity]
})

$(document).ready(() => {
    $("#invent").addClass('active')
    $("#home").removeClass('active')
    $("#ritems").removeClass('active')
    $("#rstatus").removeClass('active')

    $("#myTable").DataTable({
        data: dataSet,
        scrollCollapse: true,
        columns: [
            { data: "name",
            title: "Item Name" },
            { data: "type",
            title: "Category" },
            { data: "cquantity",
            title: "Current Quantity" },
            { data: "tquantity",
            title: "Total Quantity" }
        ],

    });
});