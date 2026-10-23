# Scratch Page public pages

- `privacy-policy.html` — privacy policy for parents and guardians.
- `support.html` — help, frequently asked questions, and developer contact.
- `styles.css` — shared responsive and print styles.
- `assets/app-icon.png` — the existing app icon, copied without modification.

Developer: **Saravana Kumar**. Public email: **development.ravanar@gmail.com**.

Both pages are static HTML and work without JavaScript, external fonts, analytics, or a build step. FAQ sections use native HTML disclosure controls. Keep the stylesheet and assets alongside the pages when deploying. Links work when hosted at a domain root or under a subdirectory.

Open the HTML files directly, or preview this folder with:

```sh
python3 -m http.server 8000 --directory docs
```

Then open `http://localhost:8000/support.html` or `http://localhost:8000/privacy-policy.html`.

To use these as App Store URLs, upload the entire `docs` folder to a public HTTPS static host and supply the final page URLs in App Store Connect. These files have not been published by this task. There is no index page; use the explicit HTML URLs.

The policy describes the current code, including the fact that opening an eligible locked level can contact Google while preloading an ad. It distinguishes local saved game data from Google SDK processing and email support. Review the wording whenever ad services, hosting, or data handling change. Dates are written explicitly so they can be updated with the policy.
