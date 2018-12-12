/********初始化模型shader基本的元素********/
function initShader(gl, vShader, fShader) {
    var program = createProgram(gl, vShader, fShader);

    gl.useProgram(program);
    gl.program = program;

    return true;
}

function createProgram(gl, vShader, fShader) {
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vShader);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fShader);

    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    // todo program的异常情况检查
    // var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    // if (!linked) {
    //     var error = gl.getProgramInfoLog(program);
    //     console.log('Failed to link program: ' + error);
    //     gl.deleteProgram(program);
    //     gl.deleteShader(fragmentShader);
    //     gl.deleteShader(vertexShader);
    //     return null;
    // }

    return program;
}

function loadShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    // todo shader的异常情况检查
    // var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    // if (!compiled) {
    //     var error = gl.getShaderInfoLog(shader);
    //     console.log('Failed to compile shader: ' + error);
    //     gl.deleteShader(shader);
    //     return null;
    // }

    return shader;
};