const dataSetKey = Object.keys(dataSet)
console.log(dataSet)

var dataArray = [];
dataSetKey.forEach((key, index) => {
    const data = dataSet[key]
    dataArray[index] = [data.name, data.type, data.cquantity, data.tquantity]
})
console.log(dataArray)

$(document).ready(() => {
    $("#invent").addClass('active')
    $("#home").removeClass('active')
    $("#ritems").removeClass('active')
    $("#rstatus").removeClass('active')

    $("#inventory").DataTable({
        data: dataArray,
        scrollCollapse: true,
        columns: [
            { title: "Item Name" },
            { title: "Category" },
            { title: "Current Quantity" },
            { title: "Total Quantity" }
        ],

    });
});