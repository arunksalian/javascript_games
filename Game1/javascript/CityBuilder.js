/**
 * Created by arun on 28/6/16.
 */
var  CityBuilder = function () {
    this.designer = new Designer();
    this.build = function (id) {
        console.log("building new city");
        this.designer.init(id);
        
        
    }
}