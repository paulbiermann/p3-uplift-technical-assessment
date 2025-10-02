# p3-uplift-technical-assessment

Technical assessment for P3+Uplift, based on prompt: https://github.com/uplift-delivery/katas/tree/main/countries

This project is written with React and TypeScript.

## Dev Station Setup

Install node.js [https://nodejs.org/en/download](https://nodejs.org/en/download)

Clone the repo and install the required packages:

```
    npm install
```

## Running the project

```
    npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Decisions / Tradeoffs

This project implements a frontend interface for the REST Countries API. It fetches and displays an infinite-scrolling list of countries, showing high-level details about the country. Clicking into a country will bring the user to a country details page to display more information.

For this project, I was asked to implement infinite scrolling or pagination. Typically, I would be working with an endpoint that supports pagination, however the REST Countries API does not support pagination. So, all of the countries are fetched up front and the pagination is applied after. This means we don't get the benefits of reducing download size that we normally would with pagination / infinite scroll. In a real-world instance, I would normally check in with my team and suggest adding pagination to the API endpoint.

Given more time, there are many improvements I would make. One issue is that different countries have different sized flags. I would like to find a design that better accomodates this. I would describe the general design of this application as a "first pass" and there are lots of tweaks I would make for better spacing, etc.. Another issue I would solve, given more time, is that when the user returns to the list of countries from a country details page, it doesn't remember their place in the infinite scrolling list. They're sent back up to the top.