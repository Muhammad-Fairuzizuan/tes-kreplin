---
name: Cognitive Focus
colors:
  surface: '#f6fafe'
  surface-dim: '#d6dade'
  surface-bright: '#f6fafe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f4f8'
  surface-container: '#eaeef2'
  surface-container-high: '#e4e9ed'
  surface-container-highest: '#dfe3e7'
  on-surface: '#171c1f'
  on-surface-variant: '#45474c'
  inverse-surface: '#2c3134'
  inverse-on-surface: '#edf1f5'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#516072'
  on-secondary: '#ffffff'
  secondary-container: '#d2e1f7'
  on-secondary-container: '#556477'
  tertiary: '#051426'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b293c'
  on-tertiary-container: '#8290a7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#d4e4fa'
  secondary-fixed-dim: '#b9c8de'
  on-secondary-fixed: '#0d1c2d'
  on-secondary-fixed-variant: '#39485a'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#f6fafe'
  on-background: '#171c1f'
  surface-variant: '#dfe3e7'
typography:
  display-score:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-timer:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 32px
  calculation-lg:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.04em
  calculation-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
  heading-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-padding: 24px
  numpad-gap: 12px
  touch-target-min: 64px
  section-margin: 32px
---

## Brand & Style
The design system focuses on high-performance mental clarity and rapid tactile response. The brand personality is clinical, efficient, and athletic—treating mental arithmetic as a competitive discipline. The UI evokes a "flow state" through a stripped-back, high-contrast aesthetic that minimizes cognitive load. 

The design style is **Modern Minimalist** with **Tactile** influences. It utilizes heavy whitespace to isolate mathematical problems, paired with large, high-elevation surfaces that prioritize physical interaction. Every element is designed to facilitate speed, using clear depth cues to indicate touch-readiness.

## Colors
The palette is built on a "Slate" foundation to provide a sophisticated, low-strain environment for intense concentration.

*   **Background (Neutral):** #f1f5f9 (Slate 100). Provides a clean, soft canvas that reduces eye fatigue during long sessions.
*   **Primary Text/Headers:** #334155 (Slate 700). High contrast for readability without the harshness of pure black.
*   **Secondary Text:** #94a3b8 (Slate 400). Used for hints, labels, and inactive states.
*   **Action/Numpad:** #1e293b (Slate 800) background with #ffffff (White) text. High-contrast inversion to clearly separate input zones from the display area.

## Typography
This design system employs a dual-font strategy:
1.  **Hanken Grotesk:** A clean, contemporary sans-serif used for general UI and the primary calculation display. Its high X-height ensures numbers are instantly recognizable.
2.  **JetBrains Mono:** A high-contrast monospaced font used for the score and timer. The fixed width prevents "jittering" layouts as numbers increment rapidly, maintaining a stable visual anchor.

Text for arithmetic problems should use the `calculation-lg` style to dominate the visual hierarchy. All monospaced labels should be set in uppercase for a technical, data-driven feel.

## Elevation & Depth
Depth is used functionally to differentiate between "Display" and "Interaction" surfaces. 

*   **Display Area:** Flat or slightly inset (inner shadow) to feel like a screen or chalkboard.
*   **Interactive Cards/Numpad Keys:** Use high-elevation ambient shadows. Shadows should be extra-diffused with a Slate-tinted hue (`rgba(30, 41, 59, 0.12)`).
*   **Active State:** When a numpad key is pressed, it should "depress" visually by removing the shadow and applying a subtle 2px downward translate, providing tactile feedback to the user.

## Shapes
The design system uses a very rounded shape language to soften the clinical feel of the Slate palette.

*   **Container Cards:** Use `rounded-2xl` (1.5rem / 24px) to create a friendly, modern frame for the data.
*   **Numpad Keys:** Use `rounded-xl` (1rem / 16px) to maximize the inner surface area for touch while maintaining the overall design language.
*   **Progress Bars:** Use fully rounded (pill-shaped) caps for a smooth, continuous feel.

## Components

### Numpad Keys
The core of the app. Keys are `Slate 800` backgrounds with `White` `JetBrains Mono` text. They must have a high-elevation shadow that disappears on tap. 

### Calculation Display
Large, bold `Hanken Grotesk` numbers. For incorrect answers, the text should briefly pulse in a muted red; for correct answers, a subtle scale-up effect should be applied.

### Score & Timer Chips
Small, `rounded-lg` containers with a `Slate 200` background. They use `JetBrains Mono` for the values to ensure the characters stay centered as they change.

### Result Cards
Post-game summaries should use the `rounded-2xl` card style with a white background and a heavy `Slate 800` border (2px) to distinguish them from the gameplay background.

### Progress Indicator
A thin line at the very top of the screen (0px roundedness) that fills the width of the viewport to indicate time remaining or progress through a set.