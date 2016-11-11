/**
 * Created by arun on 28/6/16.
 */
var com = {};
com.game = function () {

    var build = function () {
        try {
            var builder = new CityBuilder("workspace");
            builder.build("workspace");
        } catch  (error) {
            console.log(error);
        }
    }
    return {
        init : function () {
            build ();
            console.log("hello world")
        }
    }
} ();
