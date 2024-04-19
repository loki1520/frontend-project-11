<p align="center">
  <a href="https://rss-aggregator-green.vercel.app/">
    <img alt="aggregator" src="https://user-images.githubusercontent.com/84579087/164723061-7ea9b03e-6a03-4a66-bb04-7ebbc3b7e65d.png">
  </a>
</p>

[![Actions Status](https://github.com/loki1520/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/loki1520/frontend-project-11/actions)
[![Node CI](https://github.com/loki1520/frontend-project-11/actions/workflows/nodejs.yml/badge.svg)](https://github.com/loki1520/frontend-project-11/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/fc5b628fc821eabed83b/maintainability)](https://codeclimate.com/github/loki1520/frontend-project-11/maintainability)

# Description


**RSS aggregator** (or **RSS reader**) - the software could use the XML structure to present a neat display to the end users.

Subscribing to RSS feeds can allow a user to keep track of many different websites in a single news aggregator, which constantly monitor sites for new content, removing the need for the user to manually check them. 

Users subscribe to feeds by entering a feed's URI into the reader. The reader checks the user's feeds regularly for new information and can automatically download it.

My news aggregator is built for a web browser. It supports feeds with RSS 2.0 format.

## Installation

1. Clone the repository (via SSH / HTTPS / GitHub CLI):
```
$ git clone <link>
```

2. Change the working directory:
```
$ cd frontend-project-11
```

3. Install dependencies:
```
$ make install
```

If you want to install package globally in your system you should run:
```
$ make link
```
And don't remember rerun this command in case of changes package.json!

## Development

To start local server:
```
$ make develop
```

To lint code:
```
$ make lint
```

To build production:
```
$ make build
```

You may use [Lorem RSS Generator](https://github.com/mbertolacci/lorem-rss) additionally. It is a GitHub library which generates lorem rss feeds at specified intervals. In order to see how my news aggregator works,you just need to copy one of links from library page and paste into rss reader form.

## Demo
deploy#1 - https://frontend-project-11.onrender.com/

deploy #2 - https://frontend-project-11-o8eohxn4h-lokis-projects-10779546.vercel.app
