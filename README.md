# Jobify

A job board front-end built with HTML, CSS, Bootstrap 5 and vanilla JavaScript.
Browse job listings, filter them by keyword, category and type, view job details,
and register or sign in to manage a profile.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Landing page with hero, search and a featured jobs section |
| `jobs.html` | Full listing with live search and category/type filters |
| `job-details.html` | Details for a single job, selected from the listing |
| `about.html` | About the project |
| `contact.html` | Contact form |
| `login.html` | Sign in |
| `register.html` | Create an account |
| `profile.html` | View and edit the signed-in user's profile |

## Tech

- HTML5 and CSS3
- Bootstrap 5.3 and Bootstrap Icons (loaded from CDN)
- Vanilla JavaScript, no build step
- `localStorage` for accounts and profile data

## Running it

No install and no build. Clone the repo and open `index.html` in a browser:

```bash
git clone https://github.com/rovana-khaled/jobify-itc-final.git
cd jobify-itc-final
```

To serve it over HTTP instead of `file://`:

```bash
npx serve .
```

## Notes

Authentication is client-side only. Accounts live in the browser's `localStorage`,
so there is no server, no database and no real security. It is a front-end
demonstration, not a production sign-in system.
