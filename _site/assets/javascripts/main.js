<!DOCTYPE html>
<!--
    Basically Basic Jekyll Theme 1.4.5
    Copyright 2017-2018 Michael Rose - mademistakes.com | @mmistakes
    Free for personal and commercial use under the MIT license
    https://github.com/mmistakes/jekyll-theme-basically-basic/blob/master/LICENSE
-->
<html lang="pt-BR" class="no-js">
  <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  
    
    <!-- Begin Jekyll SEO tag v2.8.0 -->
<title>Rene Verinaud Anguita Junior | Site pessoal e portfólio de Rene Verinaud Anguita Junior</title>
<meta name="generator" content="Jekyll v3.10.0" />
<meta property="og:title" content="Rene Verinaud Anguita Junior" />
<meta name="author" content="Rene Verinaud Anguita Junior" />
<meta property="og:locale" content="pt_BR" />
<meta name="description" content="Site pessoal e portfólio de Rene Verinaud Anguita Junior" />
<meta property="og:description" content="Site pessoal e portfólio de Rene Verinaud Anguita Junior" />
<link rel="canonical" href="http://localhost:4000/assets/javascripts/main.js" />
<meta property="og:url" content="http://localhost:4000/assets/javascripts/main.js" />
<meta property="og:site_name" content="Rene Verinaud Anguita Junior" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary" />
<meta property="twitter:title" content="Rene Verinaud Anguita Junior" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebPage","author":{"@type":"Person","name":"Rene Verinaud Anguita Junior","url":"https://seu-website.com"},"description":"Site pessoal e portfólio de Rene Verinaud Anguita Junior","headline":"Rene Verinaud Anguita Junior","url":"http://localhost:4000/assets/javascripts/main.js"}</script>
<!-- End Jekyll SEO tag -->

  

  <script>
    /* Cut the mustard */
    if ( 'querySelector' in document && 'addEventListener' in window ) {
      document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '') + 'js';
    }
  </script>

  <link rel="stylesheet" href="/assets/stylesheets/main.css">
  
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,600,600i">
  

  
    
    <link rel="alternate" type="application/atom+xml" title="Rene Verinaud Anguita Junior" href="/feed.xml">
  
</head>


  <body class="layout--post ">

    <nav class="skip-links">
  <h2 class="screen-reader-text">Skip links</h2>
  <ul>
    <li><a href="#primary-nav" class="screen-reader-shortcut">Skip to primary navigation</a></li>
    <li><a href="#main" class="screen-reader-shortcut">Skip to content</a></li>
    <li><a href="#footer" class="screen-reader-shortcut">Skip to footer</a></li>
  </ul>
</nav>


    <div class="sidebar-toggle-wrapper">
      

      <button class="toggle navicon-button larr" type="button">
        <span class="toggle-inner">
          <span class="sidebar-toggle-label visually-hidden">Menu</span>
          <span class="navicon"></span>
        </span>
      </button>
    </div>

    <div id="sidebar" class="sidebar">
      <div class="inner">
        <nav id="primary-nav" class="site-nav" itemscope itemtype="http://schema.org/SiteNavigationElement" aria-label="Main navigation">
  <ul id="menu-main-navigation" class="menu">
    <!-- Home link -->
    <li class="menu-item">
      <a href="/" itemprop="url">
        <span itemprop="name">Home</span>
      </a>
    </li>

    <!-- site.pages links -->
    
    

    
      
      
    
      
      
    
  </ul>
</nav>

        <ul class="contact-list">
  

  

  

  <li>
    
      <a href="/feed.xml" title="Atom Feed">
        <span class="icon icon--rss"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M12.8 16C12.8 8.978 7.022 3.2 0 3.2V0c8.777 0 16 7.223 16 16h-3.2zM2.194 11.61c1.21 0 2.195.985 2.195 2.196 0 1.21-.99 2.194-2.2 2.194C.98 16 0 15.017 0 13.806c0-1.21.983-2.195 2.194-2.195zM10.606 16h-3.11c0-4.113-3.383-7.497-7.496-7.497v-3.11c5.818 0 10.606 4.79 10.606 10.607z"/></svg></span>
        <span class="label">Subscribe</span>
      </a>
    
  </li>
