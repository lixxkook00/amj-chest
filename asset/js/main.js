// SLIDER
var swiper1 = new Swiper(".card-swiper", {
    slidesPerView: 4,
    spaceBetween: 10,
    slideToClickedSlide: false,
    centeredSlides: true,
    allowTouchMove: false,
    loop: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: "#card-next",
        prevEl: "#card-prev",
    },
    breakpoints: {
        // when window width is >= 480px
        120: {
        slidesPerView: 2,
        spaceBetween: 2
        },
        // when window width is >= 640px
        740: {
        slidesPerView: 2,
        spaceBetween: 4
        },
        1023: {
        slidesPerView: 3,
        spaceBetween: 10
        }
    }
});

const query = document.querySelector.bind(document)
const queryAll = document.querySelectorAll.bind(document)

// LOADING
window.addEventListener('load', (event) => {
    setTimeout(() => {
        query('#loading').style.display = "none"
    },1000)
})

// HANDLE THE BEST OPEN CHEST EVER

// clear
const clear = () => {
    // hidden border
    query('.card-slide-border').style.display = 'none';

    // empty award HTML
    query('#card-award-wrapper').innerHTML = ""
    query('#card-award-wrapper').classList.remove('active')

    // show other card again
    queryAll('.card-slide.disable').forEach((element) => {
        // console.log(element)
        element.classList.remove("hidden")
        element.classList.remove("disable")
    })

    // hidden confirm button
    query('#card-slide-open-confirm').style.display = "none"

    // restore current card
    queryAll('.card-slide').forEach((element) => {
        if(element.classList.length == 3){
            // clear class
            element.classList.remove("active")
            element.classList.remove("opening")

            // hidden optionals button
            element.children[2].style.display = 'unset'
        }
    })

    // hidden award block
    query('#card-award').style.display = "none"

    // hidden award detail
    query('#award-detail').style.display = 'none'
}

// show reward text


// handle confirm button
query('#card-slide-open-confirm').onclick = () => {
    clear()
}

// click to active card
queryAll('.card-slide-open').forEach((button) => {
    button.onclick = (e) => {
        e.preventDefault();

        // centered current slide
        const indexInSlide = e.target.parentNode.parentNode.parentNode.ariaLabel.split(' ')
        const positionToActive = parseInt(indexInSlide[0])-1

        swiper1.slideTo(positionToActive)
        swiper1.update()

        // active card
        queryAll('.card-slide').forEach((element) => {
            element.classList.add("disable")
            element.classList.remove("active")
        })

        const currentCard = e.target.parentNode.parentNode

        currentCard.classList.remove("disable")
        currentCard.classList.add("active")

        query('.swiper').style.overflow = "unset"
    }
})

// award list
const CARD_PER_SCREEN = 5;

const createAwardBlock = (finalAward) => {
    // get width for per award card
    const widthAwardMain = query('#card-award').offsetWidth
    const widthPerCard = widthAwardMain / CARD_PER_SCREEN;

    // create HTML
    let awardHTML = ''
    for(let i = 1;i<=20;i++){
        let cardAmount = Math.floor(Math.random() * 9)*100

        // fake amount
        i !== 13 ? cardAmount = Math.floor(Math.random() * 9 + 1)*100 : cardAmount = finalAward

        awardHTML += `
        <div class="card-award-item" style="width: ${widthPerCard}px;">
            <img src="/asset/images/${Math.floor(Math.random() * 3 + 1)}_1.png" alt="" class="card-award-item-bg">
            <div class="card-award-item-value">
                ${cardAmount}
            </div>
        </div>
        `
    }
    // awardList.forEach((award) => {
       
    // })
    query('#card-award-wrapper').innerHTML = awardHTML
}

// click to open
queryAll('.card-slide-opennow').forEach((button) => {
    button.onclick = (e) => {
        const currentCard = e.target.parentNode.parentNode
        
        // hidden other card
        queryAll('.card-slide.disable').forEach((element) => {
            // console.log(element)
            element.classList.add("hidden")
        })

        // opening
        currentCard.classList.add('opening')
        query('.card-award').style.display = 'flex'
        query('.card-slide-border').style.display = 'flex'


        // call API to get award
        const finalAward = "1BTC"

        // create award block in html
        createAwardBlock(finalAward)

        // hanlde opening animation
        setTimeout(() => {
            query('#card-award-wrapper').classList.add('active')
        },300)

        // hidden optional button
        // currentCard.children[2].style.display = 'none'
        
        // complete 
        setTimeout(() => {
            // show confirm button
            query('#card-slide-open-confirm').style.display = 'block'

            // active award
            const currentAward = query('#card-award-wrapper').children[12].children[0]
            currentAward.classList.add('active')

            // show award detail
            query('#award-detail').innerText = `You scored ${finalAward} box !!!`
            query('#award-detail').style.display = 'block'

        },3500)

    }
})
