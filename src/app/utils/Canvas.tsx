"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Custom hook that creates a fullscreen liquid metal shader effect
export function useThreeLiquidMetal(containerRef: React.RefObject<HTMLDivElement>) {
  
  // Track mouse position for interactive effects
  const mouse = useRef({ x: 0, y: 0 });
  // Track time for animation
  const clock = useRef(new THREE.Clock());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Store viewport dimensions for responsive canvas
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Linear interpolation helper - smoothly transitions between two values
    // a = start value, b = end value, t = progress (0 to 1)
    const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

    // WebGL Renderer - converts 3D scene to 2D pixels
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, // Allow transparency
      powerPreference: "high-performance" // Use dedicated GPU if available
    });
    renderer.setSize(viewport.width, viewport.height);
    // Limit pixel ratio for performance (prevents 4k+ devices from lagging)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Scene - the 3D world container
    const scene = new THREE.Scene();
    
    // Orthographic camera - flat view with no perspective (perfect for fullscreen effects)
    // Parameters: left, right, top, bottom, near, far
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    scene.add(camera);

    // Custom Shader Material - creates the liquid metal effect
    
    // Vertex Shader - positions vertices and passes UV coordinates to fragment shader
    const vertex = `
      varying vec2 vUv; // Pass UV coordinates to fragment shader
      void main() {
          // Standard vertex transformation (converts 3D position to screen position)
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
          vUv = uv; // Pass texture coordinates to fragment shader
      }
    `;

    // Fragment Shader - determines the color of each pixel
    const fragment = `
      uniform vec2 uResolution; // Screen dimensions
      uniform float uTime; // Time for animation
      varying vec2 vUv; // UV coordinates from vertex shader
      
      void main() {
          // Scale and center the UV coordinates
          vec2 newUv = 20.0 * (vUv.xy - uResolution); // 20.0 = pattern density
          float len; // Distance variable for the effect
          
          // Create swirling liquid effect through iterative distortion
          const int AMOUNT = 8; // Number of distortion iterations (more = more complex)
          for(int i=0;i<AMOUNT;i++){
              len=length(vec2(newUv.x,newUv.y)); // Distance from center
              // Apply trigonometric distortions that create flowing patterns
              newUv.x=newUv.x-cos(newUv.y+sin(len))+cos(uTime/3.); // X distortion with time
              newUv.y=newUv.y+sin(newUv.x+cos(len))+sin(uTime/3.); // Y distortion with time
          }
          
          float g = 0.5; // Grain/brightness modifier
          
          // Create all colors simultaneously across different areas
          float metallic = cos(len + g) * 0.3 + 0.2; // Darker metallic intensity
          
          // Use different frequencies to create separate color regions (dimmed)
          float whiteArea = (cos(len * 0.5 + uTime) * 0.3 + 0.1);
          float redArea = (cos(len * 0.8 + uTime * 1.2) * 0.3 + 0.1);
          float purpleArea = (cos(len * 1.2 + uTime * 0.8) * 0.3 + 0.1);
          float greenArea = (cos(len * 0.6 + uTime * 1.5) * 0.3 + 0.1);
          float yellowArea = (cos(len * 1.1 + uTime * 0.9) * 0.3 + 0.1);
          float blueArea = (cos(len * 0.9 + uTime * 1.1) * 0.3 + 0.1);
          
          // Define your 6 colors (dimmer intensities)
          vec3 white = vec3(0.6, 0.6, 0.6) * whiteArea;
          vec3 red = vec3(0.7, 0.0, 0.0) * redArea;
          vec3 purple = vec3(0.5, 0.0, 0.5) * purpleArea;
          vec3 green = vec3(0.0, 0.6, 0.0) * greenArea;
          vec3 yellow = vec3(0.6, 0.6, 0.0) * yellowArea;
          vec3 blue = vec3(0.0, 0.0, 0.7) * blueArea;
          
          // Add all colors together with darker overall tone
          vec3 finalColor = (white + red + purple + green + yellow + blue) * metallic * 0.6;
          
          gl_FragColor = vec4(finalColor, 1.);
      }
    `;

    // Combine vertex and fragment shaders into a material
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      // Uniforms - variables passed from JavaScript to shaders
      uniforms: {
        uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) }, // Screen size
        uTime: { value: 0 }, // Animation time (updated each frame)
        uMouse: { value: new THREE.Vector2(mouse.current.x, mouse.current.y) }, // Mouse position
      },
    });

    // Create a fullscreen plane (2x2 units covers the entire orthographic view)
    const geometry = new THREE.PlaneGeometry(2, 2);
    // Combine geometry and material into a renderable mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh); // Add mesh to the scene

    // Handle window resize events
    const handleResize = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      // Update renderer size
      renderer.setSize(viewport.width, viewport.height);
      // Update shader resolution uniform so effect scales properly
      material.uniforms.uResolution.value.set(viewport.width, viewport.height);
    };
    window.addEventListener("resize", handleResize);

    // Handle mouse movement for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-0.5 to 0.5)
      // Using lerp for smooth transitions (instant response with t=1)
      mouse.current.x = lerp(mouse.current.x, e.clientX / viewport.width - 0.5, 1);
      mouse.current.y = lerp(mouse.current.y, e.clientY / viewport.height - 0.5, 1);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Main animation loop - runs every frame (typically 60fps)
    const animate = () => {
      // Update time uniform for shader animation
      material.uniforms.uTime.value = clock.current.getElapsedTime();
      // Update mouse position uniform for interactive effects
      material.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
      // Render the scene
      renderer.render(scene, camera);
      // Schedule next frame
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup function - called when component unmounts
    return () => {
      // Remove event listeners to prevent memory leaks
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      // Dispose of WebGL resources
      renderer.dispose();
      // Remove canvas from DOM
      container.removeChild(renderer.domElement);
    };
  }, [containerRef]);
}
