# Getting Started

## Setting up the project

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.

## Development

Run the development server using the following command:

npm run serve


This command will start Eleventy with a local server and watch for changes in the Tailwind configuration and the source files.

## Build

To build the production version of the site, run the following command:

npm run build


This command will build the Eleventy site and generate the production version of the Tailwind CSS.

## Updating the project

Anytime you update the project, make sure to update the dependencies by running `npm install`.

---

# Notes

## Setting up the email MX record on the Netlify side of things (from KnownHost)

It is important to change the MX record to point to mail.domain.com from domain.com. Then create an apex record (A) to mail.domain.com. Ensure that this is done on both the KnownHost hosting side and the Netlify side of things. Then it should work.

---

# Products

- Product description is the 'description' field on the Stripe product page.
- Product features are constructed from a comma-separated text field in the metadata section of the Stripe product page.
- Delivery information is conditional:
  - If a weight is specified, it is shown.
  - If the downloadable field is found, the string contained therein is shown.
  - TODO: Note that the conditional here is currently 'ifelse' for the downloadable field which allows the incorrect assignment of both a weight AND the downloadable field string.
  - TODO: Make the downloadable field a 'boolean' and put the downloadable text inside the code.

## Playwright and GitHub Actions

We use [Playwright](https://playwright.dev/) to perform end-to-end testing of our application. Playwright tests can be found in the `test.js` file.

[GitHub Actions](https://github.com/features/actions) is employed to automate the running of Playwright tests whenever changes are pushed to the repository or a pull request is created. The workflow configuration can be found in `.github/workflows/playwright.yml`.

For more details on setting up Playwright and GitHub Actions, refer to the [official Playwright documentation](https://playwright.dev/docs/intro) and [GitHub Actions documentation](https://docs.github.com/en/actions/automating-your-workflow-with-github-actions).


---- old readme stuff vvvvv ------

# Getting started
## Setup a fresh folder and then initialise it with a package.json file
npm init -y

<!-- -------------------------------------------------------------- -->
<!--              Tailwind, PostCSS and Autoprefixer                -->
<!-- -------------------------------------------------------------- -->

## Tailwind CSS
### Install Tailwind as a PostCSS plugin (allows easiest integration with build tools like Parcel), and autoprefixer
npm install -D tailwindcss postcss autoprefixer

### Initialise Tailwind and create a tailwind.config.js
npx tailwindcss init

### Add Tailwind to the PostCSS configuration in the postcss.config.js file
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}

### Configure template files in tailwind.config.js
content: ["./src/**/*.{html,js}"],

### Add the Tailwind directives for each of Tailwind's layers to the main CSS file
@tailwind base;
@tailwind components;
@tailwind utilities;

<!-- -------------------------------------------------------------- -->
<!--                      Tailwind plugins                          -->
<!-- -------------------------------------------------------------- -->
### Install with npm and add to tailwind.config.js as a series of plugins
npm install -D @tailwindcss/typography
npm install -D @tailwindcss/forms
npm install -D @tailwindcss/aspect-ratio

module.exports = {
  plugins: [
    <!-- Series of 'prose' classes to apply styling to unstyled text content -->
    require('@tailwindcss/typography'),
    <!-- Opinionated form reset to allow easier styling -->
    require('@tailwindcss/forms'),
    <!-- Aspect classes to enable giving an element a fixed aspect ratio -->
    require('@tailwindcss/aspect-ratio'),
  ]
}

<!-- -------------------------------------------------------------- -->
<!--                          Prettier                              -->
<!-- -------------------------------------------------------------- -->
### Install Prettier to keep all the code nicely formatted on save
npm install --save-dev --save-exact prettier

### Create a file called .prettierrc.json
Empty file lets editors and other tools know to expect Prettier to be used
### Create a .prettierignore and base it on .gitignore

### Now, format all files with Prettier
npx prettier --write .

<!-- -------------------------------------------------------------- -->
<!--                    Build process options                       -->
<!-- -------------------------------------------------------------- -->
### Setup build processes in package.json
"scripts": {
    "start": "eleventy --serve & npx tailwindcss -i styles/tailwind.css -c styles/tailwind.config.js -o _site/style.css --watch",
    "build": "ELEVENTY_PRODUCTION=true eleventy && NODE_ENV=production npx tailwindcss -i styles/tailwind.css -c styles/tailwind.config.js -o _site/style.css --minify"
},
npm start

### Start the Tailwind CLI build process
Run the CLI tool to scan your template files for classes and build your CSS.
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch

### Start using Tailwind in the HTML
<link rel="stylesheet" href="/_site/css/style.css">

<!-- -------------------------------------------------------------- -->
<!--                           Eleventy                             -->
<!-- -------------------------------------------------------------- -->

## Install Eleventy
npm install -D @11ty/eleventy

## Setup a Nunjucks index.njk file to use as the homepage
{% extends "_includes/default.njk" %}

{% block title %}It does work{% endblock %}

{% block content %}
  <div class="fixed inset-0 flex justify-center items-center">
    <div>
      <span class="text-change">Good design</span><br/>
      <span class="change">is<br/>as little design<br/>as possible</span>
    </div>
  </div>
{% endblock %}

### Create _includes/default.njk which will contain a simple HTML boilerplate
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>
      {% block title %}Does it work?{% endblock %}
    </title>
    <meta charset="UTF-8"/>
    {% if description %}
      <meta name="description" content="{{description}}"/>
    {% endif %}
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"/>
    <link rel="stylesheet" href="/style.css?v={% version %}"/>
    {% block head %}{% endblock %}
  </head>
  <body>
    {% block content %}
      {{ content | safe }}
    {% endblock %}
  </body>
</html>

### Create .eleventy.js that we use to configure Eleventy (note leading . in filename)
const now = String(Date.now())

module.exports = function(eleventyConfig) {
    eleventyConfig.addWatchTarget('./css/tailwind.config.js')
    eleventyConfig.addWatchTarget('./css/tailwind.css')

    eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })

    eleventyConfig.addShortcode('version', function() {
        return now
    })
};

### The blog
<!-- Login via domain.com/admin -->
<!-- I log in with Github -->
<!-- Posts are required to have the post tag applied -->


### Setting up the email MX record on the Netlify side of things (from KnownHost)
It is important to change the MX record to point to mail.domain.com from domain.com. Then create an apex record (A) to mail.domain.com. Ensure that this is done on both the KnownHost hosting side and the Netlify side of things. Then it should work.

---

# Products

- Product description is the 'description' field on the Stripe product page
- Product features are constructed from a comma-separated text field in the metadata section of the Stripe product page
- Delivery information is conditional:
  - If a weight is specifed it is shown
  - If the downloadable field is found, the string contained therein is shown
  - TODO: Note that the conditional here is currently 'ifelse' for the downloadable field which allows the incorrect assignment of both a weight AND the downloadable field string.
  - TODO: Make the downloadable field a 'boolean' and put the downloadable text inside the code
