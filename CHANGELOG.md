# Changelog

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
