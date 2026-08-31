DESIGN A COMPLETE RESPONSIVE WEB PHOTOBOOTH UI/UX PROTOTYPE

PROJECT NAME:
FIK PHOTOBOOTH

EVENT:
PKKMB FAKULTAS ILMU KOMPUTER

============================================================
IMPORTANT — READ BEFORE GENERATING ANYTHING
============================================================

I am designing a REAL web photobooth application.

This is NOT a normal photo gallery website.

The main experience is:

CHOOSE FRAME
↓
USE THIS FRAME
↓
PHOTOBOOTH
↓
ENABLE CAMERA
↓
LIVE CAMERA
↓
TAKE PHOTO
↓
PHOTO GOES INTO THE CORRECT FRAME PHOTO AREA
↓
NEXT PHOTO
↓
TAKE PHOTO
↓
PHOTO GOES INTO THE NEXT FRAME PHOTO AREA
↓
NEXT PHOTO
↓
ALL FRAME PHOTO AREAS ARE FILLED
↓
FINAL PHOTO
↓
QR CODE
↓
DOWNLOAD

The interface must visually communicate this workflow clearly.

I have attached a reference sheet containing the actual frame designs from my project:

FIK_PHOTOBOOTH_FRAME_REFERENCE.png

The reference sheet contains the real frame designs grouped into:

AESTHETIC
CUTE
FIK
FUN
RETRO
Y2K

USE THIS REFERENCE SHEET ONLY TO UNDERSTAND THE REAL FRAME DESIGNS, VISUAL STYLE, VARIATIONS, PHOTO AREAS, PROPORTIONS, AND DIFFERENT SLOT LAYOUTS.

DO NOT redesign the frame artwork.

DO NOT create replacement frames.

DO NOT invent a generic frame design.

DO NOT simplify the frames.

DO NOT turn every frame into the same 3-photo layout.

The frame artwork belongs to the existing project and must remain unchanged.

============================================================
EXISTING PROJECT ASSET STRUCTURE
============================================================

The real website already has:

assets/frames/

with:

assets/frames/aesthetic/
assets/frames/cute/
assets/frames/fik/
assets/frames/fun/
assets/frames/retro/
assets/frames/y2k/

Naming convention:

Aesthetic:
aesthetic1.png
aesthetic2.png
aesthetic3.png
aesthetic4.png
aesthetic5.png

Cute:
cute1.png
cute2.png
cute3.png
cute4.png
cute5.png

FIK:
fik1.jpg
fik2.jpg
fik3.jpg
fik4.jpg
fik5.jpg
fik6.jpg
fik7.jpg

Fun:
fun1.png
fun2.png
fun3.png
fun4.png
fun5.png

Retro:
retro1.png
retro2.png
retro3.png
retro4.png
retro5.png

Y2K:
y2k1.png
y2k2.png
y2k3.png
y2k4.png
y2k5.png

IMPORTANT:

FIK uses JPG.

The other frame groups use PNG.

Do not change these file formats.

Do not rename them.

Do not move them.

Do not modify them.

============================================================
CORE PRODUCT GOAL
============================================================

The final product should feel like a polished commercial photobooth web application.

It should NOT feel like:

- a student dashboard
- an admin panel
- a generic AI-generated landing page
- a camera demo
- a simple image gallery
- a frame selector with unrelated camera controls

It should feel like:

A REAL DIGITAL PHOTOBOOTH.

The user should immediately understand:

1. Choose a frame.
2. Start camera.
3. Take photos.
4. Photos automatically fill the selected frame.
5. Finish the photobooth.
6. Get the final photo.
7. Scan QR.
8. Download.

============================================================
VISUAL DESIGN DIRECTION
============================================================

Style:

MODERN
MINIMAL
PREMIUM
CLEAN
ELEGANT
PLAYFUL
PROFESSIONAL
YOUTHFUL

Target audience:

University students participating in PKKMB.

The design should feel fun enough for students while remaining polished and professional.

Use:

Poppins

Typography should have clear hierarchy.

