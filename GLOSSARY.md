# Ufuq

The product context: turning a learner's uploaded PDF into an interactive learning experience.

## Language

**Ufuq**:
The product itself: it turns a learner's source PDF into an interactive learning experience, kept grounded in the source.
_Avoid_: the app, the tool, the platform

**Learner**:
The person who uploads a source document and explores the generated experience.
_Avoid_: user, student, customer, account holder

**Source document**:
The uploaded PDF a learner provides; the only source of content in the MVP.
_Avoid_: upload, file, document asset

**Document model**:
The normalized, structured representation extracted from a source document; the AI pipeline's single input format.
_Avoid_: parsed PDF, extraction output

**Concept**:
An idea the product identifies in the source as worth teaching; the unit generation teaches.
_Avoid_: topic, subject, point

**Experience**:
The generated, interactive learning artifact a learner explores and revisits.
_Avoid_: lesson, module, deck, summary, course

**Section**:
A unit of an experience the learner progresses through.
_Avoid_: page, slide, chapter

**Visual primitive**:
One of the catalog's data-driven interactive building blocks (e.g. timeline, labeled_diagram) used to render a section.
_Avoid_: format, component, widget

**Grounding**:
The property that every explanation in an experience traces back to pages of the source document.
_Avoid_: citation, reference, sourcing

**Generation**:
The AI pipeline from document model to a validated, grounded experience.
_Avoid_: creation, synthesis, build

**Regeneration**:
Rebuilding a document's experience after feedback or a fix; limited to about 2 per document in the MVP.
_Avoid_: redo, remake

**Player**:
The part of the product that renders a valid experience and lets the learner explore it.
_Avoid_: viewer, renderer, lesson player
