//start script

(function()
{
    "use strict"
    //easy selector helper function

    const select = (el, all = false) =>
    {
        el = el.trim();
        if(all)
        {
            return [...document.querySelectorAll(el)];
        }
        else
        {
            return document.querySelector(el);
        }
    }
    //easy event listener
    const on = (type, el, listener, all = false) =>
    {
        let selectEl = select(el, all)
        if(all)
        {
            selectEl.forEach(e => e.addEventListener(type, listener))
        }
        else
        {
            selectEl.addEventListener(type, listener)
        }
    }
    //easy on scroll event listner
    const onscroll = (el, listener) =>
    {
        el.addEventListener('scroll', listener)
    }
    //navbar liks active state on scroll

    let navbarlinks = select('#navbar .scrollto', true)
    const navbarLinksActive = () =>
    {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarLink => {
            if(!navbarLink.hash) return
            let section = select(navbarLink.hash)
            if(!section) return
            if(position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight))
            {
                navbarLink.classList.add('active')
            }
            else
            {
                navbarLink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarLinksActive)
    onscroll(document, navbarLinksActive)

    //scroll to an element with header offset
    const scrollTo = (el) =>
    {
        let elementPos = select (el).offsetTop
        window.scrollTo(
            {
                top: elementPos,
                behavior: 'smooth'
            }
        )
    }

    //scroll with offset on links a class nale scrollto
    on('click', '.scrollto', function(e)
    {
        if(select(this.hash))
        {
            e.preventDefault()
            let body = select('body')
            if(body.classList.contain('mobile-nav-active'))
            {
                body.classList.remove('mobile-nav-active')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollTo(this.hash)
        }
    }, true)

    //scroll with offset on page load with hash in url
    window.addEventListener('load', () =>
    {
        if(window.location.hash)
        {
            if(select(window.location.hash))
            {
                scrollTo(window.location.hash)
            }
        }
    });

    //mobile nav toggle
    on('click', '.mobile-nav-toggle', function(e)
    {
        select('body').classList.toggle('mobile-nav-active')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    
    //skill animation
    let skillContent = select('.skill-content')
    if(skillContent)
    {
        new Waypoint(
        {
            element: skillContent,
            offset: '80%',
            handler: function(direction)
            {
                let progress = select('.progress .progress-bar', true)
                progress.forEach((el) =>
                {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                })
            }
        })
    }
    //portfolio isotops and filters
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
          let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item'
          });
    
          let portfolioFilters = select('#portfolio-flter li', true);
    
          on('click', '#portfolio-flter li', function(e) {
            e.preventDefault();
            portfolioFilters.forEach(function(el) {
              el.classList.remove('filter-active');
            });
            this.classList.add('filter-active');
    
            portfolioIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
          },true);
        }
      });
      //Inializing Glightbox
      const portfolioLightbox=GLightbox(
        {
          selector:'.portfolio-lightbox'
        }
      )

      
      //testimonial slider
      new Swiper('.testimonial-slider',{
        speed:600,
        loop:true,
        autoplay:{
          delay:5000,
          disableOnInteraction:false
        },
        slidePerView:'auto',
        pagination:{
          el:'.swiper-pagination',
          type:'bullets',
          clickable:true
        },
        breakpoints: 
        {
            // when window width is >= 320px
            320: {
            slidesPerView: 1,
            spaceBetween: 20
            },
            
            // when window width is >= 640px
            640: {
            slidesPerView: 3,
            spaceBetween: 40
            }
        }
      })
            
      //back top btn
      let backtotop=select('.back-to-top')
      if(backtotop)
      {
        const toggleBacktotop=()=>
        {
          if(window.scrollY > 100)
          {
            backtotop.classList.add('active')
          }
          else
          {
            backtotop.classList.remove('active')
          }
        }
        window.addEventListener('load',toggleBacktotop)
        onscroll(document,toggleBacktotop)
      }


    //initializing pure counter
   new PureCounter();
})()