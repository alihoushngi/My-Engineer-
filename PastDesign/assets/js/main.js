// 1. فیلترهای سرویس‌ها + مدیریت Offcanvas فیلترها
document.addEventListener("DOMContentLoaded", function () {

    // وقتی روی خود دکمه فیلتر کلیک می‌شود
    document.addEventListener("click", function (e) {
        const filterBtn = e.target.closest(".button-filter");
        if (!filterBtn) return;

        // اگر کلیک روی دکمه حذف بود، اجازه نده این بخش فیلتر را فعال کند
        if (e.target.closest(".remove-filter") || e.target.closest(".filter-remove-btn")) {
            e.stopPropagation();
            return;
        }

        filterBtn.classList.add("active-filter");
    });


    // وقتی داخل offcanvas یک radio انتخاب می‌شود
    document.addEventListener("change", function (event) {
        const radio = event.target.closest(".offcanvas input[type='radio']");
        if (!radio) return;

        const offcanvas = radio.closest(".offcanvas");
        if (!offcanvas) return;

        const filterButton = document.querySelector(`[data-filter-target="#${offcanvas.id}"]`);

        if (filterButton) {
            filterButton.classList.add("is-active");
            filterButton.classList.add("active-filter");

            // ظاهر کردن ضربدر
            const removeButton = filterButton.querySelector(".filter-remove-btn");
            if (removeButton) {
                removeButton.classList.remove("d-none");
            }

            // مخفی کردن فلش
            const caretIcon = filterButton.querySelector(".filter-caret");
            if (caretIcon) {
                caretIcon.classList.add("d-none");
            }
        }

        const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
        offcanvasInstance.hide();
    });


    // حذف فیلتر با کلیک روی ضربدر
    // استفاده از Capture Phase برای جلوگیری از باز شدن دوباره Offcanvas
    document.addEventListener("click", function (event) {
        const removeButton = event.target.closest(".filter-remove-btn");
        if (!removeButton) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        const filterButton = removeButton.closest(".button-filter");
        if (!filterButton) return;

        const targetSelector = filterButton.dataset.filterTarget;
        if (!targetSelector) return;

        const offcanvas = document.querySelector(targetSelector);

        if (offcanvas) {
            // پاک کردن radioهای همان فیلتر
            offcanvas.querySelectorAll("input[type='radio']").forEach(function (radio) {
                radio.checked = false;
            });

            // اگر به هر دلیل Offcanvas باز بود یا باز شد، ببند
            const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
            offcanvasInstance.hide();
        }

        // برگشت دکمه به حالت اولیه
        filterButton.classList.remove("is-active");
        filterButton.classList.remove("active-filter");

        // مخفی کردن ضربدر
        removeButton.classList.add("d-none");

        // ظاهر کردن دوباره فلش
        const caretIcon = filterButton.querySelector(".filter-caret");
        if (caretIcon) {
            caretIcon.classList.remove("d-none");
        }

    }, true);

});


// 2. مدیریت تب‌های ترسیم و استادکار (DOMContentLoaded)
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;

    // تب‌های ترسیم نقشه
    const tabsConfig = [
        { id: "darw-arc", class: "show-arc" },
        { id: "draw-calc", class: "show-calc" },
        { id: "draw-elec", class: "show-elec" },
        { id: "darw-mech", class: "show-mech" }
    ];

    const allTabs = tabsConfig.map(t => document.getElementById(t.id)).filter(el => el !== null);

    if (allTabs.length > 0) {
        body.classList.add("show-arc");
        document.getElementById("darw-arc")?.classList.add("active");

        tabsConfig.forEach(config => {
            const tabEl = document.getElementById(config.id);

            tabEl?.addEventListener("click", () => {
                tabsConfig.forEach(c => body.classList.remove(c.class));
                allTabs.forEach(t => t.classList.remove("active"));

                body.classList.add(config.class);
                tabEl.classList.add("active");
            });
        });
    }

    // تب استادکار/پیمانکار
    const ostadkarTab = document.getElementById("ostadkar-tab");
    const peymankarTab = document.getElementById("peymankar-tab");

    if (ostadkarTab && peymankarTab) {
        body.classList.add("show-ostadkar");

        [ostadkarTab, peymankarTab].forEach(btn => {
            btn.addEventListener("click", function () {
                const isOstad = this === ostadkarTab;

                body.classList.toggle("show-ostadkar", isOstad);
                body.classList.toggle("show-peymankar", !isOstad);

                ostadkarTab.classList.toggle("active", isOstad);
                peymankarTab.classList.toggle("active", !isOstad);
            });
        });
    }
});


