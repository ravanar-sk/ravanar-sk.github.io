# MyProfile

Static personal portfolio and mobile app support pages, built with HTML, CSS, and JavaScript.

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## Local preview

From the repository root, run `python3 -m http.server 8000`, then open `http://localhost:8000`.
No installation or build step is required.

## Navigation

The sidebar uses the name and public `location` label from `app/resources/json/user-data.js`.
The current section is highlighted as the page scrolls and marked with `aria-current`.
On mobile, the menu becomes a horizontal bar with larger touch targets; the active link
stays in view when the menu needs to scroll. Keyboard focus is visible, and reduced-motion
preferences disable smooth scrolling and menu transitions.

## Home

The Home section reads the name, `homeIntroduction`, and role labels from
`app/resources/json/user-data.js`. The first two roles stay visible, while the remaining
roles gently fade between labels. Contact me scrolls to the About contact buttons.
Animations respect the reduced-motion preference.

## Project details

Project cards and their details popup use the records in `app/resources/json/projects.js`.
Despite the directory name, this file contains JavaScript objects rather than a fetched JSON file.

Click a card, or focus it and press Enter or Space, to open its details. The popup uses 80% of
the viewport width and height on desktop and expands on smaller screens. Close it with the
close button, Escape, or a click outside it. Platform icons are always visible at the top
right of each card on a semi-transparent glass layer with backdrop blur; linked icons
open their store or website pages. The title gradient fades from the bottom left. Hovering
or keyboard focusing a card enlarges its title, previews its description, and reveals the animated
"View details" cue. Platform filters help browse iOS, Android, web, React Native, and Flutter projects;
the count updates to match the visible cards.
Closing a popup restores focus to its card. Mouse-restored focus does not keep the card
expanded after the pointer leaves, including when Escape closes a mouse-opened popup.
Keyboard navigation still shows the expanded preview and visible focus indicator.
Projects are grouped into Personal projects first, then Professional projects. Set each
record's `isPersonal` flag to `true` for personal projects or `false` for professional
projects. Missing flags default to professional. Platform filters apply to both groups
and hide groups without matching cards.

Personal projects include published Android utilities, Flutter apps, React Native apps,
and native iOS apps. Their store icons are bundled locally; listing links and artwork
sources are documented in [the project artwork README](app/resources/images/projects/README.md).
The five Flutter projects share one card per app, with both Android and iOS links and
the `flutter` type. Android utilities and Movie Info remain Android-only; Badminton
Score Tracking uses `react-native-ios`, and Bingo - Offline and bidNplay use `mobile-ios`.

App artwork fills each card's background, with the project name at the bottom left over
a dark gradient. App and platform icons are bundled under `app/resources/images` so they
load with the site. Cards without artwork, or with a failed image, show a letter icon.

Each record supports these fields:

| Field | Used for |
| --- | --- |
| `isPersonal` | `true` for personal projects, `false` for professional; personal projects appear first |
| `buildMethod` | A key from `projectBuildMethods`: `ai`, `mortals`, or `mortals-and-ai` |
| `title` | Project name and accessible card label |
| `description` | Full project description; line breaks are preserved |
| `icon` | Card image and popup icon; use an image URL or a local image path |
| `bannerImage` | Optional wide banner image; a landscape image works best |
| `website` | Project website link |
| `projectData` | A `type` from `projectTypes` and only the applicable `ios`, `android`, or `web` objects |

For example:

```javascript
{
    priority: 0,
    isPersonal: true,
    buildMethod: "mortals-and-ai",
    title: "My Profile",
    description: "A website created out of passion and love as a portfolio of myself.",
    website: "https://ravanar-sk.github.io/",
    icon: null,
    bannerImage: "./app/resources/images/pictures/my-profile-banner.jpg",
    projectData: {
        type: "web",
        web: { url: "https://ravanar-sk.github.io/" }
    }
}
```

Each project displays its build method below the card title and in the details popup.
Choose one of the predefined keys in `projectBuildMethods`: `ai` shows "Built using AI",
`mortals` shows "Built by mortals", and `mortals-and-ai` shows "Built by mortals & AI".
The labels are defined in the same data file. Missing or unrecognized values hide the
badge until the project owner selects a valid value.

Choose `projectData.type` from the `projectTypes` array in the data file. Use `mobile-ios`
for native iOS-only apps, `mobile-android` for native Android-only apps, `mobile` for native
apps on both platforms, and the appropriate `react-native` or `flutter` variant for those
frameworks. Website types are `web`, `web-react`, or `web-angular`; Electron apps use `electron`.
Include only the supported platform objects. An iOS-only app, for example, uses
`projectData: { type: "mobile-ios", ios: { url: "" } }`. An empty URL keeps the platform
badge visible without adding a link. Omit unused platform keys and the former
`isReactNative` flag; React Native badges and filtering now use `type`.

Framework icons appear in the grid badges and details popup: `web-react` shows React JS,
`react-native`, `react-native-ios`, and `react-native-android` show React Native, and
`flutter`, `flutter-ios`, and `flutter-android` show Flutter. React JS and React Native
share the bundled React logo; the Flutter icon is bundled from the
[official Flutter brand assets](https://flutter.dev/brand).

The example banner path is illustrative: add your own image before setting it. Existing
records start with `bannerImage: null`. Without a banner, the popup uses a softened version
of the project icon; without either image, it shows a dark gradient and a letter icon.
Failed images also fall back gracefully. Blank descriptions and missing public links have
clear empty states. Duplicate website links are shown only once.

Useful future additions to the data model are `role`, `techStack`, `features`, `screenshots`,
`year`, `status`, and `sourceUrl`. These fields are suggestions and are not rendered yet.

## Education and work

Education cards and their details popup use `userData.education` in
`app/resources/json/user-data.js`. Click an item, or focus it and press Enter or Space,
to view its academic record. Close the popup with its close button, Escape, or a click
outside it. Work timeline cards and their details popup use `app/resources/json/work-data.js`,
with responsibilities shown as a list and skills as tags. Click a work item, or focus it
and press Enter or Space, to open its popup; the same close controls apply.
Both timelines and popups adapt to smaller screens.

## About me

The About section uses the biography, name, role labels, email, phone, GitHub, and LinkedIn links
from `app/resources/json/user-data.js`, alongside the existing local portrait photos.
Update that data file to change the introduction, role badges, or contact details.
Email, WhatsApp, and Call actions use the email address and first phone number in that file.
The LinkedIn action uses the entry in `socialMediaLinks` and opens in a new tab.
