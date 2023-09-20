let map

async function initMap() {
	const { Map } = await google.maps.importLibrary('maps')

	map = new Map(document.getElementById('map'), {
		center: { lat: 40.69000627344229, lng: -74.04487755664397 },
		zoom: 13,
	})
}

initMap()

$(function () {
	$('.blog-page__slider').slick({
		infinite: false,
		prevArrow:
			'<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button>',
		nextArrow:
			'<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg></button>',
	})

	$('.product-tabs__top-item').on('click', function (e) {
		e.preventDefault()
		$('.product-tabs__top-item').removeClass('product-tabs__top-item--active')
		$(this).addClass('product-tabs__top-item--active')

		$('.product-tabs__content-item').removeClass(
			'product-tabs__content-item--active'
		)
		$($(this).attr('href')).addClass('product-tabs__content-item--active')
	})

	$('.product-slide__thumb').slick({
		asNavFor: '.product-slide__big',
		focusOnSelect: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		vertical: true,
		draggable: false,
	})
	$('.product-slide__big').slick({
		asNavFor: '.product-slide__thumb',
		draggable: false,
		arrows: false,
		fade: true,
	})

	$('.select-style, .product-one__num').styler()

	$('.shop-content__filter-btn').on('click', function () {
		$('.shop-content__filter-btn').removeClass(
			'shop-content__filter-btn--active'
		)
		$(this).addClass('shop-content__filter-btn--active')
	})

	$('.button-list').on('click', function () {
		$('.product-item').addClass('product-item--list')
	})

	$('.button-grid').on('click', function () {
		$('.product-item').removeClass('product-item--list')
	})

	$('.top-slider__inner').slick({
		dots: true,
		arrows: false,
		fade: true,
		autoplay: true,
		autoplaySpeed: 2000,
	})

	$('.star').rateYo({
		starWidth: '17px',
		ratedFill: '#ffc35b',
		normalFill: '#ccccce',
		readOnly: true,
		starSvg:
			'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="16px" viewBox="0 0 18 16" version="1.1"> <g id="surface1"> <path style=" stroke: none; fill-rule: nonzero; fill-opacity: 1;" d="M 9.902344 0.5625 C 9.738281 0.21875 9.386719 0 9.003906 0 C 8.617188 0 8.273438 0.21875 8.101562 0.5625 L 6.09375 4.695312 L 1.605469 5.359375 C 1.230469 5.414062 0.917969 5.679688 0.804688 6.039062 C 0.6875 6.398438 0.78125 6.792969 1.050781 7.058594 L 4.304688 10.28125 L 3.539062 14.835938 C 3.476562 15.210938 3.632812 15.589844 3.941406 15.8125 C 4.25 16.035156 4.660156 16.0625 4.996094 15.882812 L 9.007812 13.742188 L 13.015625 15.882812 C 13.351562 16.0625 13.761719 16.039062 14.070312 15.8125 C 14.382812 15.585938 14.539062 15.210938 14.476562 14.835938 L 13.703125 10.28125 L 16.960938 7.058594 C 17.226562 6.792969 17.324219 6.398438 17.207031 6.039062 C 17.085938 5.679688 16.777344 5.414062 16.402344 5.359375 L 11.914062 4.695312 Z M 9.902344 0.5625 " /> </g> </svg>',
	})

	$('.filter-price__input').ionRangeSlider({
		type: 'double',
		prefix: '$',
		onStart: function (data) {
			$('.filter-price__from').text(data.from)
			$('.filter-price__to').text(data.to)
		},
		onChange: function (data) {
			$('.filter-price__from').text(data.from)
			$('.filter-price__to').text(data.to)
		},
	})
})

function getTimeRemaining(endtime) {
	const total = Date.parse(endtime) - Date.parse(new Date())
	const seconds = Math.floor((total / 1000) % 60)
	const minutes = Math.floor((total / 1000 / 60) % 60)
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
	const days = Math.floor(total / (1000 * 60 * 60 * 24))

	return {
		total,
		days,
		hours,
		minutes,
		seconds,
	}
}

function initializeClock(id, endtime) {
	const clock = document.querySelector('.promo__clock')
	const daysSpan = clock.querySelector('.promo__days')
	const hoursSpan = clock.querySelector('.promo__hours')
	const minutesSpan = clock.querySelector('.promo__minutes')
	const secondsSpan = clock.querySelector('.promo__seconds')

	function updateClock() {
		const t = getTimeRemaining(endtime)

		daysSpan.innerHTML = t.days
		hoursSpan.innerHTML = ('0' + t.hours).slice(-2)
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2)
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2)

		if (t.total <= 0) {
			clearInterval(timeinterval)
		}
	}

	updateClock()
	const timeinterval = setInterval(updateClock, 1000)
}

const deadline = document
	.querySelector('.promo__clock')
	.getAttribute('data-time')
initializeClock('promo__clock', deadline)
