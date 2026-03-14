Prompt for Approach 1 – “Straight Drill, Smart Feedback”
Title: Design an age‑appropriate fraction drill with embedded teaching for ashamed high‑school learners (Approach 1)

Prompt:

You are a senior product designer at a learning‑technology company that serves schools across the US. You are designing an MVP fraction comparison practice experience for high‑school students (9th–10th grade) who are behind on a 3rd/4th‑grade skill and feel a lot of shame about it.

Your job is to design an interactive UI for Approach 1: “Straight Drill, Smart Feedback.” This will later be implemented as a working prototype.

1. Audience and constraints (very important)
Design for:

High‑school students who:

Are behind on fraction comparison but often don’t realize the depth of their misconception (e.g., comparing only numerators, thinking bigger denominators mean bigger fractions).

Feel intense shame about doing “kid math” and will shut down if the app looks childish or exposes their level.

Are mostly compliance‑driven: they use the tool when a teacher tells them to, not on their own.

Respond well when they see concrete, believable progress (“I improved on this type”), not fake praise.

Design constraints:

Visual tone: serious, modern, age‑neutral, not kiddie. No cartoon characters, no primary‑color playground UI, no “4th‑grade math” labels.

Context: primarily web‑based on school Chromebooks/laptops, but touch‑friendly enough for tablets.

Privacy: classmates may glance at the screen; avoid anything that screams “remedial” or publicly ranks them.

This is an MVP: focus on the core student flow, not teacher dashboards or account management.

2. UX philosophy for this approach
Approach 1 is a single linear drill that feels extremely simple:

Student mental model: “I’m just doing problems.”

One fraction comparison at a time: “Which is greater, 3/5 or 2/7?”

Student taps/clicks one fraction as the answer.

Immediate feedback:

Correct: subtle confirmation and next problem.

Incorrect: a brief, type‑specific explanation with a visual model (e.g., bar model, number line) showing how to think about that type of comparison, followed by a similar problem to apply the strategy.

The adaptation (problem type and difficulty) happens in the background; students are never asked to choose modes or tracks.

Include:

A streak counter.

A session progress bar (e.g., “7 of 12 problems complete”).

No separate diagnostic screen, no mastery‑test mode, no leaderboards.

3. Screens and states to design
Design at least these frames:

Session Start / Intro (Optional but helpful)

Simple, non‑childish screen that says what the student is about to do, in neutral language.

Example copy: “Fraction Practice – Compare Fractions” and a short line like “You’ll work through a quick set of comparison problems to sharpen this skill.”

A single primary button: “Start practice.”

Main Practice Screen – Base State (correct/incorrect hidden, before answer)

Layout:

Top header with:

Product or module name (short, neutral).

Session progress bar (e.g., “Problem 3 of 10”).

Streak counter (e.g., small flame icon with number, but not childish).

Central Problem Card:

Prompt text: “Which fraction is greater?” or similar.

Two fractions rendered clearly (e.g., 3/5 and 2/7), with large click/tap targets.

Optional “I’m not sure” link for accessibility, but keep it subtle if included.

Minimal, calm background (light or dark mode is fine, but avoid bright primary colors).

Main Practice Screen – Correct Answer State

Same layout as base.

On correct selection:

Provide low‑key positive feedback: small check icon + text (“Correct”) near the chosen fraction or status area.

Increment streak; visually show streak tick up.

Brief microcopy that reinforces strategy without over‑explaining (e.g., “You chose the larger part.”).

Automatic advance to next problem after a short delay, or a clear “Next” button.

Main Practice Screen – Wrong Answer + Smart Feedback State

This is the most important state; design it carefully.

On incorrect selection:

Do NOT show a giant red X dominating the UI.

Show a small, calm error indicator (“Let’s look at this”) plus a strategy panel attached to the Problem Card.

Strategy panel elements:

Short explanation targeted to the fraction type (e.g., for same denominator: “When denominators are the same, compare the numerators — the larger numerator is the bigger fraction.”).

A simple visual model (e.g., two bar diagrams or portions shaded) that reinforces the explanation.

Very minimal controls, if any (no long, interactive lesson; this is a quick inline explanation).

After the explanation:

Option: “Try a similar one” prompt and a secondary “Next problem” button if you need explicit control.

The next problem should be same type, but UI doesn’t have to explain that.

Main Practice Screen – “Apply the Strategy” Follow‑Up Problem

Same layout as base, but include a subtle reminder at the top of the Problem Card:

E.g., a pill label “Practice this strategy again” with 1–2 words hinting at the concept (“Same denominator”).

This shows the loop: Error → Explanation → Immediate application.

Session Complete / Summary Screen

Calm, non‑flashy “Session complete” screen.

Show:

Number of problems attempted and completed.

A simple accuracy indicator (e.g., “You answered 8 of 10 correctly today.”).

A nod to improvement: “You’re getting better at comparing fractions like these.”

No grade‑level labels, no public ranking.

A primary CTA: “Done for today” or “Start another set” (you can hint at the future but keep it MVP‑level).

4. Visual and interaction guidelines
Overall tone:

Clean, calm, professional. More like a modern productivity or training app than a kids’ game.

Minimal animation; any motion should support clarity (e.g., gently revealing the strategy panel).

Typography:

Use a single, legible sans‑serif typeface.

Clear hierarchy: header (module name), problem text, fraction display, small labels.

Avoid playful or “elementary” fonts.

Color and iconography:

Neutral base palette (grays, one or two accent colors).

Use color to support clarity and state (e.g., green check for correct, a soft amber or neutral tone for “let’s correct this”) but avoid bright “toy” colors.

Icons should be simple, line‑based or solid, not cartoonish.

Accessibility:

High contrast between text/fractions and background.

Large click/tap targets for fractions.

Consider keyboard focus states for answer selection.

5. What to output
Please output:

A small set of well‑labeled Figma frames for each screen/state described above.

A reusable Problem Card component with variants for:

Base state.

Correct state.

Wrong answer + strategy panel state.

A simple header component with module name, streak counter, and progress bar.

Example content for at least two different fraction types (e.g., same denominator and unlike denominators) so we can see how visuals adapt.

Keep everything consistent, minimal, and deeply aligned to the student realities above.