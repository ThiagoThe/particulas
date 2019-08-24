var w = 3*innerWidth, h = 3*innerHeight;
var v = Math.min(w, h), mesh = [];
var cvs, ctx, img, data, t, r, a, x, y;

onload = function() {
    cvs = document.querySelector("canvas");
    cvs.width = w; cvs.height = h;
    ctx = cvs.getContext("2d");

    ctx.fillStyle = "white";
    ctx.font = "50vmin bold sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    initMesh();
    drawMesh();
}

function initMesh() {
    ctx.fillText(prompt("Digite seu texto aqui:") || "aqui", w/2, h/2, w); 
    img = ctx.getImageData(0, 0, w, h);
    data = img.data;

    for(y=0; y < h; y++)
    for(x=0; x < w; x++)
        if(data[4*(y*w+x)+3] > 16)
        if(data[4*(y*w+x-1)+3] < 16 || //left
           data[4*(y*w+x+1)+3] < 16 || //right
           data[4*((y-1)*w+x)+3] < 16 || //top
           data[4*((y+1)*w+x)+3] < 16 //bottom
        )mesh.push({x:x, y:y});
}

function drawMesh() {
    ctx.clearRect(0, 0, w, h);
    t = Date.now() / 1000;

    mesh.forEach(function(p) {
        a = (Math.cos(p.x) + Math.cos(p.y) + t)* Math.PI;
        r = 60*Math.pow(Math.sin(2*t - p.x/w), 9);
        x = p.x + r * Math.cos(a);
        y = p.y + r * Math.sin(a);
        ctx.fillRect(x, y, 1, 1);
    });
    requestAnimationFrame(drawMesh);
}