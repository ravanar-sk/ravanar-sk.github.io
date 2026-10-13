# MyProfile

Static personal portfolio and mobile app support pages, built with HTML, CSS, and JavaScript.

## Local preview

From the repository root, run `python3 -m http.server 8000`, then open `http://localhost:8000`.
No installation or build step is required.

## Project details

Project cards and their details popup use the records in `app/resources/json/projects.js`.
Despite the directory name, this file contains JavaScript objects rather than a fetched JSON file.

Click a card, or focus it and press Enter or Space, to open its details. The popup uses 80% of
the viewport width and height on desktop and expands on smaller screens. Close it with the
close button, Escape, or a click outside it. Platform icons are always visible at the top
right of each card on a semi-transparent glass layer with backdrop blur; linked icons
open their store or website pages. The title gradient fades from the bottom left. Hovering
or focusing a card gently emphasizes its title and reveals the animated "View details" cue.

App artwork fills each card's background, with the project name at the bottom left over
a dark gradient. App and platform icons are bundled under `app/resources/images` so they
load with the site. Cards without artwork, or with a failed image, show a letter icon.

Each record supports these fields:

| Field | Used for |
| --- | --- |
| `title` | Project name and accessible card label |
| `description` | Full project description; line breaks are preserved |
| `icon` | Card image and popup icon; use an image URL or a local image path |
| `bannerImage` | Optional wide banner image; a landscape image works best |
| `website` | Project website link |
| `projectData` | Platform labels and iOS, Android, or web links |

For example:

```javascript
{
    priority: 0,
    title: "My Profile",
    description: "A website created out of passion and love as a portfolio of myself.",
    website: "https://ravanar-sk.github.io/",
    icon: null,
    bannerImage: "./app/resources/images/pictures/my-profile-banner.jpg",
    projectData: {
        type: "web",
        isReactNative: false,
        android: null,
        ios: null,
        web: { url: "https://ravanar-sk.github.io/" }
    }
}
```

The example banner path is illustrative: add your own image before setting it. Existing
records start with `bannerImage: null`. Without a banner, the popup uses a softened version
of the project icon; without either image, it shows a dark gradient and a letter icon.
Failed images also fall back gracefully. Blank descriptions and missing public links have
clear empty states. Duplicate website links are shown only once.

Useful future additions to the data model are `role`, `techStack`, `features`, `screenshots`,
`year`, `status`, and `sourceUrl`. These fields are suggestions and are not rendered yet.