// 3. سیستم نظرات (ستاره، تگ، ارسال)
document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star-btn");
    const tags = document.querySelectorAll(".tag");
    const tabs = document.querySelectorAll(".sort-comment-btn");

    stars.forEach(star => {
        star.addEventListener("click", () => {
            stars.forEach(s => s.classList.remove("active"));
            star.classList.add("active");
        });
    });

    tags.forEach(tag => {
        tag.addEventListener("click", () => tag.classList.toggle("selected"));
    });

    tabs.forEach(btn => {
        btn.addEventListener("click", function () {
            const target = this.dataset.target;

            tabs.forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".comment-content").forEach(c => c.classList.remove("active"));

            this.classList.add("active");
            document.getElementById(target)?.classList.add("active");
        });
    });

    const anonymous = document.getElementById("anonymous-check");
    const nameInput = document.getElementById("user-name");

    anonymous?.addEventListener("change", function () {
        if (nameInput) {
            nameInput.value = this.checked ? "" : nameInput.value;
            nameInput.disabled = this.checked;
            nameInput.classList.remove("is-invalid");
        }
    });

    const submitBtn = document.getElementById("submit-comment");

    submitBtn?.addEventListener("click", function () {
        if (!anonymous.checked && nameInput?.value.trim() === "") {
            alert("لطفا نام خود را وارد کنید.");
            nameInput.classList.add("is-invalid");
            return;
        }

        const authModal = document.getElementById("modal-authentication");

        if (authModal) {
            new bootstrap.Offcanvas(authModal).show();
        }
    });
});


// 4. انتخاب شهر (با دقت بالا)
(function initCitySelector() {
    const box = document.getElementById("selectedCities");
    if (!box) return;

    const cityCbs = document.querySelectorAll(".city-checkbox");
    const provCbs = document.querySelectorAll(".province-checkbox");

    function update() {
        const selected = Array.from(cityCbs)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        box.innerHTML = "";

        selected.forEach(city => {
            const chip = document.createElement("span");
            chip.className = "border border-secondary px-1 rounded-2 bg-success-subtle me-1 mb-1";
            chip.innerHTML = `${city} <span class="remove-city" data-city="${city}" style="cursor:pointer">×</span>`;
            box.appendChild(chip);
        });

        const txt = selected.length === 0
            ? "انتخاب شهر"
            : selected.length === 1
                ? selected[0]
                : `${selected.length} شهر`;

        document.querySelectorAll(".citySelected, .selectedCityDisplay").forEach(el => {
            el.innerText = txt;
        });

        localStorage.setItem("selectedCities", JSON.stringify(selected));
    }

    cityCbs.forEach(cb => cb.addEventListener("change", update));

    provCbs.forEach(pcb => {
        pcb.addEventListener("change", function () {
            const related = this.closest(".accordion-body")?.querySelectorAll(".city-checkbox");

            related?.forEach(c => {
                c.checked = this.checked;
            });

            update();
        });
    });

    document.addEventListener("click", e => {
        if (e.target.classList.contains("remove-city")) {
            const city = e.target.dataset.city;

            cityCbs.forEach(cb => {
                if (cb.value === city) {
                    cb.checked = false;
                }
            });

            update();
        }
    });

    document.getElementById("clearCities")?.addEventListener("click", () => {
        cityCbs.forEach(cb => {
            cb.checked = false;
        });

        update();
    });

    // Restore
    const saved = JSON.parse(localStorage.getItem("selectedCities") || "[]");

    cityCbs.forEach(cb => {
        if (saved.includes(cb.value)) {
            cb.checked = true;
        }
    });

    update();
})();