</ul>

      </div>
    </div>

    <div class="canvas">
      <div class="wrapper">
        

<header id="masthead">
  <div class="inner">
    <div class="title-area">
      
        <p class="site-title">
          <a href="/">
            
            <span>Rene Verinaud Anguita Junior</span>
          </a>
        </p>
      
    </div>
  </div>
</header>

        <div class="initial-content">
          <header class="intro">
  

  <div class="inner">
    <div class="intro-text">
      <h1 id="page-title" class="intro-title">Rene Verinaud Anguita Junior
</h1>
      

      

      

      
    </div>
  </div>
</header>


<main id="main" class="page-content" aria-label="Content">
  <div class="inner">
    <article class="entry-wrap">
      <div class="entry-content">
        /*!
 * Basically Basic Jekyll Theme 1.4.5
 * Copyright 2017-2018 Michael Rose - mademistakes | @mmistakes
 * Free for personal and commercial use under the MIT license
 * https://github.com/mmistakes/jekyll-theme-basically-basic/blob/master/LICENSE
*/

var menuItems = document.querySelectorAll('#sidebar li');

// Get vendor transition property
var docElemStyle = document.documentElement.style;
var transitionProp = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';

// Animate sidebar menu items
function animateMenuItems() {
  for (var i = 0; i < menuItems.length; i++) {
    var item = menuItems[i];
    // Stagger transition with transitionDelay
    item.style[transitionProp + 'Delay'] = (i * 75) + 'ms';
    item.classList.toggle('is--moved');
  }
};

var myWrapper = document.querySelector('.wrapper');
var myMenu = document.querySelector('.sidebar');
var myToggle = document.querySelector('.toggle');
var myInitialContent = document.querySelector('.initial-content');
var mySearchContent = document.querySelector('.search-content');
var mySearchToggle = document.querySelector('.search-toggle');

// Toggle sidebar visibility
function toggleClassMenu() {
  myMenu.classList.add('is--animatable');
  if (!myMenu.classList.contains('is--visible')) {
    myMenu.classList.add('is--visible');
    myToggle.classList.add('open');
    myWrapper.classList.add('is--pushed');
  } else {
    myMenu.classList.remove('is--visible');
    myToggle.classList.remove('open');
    myWrapper.classList.remove('is--pushed');
  }
}

// Animation smoother
function OnTransitionEnd() {
  myMenu.classList.remove('is--animatable');
}

myMenu.addEventListener('transitionend', OnTransitionEnd, false);
myToggle.addEventListener('click', function () {
  toggleClassMenu();
  animateMenuItems();
}, false);
myMenu.addEventListener('click', function () {
  toggleClassMenu();
  animateMenuItems();
}, false);
if (mySearchToggle) {
  mySearchToggle.addEventListener('click', function () {
    toggleClassSearch();
  }, false);
}

// Toggle search input and content visibility
function toggleClassSearch() {
  mySearchContent.classList.toggle('is--visible');
  myInitialContent.classList.toggle('is--hidden');
  setTimeout(function () {
    document.querySelector('.search-content input').focus();
  }, 400);
}

      </div>
      
        
      
    </article>
  </div>
</main>

        </div>

        <div class="search-content">
          <div class="inner">
  
</div>

        </div>
      </div>
    </div>

    <footer id="footer" class="site-footer">
  <div class="inner">
    <div class="copyright">
      
        <p>&copy; 2024 Rene Verinaud Anguita Junior.</p>
      
    </div>
  </div>
</footer>

    

<script async src="/assets/javascripts/main.js"></script>




  </body>

</html>
