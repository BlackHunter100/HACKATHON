
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // EDUNEXUS CONFIGURATION
    // =====================================

     const API_BASE_URL = "http://127.0.0.1:8001";

    // =====================================
    // 1. DASHBOARD DATE
    // =====================================

    const dateElement = document.getElementById("currentDate");

    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    // =====================================
    // 2. SIDEBAR NAVIGATION
    // =====================================

    const sidebarLinks = document.querySelectorAll(
        ".sidebar-navigation .sidebar-item"
    );

    sidebarLinks.forEach(link => {
        link.addEventListener("click", () => {

            sidebarLinks.forEach(item =>
                item.classList.remove("active")
            );

            link.classList.add("active");
        });
    });

    // =====================================
    // 3. QUICK ACTION MENU
    // =====================================

    const quickActionButton =
        document.getElementById("quickActionButton");

    const quickActionMenu =
        document.getElementById("quickActionMenu");

    if (quickActionButton && quickActionMenu) {

        quickActionButton.addEventListener("click", () => {
            quickActionMenu.hidden = !quickActionMenu.hidden;
        });

        document.addEventListener("click", event => {

            if (
                !quickActionButton.contains(event.target) &&
                !quickActionMenu.contains(event.target)
            ) {
                quickActionMenu.hidden = true;
            }

        });

        quickActionMenu
            .querySelectorAll("[data-action]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const action = button.dataset.action;

                    if (action === "assignment") {
                        alert("Assignments are managed by teachers.");
                    }

                    if (action === "project") {
                        document.getElementById("projects")
                            ?.scrollIntoView({ behavior: "smooth" });
                    }

                    if (action === "complaint") {
                        document.getElementById("complaints")
                            ?.scrollIntoView({ behavior: "smooth" });
                    }

                    quickActionMenu.hidden = true;
                });

            });
    }
// =====================================
// 4. PROJECT CREATION
// =====================================

const projectFormContainer =
    document.getElementById("projectFormContainer");

const projectForm =
    document.getElementById("projectForm");

const projectList =
    document.getElementById("projectList");

const projectEmptyState =
    document.getElementById("projectEmptyState");

const cancelProjectForm =
    document.getElementById("cancelProjectForm");

const projectAction =
    document.querySelector('[data-action="project"]');

if (projectAction) {
    projectAction.addEventListener("click", () => {

        if (projectFormContainer) {
            projectFormContainer.hidden = false;

            document.getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });

            document.getElementById("projectTitle")?.focus();
        }

    });
}

if (cancelProjectForm) {
    cancelProjectForm.addEventListener("click", () => {
        if (projectFormContainer) {
            projectFormContainer.hidden = true;
        }
        projectForm?.reset();
    });
}

if (projectForm) {

    projectForm.addEventListener("submit", event => {

        event.preventDefault();

        const titleInput = document.getElementById("projectTitle");
        const descriptionInput = document.getElementById("projectDescription");
        const deadlineInput = document.getElementById("projectDeadline");

        if (
            !titleInput || !descriptionInput || !deadlineInput ||
            !projectList || !projectEmptyState || !projectFormContainer
        ) {
            console.error("Project form is missing required elements.");
            return;
        }

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const deadline = deadlineInput.value;

        if (!title || !description || !deadline) {
            alert("Please complete all project details.");
            return;
        }

        const projectCard = document.createElement("article");

        projectCard.className = "project-card";

        const heading = document.createElement("h3");
        heading.textContent = title;

        const details = document.createElement("p");
        details.textContent = description;

        const date = document.createElement("p");
        date.textContent = "Deadline: " + deadline;

        projectCard.append(heading, details, date);

        projectList.appendChild(projectCard);

        projectEmptyState.hidden = true;
        projectFormContainer.hidden = true;

        projectForm.reset();

        alert("Project created successfully!");

    });

}
    // =====================================
    // 4. BACKEND API CONNECTION
    // =====================================

    async function apiRequest(endpoint, options = {}) {

        try {

            const response = await fetch(
                `${API_BASE_URL}${endpoint}`,
                {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        ...options.headers
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            return await response.json();

        } catch (error) {

            console.error("EduNexus API Error:", error);

            return null;
        }
    }

    // =====================================
    // 5. BACKEND HEALTH CHECK
    // =====================================

    async function checkBackend() {

        const result = await apiRequest("/health");

        if (result) {
            console.log("EduNexus backend connected.");
        } else {
            console.warn("EduNexus backend is unavailable.");
        }
    }

    checkBackend();

    // =====================================
    // 6. LOGIN FORM
    // =====================================

    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");
    const forgotPassword = document.getElementById("forgotPassword");

    if (loginForm) {

        loginForm.addEventListener("submit", event => {

            event.preventDefault();

            const email =
                document.getElementById("email")?.value.trim() || "";

            const password =
                document.getElementById("password")?.value || "";

            const role =
                document.getElementById("role")?.value || "";

            if (!email || !password || !role) {

                if (loginMessage) {
                    loginMessage.textContent =
                        "Please complete all fields.";
                }

                return;
            }

            if (loginMessage) {
                loginMessage.textContent =
                    "Login interface working. Backend authentication is not connected yet.";
            }

        });
    }

    // =====================================
    // 7. FORGOT PASSWORD
    // =====================================

    if (forgotPassword) {

        forgotPassword.addEventListener("click", event => {

            event.preventDefault();

            if (loginMessage) {
                loginMessage.textContent =
                    "Password recovery is not connected yet.";
            }

        });
    }

    // =====================================
    // 8. NOTIFICATIONS
    // =====================================

    const notificationButton =
        document.getElementById("notificationButton");

    if (notificationButton) {

        notificationButton.addEventListener("click", () => {

            document.getElementById("notifications")
                ?.scrollIntoView({ behavior: "smooth" });

        });
    }

    console.log("EduNexus initialized successfully.");

});
