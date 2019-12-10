const dataSetKey = Object.keys(dataSet)
console.log(dataSet)

var dataArray = [];
dataSetKey.forEach((key, index) => {
    const data = dataSet[key]
    dataArray[index] = [data.troopno, data.name, data.type, data.dateborrow, data.datereturn, data.quantityborrow, data.reasonborrow, data.approvalstatus, data.troopno]
})
console.log(dataArray)

$(document).ready(()=>{
    $("#rstatus").addClass('active')
    $("#invent").removeClass('active')
    $("#ritems").removeClass('active')
    $("#home").removeClass('active')
    $("#mitems").removeClass('active')

    $("#requestStatus").DataTable({
        data: dataArray,
        scrollCollapse: true,
        columns: [
            { title: "Troop"},
            { title: "Item name"},
            { title: "Category"},
            { title: "Date Borrowed"},
            { title: "Date Return"},
            { title: "Requested Quantity"},
            { title: "Reason for request"},
            { title: "Approval Status"},
        ],

    });
});