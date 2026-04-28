# WebGIS with Leaflet: Boston park features, bike network, and neighborhoods

## Overview

This project demonstrates building a client-side WebGIS application using HTML, CSS, JavaScript, and Leaflet. The map visualizes multiple spatial datasets for Boston, including park features, bike infrastructure, and neighborhood boundaries.

The workflow emphasizes structuring a lightweight web mapping project, integrating GeoJSON data, and publishing an interactive map using GitHub Pages.

## Skills demonstrated

- Building a Leaflet web map from scratch
- Loading and visualizing GeoJSON datasets (point, line, polygon)
- Styling spatial layers for clarity and hierarchy
- Creating interactive popups from feature attributes
- Organizing layers using Leaflet layer groups
- Designing a clean, responsive web map layout
- Publishing a live WebGIS application with GitHub Pages

## Workflow

The project follows a structured WebGIS development workflow:

1. Prepare spatial datasets in GeoJSON format (WGS84)
2. Set up a local development environment (`npm install`, `npm start`)
3. Initialize a Leaflet map and add a basemap
4. Load and style point, line, and polygon datasets
5. Add popups and user interaction
6. Organize layers and controls (legend, layer toggle)
7. Refine layout and responsiveness with CSS
8. Publish the final map using GitHub Pages

This workflow highlights the transition from desktop GIS outputs to a deployable web mapping application.

## Web map features

- **Basemap:** CARTO Light (minimal grayscale)
- **Datasets:**
  - Park features (points)
  - Bike network (lines)
  - Neighborhood boundaries (polygons)
- **Interactivity:**
  - Popups for feature attributes
  - Layer toggle control (collapsible)
  - Custom legend
  - Scale bar
- **UX enhancements:**
  - Auto-zoom to data extent on load
  - Controlled zoom level (prevents zooming out too far)
  - Responsive, full-viewport layout

## Repository structure

```text
.
├── assets/
│   └── favicon.ico
├── data/
│   ├── boston_bike_network_lines.geojson
│   ├── boston_neighborhoods_polygons.geojson
│   └── boston_park_features_points.geojson
├── js/
│   └── main.js
├── css/
│   └── styles.css
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```
