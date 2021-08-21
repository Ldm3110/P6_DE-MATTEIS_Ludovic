export class Carousel {
    /**
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {Object} options.slidesToScroll => number of elements to scroll
     * @param {Object} options.slidesVisible => number of visible slides
     * @param {boolean} options.loop => boucler en fin de carousel
     */
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 4,
            loop: true
        }, options)
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.root.setAttribute('class', 'carousel')
        this.element.appendChild(this.root)
        this.moveCallbacks = []
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item

        })
        this.setStyle()
        this.createNavigation()
        this.moveCallbacks.forEach(callbacks => callbacks(0))
    }


    setStyle() {
        /**
         * Applies the correct dimensions to the elements of the carousel
         */
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + '%')
    }


    createDivWithClass(className) {
        /**
         * Facilitates the creation of div in the carousel
         * @param {string} className
         * @returns {HTMLElement}
         */
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div

    }


    createNavigation() {
        /**
         * Used to create navigation in the carousel
         */
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
    }


    next() {
        /**
         * Carousel movement on the next frame
         */
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }

    prev() {
        /**
         * Carousel movement on the previous frame
         */
        this.goToItem(this.currentItem - this.options.slidesToScroll)
    }

    goToItem(index) {
        /**
         * Activate the return to the first frame if user arrived at frame 7 and vice versa
         * @param index
         */
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index
        this.moveCallbacks.forEach(callbacks => callbacks())
    }

}