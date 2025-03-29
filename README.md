
# Movie Recommender App

## Table of Contents

1. Overview
2. Features
3. Demo
4. Technologies Used
5. API Interaction
6. Local Development Setup
7. Deployment
8. Challenges and Solutions
9. Credits and Acknowledgments

---

## 1. Overview

The Movie Recommender App is a web application designed to help users discover movies they might enjoy. By allowing users to filter, sort, and search through a curated list of top movies fetched from the IMDb Top 250 Movies API, the app simplifies the process of finding the perfect film.

> **Disclaimer:** This application is for educational and personal use only.

## 2. Features

### 2.1 Display Top Movies

- Shows a list of movies with their posters, titles, release years, genres, and IMDb ratings.

### 2.2 Genre Filtering

- Enables users to filter the movie list by selecting one or more specific genres (Action, Comedy, Drama, Adventure).

### 2.3 Year Filtering

- Allows users to filter movies by release year.

### 2.4 Sorting

- Sort movies by:
  - IMDb Rating (highest rated first)
  - Movie Title (alphabetical order)
  - Release Year (oldest first)

### 2.5 Searching

- Users can search movies by title or genre.

### 2.6 Refresh

- Reloads the initial shuffled list of movies.

## 3. Demo

[**Demo Video**](https://youtu.be/7IxFDbY3gEY)

[**Live Application**](https://www.yourgift.tech)

## 4. Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **API:** IMDb Top 250 Movies API from [RapidAPI](https://rapidapi.com/)
- **Deployment:** Deployed on nginx and haproxy for load balancing

## 5. API Interaction

This application integrates with the **IMDb Top 250 Movies API** from RapidAPI to fetch and display movie data, including titles, posters, release years, genres, and ratings.

API Documentation: [IMDb Top 250 Movies API](https://rapidapi.com/octopusteam-octopusteam-default/api/imdb236/playground/apiendpoint_94bcc49a-fd14-4b7b-bc2d-4c3b97f41613)

## 6. Local Development Setup

### Step 1: Clone the Repository

```sh
git clone https://github.com/Tapiwanashe6/movie-recommender-app.git
```

```
cd app
```

### Step 2: Open the Project

Since this is a front-end application, simply open `index.html` in a browser.

## 7. Deployment

### 7.1 Prerequisites

- Two web servers:
  - **Web-01** and **Web-02** (where nginx is installed, and I configured `/etc/nginx/sites_available/default`, this file is where I hosted my application. I placed all my files used to make the application, including HTML, CSS, and JS, inside `/var/www/html` so that they can be accessed by visiting the IP address).
  
- **Load balancer:**
  - Through **lb-01** (where haproxy is installed to distribute the requests across those two servers). This was done by configuring the haproxy config file (`/etc/haproxy/haproxy.cfg`), so you can access it by linking to the IP address of `lb-01`.

### 7.2 Domain Name

- A domain was created using **DotTech domain** and linked to the IP address. Now, if you visit my domain, you will get the same result as visiting via the IP address.

### 7.3 SSL Certificate

- From **lb-01**, I created a certificate using **certbot**, issued by **Letsencrypt** and signed by it, ensuring the connection is secure.

## 8. Challenges and Solutions

### API Rate Limiting

- **Issue:** Free-tier API plans have rate limits.
- **Solution:** Implemented local caching and optimized API requests.

## 9. Credits and Acknowledgments

- **IMDb Top 250 Movies API** - Provided by [RapidAPI](https://rapidapi.com/octopusteam-octopusteam-default/api/imdb236/playground/apiendpoint_94bcc49a-fd14-4b7b-bc2d-4c3b97f41613)
- **CSS Reset:** [Meyer Reset CSS](https://cdnjs.com)

