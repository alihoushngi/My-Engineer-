document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       GLOBAL HELPERS
    ========================================================= */

    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

    function safeScrollTo(el) {
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function safeAddClass(el, className) {
        if (el) el.classList.add(className);
    }

    function safeRemoveClass(el, className) {
        if (el) el.classList.remove(className);
    }

    function hideElement(el) {
        if (el) el.classList.add("d-none");
    }

    function showElement(el) {
        if (el) el.classList.remove("d-none");
    }

    function resetInput(el) {
        if (!el) return;
        el.value = "";
        el.classList.remove("is-invalid");
    }


    /* =========================================================
       EXPERTISE SECTION
       تخصص‌های انتخاب‌شده، حذف، شمارنده، نمایش بیشتر/کمتر
    ========================================================= */

    const expertiseList = $("#expertiseList");
    const toggleExpertiseBtn = $("#toggleExpertiseBtn");
    const expertiseCount = $("#expertiseCount");
    const goToPreviousStepBtn = $("#goToPreviousStepBtn");

    const EXPERTISE_MAX_LINES = 3;
    const EXPERTISE_LINE_HEIGHT = 44;

    function updateExpertiseCount() {
        if (!expertiseList || !expertiseCount) return;

        const count = $$(".expertise-item", expertiseList).length;
        expertiseCount.textContent = `${count} تخصص انتخاب شده`;
    }

    function updateExpertiseToggle() {
        if (!expertiseList || !toggleExpertiseBtn) return;

        const collapsedHeight = EXPERTISE_MAX_LINES * EXPERTISE_LINE_HEIGHT;
        const isExpanded = toggleExpertiseBtn.dataset.expanded === "true";

        if (!isExpanded) {
            expertiseList.classList.remove("expanded");
            expertiseList.style.maxHeight = `${collapsedHeight}px`;
        }

        requestAnimationFrame(() => {
            const fullHeight = expertiseList.scrollHeight;

            if (fullHeight > collapsedHeight + 5) {
                toggleExpertiseBtn.classList.remove("d-none");

                if (!isExpanded) {
                    toggleExpertiseBtn.dataset.expanded = "false";
                    toggleExpertiseBtn.textContent = "نمایش بیشتر";
                }
            } else {
                toggleExpertiseBtn.classList.add("d-none");
                toggleExpertiseBtn.dataset.expanded = "false";
                toggleExpertiseBtn.textContent = "نمایش بیشتر";
                expertiseList.classList.remove("expanded");
                expertiseList.style.maxHeight = `${collapsedHeight}px`;
            }
        });
    }

    toggleExpertiseBtn?.addEventListener("click", () => {
        if (!expertiseList) return;

        const expanded = toggleExpertiseBtn.dataset.expanded === "true";

        if (expanded) {
            expertiseList.classList.remove("expanded");
            expertiseList.style.maxHeight = `${EXPERTISE_MAX_LINES * EXPERTISE_LINE_HEIGHT}px`;
            toggleExpertiseBtn.dataset.expanded = "false";
            toggleExpertiseBtn.textContent = "نمایش بیشتر";
        } else {
            expertiseList.classList.add("expanded");
            expertiseList.style.maxHeight = `${expertiseList.scrollHeight}px`;
            toggleExpertiseBtn.dataset.expanded = "true";
            toggleExpertiseBtn.textContent = "نمایش کمتر";
        }
    });

    expertiseList?.addEventListener("click", (e) => {
        const removeBtn = e.target.closest(".remove-btn");
        if (!removeBtn) return;

        const item = removeBtn.closest(".expertise-item");
        if (!item) return;

        item.remove();
        updateExpertiseCount();
        updateExpertiseToggle();
    });

    goToPreviousStepBtn?.addEventListener("click", () => {
        /*
            هدف این دکمه:
            برگشت از step-5 به step-4 برای افزودن/ویرایش تخصص
        */

        const previousStepSection = $(".step-4");
        const currentStepSection = $(".step-5");

        if (previousStepSection && currentStepSection) {
            currentStepSection.classList.add("d-none");
            previousStepSection.classList.remove("d-none");
            safeScrollTo(previousStepSection);
            return;
        }

        const prevStepBtn = $("[data-prev-step]");
        if (prevStepBtn) {
            prevStepBtn.click();
            return;
        }

        window.history.back();
    });

    updateExpertiseCount();
    updateExpertiseToggle();
    window.addEventListener("resize", updateExpertiseToggle);


    /* =========================================================
       PROFILE IMAGE PREVIEW
       پیش‌نمایش تصویر پروفایل
    ========================================================= */

    const fileInput = $("#fileInput");
    const preview = $("#preview");
    let profileObjectUrl = null;

    fileInput?.addEventListener("change", (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            e.target.value = "";
            return;
        }

        if (profileObjectUrl) {
            URL.revokeObjectURL(profileObjectUrl);
        }

        profileObjectUrl = URL.createObjectURL(file);

        if (preview) {
            preview.src = profileObjectUrl;
        }
    });


    /* =========================================================
       EDUCATION STEPS
       سطح تحصیلات، انتخاب مقطع، تولید آپلودها
    ========================================================= */

    let selectedLevel = null;
    let selectedDegrees = [];

    function createUploadCard(container, degree) {
        if (!container) return;

        const card = document.createElement("div");
        card.className = "card mb-3 border-0 shadow-sm rounded-3";

        const body = document.createElement("div");
        body.className = "card-body";

        const title = document.createElement("h6");
        title.className = "fw-bold mb-3";
        title.textContent = degree;

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.className = "form-control";
        fileInput.name = "education_files[]";
        fileInput.accept = ".pdf,.jpg,.jpeg,.png";

        const degreeInput = document.createElement("input");
        degreeInput.type = "hidden";
        degreeInput.name = "education_degrees[]";
        degreeInput.value = degree;

        body.appendChild(title);
        body.appendChild(fileInput);
        body.appendChild(degreeInput);

        card.appendChild(body);
        container.appendChild(card);
    }

    function generateUploads() {
        const container = $("#uploadContainer");
        if (!container) return;

        container.innerHTML = "";

        if (selectedLevel === "diplomaOrLower") {
            createUploadCard(container, "دیپلم");
            return;
        }

        selectedDegrees.forEach((degree) => {
            createUploadCard(container, degree);
        });
    }

    function goToEducationStep(step) {
        const targetStep = $("#step" + step);
        const targetCircle = $("#circle" + step);

        if (!targetStep) return false;

        if (
            step === 3 &&
            selectedLevel === "aboveDiploma" &&
            selectedDegrees.length === 0
        ) {
            alert("لطفاً حداقل یک مقطع را انتخاب کنید.");
            return false;
        }

        $$(".form-step").forEach((stepEl) => {
            stepEl.classList.remove("active-step");
        });

        targetStep.classList.add("active-step");

        $$(".step-circle").forEach((circle) => {
            circle.classList.remove("active");
        });

        if (targetCircle) {
            targetCircle.classList.add("active");
        }

        if (step === 3) {
            generateUploads();
        }

        return true;
    }

    window.selectLevel = function (level) {
        selectedLevel = level;

        if (level === "diplomaOrLower") {
            goToEducationStep(3);
        } else {
            goToEducationStep(2);
        }
    };

    /*
        اگر در HTML قبلی onclick="goToStep(2)" داری،
        این alias نگه داشته شده.
        اما فقط برای stepهای آموزشی با id مثل step1, step2, step3 کار می‌کند.
    */
    window.goToStep = function (step) {
        return goToEducationStep(step);
    };

    $$(".degree-card").forEach((card) => {
        card.addEventListener("click", function () {
            this.classList.toggle("selected");

            const degree = this.dataset.degree;
            if (!degree) return;

            const index = selectedDegrees.indexOf(degree);

            if (index > -1) {
                selectedDegrees.splice(index, 1);
            } else {
                selectedDegrees.push(degree);
            }
        });
    });


    /* =========================================================
       HYRCAN NEZAM MOHANDESI SECTION
       عضویت نظام مهندسی، پروانه، رشته، صلاحیت‌ها
    ========================================================= */

    let hyrcan_selectedSalahiyat = [];
    let hyrcan_nezamStatus = null; // yes | no

    window.hyrcan_selectNezam = function (value, el) {
        hyrcan_nezamStatus = value;

        $$(".hyrcan_select_card").forEach((card) => {
            card.classList.remove("selected");
        });

        if (el) {
            el.classList.add("selected");
        }

        const section = $("#hyrcan_nezamSection");
        const nezamError = $("#hyrcan_nezamError");

        hideElement(nezamError);

        if (!section) return;

        if (value === "yes") {
            showElement(section);
        } else {
            hideElement(section);

            hideElement($("#hyrcan_parvanehSection"));
            hideElement($("#hyrcan_salahiyatSection"));

            resetInput($("#hyrcan_membershipNumber"));
            resetInput($("#hyrcan_parvanehNumber"));
            resetInput($("#hyrcan_parvanehFile"));
            resetInput($("#hyrcan_hasParvaneh"));
            resetInput($("#hyrcan_reshtehSelect"));

            const salahiyatCards = $("#hyrcan_salahiyatCards");
            if (salahiyatCards) salahiyatCards.innerHTML = "";

            hyrcan_selectedSalahiyat = [];
        }
    };

    window.hyrcan_handleParvaneh = function (value) {
        const section = $("#hyrcan_parvanehSection");
        const salahiyatSection = $("#hyrcan_salahiyatSection");
        const salahiyatCards = $("#hyrcan_salahiyatCards");

        if (!section) return;

        if (value === "yes") {
            showElement(section);
        } else {
            hideElement(section);
            hideElement(salahiyatSection);

            if (salahiyatCards) {
                salahiyatCards.innerHTML = "";
            }

            hyrcan_selectedSalahiyat = [];

            resetInput($("#hyrcan_parvanehNumber"));
            resetInput($("#hyrcan_parvanehFile"));
            resetInput($("#hyrcan_reshtehSelect"));
        }
    };

    window.hyrcan_handleReshteh = function (value) {
        const container = $("#hyrcan_salahiyatCards");
        const salahiyatSection = $("#hyrcan_salahiyatSection");

        if (!container || !salahiyatSection) return;

        container.innerHTML = "";
        hyrcan_selectedSalahiyat = [];

        let options = [];

        if (["omran", "bargh", "mechanic", "memari"].includes(value)) {
            options = ["طراحی", "نظارت", "اجرا"];
        } else if (value === "naghshe") {
            options = ["طراحی", "نظارت"];
        } else {
            hideElement(salahiyatSection);
            return;
        }

        showElement(salahiyatSection);

        const fragment = document.createDocumentFragment();

        options.forEach((opt) => {
            const col = document.createElement("div");
            col.className = "col-md-4";

            const card = document.createElement("div");
            card.className = "hyrcan_checkbox_card";
            card.textContent = opt;
            card.dataset.value = opt;

            card.addEventListener("click", function () {
                window.hyrcan_toggleSalahiyat(this, opt);
            });

            col.appendChild(card);
            fragment.appendChild(col);
        });

        container.appendChild(fragment);
    };

    window.hyrcan_toggleSalahiyat = function (el, val) {
        if (!el || !val) return;

        el.classList.toggle("selected");

        const index = hyrcan_selectedSalahiyat.indexOf(val);

        if (index > -1) {
            hyrcan_selectedSalahiyat.splice(index, 1);
        } else {
            hyrcan_selectedSalahiyat.push(val);
        }

        const salahiyatError = $("#hyrcan_salahiyatError");

        if (hyrcan_selectedSalahiyat.length > 0) {
            hideElement(salahiyatError);
        }
    };

    window.hyrcan_validateNezam = function () {
        let valid = true;

        const nezamError = $("#hyrcan_nezamError");
        const nezamSection = $("#hyrcan_nezamSection");
        const parvanehSection = $("#hyrcan_parvanehSection");

        const membershipInput = $("#hyrcan_membershipNumber");
        const hasParvaneh = $("#hyrcan_hasParvaneh");
        const parvanehInput = $("#hyrcan_parvanehNumber");
        const parvanehFile = $("#hyrcan_parvanehFile");
        const reshtehSelect = $("#hyrcan_reshtehSelect");
        const salahiyatError = $("#hyrcan_salahiyatError");

        hideElement(nezamError);

        if (!hyrcan_nezamStatus) {
            if (nezamError) {
                nezamError.textContent = "لطفاً وضعیت عضویت در نظام مهندسی را مشخص کنید";
                showElement(nezamError);
            }
            return false;
        }

        if (hyrcan_nezamStatus === "no") {
            return true;
        }

        if (nezamSection && !nezamSection.classList.contains("d-none")) {
            if (!membershipInput || !membershipInput.value.trim()) {
                safeAddClass(membershipInput, "is-invalid");
                valid = false;
            } else {
                safeRemoveClass(membershipInput, "is-invalid");
            }

            if (!hasParvaneh || !hasParvaneh.value) {
                safeAddClass(hasParvaneh, "is-invalid");
                valid = false;
            } else {
                safeRemoveClass(hasParvaneh, "is-invalid");
            }

            if (
                hasParvaneh &&
                hasParvaneh.value === "yes" &&
                parvanehSection &&
                !parvanehSection.classList.contains("d-none")
            ) {
                if (!parvanehInput || !parvanehInput.value.trim()) {
                    safeAddClass(parvanehInput, "is-invalid");
                    valid = false;
                } else {
                    safeRemoveClass(parvanehInput, "is-invalid");
                }

                if (!parvanehFile || parvanehFile.files.length === 0) {
                    safeAddClass(parvanehFile, "is-invalid");
                    valid = false;
                } else {
                    safeRemoveClass(parvanehFile, "is-invalid");
                }

                if (!reshtehSelect || !reshtehSelect.value) {
                    safeAddClass(reshtehSelect, "is-invalid");
                    valid = false;
                } else {
                    safeRemoveClass(reshtehSelect, "is-invalid");
                }

                if (hyrcan_selectedSalahiyat.length === 0) {
                    showElement(salahiyatError);
                    valid = false;
                } else {
                    hideElement(salahiyatError);
                }
            }
        }

        if (!valid) {
            if (nezamError) {
                nezamError.textContent = "لطفاً اطلاعات را کامل کنید";
                showElement(nezamError);
            }
            return false;
        }

        return true;
    };


    /* =========================================================
       RESUME STEP
       مرحله اول رزومه به مرحله دوم
    ========================================================= */

    window.goToStepTwo = function () {
        const yearsInput = $("#resumeYearsInput");
        const textInput = $("#resumeTextInput");

        const years = yearsInput ? Number(yearsInput.value) : NaN;
        const text = textInput ? textInput.value.trim() : "";

        if (!yearsInput || yearsInput.value === "" || Number.isNaN(years) || years < 0) {
            alert("لطفاً تعداد سال‌های تجربه را وارد کنید.");
            yearsInput?.focus();
            return false;
        }

        if (text.length < 10) {
            alert("رزومه باید حداقل ۱۰ کاراکتر باشد.");
            textInput?.focus();
            return false;
        }

        const resumeStepOne = $("#resumeStepOne");
        const resumeStepTwo = $("#resumeStepTwo");

        if (resumeStepOne) {
            resumeStepOne.classList.add("resume-hidden");
        }

        if (resumeStepTwo) {
            resumeStepTwo.classList.remove("resume-hidden");
            safeScrollTo(resumeStepTwo);
        }

        return true;
    };


    /* =========================================================
       RESUME IMAGE UPLOAD
       آپلود و پیش‌نمایش تصاویر رزومه
    ========================================================= */

    const imageInput = $("#resumeImageInput");
    const imagePreview = $("#resumePreviewContainer");
    const selectedImages = new Set();
    const resumeImageUrls = new Map();

    imageInput?.addEventListener("change", (e) => {
        if (!imagePreview) return;

        const files = Array.from(e.target.files || []);

        files.forEach((file) => {
            if (!file.type.startsWith("image/")) return;

            const fileKey = `${file.name}-${file.size}-${file.lastModified}`;

            if (selectedImages.has(fileKey)) return;

            selectedImages.add(fileKey);

            const imageUrl = URL.createObjectURL(file);
            resumeImageUrls.set(fileKey, imageUrl);

            const item = document.createElement("div");
            item.className = "resume-preview-item";
            item.dataset.key = fileKey;

            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = file.name;

            const removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.className = "resume-remove-btn";
            removeBtn.innerHTML = "&times;";

            item.appendChild(img);
            item.appendChild(removeBtn);
            imagePreview.appendChild(item);
        });

        e.target.value = "";
    });

    imagePreview?.addEventListener("click", (e) => {
        const removeBtn = e.target.closest(".resume-remove-btn");
        if (!removeBtn) return;

        const item = removeBtn.closest(".resume-preview-item");
        if (!item) return;

        const key = item.dataset.key;

        selectedImages.delete(key);

        const url = resumeImageUrls.get(key);
        if (url) {
            URL.revokeObjectURL(url);
            resumeImageUrls.delete(key);
        }

        item.remove();
    });


    /* =========================================================
       CERTIFICATES
       افزودن، تایید و حذف پیش‌نمایش گواهینامه‌ها
    ========================================================= */

    const certRowsWrapper = $("#certRowsWrapper");
    const certPreviewContainer = $("#certPreviewContainer");

    function reindexCertificateRows() {
        if (!certRowsWrapper) return;

        $$(".cert-row", certRowsWrapper).forEach((row, index) => {
            const titleInput = $(".cert-title", row);
            const fileInput = $(".cert-file", row);

            if (titleInput) {
                titleInput.name = `certificates[${index}][title]`;
            }

            if (fileInput) {
                fileInput.name = `certificates[${index}][file]`;
            }
        });
    }

    window.addCertRow = function () {
        if (!certRowsWrapper) return;

        const index = certRowsWrapper.children.length;

        const row = document.createElement("div");
        row.className = "cert-row d-flex gap-2 align-items-center mb-2";

        row.innerHTML = `
            <input
                type="text"
                class="form-control cert-title"
                name="certificates[${index}][title]"
                placeholder="عنوان گواهینامه"
            >

            <input
                type="file"
                class="form-control cert-file"
                name="certificates[${index}][file]"
                accept=".pdf,.jpg,.png,.jpeg"
            >
        `;

        certRowsWrapper.appendChild(row);
        reindexCertificateRows();
    };

    window.confirmCertificates = function () {
        if (!certRowsWrapper || !certPreviewContainer) return;

        certPreviewContainer.innerHTML = "";

        const rows = $$(".cert-row", certRowsWrapper);

        rows.forEach((row) => {
            const title = $(".cert-title", row)?.value.trim() || "";
            const file = $(".cert-file", row)?.files?.[0] || null;

            if (!title && !file) return;

            const previewRow = document.createElement("div");
            previewRow.className = "cert-preview-row";

            previewRow.innerHTML = `
                <div class="cert-info">
                    <strong>${title || "بدون عنوان"}</strong>
                    <span>${file ? file.name : "بدون فایل"}</span>
                </div>

                <button type="button" class="cert-remove-btn">&times;</button>
            `;

            certPreviewContainer.appendChild(previewRow);
        });

        const modalEl = $("#resumeCertModal");

        if (modalEl && window.bootstrap?.Modal) {
            const modal =
                bootstrap.Modal.getInstance(modalEl) ||
                bootstrap.Modal.getOrCreateInstance(modalEl);

            modal?.hide();
        }
    };

    certPreviewContainer?.addEventListener("click", (e) => {
        const removeBtn = e.target.closest(".cert-remove-btn");
        if (!removeBtn) return;

        const previewRow = removeBtn.closest(".cert-preview-row");
        if (!previewRow || !certRowsWrapper) return;

        const index = Array.from(certPreviewContainer.children).indexOf(previewRow);
        const originalRow = certRowsWrapper.children[index];

        if (originalRow) {
            resetInput($(".cert-title", originalRow));
            resetInput($(".cert-file", originalRow));
        }

        previewRow.remove();
        reindexCertificateRows();
    });


    /* =========================================================
       REGISTER FORM VALIDATION
       اعتبارسنجی شماره موبایل و کد ملی
    ========================================================= */

    const registerForm = $("#registerForm");
    const mobileInput = $("#mobile");
    const nationalInput = $("#nationalCode");

    const mobileError = $("#mobileError");
    const codeError = $("#codeError");

    function onlyDigits(value) {
        return String(value || "").replace(/\D/g, "");
    }

    function showFieldError(inputEl, errorEl, message) {
        if (errorEl) {
            errorEl.textContent = message;
        }

        safeAddClass(inputEl, "is-invalid");
    }

    function clearFieldError(inputEl, errorEl) {
        if (errorEl) {
            errorEl.textContent = "";
        }

        safeRemoveClass(inputEl, "is-invalid");
    }

    function isValidIranNationalCode(code) {
        if (!/^\d{10}$/.test(code)) return false;

        const repeatedCodes = [
            "0000000000",
            "1111111111",
            "2222222222",
            "3333333333",
            "4444444444",
            "5555555555",
            "6666666666",
            "7777777777",
            "8888888888",
            "9999999999"
        ];

        if (repeatedCodes.includes(code)) return false;

        const checkDigit = Number(code[9]);

        let sum = 0;

        for (let i = 0; i < 9; i++) {
            sum += Number(code[i]) * (10 - i);
        }

        const remainder = sum % 11;

        if (remainder < 2) {
            return checkDigit === remainder;
        }

        return checkDigit === 11 - remainder;
    }

    function validateMobile() {
        if (!mobileInput) return true;

        const mobile = mobileInput.value.trim();

        if (mobile.length === 0) {
            showFieldError(mobileInput, mobileError, "شماره موبایل الزامی است");
            return false;
        }

        if (!/^09\d{9}$/.test(mobile)) {
            showFieldError(
                mobileInput,
                mobileError,
                "شماره موبایل معتبر نیست (باید با 09 شروع شود و 11 رقم باشد)"
            );
            return false;
        }

        clearFieldError(mobileInput, mobileError);
        return true;
    }

    function validateNationalCode() {
        if (!nationalInput) return true;

        const code = nationalInput.value.trim();

        if (code.length === 0) {
            showFieldError(nationalInput, codeError, "کد ملی الزامی است");
            return false;
        }

        if (code.length !== 10) {
            showFieldError(nationalInput, codeError, "کد ملی باید 10 رقم باشد");
            return false;
        }

        if (!isValidIranNationalCode(code)) {
            showFieldError(nationalInput, codeError, "کد ملی وارد شده معتبر نیست");
            return false;
        }

        clearFieldError(nationalInput, codeError);
        return true;
    }

    mobileInput?.addEventListener("input", () => {
        mobileInput.value = onlyDigits(mobileInput.value).slice(0, 11);

        if (mobileInput.value.length === 0 || /^09\d{9}$/.test(mobileInput.value)) {
            clearFieldError(mobileInput, mobileError);
        }
    });

    nationalInput?.addEventListener("input", () => {
        nationalInput.value = onlyDigits(nationalInput.value).slice(0, 10);

        if (nationalInput.value.length === 0) {
            clearFieldError(nationalInput, codeError);
            return;
        }

        if (nationalInput.value.length === 10 && isValidIranNationalCode(nationalInput.value)) {
            clearFieldError(nationalInput, codeError);
        }
    });

    mobileInput?.addEventListener("blur", validateMobile);
    nationalInput?.addEventListener("blur", validateNationalCode);

    registerForm?.addEventListener("submit", (e) => {
        const mobileValid = validateMobile();
        const codeValid = validateNationalCode();

        if (!mobileValid || !codeValid) {
            e.preventDefault();

            const firstInvalidField = registerForm.querySelector(".is-invalid");
            if (firstInvalidField) {
                firstInvalidField.focus();
                safeScrollTo(firstInvalidField);
            }
        }
    });
});
