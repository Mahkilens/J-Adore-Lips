(function () {
	"use strict";

	/* ─── MOBILE MENU ─── */
	let hamburger = document.getElementById("hamburger");
	let mobileMenu = document.getElementById("mobile-menu");
	let closeBtn = document.getElementById("mobile-menu-close");

	function openMenu() {
		if (!mobileMenu) return;
		mobileMenu.classList.add("open");
		document.body.style.overflow = "hidden";
		if (hamburger) hamburger.setAttribute("aria-expanded", "true");
	}

	function closeMenu() {
		if (!mobileMenu) return;
		mobileMenu.classList.remove("open");
		document.body.style.overflow = "";
		if (hamburger) hamburger.setAttribute("aria-expanded", "false");
	}

	if (hamburger) hamburger.addEventListener("click", openMenu);
	if (closeBtn) closeBtn.addEventListener("click", closeMenu);

	if (mobileMenu) {
		mobileMenu.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", closeMenu);
		});
	}

	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") closeMenu();
	});

	window.addEventListener("resize", function () {
		if (window.innerWidth >= 768) closeMenu();
	});

	/* ─── FAQ ACCORDION ─── */
	let faqItems = document.querySelectorAll(".faq-item");

	faqItems.forEach(function (item) {
		let btn = item.querySelector(".faq-question");
		let answer = item.querySelector(".faq-answer");
		if (!btn || !answer) return;

		btn.addEventListener("click", function () {
			let isOpen = item.classList.contains("open");

			faqItems.forEach(function (other) {
				if (other !== item) {
					other.classList.remove("open");
					let otherBtn = other.querySelector(".faq-question");
					if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
				}
			});

			if (isOpen) {
				item.classList.remove("open");
				btn.setAttribute("aria-expanded", "false");
			} else {
				item.classList.add("open");
				btn.setAttribute("aria-expanded", "true");
			}
		});
	});

	/* ─── STICKY HEADER SCROLL EFFECT ─── */
	let header = document.getElementById("site-header");
	if (header) {
		window.addEventListener(
			"scroll",
			function () {
				if (window.scrollY > 60) {
					header.style.borderBottomColor = "rgba(255,255,255,0.14)";
				} else {
					header.style.borderBottomColor = "rgba(255,255,255,0.1)";
				}
			},
			{ passive: true },
		);
	}
})();

/* ─── SHOPIFY CART CONTROL ─── */
(function () {
	"use strict";

	function getShopifyToggle() {
		return (
			document.querySelector(".shopify-buy__cart-toggle") ||
			document.querySelector('[aria-label="Toggle cart"]')
		);
	}

	function getShopifyCount() {
		return document.querySelector(".shopify-buy__cart-toggle__count");
	}

	function openShopifyCart() {
		const toggle = getShopifyToggle();
		if (toggle) toggle.click();
	}

	function updateBagCount() {
		const customCount = document.getElementById("bag-count");
		const shopifyCount = getShopifyCount();

		if (!customCount) return;

		const count = shopifyCount ? shopifyCount.textContent.trim() : "0";
		const newDisplay = count === "0" ? "none" : "inline-flex";

		if (customCount.textContent !== count) {
			customCount.textContent = count;
		}
		if (customCount.style.display !== newDisplay) {
			customCount.style.display = newDisplay;
		}
	}

	function startBagCountWatcher() {
		const observer = new MutationObserver(function () {
			updateBagCount();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
			characterData: true,
		});

		updateBagCount();

		setTimeout(updateBagCount, 300);
		setTimeout(updateBagCount, 800);
		setTimeout(updateBagCount, 1500);
		setTimeout(updateBagCount, 2500);
	}

	document.addEventListener("click", function (e) {
		const trigger = e.target.closest("#bag-btn, .header-bag-trigger");
		if (!trigger) return;

		e.preventDefault();
		openShopifyCart();
	});

	document.addEventListener("DOMContentLoaded", function () {
		startBagCountWatcher();
	});
})();
