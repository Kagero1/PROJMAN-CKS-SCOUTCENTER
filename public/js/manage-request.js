const dataSetKey = Object.keys(dataSet)
console.log(dataSet)

var dataArray = [];
dataSetKey.forEach((key, index) => {
    const data = dataSet[key]
    dataArray[index] = [data.troopno, data.name, data.type, data.dateborrow, data.datereturn, data.quantityborrow, data.reasonborrow, data.approvalstatus, data.troopno]
})
console.log(dataArray)

$(document).ready(()=>{
    $("#rstatus").removeClass('active')
    $("#invent").removeClass('active')
    $("#ritems").removeClass('active')
    $("#home").removeClass('active')
    $("#mitems").addClass('active')

    $("#manageRequest").DataTable({
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
            { title: "Options",
            render: function(data, type, row, meta) {
                return '<div class="row align-items-center"><form method="POST" onsubmit="return false;"><input type="hidden" name="requestID" value="'+data+'"><div class="col-6 col-sm-4 col-md-7 col-xl mb-3 mb-xl-0"><button class="btn btn-sm btn-block btn-success" type="button">Approve</button></div><div class="col-6 col-sm-4 col-md-7 col-xl mb-3 mb-xl-0"><button class="btn btn-sm btn-block btn-danger" type="button">Reject</button></div></form></div>';
            } }
        ],

    });
});