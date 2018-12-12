var canvas = document.getElementById("webgl");
var gl;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

try {
    gl = canvas.getContext("webgl", {
        antialias: true
    });
} catch(err) {
    alert("当前浏览器不支持webgl");
}

// shader
// 定义顶点着色器和片元着色器的字符串
var vertex_shader_source="\n\
attribute vec2 position;\n\
attribute vec3 color;\n\
varying vec3 vColor;\n\
void main() {\n\
gl_Position = vec4(position, 0.0, 1.0);\n\
vColor = color;\n\
}";

var fragment_shader_source="\n\
precision mediump float;\n\
varying vec3 vColor;\n\
void main() {\n\
gl_FragColor = vec4(vColor, 1.0); \n\
}";

function getShader(source, type, typeString) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("error in " + typeString + "shader: " + gl.getShaderInfoLog(shader));
        return false;
    } 
    return shader;
}

var vertex_shader = getShader(vertex_shader_source, gl.VERTEX_SHADER, "vertex");
var fragment_shader = getShader(fragment_shader_source, gl.FRAGMENT_SHADER, "fragment");

// init program
var program = gl.createProgram();
gl.attachShader(program, vertex_shader);
gl.attachShader(program, fragment_shader);

gl.linkProgram(program);

var _color = gl.getAttribLocation(program, "color");
var _position = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(_color);
gl.enableVertexAttribArray(_position);
gl.useProgram(program);

// triangle
var vertex_array = new Float32Array([
    -1, -1,
    0, 0, 1,
    1, -1,
    1, 1, 0,
    1, 1,
    1, 0, 0
]);

var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertex_array, gl.STATIC_DRAW);

var face_array = new Uint16Array([0, 1, 2]);
var face_buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, face_buffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, face_array, gl.STATIC_DRAW);

// draw
gl.clearColor(0.0, 0.0, 0.0, 0.5);

function animate() {
    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.vertexAttribPointer(_position, 2, gl.FLOAT, false, 4 * (2+3), 0);
    gl.vertexAttribPointer(_color, 3, gl.FLOAT, false, 4 * (2+3), 2*4);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, face_buffer);
    gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);

    gl.flush(); // 用于强制刷新缓冲，保证绘图命令将被执行，而不是存储在缓冲区等待其他的命令
    // window.requestAnimationFrame(animate);
}
animate();