Use:

- large bold headings
- readable body text
- compact labels
- clear buttons
- comfortable spacing

Color direction:

Primary:
#6C63FF

Accent:
#D946EF

Background:
soft lavender / white

Text:
dark navy

Camera:
dark navy / near-black

Result:
dark premium background

Do not overuse gradients.

Use gradients only as subtle accents.

Use:

- soft shadows
- subtle borders
- rounded corners
- smooth transitions
- hover states
- active states
- focus states
- clean cards
- whitespace

Avoid excessive glassmorphism.

============================================================
GLOBAL NAVIGATION
============================================================

Create a consistent navbar across the main pages.

Brand:

FIK

FIK PHOTOBOOTH

PKKMB FAKULTAS ILMU KOMPUTER

Navigation:

Home
Frames
How It Works
Gallery
About

Primary CTA:

Start Photobooth

On mobile:

use hamburger navigation.

Mobile menu must:

- open smoothly
- have opaque background
- have high z-index
- close when a navigation item is selected
- close when clicking outside
- have accessible close behavior

============================================================
PAGE 1 — HOME
============================================================

Create a polished landing page.

Hero:

FIK PHOTOBOOTH

Capture Your PKKMB Moments.

Supporting text:

Choose a frame, take your photos, and create your own photobooth memory.

Primary CTA:

Start Photobooth

Secondary CTA:

Explore Frames

Hero visual should show the concept of a photobooth without inventing or redesigning the actual frame assets.

Include a preview section showing several REAL frame references.

Add sections:

Why FIK Photobooth
How It Works
Featured Frames
Final CTA

Keep the page clean.

============================================================
PAGE 2 — FRAMES
============================================================

This is the main frame selection page.

Heading:

Pick Your Frame.

Supporting text:

Find a frame that matches your vibe, preview it, then use it for your photobooth.

Category filter:

All
Aesthetic
Cute
FIK
Fun
Retro
Y2K

Frame cards must use the actual frame artwork from the attached reference.

Each card:

FRAME IMAGE

Favorite icon

Frame name

Category

Preview button

Select button

Example:

Aesthetic 1
Aesthetic

[ Preview ]

[ Select ]

The actual frame image must preserve its aspect ratio.

Never stretch it.

Never crop it unintentionally.

Never distort it.

============================================================
FRAME CARD RESPONSIVENESS
============================================================

Desktop:

3–4 columns depending on screen width.

Tablet:

2 columns.

Mobile:

1 column or 2 compact columns depending on available width.

Recommended:

320px:
1 column

375px:
1 column

390px:
1 column

414px:
1 column

768px:
2 columns

820px:
2 columns

1024px:
3 columns

1280px:
4 columns

1440px:
4 columns

1920px:
4 columns with controlled max-width

Do not allow the page to become excessively wide.

============================================================
FRAME PREVIEW MODAL
============================================================

When Preview is clicked:

open a centered modal.

Background:

dark translucent overlay.

Modal:

white / soft surface

Show:

large actual frame preview

Frame name

Category

Buttons:

Close

Use This Frame

The frame must maintain original proportions.

Do not distort it.

Mobile modal:

fit within viewport.

Do not cause horizontal scrolling.

============================================================
SELECT FRAME FLOW
============================================================

When the user selects:

Use This Frame

store the selected frame conceptually.

The selected frame should persist into the photobooth page.

Then navigate to:

photobooth.html

The selected frame must remain visible throughout the photobooth session.

============================================================
PAGE 3 — PHOTOBOOTH
============================================================

THIS IS THE MOST IMPORTANT PAGE.

The photobooth layout must prioritize the camera.

The conceptual order is:

CAMERA
↓
CAMERA CONTROLS
↓
PHOTO PROGRESS
↓
SELECTED FRAME / FRAME PREVIEW
↓
CAPTURE FLOW

On sufficiently wide desktop layouts, camera and frame preview may be placed side-by-side for efficiency.

However:

CAMERA MUST REMAIN THE PRIMARY AREA.

The frame must never dominate the camera experience.

