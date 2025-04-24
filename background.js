class FluidAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl');
        this.lastTime = 0;
        this.particles = [];
        this.init();
    }

    init() {
        // WebGL setup
        const gl = this.gl;
        
        // Vertex shader
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `);
        gl.compileShader(vertexShader);

        // Fragment shader
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, `
            precision mediump float;
            uniform vec2 resolution;
            uniform float time;

            void main() {
                vec2 uv = gl_FragCoord.xy / resolution;
                vec2 center = vec2(0.5, 0.5);
                float dist = length(uv - center);
                
                float wave = sin(dist * 10.0 - time) * 0.5 + 0.5;
                vec3 color1 = vec3(0.07, 0.20, 0.35); // #123458
                vec3 color2 = vec3(0.95, 0.94, 0.93); // #F1EFEC
                
                vec3 color = mix(color1, color2, wave);
                gl_FragColor = vec4(color, 0.1);
            }
        `);
        gl.compileShader(fragmentShader);

        // Create program
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        // Create buffer
        const vertices = new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
             1.0,  1.0
        ]);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Get locations
        this.positionLocation = gl.getAttribLocation(this.program, 'position');
        this.resolutionLocation = gl.getUniformLocation(this.program, 'resolution');
        this.timeLocation = gl.getUniformLocation(this.program, 'time');

        // Enable attribute
        gl.enableVertexAttribArray(this.positionLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Start animation
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        const { canvas, gl } = this;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    animate(currentTime = 0) {
        const { gl } = this;
        const time = currentTime * 0.001;

        // Use program and set uniforms
        gl.useProgram(this.program);
        gl.uniform2f(this.resolutionLocation, this.canvas.width, this.canvas.height);
        gl.uniform1f(this.timeLocation, time);

        // Draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Request next frame
        requestAnimationFrame(time => this.animate(time));
    }
}

// Initialize animation when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.classList.add('background-animation');
    document.body.insertBefore(canvas, document.body.firstChild);
    new FluidAnimation(canvas);
}); 