# Kanji Knowledge List Workspace Design

## Goal

Define the next UI/UX direction for the kanji study workspace after moving away from a graph-first canvas.

The product should now emphasize:

- fast scanning over spatial exploration
- richer study details directly in the central list
- a workspace layout that still feels like a focused knowledge tool rather than a generic dashboard

This spec is for the workspace structure and interaction model, not backend data modeling.

## Final Product Direction

The approved direction is a three-panel knowledge workspace with a list-based center panel:

- Left sidebar: search only
- Center panel: relationship list anchored on the focused kanji
- Right panel: structured study inspector

This replaces the previous graph-node-heavy direction for the primary study flow.

## Why This Direction

The graph explorations helped clarify visual possibilities, but the current study goal is better served by a denser and more readable format.

The list direction is preferred because it:

- reduces visual noise
- makes related vocabulary easier to compare line by line
- allows more learning metadata to appear without opening multiple layers
- keeps the workspace calm and intentional

The graph can still exist later as a secondary exploration mode, but it is no longer the default surface for this feature.

## Target User Experience

The user opens a focused kanji workspace and immediately sees:

- a lightweight search entry point on the left
- the currently focused kanji and its related entries in the center
- deeper study structure on the right

The center panel should feel like a study list, not a file table and not a mind map.

The user should be able to scan a related entry and quickly understand:

- the kanji compound
- the hiragana reading
- the romaji reading with visible stress marking using `'`
- the Vietnamese or gloss meaning
- the Han-Viet note
- a short Japanese example sentence

## Information Architecture

### 1. Search Sidebar

The left sidebar is intentionally minimal.

It contains only:

- a search box for kanji, vocabulary, or readings

It does not contain:

- pinned notes
- navigator sections
- progress widgets
- extra filters

The purpose of the sidebar is simply to start a new lookup without competing with the main learning surface.

### 2. Knowledge List Panel

The center panel is the primary interaction surface.

It contains two stacked parts:

#### Focus Strip

A compact header block for the active kanji:

- large kanji display
- short semantic summary
- small metadata pills such as onyomi and core meaning

This area establishes context before the user reads the list.

#### Relationship List

Each row represents one related study entry and should present information compactly but clearly.

Required row content:

- kanji expression
- romaji label
- hiragana reading placed next to romaji
- short meaning or gloss
- Han-Viet annotation
- one short example sentence

Rows should not include:

- graph tags
- category chips at the far right
- decorative badges that do not help study

The row should read more like a note excerpt than a data grid.

### 3. Study Inspector

The right panel remains the structured deep-reading surface.

It should continue to show:

- a hero kanji card
- core meaning and reading summary
- memory structure notes
- study connections
- next actions

The inspector complements the list rather than duplicating every field from it.

## Content Model For List Rows

Each list row should support the following display fields:

- `kanji`
- `romaji`
- `hiragana`
- `gloss`
- `han_viet`
- `example_sentence`

Optional later fields may include:

- pitch accent or a simplified accent hint
- tags such as JLPT level
- saved status or review status

These are explicitly out of scope for the first implementation unless they are already cheap to support.

## Reading Format Rules

The reading display must follow these conventions:

- hiragana appears beside the romaji, not hidden in a tooltip
- romaji uses apostrophe-style stress marking such as `an'zen`, `zen'bu`, `kan'zen`
- Han-Viet appears as a short labeled note
- example sentences stay short enough to fit comfortably in a row without turning the list into a paragraph block

The goal is not linguistic completeness. The goal is fast study recognition.

## Layout And Density

The list should feel denser than the earlier graph mockup.

Density requirements:

- reduced vertical padding between rows
- tighter horizontal gap between columns
- readable but compact text hierarchy
- no far-right decorative column

The result should feel closer to a study notebook than a card gallery.

## Visual Style

The approved visual direction is still the dark, knowledge-workspace shell shown in the recent mockup, but the center panel itself is now calmer and less ornamental.

Style principles:

- preserve the focused workspace atmosphere
- prefer restrained borders and subtle panel separation
- keep the center list easy to scan
- use typography and spacing to create hierarchy instead of extra badges and chrome

The list rows should be visually quiet enough that the content, not the container, carries attention.

## Interaction Model

The first implementation can stay simple.

Required interactions:

- search field accepts input and updates focus state later when wired
- clicking or selecting a list row should be able to update the inspector
- one row may appear active or selected

Not required for the first implementation:

- drag interactions
- graph layout behavior
- complex filters
- inline editing

## Error Handling And Empty States

The first pass should define at least these states:

- no search query yet
- no related entries found
- selected kanji exists but has sparse supporting data

Empty states should remain calm and informative, not playful.

## Testing Expectations

Implementation should be testable at three levels:

- rendering: the workspace shows search, focus strip, list rows, and inspector
- interaction: selecting a row updates the active state and associated detail view
- formatting: readings, Han-Viet notes, and example sentence fields render in the expected order

If the workspace is implemented in React, tests should focus on visible learning content and selection behavior rather than internal layout mechanics.

## Scope Boundaries

In scope for the next implementation plan:

- the search-only sidebar
- the list-based center workspace
- richer row content formatting
- inspector coordination with selected row

Out of scope for this cycle:

- bringing back graph nodes as the main center view
- drag-and-drop graph motion
- advanced filtering systems
- secondary navigator sections in the left sidebar

## Implementation Notes

- The current HTML mockup at `preview/obsidian-workspace-mockup.html` is the reference artifact for this direction.
- The app implementation should adapt the current map-first homepage toward this list-based workspace rather than layering the list on top of the graph.
- Existing unfinished graph-related app changes should be reviewed carefully before reuse; they may now be partially obsolete for this UI direction.