On mobile:

CAMERA
↓
CONTROLS
↓
PROGRESS
↓
FRAME PREVIEW

============================================================
PHOTOBOOTH HEADER
============================================================

Top bar:

Back

✦ Photobooth

PHOTO 0 / X

Where X depends on the selected frame's required photo areas.

Do NOT hardcode the UI to always display 3 if the selected frame has a different number of photo areas.

============================================================
STEP INDICATOR
============================================================

Show:

01 Prepare
02 Capture
03 Preview
04 Finish

Current step should be visually highlighted.

Completed steps should have a completed state.

============================================================
PREPARE STATE
============================================================

Heading:

Ready?

Let's capture your moment.

Supporting text:

Position yourself inside the camera and get ready for your first shot.

Show:

camera preview area

camera placeholder before permission is granted

button:

Enable Camera

IMPORTANT:

Do not request camera permission before the user intentionally presses:

Enable Camera.

============================================================
CAMERA UI
============================================================

Camera container:

- dark
- rounded
- responsive
- stable aspect ratio
- no overflow
- no horizontal scrolling

Live video:

object-fit: cover

Maintain a comfortable portrait/landscape presentation.

Show camera status:

Camera inactive

or

Camera active

Use a small status indicator.

Controls:

Effects

Flip Camera

Capture

Buttons must be touch-friendly.

============================================================
CAMERA PERMISSION
============================================================

Before activation:

show:

Camera is ready

Allow camera access to start.

Button:

Enable Camera

After permission:

Camera Active

The interface should visually change to indicate that the camera is ready.

If permission fails:

show a clear error state.

Example:

We couldn't access your camera.

Please check your browser permissions and try again.

Provide:

Try Again

============================================================
CAPTURE BUTTON
============================================================

The main capture button must be visually prominent.

Use a large circular capture control.

It should feel like a real camera shutter.

Include a subtle interaction state:

hover
pressed
focus
disabled

============================================================
COUNTDOWN
============================================================

When Capture is pressed:

show a large countdown overlay over the camera:

3

then:

2

then:

1

then:

CAPTURE

Add a subtle flash/shutter effect.

Do not make the countdown too distracting.

============================================================
PHOTO CAPTURE LOGIC — UX
============================================================

The user takes photos ONE AT A TIME.

Never automatically take all photos.

Example:

PHOTO 1 / 3

Take Photo

↓

3
2
1

↓

PHOTO 1 CAPTURED

↓

Next Photo

Then:

PHOTO 2 / 3

Take Photo

↓

countdown

↓

PHOTO 2 CAPTURED

↓

Next Photo

Then:

PHOTO 3 / 3

Take Photo

↓

countdown

↓

PHOTO 3 CAPTURED

Then:

ALL PHOTOS COMPLETE.

============================================================
CRITICAL FRAME SLOT EXPERIENCE
============================================================

This is the MOST IMPORTANT visual rule.

The user's captured photo must visually enter the correct existing empty photo area of the selected frame.

The empty photo areas are part of the original frame artwork.

DO NOT create generic slots.

DO NOT create checkerboard slots.

DO NOT create gray boxes.

DO NOT create transparent CSS rectangles.

DO NOT create fake placeholders.

DO NOT create a new frame around the photo.

The actual frame artwork is the source of truth.

============================================================
FRAME SLOT DIFFERENCES
============================================================

Different frames may have:

2 photo areas
3 photo areas
4 photo areas
6 photo areas
9 photo areas

Do not assume a fixed number.

Different frames may also have:

- different slot positions
- different slot sizes
- different aspect ratios
- different rotations
- different decorative borders
- irregular compositions

The UI must respect the actual selected frame.

============================================================
EXAMPLE
============================================================

If the selected frame has 3 empty photo areas:

Initial:

FRAME

Slot 1 = empty
Slot 2 = empty
Slot 3 = empty

After first capture:

FRAME

Slot 1 = PHOTO 1
Slot 2 = empty
Slot 3 = empty

After second capture:

FRAME

