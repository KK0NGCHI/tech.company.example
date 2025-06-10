// DOM 로드 완료 후 실행
document.addEventListener("DOMContentLoaded", function () {
    // 모바일 메뉴 토글 기능
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // 메뉴 항목 클릭 시 모바일 메뉴 닫기
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
            link.addEventListener("click", function () {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });

        // 메뉴 외부 클릭 시 모바일 메뉴 닫기
        document.addEventListener("click", function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }

    // 스크롤 시 헤더 그림자 효과
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
            } else {
                header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
            }
        });
    }

    // 연락처 폼 제출 처리
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // 폼 데이터 수집
            const formData = new FormData(contactForm);
            const formObject = {};

            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }

            // 필수 필드 검증
            const requiredFields = ["name", "email", "subject", "message"];
            let isValid = true;

            requiredFields.forEach((field) => {
                const input = document.getElementById(field);
                if (!formObject[field] || formObject[field].trim() === "") {
                    showFieldError(input, "이 필드는 필수입니다.");
                    isValid = false;
                } else {
                    clearFieldError(input);
                }
            });

            // 이메일 형식 검증
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = document.getElementById("email");
            if (formObject.email && !emailPattern.test(formObject.email)) {
                showFieldError(emailInput, "올바른 이메일 형식을 입력해주세요.");
                isValid = false;
            }

            // 개인정보 동의 확인
            const privacyCheckbox = document.getElementById("privacy");
            if (!privacyCheckbox.checked) {
                alert("개인정보 처리방침에 동의해주세요.");
                isValid = false;
            }

            if (isValid) {
                // 성공 메시지 표시
                showSuccessMessage("문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
                contactForm.reset();
            }
        });
    }

    // 필드 에러 표시 함수
    function showFieldError(input, message) {
        clearFieldError(input);

        input.style.borderColor = "#ef4444";
        const errorDiv = document.createElement("div");
        errorDiv.className = "field-error";
        errorDiv.style.color = "#ef4444";
        errorDiv.style.fontSize = "0.875rem";
        errorDiv.style.marginTop = "0.25rem";
        errorDiv.textContent = message;

        input.parentNode.appendChild(errorDiv);
    }

    // 필드 에러 제거 함수
    function clearFieldError(input) {
        input.style.borderColor = "#e5e7eb";
        const existingError = input.parentNode.querySelector(".field-error");
        if (existingError) {
            existingError.remove();
        }
    }

    // 성공 메시지 표시 함수
    function showSuccessMessage(message) {
        // 기존 메시지 제거
        const existingMessage = document.querySelector(".success-message");
        if (existingMessage) {
            existingMessage.remove();
        }

        // 성공 메시지 생성
        const messageDiv = document.createElement("div");
        messageDiv.className = "success-message";
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: #10b981;
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        messageDiv.textContent = message;

        // 애니메이션 스타일 추가
        const style = document.createElement("style");
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(messageDiv);

        // 3초 후 메시지 제거
        setTimeout(() => {
            messageDiv.style.animation = "slideIn 0.3s ease reverse";
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 3000);
    }

    // 부드러운 스크롤 효과 (같은 페이지 내 링크용)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 카드 호버 효과 강화
    const cards = document.querySelectorAll(".feature-card, .business-card, .benefit-card, .job-card");
    cards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px)";
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });

    // 채용공고 상세보기/지원하기 버튼 처리
    const jobDetailButtons = document.querySelectorAll(".job-card .btn-outline");
    const jobApplyButtons = document.querySelectorAll(".job-card .btn-primary");

    jobDetailButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const jobCard = this.closest(".job-card");
            const jobTitle = jobCard.querySelector(".job-title").textContent;
            alert(`"${jobTitle}" 포지션의 상세 정보를 확인하시려면 별도 페이지로 이동합니다.`);
        });
    });

    jobApplyButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const jobCard = this.closest(".job-card");
            const jobTitle = jobCard.querySelector(".job-title").textContent;
            alert(`"${jobTitle}" 포지션에 지원하시려면 지원서 작성 페이지로 이동합니다.`);
        });
    });

    // 폼 입력 필드 포커스 효과
    const formInputs = document.querySelectorAll("input, select, textarea");
    formInputs.forEach((input) => {
        input.addEventListener("focus", function () {
            this.parentNode.style.transform = "scale(1.02)";
            this.parentNode.style.transition = "transform 0.2s ease";
        });

        input.addEventListener("blur", function () {
            this.parentNode.style.transform = "scale(1)";
        });
    });

    // 스크롤에 따른 애니메이션 효과
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들 설정
    const animatedElements = document.querySelectorAll(".feature-card, .business-card, .benefit-card, .timeline-item");
    animatedElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(element);
    });

    // 로딩 애니메이션 (페이지 로드 완료 후)
    window.addEventListener("load", function () {
        document.body.style.opacity = "1";
        document.body.style.transition = "opacity 0.5s ease";
    });

    // 초기 로딩 상태 설정
    document.body.style.opacity = "0";
});

// 페이지별 특별한 기능들
if (window.location.pathname.includes("about.html")) {
    // 회사소개 페이지의 통계 카운터 애니메이션
    document.addEventListener("DOMContentLoaded", function () {
        const statNumbers = document.querySelectorAll(".stat-number");

        const animateCounter = (element, target) => {
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + (element.textContent.includes("+") ? "+" : "");
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (element.textContent.includes("+") ? "+" : "");
                }
            }, 20);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const number = parseInt(text.replace(/[^0-9]/g, ""));
                    animateCounter(entry.target, number);
                    observer.unobserve(entry.target);
                }
            });
        });

        statNumbers.forEach((stat) => {
            observer.observe(stat);
        });
    });
}

// 전역 유틸리티 함수들
window.scrollToTop = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// 에러 처리
window.addEventListener("error", function (e) {
    console.error("JavaScript 오류 발생:", e.error);
});

// 사이즈 변경 시 메뉴 상태 초기화
window.addEventListener("resize", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (window.innerWidth > 768) {
        hamburger?.classList.remove("active");
        navMenu?.classList.remove("active");
    }
});
