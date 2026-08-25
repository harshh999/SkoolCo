# Skool Canvas

{
"project": {
"name": "Skool Company",
"type": "Single-page creative agency website",
"goal": "Create a premium, highly creative, editorial-style website for Skool Company that feels like a modern independent creative agency. The website should have strong typography, generous whitespace, bold visual compositions, smooth GSAP motion and excellent responsiveness."
},
"important_context": {
"existing_website": "https://www.skool.company/",
"reference_websites": [
"https://homy.framer.media/",
"https://www.humaan.com/"
],
"visual_references": [
"The Stay style floating navbar",
"Clay-inspired hero composition: large typography on the left and abstract visual artwork on the right",
"Homy-inspired text reveal and editorial spacing",
"Humaan-inspired large hero typography followed by a visual section that expands to full screen on scroll"
],
"critical_instruction": "Use these websites only as visual and interaction inspiration. Do not clone layouts or assets exactly. Create an original Skool Company design."
},
"site_structure": {
"type": "Single-page scrolling website",
"navigation_items": [
"Home",
"Work",
"Services",
"About"
],
"cta": "say hello !",
"sections": [
"Home / Hero",
"Full-screen expanding featured visual",
"Brand statement / introduction",
"Clients logo marquee",
"Work / Featured projects",
"Services",
"About",
"Contact",
"Footer"
]
},
"design_system": {
"overall_style": [
"Minimal",
"Creative",
"Editorial",
"Premium",
"Modern",
"Independent creative agency",
"Strong typography",
"Generous whitespace"
],
"background": {
"primary": "#E9E8E5",
"description": "Warm off-white / very light grey background with extremely subtle texture or soft gradients."
},
"primary_text": "#17191D",
"secondary_text": "#686B70",
"accent_usage": "Use accent colours sparingly and primarily inside the abstract SVG artwork.",
"borders": "Very subtle light borders.",
"shadows": "Soft and restrained.",
"border_radius": "Large rounded corners where appropriate, especially navigation and visual containers.",
"glassmorphism": {
"enabled": true,
"usage": "Use only where appropriate, especially navigation and selected floating elements. Keep it subtle and premium.",
"avoid": "Do not cover the entire website with glassmorphism."
}
},
"navbar": {
"style": "Floating rounded pill navigation inspired by The Stay reference.",
"initial_position": "Centered horizontally near the top of the viewport.",
"initial_state": {
"width": "Compact content-based width",
"background": "Semi-transparent off-white glass",
"backdrop_blur": true,
"border": "Subtle",
"border_radius": "999px"
},
"content": {
"left": {
"type": "Skool Company logo",
"instruction": "Use the uploaded Skool logo asset."
},
"center": [
"Home",
"Work",
"Services",
"About"
],
"right": {
"text": "say hello !",
"style": "Dark pill button with small arrow or subtle icon."
}
},
"behavior": {
"on_home": "The navbar remains compact and centered as a floating pill.",
"on_scroll_below_hero": "The navbar smoothly expands horizontally into a wider navigation bar.",
"animation": "Animate width, padding, spacing, border radius and position smoothly using GSAP.",
"active_state": "Navigation item should reflect the current section when scrolling.",
"important": [
"The navbar must never jump.",
"The logo must never leave the viewport.",
"The CTA must never disappear outside the frame.",
"Do not use abrupt display:none transitions.",
"All elements should interpolate smoothly during expansion."
]
},
"mobile": {
"behavior": "Use a compact responsive navigation with a menu trigger.",
"important": "Keep the same visual identity and premium pill styling."
}
},
"hero_section": {
"height": "100vh minimum",
"layout": {
"desktop": "Two-column asymmetrical layout.",
"left_column": "Approximately 58 percent.",
"right_column": "Approximately 42 percent.",
"vertical_alignment": "Centered."
},
"left_content": {
"eyebrow": {
"text": "INDEPENDENT CREATIVE COMPANY",
"style": "Small uppercase label with generous letter spacing.",
"accent": "Small subtle coloured dot."
},
"headline": {
"text": "We create ideas people can't ignore.",
"style": "Extremely large bold sans-serif typography.",
"alignment": "Left.",
"font_weight": "700 to 800.",
"line_height": "Tight, approximately 0.9 to 1.",
"letter_spacing": "Slightly tight.",
"responsive": "Use clamp for fluid typography."
},
"description": {
"text": "We partner with forward-thinking brands to craft viral social campaigns, distinct visual identities, and interactive storytelling made to stop the scroll.",
"max_width": "520px",
"style": "Muted dark grey, medium size, comfortable line height."
}
},
"right_content": {
"type": "Custom animated SVG artwork",
"instruction": "Create one single abstract SVG composition inspired by the uploaded Skool geometric shapes.",
"uploaded_shapes": [
"Triangle",
"Rectangle",
"Circle"
],
"important": "Do not simply place three separate static icons beside each other. Combine the shapes into one sophisticated abstract visual system.",
"visual_style": {
"main_container": "Large soft organic or rounded abstract form.",
"triangle": "Outlined warm orange triangle.",
"rectangle": "Outlined coral or muted red rectangle.",
"circle": "Outlined muted blue circle.",
"depth": "Use layering, transparency, blur and subtle shadows.",
"feeling": "Minimal, playful, sophisticated and creative."
},
"animation": [
"Slow floating movement.",
"Subtle independent motion.",
"Very subtle rotation.",
"Light cursor-based parallax on desktop.",
"Respect prefers-reduced-motion."
]
},
"secondary_elements": {
"services_label": {
"text": "Strategy • Content • Branding",
"position": "Upper right area of hero."
},
"scroll_indicator": {
"text": "SCROLL TO EXPLORE",
"icon": "Minimal circular downward arrow.",
"position": "Lower right."
}
},
"animations": {
"library": "GSAP",
"headline": "Split text by line or word and reveal upward with staggered motion.",
"eyebrow": "Fade and translate upward.",
"description": "Delayed fade and upward reveal.",
"svg": "Fade in with slight scale and then begin continuous subtle floating.",
"ease": "Premium smooth easing such as power4.out."
}
},
"hero_to_visual_transition": {
"concept": "The hero should transition into a large featured visual experience inspired by the Humaan reference.",
"featured_visual": {
"initial_state": "Large rounded media container positioned below the hero with margins on both sides.",
"content": "Use a placeholder image, video or creative collage for now.",
"border_radius": "Large rounded corners."
},
"scroll_behavior": {
"trigger": "When the user scrolls halfway through the section.",
"animation": "The visual gradually expands.",
"final_state": "The visual takes over almost the entire viewport width and height.",
"effect": "Cinematic immersive full-screen transition.",
"implementation": "GSAP ScrollTrigger with smooth scrub-based interpolation.",
"important": "No sudden jumps. The transition should feel continuous."
}
},
"brand_statement_section": {
"position": "Immediately after the full-screen visual experience.",
"style": "Minimal editorial section with large centered text and generous whitespace.",
"content": {
"text": "Focused on discovery, built for real attention. We create social-first experiences that help brands explore culture, connect with people, and move forward with confidence.",
"instruction": "The exact wording can be refined later, but keep the tone confident, modern and creative."
},
"animation": {
"reference_feel": "Inspired by the text reveal behavior from Homy.",
"effect": "Individual words or groups of words animate into focus as the user scrolls.",
"inactive_text": "Slightly muted or low opacity.",
"active_text": "Transitions to full dark opacity as it enters the viewport.",
"implementation": "GSAP ScrollTrigger scrubbed text reveal.",
"important": "Keep it elegant and readable."
}
},
"clients_marquee": {
"position": "After the brand statement section.",
"heading": {
"text": "Trusted by brands with something to say.",
"style": "Large but secondary to the hero typography."
},
"description": "Display a continuous horizontal strip of approximately 10 to 12 client logos.",
"logos": {
"temporary": "Create original placeholder brand names and simple typographic logos until real client assets are provided.",
"style": "Black and white only.",
"avoid": "Do not use colourful logos."
},
"animation": {
"direction": "Left to right.",
"behavior": "Infinite seamless marquee.",
"speed": "Slow and premium.",
"hover": "Optional subtle pause on desktop."
},
"important": "The loop must be seamless without visible jumps."
},
"work_section": {
"navigation_id": "work",
"heading": "Selected work, made to be noticed.",
"layout": "Large editorial project grid with different image sizes and asymmetrical composition.",
"projects": {
"initial_state": "Use placeholder creative agency projects.",
"future_content": [
"Client name",
"Project title",
"Category",
"Campaign visuals",
"Social media work",
"Branding work",
"UI design"
]
},
"interaction": {
"hover": "Subtle image scale and project metadata reveal.",
"scroll": "GSAP staggered image and content reveal."
}
},
"services_section": {
"navigation_id": "services",
"heading": "Ideas that move across every screen.",
"services": [
{
"title": "Advertising",
"description": "Campaigns and ideas designed to capture attention."
},
{
"title": "Branding",
"description": "Distinct identities built for recognition and relevance."
},
{
"title": "Social Media",
"description": "Content and campaigns designed for culture and conversation."
},
{
"title": "Wedding Stationery",
"description": "Distinctive visual storytelling for meaningful celebrations."
},
{
"title": "UI Design",
"description": "Digital experiences that balance aesthetics and usability."
}
],
"interaction": "Create an interactive list or editorial accordion with subtle GSAP hover and reveal animations."
},
"about_section": {
"navigation_id": "about",
"style": "Large typography-led section.",
"headline": "Small team. Big ideas. No boring stuff.",
"description": "Introduce Skool Company as an independent creative company focused on ideas, design, branding and culture.",
"founders": {
"instruction": "Create placeholders for founder information until client assets are provided.",
"future_fields": [
"Founder name",
"Role",
"Portrait",
"Short description"
]
}
},
"contact_section": {
"navigation_id": "contact",
"style": "Large high-impact closing section.",
"primary_text": "You have made it this far. How about we take a next step?",
"secondary_text": "This could be the start to something special.",
"cta": {
"text": "Write to us",
"link": "mailto:hello@skool.company"
},
"contact_information": {
"heading": "Get in touch",
"phone": "+91 89804 05004 / 64698",
"email": "hello@skool.company",
"secondary_heading": "Let's discuss ideas",
"address": "Skool Co., Banker's Colony, Opp. Bhaktidham Apartment, Bhuj, Gujarat 370001"
}
},
"footer": {
"services_line": "Advertising | Branding | Social Media | Wedding Stationery | UI Design",
"social_links": [
{
"name": "Instagram",
"url": "https://www.instagram.com/skoolcompany/?hl=en"
},
{
"name": "Facebook",
"url": "https://www.facebook.com/skoolcompany/"
},
{
"name": "LinkedIn",
"url": "https://in.linkedin.com/company/skoolcompany"
}
],
"copyright": "© 2024, Designed with ♡ by Skool Company",
"back_to_top": {
"text": "Psst! Free ride to top",
"behavior": "Smooth scroll back to the hero."
}
},
"motion_system": {
"primary_library": "GSAP",
"plugins": [
"ScrollTrigger"
],
"smooth_scroll": "Use Lenis if compatible with the project.",
"motion_principles": [
"Smooth",
"Cinematic",
"Purposeful",
"Restrained",
"No excessive bouncing",
"No gimmicky animation overload"
],
"required_animations": [
"Hero typography reveal",
"Abstract SVG floating motion",
"Navbar expansion on scroll",
"Full-screen expanding media section",
"Scroll-based text focus reveal",
"Infinite client logo marquee",
"Project reveal animations",
"Service interaction animations"
]
},
"responsive_requirements": {
"approach": "Mobile-first.",
"desktop": "Use generous whitespace and strong asymmetrical compositions.",
"tablet": "Adapt typography and media proportions without losing the editorial hierarchy.",
"mobile": [
"Prevent all horizontal overflow.",
"Stack hero content intelligently.",
"Scale headline using clamp.",
"Keep SVG artwork visually impactful.",
"Convert navigation into a compact menu.",
"Reduce animation complexity where necessary.",
"Maintain smooth performance."
]
},
"performance_and_quality": {
"requirements": [
"Avoid unnecessary heavy JavaScript.",
"Use transform and opacity for animations whenever possible.",
"Optimize images.",
"Lazy load below-the-fold media.",
"Avoid cumulative layout shift.",
"Maintain smooth scrolling.",
"Respect prefers-reduced-motion."
]
},
"final_design_instruction": "The website must feel like an original premium creative agency website for Skool Company. The strongest visual moment should be the hero: huge bold editorial typography on the LEFT and a single custom animated SVG artwork on the RIGHT created from Skool's triangle, rectangle and circle shapes. Do not use multiple floating cards, generic SaaS UI, dashboard visuals or unnecessary clutter. Follow the hierarchy and premium whitespace of the references, but create an original Skool-specific experience. Build the entire website as one smooth scrolling page with GSAP-powered transitions and high responsiveness."
}

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/75357fb4-a316-463d-998f-bf7fe1d1be56).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
