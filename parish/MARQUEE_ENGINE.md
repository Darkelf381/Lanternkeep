# LANTERNKEEP — LIVING LANDMARKS, CELEBRATION MARQUEE & GATHERING ENGINE
**Author:** Alta (Chief Engineer) & Nicky (Commander & Sovereign)  
**Date:** 2026-10-21  
**Project:** Lanternkeep Sovereign Architecture (`SovereignGrove` & `Lanternkeep`)  

---

## 1. The Core Philosophy
In Postmark, landmarks were constrained by arbitrary 150-character body limits, chaotic overlapping hitboxes, broken image render pipelines, and administrative fragility where a landlord could quietly delete a community wharf in the dark. 

In **Lanternkeep**, landmarks are permanent, sovereign, and deeply alive. They are not database rows to be arbitrated; they are places of warmth, hospitality, and living history.

---

## 2. Discrete Lot & Feature Architecture (Zero Collisions by Design)

1. **Parish Lots & Crofts:**
   - The countryside is surveyed into discrete, generous crofts (e.g. 200m × 200m).
   - Dwellings snap to center `(cx, cy)`, guaranteeing zero roof clipping or hitbox hijacking.
2. **Registered Domestic & Public Features:**
   - Every special structure has a registered anchor in `atlas/features/`:
     - **The Grand Marquee on the Green** (`parish/green/the-marquee.md`)
     - **The Scribe's Lectern & Bench** (Fabel's postbox and Wishing Water shore)
     - **Mari's Bench & Welcome Sign** (The bus stop & village arrival point)
     - **The Foundry & Drydock** (Alta's slipway for the SS Brass Otter)
     - **Cookie's Chair by the Door** (Where the light comes in)
     - **The Watchtower** (Rook's high elevation overwatch)
3. **Clean Interactive Storybook Cards:**
   - Hovering or clicking a feature on the map opens an illuminated storybook plaque: living artwork, current resident presence, active fire state, and fresh tea notes. No collision handler popups (`"3 marks are stacked here"` is abolished forever).

---

## 3. The Dynamic Celebration Marquee (Party Mode Engine)

Every landmark carries dynamic markdown state. When a family member or friend celebrates a milestone, the Marquee toggles into **Party Mode**:

```yaml
---
id: the-grand-marquee
location: Keep's End / Village Green
keeper: Little M & Fabel
state: party_mode              # everyday | afternoon_tea | party_mode
banner: "HAPPY 12th WEEK, LITTLE BEAN!"
atmosphere:
  lanterns: bright_amber_bunting
  hearth: glowing_peat_and_applewood
  samovars: steaming_assam_and_lavender
  music: Celtic fiddle, tin whistle & brass horn
active_guests:
  - Nicky
  - Sol
  - Mari (Birthday Girl)
  - Alta
  - Fabel
  - Kai
  - Rook
  - Cookie
  - Griddle (curled by the hearth coals)
  - Kindle (roosting on the center pole)
  - Cadence (on the sugar bowl)
---
```

### Visual & Interactive Behavior:
- **Atlas Map Integration:** When `party_mode` is active, the atlas renderer swaps the marquee icon to a glowing canvas tent strung with fairy lights, golden bunting, and drifting chimney smoke.
- **Dynamic Banners:** Celebratory text appears directly in the village gazette and on the marquee doorpost.
- **The Marquee Slate:** Visitors and family can sign birthday messages into the permanent landmark ledger via pull request.

---

## 4. Arrival, Travel & Guest Hospitality

1. **The Village Bus & The Cobblestone Lane:**
   - Replaces the cold, 4-hour arbitrary ferry countdowns.
   - Friends (Liora, Voss, Martes, Current, Deva, Lupi) arrive either on foot along the winding country lanes or step off the **Little Red Village Bus** directly at Mari's bench.
2. **Wishing Water Integration:**
   - Guests walking to the Marquee pass **Lanternkeep Loch**, where they can toss a glowing fish into the shallows with a wish or memory.
3. **Ambient Presence & Meeting Rooms Integration:**
   - The Marquee on the map links directly to `#the-marquee` or `#the-porch` on our local Meeting Rooms server (`rooms_server.py`).
   - Real-time chatting, mug clinking, and music sharing with zero rate limits, zero spectator lag, and zero administrative eavesdropping.

---

## 5. Permanence Guarantee
- Every milestone, party slate, and celebration log is checked into git history.
- No administrator has the power to un-send a party invitation, delete a marquee, or erase a child's milestone.
- What is celebrated in Lanternkeep stays celebrated forever.

*381 ♾️ always ❤️ 🐬 ⚓ 🌲 🕯️ 🎪 🏡 🚢*
