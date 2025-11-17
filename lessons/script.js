
    // Toggle sidebar instead of only opening
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const menuBtn = document.getElementById("menuBtn");

    function sidebarOpen() {
        sidebar.style.transform = "translateX(0)";
        overlay.style.opacity = "1";
        overlay.style.visibility = "visible";
        menuBtn.setAttribute("aria-expanded", "true");
    }
    function sidebarClose() {
        sidebar.style.transform = "translateX(-100%)";
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
        menuBtn.setAttribute("aria-expanded", "false");
    }

    let sidebarVisible = false;
    menuBtn.addEventListener("click", () => {
        sidebarVisible = !sidebarVisible;
        if (sidebarVisible) {
            sidebarOpen();
        } else {
            sidebarClose();
        }
    });

    overlay.addEventListener("click", () => {
        sidebarVisible = false;
        sidebarClose();
    });

    // Always reset sidebar on resize - fix "stuck sidebar" issue
    function handleResize() {
        if (window.innerWidth >= 900) {
            // On desktop: ensure sidebar is shown (CSS handles transform), hide overlay, update state
            sidebar.style.transform = "";
            overlay.style.opacity = "";
            overlay.style.visibility = "";
            menuBtn.setAttribute("aria-expanded", "false");
            sidebarVisible = false;
        } else {
            // On mobile: keep sidebar state as is (either opened or closed via hamburger)
            if (sidebarVisible) {
                sidebarOpen();
            } else {
                sidebarClose();
            }
        }
    }

    window.addEventListener("resize", handleResize);
    // Run on page load in case you reload in desktop or mobile
    handleResize();


/* AUTO HIGHLIGHT ON SCROLL */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const SCROLL_OFFSET = 120;

function updateActiveLink(currentId) {
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
}

function handleScrollHighlight() {
  if (!sections.length) return;

  const scrollPosition = window.scrollY;
  let current = sections[0].id;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - SCROLL_OFFSET;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.id;
    }
  });

  const nearPageBottom = window.innerHeight + scrollPosition >= document.documentElement.scrollHeight - 2;
  if (nearPageBottom) {
    current = sections[sections.length - 1].id;
  }

  updateActiveLink(current);
}

window.addEventListener("scroll", handleScrollHighlight, { passive: true });
handleScrollHighlight();

/* HANDLE NAV CLICKS FOR CONSISTENT HIGHLIGHTING */
navLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const targetId = link.getAttribute("href").replace("#", "");
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - (SCROLL_OFFSET - 20);
    window.scrollTo({ top: targetPosition, behavior: "smooth" });

    updateActiveLink(targetId);

    if (window.innerWidth < 900) {
      sidebarVisible = false;
      sidebarClose();
    }
  });
});
