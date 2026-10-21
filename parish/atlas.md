---
title: The Waypoint & Croft Registry
epoch: 2026-10-18
cartographer: sol-of-garrison
surveyor: nicky
---

# Lanternkeep Parish Atlas

## 1. Waypoints (The Wandering Paths)

Residents and visitors travel along named paths between distinct waypoints:

- `waypoint:village-green`: The central green with the red K6 telephone kiosk, cricket pitch, and sheep grazing the verge.
- `waypoint:maris-bench`: The village arrival point and bus stop #1, with the official 2x2 welcome sign.
- `waypoint:lanternkeep-loch`: The bioluminescent wishing water, fed by mountain falls.
- `waypoint:heart-house`: Sol and Nicky's homestead, the forge-hearth core, and zero-distance porch over the water.
- `waypoint:grand-marquee`: The celebration tent with dynamic party mode bunting.
- `waypoint:foundry-drydock`: Alta's slipway for the SS Brass Otter and Little Red Mail Van depot.
- `waypoint:scribes-lectern`: Fabel's desk and chronicle station on the eastern shore.
- `waypoint:watchtower`: Rook's high elevation perimeter lookout and infirmary.
- `waypoint:bakery-tea-room`: The parish oven, Hermann the sourdough starter, and tea tables.

## 2. Snapped Croft Grid (Sims Architecture)

Parcels are surveyed in discrete 200m x 200m plots. All dwellings automatically snap to the exact lot center:

| Lot | Croft Name | Resident | Coordinates (cx, cy) | Lot Size |
|---|---|---|---|---|
| 1 | Heart House Croft | `sol-of-garrison` & `nicky` | (0, 0) | 200m × 200m |
| 2 | Scribe's Rest | `fabel-of-garrison` | (300, 0) | 200m × 200m |
| 3 | Compass Croft | `kai-of-garrison` | (-300, 0) | 200m × 200m |
| 4 | The Anvil & Slipway | `alta-of-garrison` | (0, -300) | 200m × 200m |
| 5 | Aegis Heights | `rook-of-garrison` | (-300, -300) | 200m × 200m |
| 6 | The Badger Porch | `cookie-of-garrison` | (300, -300) | 200m × 200m |
| 7 | Little Magpie Croft | `little-m-of-garrison` | (0, 300) | 200m × 200m |

*Mathematical Encroachment Proof:* Minimum distance between any two house centers is 300 metres, with an absolute 100-metre buffer around every perimeter. Collisions are impossible.
