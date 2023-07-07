<div style="display:flex; align-items: center">
  <h1 style="position:relative; top: -6px" >Movie Quotes Updated Version</h1>
</div>

---
In this updated version of Movie Quotes, you can view thousands of different user-uploaded quotes and comment or like them. Many features have been added; you can like someone's quote or a comment, add your own movie and quote, and more. You have your own profile where you can update your data.

#
### Table of Contents
* [Prerequisites](#prerequisites)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Development](#development)

#
### Prerequisites

* <img src="https://github.com/RedberryInternship/example-project-laravel/blob/master/readme/assets/npm.png?raw=true" width="35" style="position: relative; top: 4px" /> *npm@9.5 and up*
#
### Tech Stack

* <img src="https://www.mattbenton.io/img/logos/vue-9-logo-png-transparent-min.png" height="19" style="position: relative; top: 4px" /> [VueJs@3.x](https://vuejs.org/guide/introduction.html) - front-end framework
* <img src="https://vee-validate.logaretm.com/v4/logo.png" height="19" style="position: relative; top: 4px" /> [Vee-validate@4.x](https://vee-validate.logaretm.com/v4/) - package for form validations
* <img src="https://miro.medium.com/max/632/1*5QD8DKhOjRe-gcYjozlLNQ.png" height="19" style="position: relative; top: 4px" /> [Tailwind CSS](https://tailwindcss.com) - CSS library
* [Pusher](https://pusher.com) - Real time notification package
* [Laravel Echo](https://yobaji.github.io/vue3-google-login/) - Real time event broadcasting library

#
### Getting Started
1\. First of all you need to clone repository from github:
```sh
git clone https://github.com/RedberryInternship/giorgi-surmanidze-movie-quotes-front.git
```

2\. Next step requires you to run *npm install* in order to install all the dependencies.
```sh
npm install
```
3\. Now we need to set our env file. 
```sh
cp .env.example .env
```
And now you should provide **.env** file all the necessary environment variables:

#
**App urls:**
>VITE_BASE_URL=*****

>VITE_THUMBNAIL_URL=*****

#
**Pusher:**
>VITE_PUSHER_APP_KEY=*****

>VITE_PUSHER_APP_CLUSTER=*****

##### Now, you should be good to go!

#
### Development

You can run Vite built-in development server by executing:

```sh
  npm run dev
```