// 5. گالری تصاویر رزومه (کامل)
(function initGallery() {
    const mainImg = document.getElementById("resume-main-image");
    if (!mainImg) return;

    const items = document.querySelectorAll(".gallery-item img");
    const container = document.getElementById("resume-thumbs");
    const offEl = document.getElementById("offcanvas-image-resume");

    if (!container || !offEl || !window.bootstrap) return;

    const off = new bootstrap.Offcanvas(offEl);
    let images = Array.from(items).map(i => i.dataset.image || i.src);
    let current = 0;

    items.forEach((img, i) => {
        const thumb = document.createElement("img");
        thumb.src = img.dataset.image || img.src;
        thumb.className = "img-fluid img-resume-footer p-1";

        thumb.onclick = () => {
            current = i;
            render();
        };

        container.appendChild(thumb);

        img.onclick = () => {
            current = i;
            render();
            off.show();
        };
    });

    function render() {
        mainImg.src = images[current];

        document.querySelectorAll("#resume-thumbs .img-resume-footer").forEach((t, i) => {
            t.classList.toggle("active", i === current);
        });
    }

    document.getElementById("resume-next")?.addEventListener("click", () => {
        current = (current + 1) % images.length;
        render();
    });

    document.getElementById("resume-prev")?.addEventListener("click", () => {
        current = (current - 1 + images.length) % images.length;
        render();
    });

    render();
})();


// 6. چت با قابلیت ارسال فایل (کامل)
(function initChat() {
    const chatModal = document.getElementById("chatModal");
    if (!chatModal) return;

    const input = document.getElementById("chatInputField");
    const fileIn = document.getElementById("fileInput");
    const preview = document.getElementById("filePreview");
    const body = document.getElementById("chatBody");

    document.getElementById("openChatBtn")?.addEventListener("click", () => {
        chatModal.style.display = "flex";
    });

    document.getElementById("closeChatBtn")?.addEventListener("click", () => {
        chatModal.style.display = "none";
    });

    document.getElementById("fileBtn")?.addEventListener("click", () => {
        fileIn?.click();
    });

    fileIn?.addEventListener("change", function () {
        const file = this.files[0];

        if (!file || !preview) return;

        preview.style.display = "flex";

        if (file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = e => {
                preview.innerHTML = `<img src="${e.target.result}" style="max-height:50px"> <span>${file.name}</span>`;
            };

            reader.readAsDataURL(file);
        } else {
            preview.innerHTML = `📄 <span>${file.name}</span>`;
        }
    });

    function send() {
        const text = input.value.trim();
        const file = fileIn?.files[0];

        if (!text && !file) return;

        const wrapper = document.createElement("div");
        wrapper.className = "message-wrapper sent";

        let content = text ? `<span>${text}</span>` : "";

        if (file) {
            content += `<div class="file-msg">📄 ${file.name}</div>`;
        }

        wrapper.innerHTML = `<div class="message user">${content}<div class="tick">✓</div></div>`;
        body.appendChild(wrapper);

        input.value = "";

        if (fileIn) {
            fileIn.value = "";
        }

        if (preview) {
            preview.style.display = "none";
            preview.innerHTML = "";
        }

        body.scrollTop = body.scrollHeight;
    }

    document.getElementById("sendMessageBtn")?.addEventListener("click", send);

    input?.addEventListener("keypress", e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    });
})();


// 7. انیمیشن تب‌ها و موارد عمومی
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const underline = document.querySelector(".underline");

    if (tabs.length && underline) {
        const activate = (tab) => {
            tabs.forEach(t => t.classList.remove("active"));

            tab.classList.add("active");

            underline.style.width = tab.offsetWidth + "px";
            underline.style.left = tab.offsetLeft + "px";
        };

        tabs.forEach(t => {
            t.addEventListener("click", () => activate(t));
        });

        activate(tabs[0]);
    }

    // Navbar Modal
    const toggler = document.querySelector(".navbar-toggler");

    toggler?.addEventListener("click", e => {
        const m = document.getElementById("modal-1-menuModal");

        if (m && window.bootstrap) {
            new bootstrap.Modal(m).show();
        }
    });
});
