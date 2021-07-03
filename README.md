# Trade-Up

## Description

Trade-up is an interactive, responsive, full-stack project that allows users to trade video games with others and can be found at [https://p2g3-trade-up.herokuapp.com/](https://p2g3-trade-up.herokuapp.com/).  The website allows users to post their own games or browse through other posting and make offers on them.  The user who created the post and the user who made an offer for that post are able to make comments between each other to get additional details of the potential trade.  Users are able to delete their posts once a trade is complete or they no longer want to make a trade.  The user story is as follows:

As a gamer, I want a platform where I am able to trade my old games with other players.

When I go to the home screen, I am presented with a list of the most recent offerings showig console type, picture, title, description and quality.

When I click on a posting and I am logged in, I see the detials and have the option to offer a trade.  If I have a trade offer posted, I have the ability to add additional comments.

When I click on my dashboard, I am presented with a list of my current posts, offers and an option to add a new post

When I click on any current post I am presented with all the current offers and an option to comment on any of them.  

When I click on my current offers, I am shown the original post, my offer, and any comments that have been made.  

When I click to add a new post then I am given a form to input the console type, title, description, quality and upload a picture that gets displayed.  
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Questions](#questions)

## Installation

In order to run the program locally, you can download or clone the program from the [GitHub site](https://github.com/kunkelkevin/trade-up). In the root directory of the program, ensure all packages are available by typing 'npm init' and 'npm install' in the command line. You will also have to MySQL which can be downloaded at [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/) and create a file named .env with the following two lines:<br />
DB_USER='your-mysql-username'<br />
DB_PW='your-mysql-password'<br />
DB_NAME='your-database-name'<br />
Then the program should be available to execute with "node server.js" or "npm start".  

## Usage

The Trade Up website is a full stack project that incorporates the following technolies:
 * bcrypt
 * dotenv
 * sequelize
 * mysql2
 * express
 * handlebars
 * file-upload-with-preview

The website's landing page will show any existing posting as seen in the following image:<br />
![Main Page](/img/Screenshot-main-page.png "TradeUp Home Page")

When trading, you are able to message back and forth with any other users who make an offer on your post:<br />
![Users Single Posting](/img/Screenshot-trade.png "E-Commerce Category Results")



## Questions

The Trade-Up code can be found on the following [GitHub page](https://github.com/kunkelkevin/trade-up).<br />If you want to see the GitHub pages of any of the contributors, they can be found below: <br />
[Alex Christenson](https://github.com/christenson10)<br />
[Derrick Huggins](https://github.com/dhuggins221)<br />
[Kevin Kunkel](https://github.com/kunkelkevin)<br />
[Ryan Armstrong](https://github.com/Rarmstrong45)