Slot 1 = PHOTO 1
Slot 2 = PHOTO 2
Slot 3 = empty

After third capture:

FRAME

Slot 1 = PHOTO 1
Slot 2 = PHOTO 2
Slot 3 = PHOTO 3

The user should SEE this progression.

============================================================
PHOTO MUST NOT LEAVE THE FRAME
============================================================

The captured person must stay inside the photo area.

The photo must be cropped to the area.

The person's face/body must not visually spill outside the frame.

Do not simply put:

<img>

on top of the frame.

The photo needs to be visually clipped to the corresponding photo area.

============================================================
FRAME DECORATION MUST STAY VISIBLE
============================================================

If the frame contains:

- flowers
- ribbons
- stickers
- borders
- lace
- patterns
- text
- decorative objects
- ornaments

those elements must remain visible.

The photo should appear BEHIND the frame decorations.

The result should look naturally integrated.

============================================================
PHOTO CROP BEHAVIOR
============================================================

Photos from the camera may have a different aspect ratio than the frame's photo area.

Use a COVER-style crop.

The image should:

- fill the slot
- preserve aspect ratio
- avoid stretching
- avoid distortion
- avoid empty gaps

If the photo area is vertical:

crop vertically.

If horizontal:

crop horizontally.

If tilted:

follow the same orientation.

============================================================
LIVE FRAME PREVIEW
============================================================

After every capture, immediately update the selected frame preview.

The user should not have to wait until the final screen to see the photo inserted.

Progress example:

PHOTO 0 / 3

→ all empty

PHOTO 1 / 3

→ slot 1 filled

PHOTO 2 / 3

→ slots 1 and 2 filled

PHOTO 3 / 3

→ all filled

============================================================
NEXT PHOTO
============================================================

After each successful capture:

show:

Retake

Next Photo →

Retake:

allows the user to replace ONLY the current photo.

Next Photo:

moves to the next required photo.

The camera should remain available.

Do not force the user to request camera permission again.

============================================================
CAMERA SESSION
============================================================

The camera stream should conceptually remain active during the entire photo session.

Do not make the user repeatedly enable the camera.

Do not restart the camera unnecessarily after every photo.

============================================================
EFFECTS
============================================================

Create an Effects control.

Panel should contain:

Original
Brighten
Darken
Warm
Cool
Blur
Sharpen
Beauty
Contrast

The active effect should have a clear active state.

Important:

Effects apply ONLY to captured photos.

Effects must NEVER modify the frame artwork.

Desktop:

modal/popover panel.

Mobile:

bottom sheet or mobile modal.

The panel must remain within the viewport.

============================================================
FLIP CAMERA
============================================================

Provide:

Flip Camera

The interface should communicate that the user can switch between front/rear cameras when supported.

Do not visually fake the functionality.

============================================================
PHOTO PROGRESS
============================================================

Show clear progress:

PHOTO 1 / 3
PHOTO 2 / 3
PHOTO 3 / 3

or dynamically:

PHOTO 1 / 4
PHOTO 2 / 4
etc.

The number is determined by the selected frame configuration.

Never add:

1 Photo
3 Photos
4 Photos

buttons to manually choose the number.

The frame determines the number.

============================================================
FINAL CAPTURE STATE
============================================================

When all required photo areas are filled:

disable the Capture button.

Show:

PHOTO COMPLETE

Then move to:

PREVIEW

Do not allow another unnecessary capture.

============================================================
PREVIEW SCREEN
============================================================

Heading:

YOUR PHOTOS

Almost there! ✦

Supporting text:

Your photobooth composition is ready to review.

Show ONE completed frame composition.

It must contain:

actual selected frame
+
captured photos
+
correct positions
+
correct cropping
+
correct rotation

Do not show the photos as unrelated thumbnails.

A small thumbnail strip may exist for navigation, but the main preview must always be the complete composited frame.

Buttons:

Start Over

Create Photo →

============================================================
FINAL RESULT SCREEN
============================================================

Background:

dark premium.

Heading:

YOUR MOMENT

