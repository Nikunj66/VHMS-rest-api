class Pagination{
    static paginate= async (data, currentpage=1)=>{
        var itemnumber=parseInt(process.env.NUM_OF_ITEMS);
        var length=data.length;
        var numberofpage= (length/itemnumber);
        var endindex=parseInt(currentpage*itemnumber);
        var startindex=parseInt(endindex - itemnumber);
        var datalist=data.slice(startindex, endindex);
        return {
            "pagination":{
                "total":length,
                "currentpage":currentpage,
                "perpageitem":itemnumber,
                "numberofpage":numberofpage,
                "startindex":(startindex<0)?0:startindex,
                "endindex":(endindex>=length)?length-1 :endindex,
            },
            "data":datalist
        }
    }
}
module.exports=Pagination;