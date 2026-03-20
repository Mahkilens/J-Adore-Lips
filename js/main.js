 (function () {
   function setMenuOpen(toggleBtn, menuEl, open) {
     toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
     if (open) {
       menuEl.hidden = false;
     } else {
       menuEl.hidden = true;
     }
   }
 
   document.addEventListener("DOMContentLoaded", function () {
     var toggleBtn = document.querySelector(".nav-toggle");
     var menuEl = document.getElementById("mobile-menu");
 
     if (!toggleBtn || !menuEl) return;
 
     setMenuOpen(toggleBtn, menuEl, false);
 
     toggleBtn.addEventListener("click", function () {
       var isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
       setMenuOpen(toggleBtn, menuEl, !isOpen);
     });
 
     menuEl.addEventListener("click", function (e) {
       var target = e.target;
       if (target && target.tagName === "A") {
         setMenuOpen(toggleBtn, menuEl, false);
       }
     });
 
     document.addEventListener("keydown", function (e) {
       if (e.key === "Escape") {
         setMenuOpen(toggleBtn, menuEl, false);
       }
     });
 
     window.addEventListener("resize", function () {
       if (window.innerWidth >= 760) {
         setMenuOpen(toggleBtn, menuEl, false);
       }
     });
   });
 })();