It's yours. ♡

Supporting text:

Your photobooth result is ready.

Display:

large final photobooth image.

The final image must be:

ONE COMPLETE IMAGE.

Not:

frame + photos separately.

The visual result must look like a finished printed photobooth image.

============================================================
RESULT ACTIONS
============================================================

Primary:

Download Photo

Secondary:

QR Code

Secondary:

Take Another

Secondary:

Change Frame

Buttons should have clear hierarchy.

============================================================
QR CODE
============================================================

Create a QR Code presentation for the final photo.

Concept:

FINAL PHOTO
↓
QR CODE
↓
SCAN WITH PHONE
↓
OPEN PHOTO
↓
DOWNLOAD

The QR should represent a real final-image URL in the eventual website implementation.

For this Figma prototype:

show the QR state and the intended interaction clearly.

Do NOT use a decorative QR code that looks functional but has no purpose.

Label it clearly:

Scan to Get Your Photo

============================================================
DOWNLOAD
============================================================

The download button must communicate:

Download Photo

The actual website implementation will download the FINAL COMPOSITED IMAGE.

It must NOT download:

- raw camera photo
- original frame
- incomplete frame
- individual slot image

============================================================
TAKE ANOTHER
============================================================

When:

Take Another

is selected:

start a fresh photobooth session.

Reset:

captured photos
photo progress
current slot
countdown
preview state

Keep the selected frame unless the user chooses Change Frame.

============================================================
CHANGE FRAME
============================================================

Change Frame returns the user to:

Frames page.

The current session may be discarded after confirmation if necessary.

============================================================
SELECTED FRAME PANEL
============================================================

Show a compact selected-frame panel.

Example:

SELECTED FRAME

[actual frame thumbnail]

Aesthetic 3

Aesthetic

Change Frame

On mobile:

make this compact.

Do not let it consume too much vertical space.

============================================================
HOW IT WORKS PAGE
============================================================

Create:

How It Works

Steps:

01
Choose Your Frame

02
Allow Camera

03
Take Your Photos

04
Customize Effects

05
Get Your Photo

Use simple visual illustrations/icons.

Keep it consistent with the photobooth design.

============================================================
GALLERY PAGE
============================================================

Create a responsive gallery.

Use a clean modern masonry/grid style.

Do not invent additional frame artwork.

If placeholder gallery images are necessary for the prototype, keep them visually neutral and clearly separate from the official frame assets.

============================================================
ABOUT PAGE
============================================================

Create:

FIK PHOTOBOOTH

Fakultas Ilmu Komputer

PKKMB

Include a short explanation of the experience.

Keep the visual style consistent.

============================================================
MOBILE RESPONSIVENESS
============================================================

MUST work at:

320px
375px
390px
414px

Mobile layout:

navbar hamburger

camera first

controls below camera

progress below controls

frame preview below progress

buttons full-width where appropriate

touch targets at least comfortable for mobile interaction

No:

horizontal scrolling

overflowing modal

cut-off buttons

text overflow

frame distortion

============================================================
TABLET RESPONSIVENESS
============================================================

Must work at:

768px
820px
1024px

Use flexible layouts.

Do not simply use the desktop layout at smaller scale.

============================================================
DESKTOP RESPONSIVENESS
============================================================

Must work at:

1280px
1440px
1920px

Use:

max-width

centered content

comfortable spacing

large camera preview

balanced frame preview

Do not allow content to stretch endlessly.

============================================================
ACCESSIBILITY
============================================================

Buttons must have clear labels.

Use sufficient contrast.

Do not rely only on color.

Focus states should be visible.

Touch targets should be comfortable.

============================================================
ICON SYSTEM
============================================================

Use Lucide-style icons.

Icons needed:

menu
close
camera
heart
arrow
refresh
help
sparkles
download
qr-code
image
effects
flip-camera
check
eye

Keep icon style consistent.

============================================================
FIGMA PROTOTYPE INTERACTIONS
============================================================

Create interactive prototype flow:

HOME
→ Start Photobooth
→ FRAMES

