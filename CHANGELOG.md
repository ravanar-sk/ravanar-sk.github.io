# Changelog

## 2026-10-20

### Changed

- Ordered project cards within each category by build method: `mortals`,
  `mortals-and-ai`, then `ai`, retaining their relative order within each method.
- Added the Google Play link to the existing Badminton Score Tracking personal project.
  It now uses `react-native` and displays both iOS and Android badges and store links.

## 2026-10-16

### Added

- A `contribution` field on every project and a "My contribution" section in the details
  popup, with preserved line breaks and a placeholder until the owner adds their text.
- QSFA, Qatar Stars League, Q Weather, and Education City as professional native iOS
  projects, with local App Store icons, short descriptions, and store links.
- Qatar Rail as a professional Kony project with iOS and Android links and local artwork.
- Kony framework badges, a local K monogram, and a project filter.
- The owner's confirmed "Built by mortals" tag on all five new professional projects.

### Changed

- Refreshed the existing AL JNOUB and Qatar Cancer Society descriptions and iOS links,
  keeping one record per app.
- Corrected ONEPORT and AL JNOUB to native iOS-only projects, removing their Android
  links and badges and the React Native label from AL JNOUB.
- Documented the professional app artwork sources and Kony project type.

## 2026-10-15

### Added

- A LinkedIn contact action in About Me, using the existing profile data and a local icon.
- Badminton Score Tracking, Bingo - Offline, and bidNplay as personal iOS projects,
  with local App Store artwork, short descriptions, and App Store links.
- iOS links on the existing Egypt History, QWERTY Warrior, Turkey History, Qatar History,
  and Kanakk records. These projects now use `flutter` and show both mobile platforms.
- Build-method badges on project cards and details popups, driven by the predefined
  `ai`, `mortals`, and `mortals-and-ai` values confirmed by the project owner.
- Eight personal Android projects with bundled Play Store icons, short descriptions,
  and Google Play links: Developer Options Shortcut, Language Shortcut, Turkey History,
  Egypt History, Qatar History, QWERTY Warrior, Kanakk, and Movie Info.
- A Flutter filter for the personal Flutter projects.
- React JS and Flutter framework icons alongside the existing React Native icon,
  selected automatically from each project's type. Bundled the Flutter SVG locally.
- Icons beside platform and framework names in the project details popup.

### Changed

- Updated each project's `projectData.type` to a value from `projectTypes`, retaining
  only its supported platform objects and removing the `isReactNative` flag.
- Updated project badges, card labels, and filters to use the project type, including
  React Native variants. Corrected DHI Cubes to use the web type.
- Documented the simplified project data format and available type choices.

### Fixed

- Project cards remaining expanded after closing their details popup and moving the pointer away.
  Card focus effects now follow keyboard navigation while preserving focus restoration,
  including Escape dismissal of a popup originally opened with a pointer.

### Removed

- The View projects shortcut from Home and the Explore projects shortcut from About Me,
  along with their unused button styles.

## 2026-10-13

### Added

- Education details popups showing qualifications, subjects, institutions, study periods,
  graduation years, and results from the profile data.
- Work details popups showing organizations, roles, dates, responsibilities, and skills.
- Email, WhatsApp, Call, and GitHub actions with icons in About Me. WhatsApp and Call use
  the first phone number in the profile data.
- Project platform filters with matching project counts.
- Personal and Professional project sections, with Personal projects displayed first.
  Each project uses an `isPersonal` boolean flag; My Profile is personal and the other
  existing projects are professional. Missing flags default to professional.

### Changed

- Refreshed Home with a concise introduction, stable iOS and React Native role labels,
  gently rotating secondary roles, and View projects and Contact me shortcuts.
- Replaced the continuous portrait zoom with a subtle entrance and hover effect, and
  reduced empty space on mobile.
- Arranged the three About Me photos in one row, with profile details and contact actions
  below. The email address is represented by an Email action.
- Updated the sidebar with the profile name and location, consistent labels, a narrower
  desktop layout, and an active section highlight that follows scrolling.
- Improved mobile navigation with larger touch targets and automatic scrolling to keep
  the active menu link visible. Added clear keyboard focus and reduced-motion support.
- Refined project cards with rounded corners, platform labels, title initials when artwork
  is missing, animated description previews, and responsive spacing.
- Restyled education and work lists as responsive timelines with clearer dates, metadata,
  skills, and current-role indicators.
- Updated the README with navigation, profile data, contact links, dialogs, and project
  classification instructions. Cleaned up education subject and percentage formatting.

### Removed

- Birthday display and its details card from About Me.
