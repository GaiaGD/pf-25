"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Custom React hook that creates a fullscreen liquid metal shader effect
// This hook manages WebGL rendering and mouse interaction for a liquid surface effect
export function useThreeLiquidMetal(containerRef: React.RefObject<HTMLDivElement>) {
  
  // React refs to store values that persist between renders but don't trigger re-renders
  const mouse = useRef({ x: 0, y: 0 }); // Current smooth mouse position (-0.5 to 0.5)
  const mouseVelocity = useRef({ x: 0, y: 0 }); // How fast mouse is moving (for trailing effects)
  const prevMouse = useRef({ x: 0, y: 0 }); // Previous mouse position (to calculate velocity)
  const stopTimeout = useRef<NodeJS.Timeout | null>(null); // Timer to detect when mouse stops

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Store current browser window dimensions for responsive canvas
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Helper function: Linear interpolation for smooth transitions
    const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

    // WebGL Renderer - This is what converts our 3D scene into 2D pixels on screen
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, // Allow transparency (background shows through)
      powerPreference: "high-performance" // Use dedicated graphics card if available
    });
    renderer.setSize(viewport.width, viewport.height); // Make canvas fill the screen
    // Limit pixel density to prevent lag on very high-DPI screens (like 4K+ displays)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement); // Add the canvas to our HTML container

    // Scene - Think of this as the "world" that contains our 3D objects
    const scene = new THREE.Scene();
    
    // Camera - This is like our "eyes" looking at the scene
    // Orthographic = no perspective (things don't get smaller with distance)
    // Perfect for 2D effects that cover the whole screen
    // Parameters: left, right, top, bottom, near, far (defines viewing area)
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    scene.add(camera);

    // Custom Shader Material - creates the liquid metal effect
    
    // Vertex Shader - determines the position of each vertex
    const vertex = `
      varying vec2 vUv; // Pass UV coordinates to fragment shader
      
      void main() {
        vUv = uv; // Forward texture coordinates
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Fragment Shader - determines the color of each pixel
    const fragment = `
      uniform vec2 uResolution; // Screen dimensions
      uniform vec2 uMouse; // Mouse position for interaction
      uniform vec2 uMouseVelocity; // Mouse velocity for trailing effects
      uniform float uFadeFactor; // Controls fade between effect and base color
      varying vec2 vUv; // UV coordinates from vertex shader
      
      void main() {
          // Convert UV coordinates to screen space
          vec2 screenPos = vUv * uResolution;
          // Calculate distance from mouse position
          float mouseDistance = length(screenPos - (uMouse + 0.5) * uResolution) / uResolution.x;
          
          // Start with untouched coordinates
          vec2 newUv = vUv.xy - 0.5; // Center the coordinates
          float len = 0.0; // Start with no base distortion
          
          // Calculate very gradual mouse influence with smooth falloff
          float mouseInfluence = exp(-mouseDistance * 12.0); // Smaller, more focused influence area
          
          // Calculate velocity magnitude for trailing intensity
          float velocityMag = length(uMouseVelocity);
          float trailStrength = min(velocityMag * 3.0, 1.0); // Scale velocity to trail strength
          
          // Create directional offset based on mouse movement
          vec2 trailDirection = normalize(uMouseVelocity + 0.001); // Prevent division by zero
          vec2 pixelToMouse = screenPos - (uMouse + 0.5) * uResolution;
          
          // Calculate how aligned this pixel is with the trail direction
          float trailAlignment = dot(normalize(pixelToMouse + 0.001), -trailDirection);
          float trailInfluence = max(0.0, trailAlignment) * trailStrength * mouseInfluence;
          
          // Scale coordinates with gradual influence + trailing effect
          float totalScale = 1.0 + mouseInfluence * 15.0 + trailInfluence * 8.0;
          newUv = newUv * totalScale;
          
          // Always apply some level of distortion, but scale it by mouse influence
          const int AMOUNT = 8; // Number of distortion iterations
          for(int i=0;i<AMOUNT;i++){
              len=length(vec2(newUv.x,newUv.y)); // Distance from center
              
              // Create trailing wave patterns
              float wavePhase = len * 0.5 + dot(newUv, trailDirection) * trailStrength * 2.0;
              float trailWave = sin(wavePhase) * trailInfluence * 0.8;
              
              // Apply distortions with trailing effects
              float distortionStrength = (mouseInfluence + trailInfluence * 0.5) * 0.9;
              newUv.x=newUv.x-cos(newUv.y+sin(len)) * distortionStrength + cos(uMouse.x * 8.0) * mouseInfluence + trailWave * trailDirection.x;
              newUv.y=newUv.y+sin(newUv.x+cos(len)) * distortionStrength + sin(uMouse.y * 8.0) * mouseInfluence + trailWave * trailDirection.y;
          }
          
          // Base calm color (untouched state) - dark metallic
          vec3 baseColor = vec3(0.1, 0.1, 0.12); // Dark blue-grey metallic
          
          // Very gradual color emergence with exponential falloff + trailing colors
          float colorIntensity = (mouseInfluence + trailInfluence * 0.6) * 0.4; // Enhanced with trail
          
          // Create color patterns that follow the trail
          float whiteArea = cos(len * 0.4 + uMouse.x * 4.0 + trailAlignment * 2.0) * colorIntensity;
          float redArea = cos(len * 0.7 + uMouse.y * 5.0 + trailAlignment * 2.5) * colorIntensity;
          float purpleArea = cos(len * 1.1 + uMouse.x * 3.5 + trailAlignment * 1.5) * colorIntensity;
          float greenArea = cos(len * 0.5 + uMouse.y * 6.5 + trailAlignment * 1.8) * colorIntensity;
          float yellowArea = cos(len * 1.0 + uMouse.x * 4.2 + trailAlignment * 2.2) * colorIntensity;
          float blueArea = cos(len * 0.8 + uMouse.y * 5.8 + trailAlignment * 1.9) * colorIntensity;
          
          // STEP 11: Define the actual colors (RGB values)
          // max(0.0, ...) ensures no negative colors
          vec3 white = vec3(0.6, 0.6, 0.6) * max(0.0, whiteArea);
          vec3 red = vec3(0.8, 0.2, 0.2) * max(0.0, redArea);
          vec3 purple = vec3(0.6, 0.2, 0.6) * max(0.0, purpleArea);
          vec3 green = vec3(0.2, 0.7, 0.3) * max(0.0, greenArea);
          vec3 yellow = vec3(0.8, 0.8, 0.2) * max(0.0, yellowArea);
          vec3 blue = vec3(0.2, 0.4, 0.8) * max(0.0, blueArea);
          
          // STEP 12: Combine all colors together
          vec3 mouseColors = white + red + purple + green + yellow + blue;
          // Apply fade factor to smoothly transition between effect and base color
          vec3 finalColor = baseColor + (mouseColors * uFadeFactor);
          
          // STEP 13: Output the final pixel color
          // gl_FragColor is the final color that appears on screen
          // vec4 = (red, green, blue, alpha) where alpha=1.0 means fully opaque
          gl_FragColor = vec4(finalColor, 1.);
      }
    `;

    // MATERIAL: Combines vertex and fragment shaders into something Three.js can use
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,   // Position calculation program
      fragmentShader: fragment, // Color calculation program
      // UNIFORMS: Variables we can change from JavaScript and pass to shaders
      uniforms: {
        uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) }, // Screen size
        uMouse: { value: new THREE.Vector2(mouse.current.x, mouse.current.y) }, // Mouse position
        uMouseVelocity: { value: new THREE.Vector2(0, 0) }, // Mouse speed/direction
        uFadeFactor: { value: 1.0 }, // Controls fade between effect and base color (1.0 = full effect, 0.0 = base only)
      },
    });

    // GEOMETRY: Create a rectangle that covers the entire screen
    // PlaneGeometry(2, 2) creates a 2x2 square
    // Combined with orthographic camera (-1 to 1), this covers the full screen
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // MESH: Combines geometry (shape) + material (appearance) into a renderable object
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh); // Add to the 3D scene

    // EVENT HANDLER: Resize canvas when browser window changes size
    const handleResize = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      renderer.setSize(viewport.width, viewport.height); // Resize the canvas
      // Update shader so it knows the new screen dimensions
      material.uniforms.uResolution.value.set(viewport.width, viewport.height);
    };
    window.addEventListener("resize", handleResize);

    // Handle mouse movement for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-0.5 to 0.5)
      const targetX = e.clientX / viewport.width - 0.5;
      const targetY = -(e.clientY / viewport.height - 0.5); // Invert Y for intuitive movement
      
      // Calculate velocity (difference from previous position)
      const newVelX = targetX - prevMouse.current.x;
      const newVelY = targetY - prevMouse.current.y;
      
      // Check if mouse is actually moving (with small threshold)
      const movementThreshold = 0.001;
      const isMoving = Math.abs(newVelX) > movementThreshold || Math.abs(newVelY) > movementThreshold;
      console.log("Mouse moving:", isMoving);
      if (isMoving) {
        // Clear any existing timeout
        if (stopTimeout.current) {
          clearTimeout(stopTimeout.current);
          stopTimeout.current = null;
        }
        
        // Update velocity and position
        mouseVelocity.current.x = newVelX;
        mouseVelocity.current.y = newVelY;
        prevMouse.current.x = targetX;
        prevMouse.current.y = targetY;
        
        // Smooth mouse position
        mouse.current.x = lerp(mouse.current.x, targetX, 0.4);
        mouse.current.y = lerp(mouse.current.y, targetY, 0.4);
        
        // Update shader uniforms and render
        material.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
        material.uniforms.uMouseVelocity.value.set(mouseVelocity.current.x, mouseVelocity.current.y);
        material.uniforms.uFadeFactor.value = 1.0; // Restore full effect when moving
        renderer.render(scene, camera);
        
        // Set timeout to start fade-out when movement stops
        stopTimeout.current = setTimeout(() => {
          // Immediately reset velocity to stop trailing effects
          mouseVelocity.current.x = 0;
          mouseVelocity.current.y = 0;
          material.uniforms.uMouseVelocity.value.set(0, 0);
          
          // Start smooth fade-out animation
          const fadeOut = () => {
            const currentFade = material.uniforms.uFadeFactor.value;
            const newFade = lerp(currentFade, 0.0, 0.03); // Gradually fade to 0
            
            material.uniforms.uFadeFactor.value = newFade;
            renderer.render(scene, camera);
            
            // Continue fading if not close enough to target
            if (newFade > 0.01) {
              requestAnimationFrame(fadeOut);
            } else {
              // Ensure complete fade
              material.uniforms.uFadeFactor.value = 0.0;
              renderer.render(scene, camera);
            }
          };
          fadeOut();
        }, 100); // Start fade after 100ms of no movement
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initial render to show the calm surface when component first loads
    renderer.render(scene, camera);

    // CLEANUP FUNCTION: Called when component unmounts (user navigates away)
    // Important to prevent memory leaks!
    return () => {
      window.removeEventListener("resize", handleResize); // Remove event listeners
      window.removeEventListener("mousemove", handleMouseMove);
      if (stopTimeout.current) { // Clear any pending timers
        clearTimeout(stopTimeout.current);
      }
      renderer.dispose(); // Tell WebGL to free up GPU memory
      container.removeChild(renderer.domElement); // Remove canvas from HTML
    };
  }, [containerRef]); // useEffect dependency - run when containerRef changes
}