FRAMES
→ Preview
→ Preview Modal

Preview Modal
→ Use This Frame
→ PHOTOBOOTH

PHOTOBOOTH
→ Enable Camera
→ Camera Active

Camera Active
→ Take Photo

Take Photo
→ Countdown

Countdown
→ Captured Photo

Captured Photo
→ Retake
or
→ Next Photo

Next Photo
→ Next Capture

Final Capture
→ Preview

Preview
→ Create Photo

Create Photo
→ Final Result

Final Result
→ Download Photo

Final Result
→ QR Code

Final Result
→ Take Another

Final Result
→ Change Frame

============================================================
MICRO INTERACTIONS
============================================================

Use subtle:

hover
press
focus
fade
scale
slide
modal transitions

Do not over-animate.

The product should feel smooth and premium.

============================================================
IMPORTANT FRAME RULES — REPEAT
============================================================

THE ATTACHED FRAME REFERENCE IS THE SOURCE OF TRUTH.

DO NOT:

- redesign frames
- recreate frames
- invent frame artwork
- create generic frames
- create fake slots
- create checkerboard slots
- create gray placeholders
- use one universal 3-slot layout
- crop the original frame unnecessarily
- stretch the original frame
- change frame colors
- change frame decorations
- replace FIK JPG assets with PNG
- make all frames look identical

DO:

- respect each frame's original composition
- preserve aspect ratio
- identify the actual intended photo areas
- treat those areas as photo slots
- place captured photos inside those areas
- keep frame decorations visible
- support different slot counts
- support different slot positions
- support different slot sizes
- support different slot rotations
- make the result look integrated

============================================================
MOST IMPORTANT VISUAL REQUIREMENT
============================================================

The user must look like they are actually INSIDE the frame.

NOT:

person outside frame

NOT:

person next to frame

NOT:

person floating above frame

NOT:

photo covering the entire frame

NOT:

photo covering decorations

NOT:

checkerboard box

NOT:

generic placeholder

The correct visual result is:

ACTUAL FRAME
+
USER PHOTO INSIDE EXISTING PHOTO AREA
+
FRAME DECORATIONS REMAIN VISIBLE

This should look like a real finished photobooth print.

============================================================
DESIGN VALIDATION
============================================================

Before finalizing the prototype, inspect the attached frame reference and ensure that the photobooth UI can accommodate visually different frame layouts.

At minimum, demonstrate the prototype using representative frames from:

Aesthetic
Cute
FIK
Fun
Retro
Y2K

Do not use the exact same generic slot composition for every category.

============================================================
FINAL PRODUCT FLOW
============================================================

The final UX must communicate:

FRAMES
↓
SELECT FRAME
↓
USE THIS FRAME
↓
PHOTOBOOTH
↓
ENABLE CAMERA
↓
CAMERA LIVE
↓
TAKE PHOTO
↓
COUNTDOWN
↓
PHOTO 1 → FRAME SLOT 1
↓
NEXT PHOTO
↓
CAMERA LIVE
↓
TAKE PHOTO
↓
PHOTO 2 → FRAME SLOT 2
↓
NEXT PHOTO
↓
CAMERA LIVE
↓
TAKE PHOTO
↓
PHOTO N → FRAME SLOT N
↓
ALL SLOTS FILLED
↓
PREVIEW
↓
CREATE PHOTO
↓
FINAL PHOTO
↓
QR CODE
↓
DOWNLOAD

============================================================
FINAL INSTRUCTION
============================================================

Create the complete FIK PHOTOBOOTH responsive UI/UX prototype.

Prioritize:

1. Correct photobooth workflow.
2. Real frame asset usage.
3. Correct frame/photo relationship.
4. Responsive design.
5. Premium visual quality.
6. Clear interaction hierarchy.
7. Realistic photobooth experience.

Do not solve the problem by inventing new frame designs.

The frame assets are already finished.

Your job is to design the WEBSITE EXPERIENCE around those assets.

The result should feel like a professional photobooth product, not a generic website template.