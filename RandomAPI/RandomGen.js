/**
 * Created by mongo on 08.07.17.
 */
function Vector(min,max) {
    let rand = (min, max)=>{return Math.random() * (max-min)+min;}
    this.randomVector=
    {
        x: rand(min,max),
        y: rand(min,max),
        z: rand(min,max)
    };
}

exports.vector = Vector;