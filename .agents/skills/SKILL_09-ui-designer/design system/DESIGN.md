# DESIGN SYSTEM BLUEPRINT: "Dark Neon Glass"



## Aesthetic Overview (Visual Style & Vibe)

*   **Aesthetic Direction:** **Dark Mode Glassmorphism combined with Abstract Neon Glow.** The interface exudes a futuristic, hi-tech, and AI-centric vibe. 

*   **Core Principle:** Instead of using traditional black drop shadows to create depth, this design utilizes **light leaks and radial glows** emanating from the background, shining through frosted glass surfaces to create spatial layers.





## 1. Global Design Tokens



### Color System

This interface does not rely on flat, opaque grays. Instead, it uses translucent overlays (opacities) layered over a highly illuminated background.



*   **Background (Canvas):**

    *   `Bg-Base`: `#030303` (Near-absolute black, providing infinite depth).

    *   `Bg-Glow-Primary`: `#FF4D00` (Vibrant Orange / Red-Orange) - Used as massive, heavily blurred radial gradients behind elements.

    *   `Bg-Glow-Secondary`: `#003344` (Dark Teal) - Subtle background glow positioned in opposing corners to balance color temperature.

*   **Primary Accent:**

    *   `Primary-Solid`: `#FF5500` (Bright Orange used for logos, solid badges, and highlight borders).

*   **Surfaces (Glassmorphism):**

    *   `Surface-1`: `rgba(255, 255, 255, 0.03)` (Used for translucent node cards).

    *   `Surface-2`: `rgba(25, 25, 25, 0.4)` (Used for ghost/glass buttons).

*   **Borders:**

    *   `Border-Light`: `rgba(255, 255, 255, 0.12)` (Essential hairline border for all cards/buttons).

    *   `Border-Glow`: `rgba(255, 77, 0, 0.5)` (Glowing orange border for active states or focal points).

*   **Text:**

    *   `Text-Primary`: `#FFFFFF` (Pure white, used for headings and primary actions).

    *   `Text-Secondary`: `#A0AEC0` or `rgba(255, 255, 255, 0.6)` (Soft gray, used for subtitles, descriptions, and small labels).

    *   `Text-Gradient`: Linear gradient from `#FFFFFF` to `#FFD3B6` (Applied subtly to the main H1 "Business With AI Automation").



### Typography & Shape

*   **Font Family:** Modern Geometric Sans-Serif. Recommended: **Inter, Plus Jakarta Sans, or Outfit**.

*   **Weight Hierarchy:**

    *   Headings (H1, H2): `Semi-Bold (600)` or `Bold (700)` with slight negative tracking (`-1%` to `-2%`) for a tighter, premium feel.

    *   Body / Buttons / Labels: `Regular (400)` or `Medium (500)`.

*   **Structural Shapes (Border Radius):**

    *   `Radius-Sm`: `8px` (For inner icon wrappers inside cards).

    *   `Radius-Md`: `12px` to `16px` (Standard for AI Workflow Nodes and rectangular buttons).

    *   `Radius-Pill`: `9999px` (For badges like "Whats new" or the "Watch Demo" button).



### Effects & Depth

*   **Glassmorphism:** Crucial to the aesthetic. Achieved using `backdrop-filter: blur(12px)`.

*   **Glow over Shadow:** 

    *   Avoid dark `box-shadow`.

    *   Use colored glows: `box-shadow: 0 0 20px rgba(255, 77, 0, 0.15)` to make blocks appear as if they are radiating light.

*   **Connection Lines:** Used to connect nodes. `border-bottom: 1px solid rgba(255, 255, 255, 0.2)` combined with linear gradients to fade them out at the edges.





## 2. Component Blueprints



### 2.1. Buttons

The system utilizes two primary button styles:



**A. Solid Pill Badge/Button (e.g., "Whats new"):**

*   **Background:** `#FF5500`

*   **Text:** `#FFFFFF`, Font-weight: `500`, Small size (12-14px).

*   **Border-radius:** `9999px` (Fully rounded).

*   **Padding:** `6px 16px`.



**B. Glass Ghost Button (e.g., "Get Started", "Watch Demo"):**

*   **Background:** `rgba(25, 25, 25, 0.4)`

*   **Border:** `1px solid rgba(255, 255, 255, 0.15)`

*   **Backdrop-filter:** `blur(8px)`

*   **Text:** `#FFFFFF`, Font-weight: `500`.

*   **Hover State:** Background lightens to `rgba(255, 255, 255, 0.08)`, border transitions to `1px solid rgba(255, 77, 0, 0.5)` with a subtle inner glow.



### 2.2. Cards & Surfaces (Workflow Nodes)

The rectangular blocks displaying workflow steps (e.g., "AI AGENT", "WhatsApp Trigger").

*   **Container Styling:**

    *   **Background:** `rgba(15, 15, 15, 0.5)`

    *   **Border:** `1px solid rgba(255, 255, 255, 0.1)` (This thin border is the soul of the glass effect).

    *   **Border-radius:** `14px`.

    *   **Padding:** `12px 16px`.

*   **Inner Layout:** Flexbox row. The left side contains an icon wrapped in a `Radius-Sm` (8px) box with a slightly lighter background (`rgba(255, 255, 255, 0.05)`). The right side contains stacked text (Title in white, Sub-title in secondary gray, 11px).



### 2.3. Special Focal Badge (Glowing Pill)

Seen in the center "AI-Powered Business Automation" badge:

*   **Background:** A fading gradient `linear-gradient(90deg, rgba(255, 77, 0, 0.2) 0%, rgba(0,0,0,0) 100%)`.

*   **Border:** `1px solid rgba(255, 77, 0, 0.6)`.

*   **Text:** Tinted orange `#FFB899` with a glowing star/sparkle SVG icon.



## 3. Style Replication Guidelines



To guarantee future designs match this exact aesthetic, you **MUST** adhere to these 4 strict rules:



1.  **The "No Flat Grays" Rule:** UI surfaces (cards, buttons, dropdowns) must never use flat hex colors like `#222222`. You must rely on a pure black/dark canvas and use White or Dark translucent opacities (2% to 15%) combined with `backdrop-filter: blur()`. This allows the ambient background light to bleed through correctly.

2.  **The "Hairline Border" Rule:** Every single UI block must have a `1px solid rgba(255, 255, 255, 0.1)` border. Without this stroke, the "glass" effect fails entirely, and elements will bleed into the dark background, losing their defined shape.

3.  **Glow Behind, Sharp In Front:** Do not create depth by casting dark shadows from UI elements. Instead, place massive, heavily blurred (`blur > 150px`) radial gradients on the bottom background layer. Place your sharp, bordered UI elements on top of these glows to create the illusion of depth.

4.  **Strict Text Contrast Hierarchy:** Pure white (`#FFFFFF`) at 100% opacity is strictly reserved for H1/H2 titles and primary button text. All supporting text, descriptions, and secondary labels must be throttled down to 50-60% opacity to prevent them from competing with the main focal points and neon highlights.

---