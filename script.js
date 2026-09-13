const jobs = [
    {
        title: "Frontend Developer",
        company: "Tech Solutions",
        category: "Development",
        type: "Full Time",
        location: "Cairo",
        salary: "$800 - $1200"
    },
    {
        title: "UI/UX Designer",
        company: "Creative Studio",
        category: "Design",
        type: "Full Time",
        location: "Alexandria",
        salary: "$700 - $1000"
    },
    {
        title: "Backend Developer",
        company: "Digital Hub",
        category: "Development",
        type: "Remote",
        location: "Remote",
        salary: "$900 - $1400"
    },
    {
        title: "Marketing Specialist",
        company: "Market Pro",
        category: "Marketing",
        type: "Part Time",
        location: "Cairo",
        salary: "$500 - $800"
    },
    {
        title: "Software Engineer",
        company: "Future Systems",
        category: "Engineering",
        type: "Full Time",
        location: "Giza",
        salary: "$1000 - $1600"
    },
    {
        title: "Business Analyst",
        company: "Business Group",
        category: "Business",
        type: "Full Time",
        location: "Cairo",
        salary: "$700 - $1100"
    }
];

const jobsContainer = document.getElementById("jobsContainer");
const jobCount = document.getElementById("jobCount");
const jobSearch = document.getElementById("jobSearch");
const categoryFilter = document.getElementById("categoryFilter");
const typeFilter = document.getElementById("typeFilter");
const searchButton = document.getElementById("searchButton");

function displayJobs(jobsToDisplay, container = jobsContainer) {
    if (!container) return;

    container.innerHTML = "";

    jobsToDisplay.forEach(job => {
        container.innerHTML += `
            <div class="col-lg-4 col-md-6">
                <div class="job-card">
                    <h5>${job.title}</h5>
                    <div class="company-name">${job.company}</div>

                    <div class="job-info">
                        <span>
                            <i class="bi bi-geo-alt"></i>
                            ${job.location}
                        </span>
                        <span>${job.type}</span>
                    </div>

                    <div class="job-salary">${job.salary}</div>

                    <button class="btn btn-outline-primary view-details" data-title="${job.title}">
                        View Details
                    </button>
                </div>
            </div>
        `;
    });

    if (jobCount) {
        jobCount.textContent = `${jobsToDisplay.length} Jobs`;
    }

    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", () => {
            localStorage.setItem("selectedJob", button.dataset.title);
            window.location.href = "job-details.html";
        });
    });
}

function filterJobs() {
    if (!jobSearch || !categoryFilter || !typeFilter) return;

    const searchValue = jobSearch.value.toLowerCase().trim();
    const categoryValue = categoryFilter.value;
    const typeValue = typeFilter.value;

    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchValue) ||
            job.company.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "" || job.category === categoryValue;

        const matchesType =
            typeValue === "" || job.type === typeValue;

        return matchesSearch && matchesCategory && matchesType;
    });

    displayJobs(filteredJobs);
}

if (jobsContainer) {
    displayJobs(jobs);
}

const featuredJobs = document.getElementById("featuredJobs");

if (featuredJobs) {
    displayJobs(jobs.slice(0, 3), featuredJobs);
}

if (searchButton) {
    searchButton.addEventListener("click", filterJobs);
}

if (jobSearch) {
    jobSearch.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            filterJobs();
        }
    });
}

const selectedJobTitle = localStorage.getItem("selectedJob");

if (selectedJobTitle) {
    const selectedJob = jobs.find(job => job.title === selectedJobTitle);

    if (selectedJob) {
        const jobTitle = document.getElementById("jobTitle");
        const jobCompany = document.getElementById("jobCompany");
        const jobLocation = document.getElementById("jobLocation");
        const jobType = document.getElementById("jobType");
        const jobSalary = document.getElementById("jobSalary");

        if (jobTitle) jobTitle.textContent = selectedJob.title;
        if (jobCompany) jobCompany.textContent = selectedJob.company;
        if (jobLocation) jobLocation.textContent = selectedJob.location;
        if (jobType) jobType.textContent = selectedJob.type;
        if (jobSalary) jobSalary.textContent = selectedJob.salary;
    }
}
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", event => {
        event.preventDefault();

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const user = {
            firstName,
            lastName,
            email,
            password,
            phone: "",
            location: "",
            jobTitle: "",
            skills: "",
            about: ""
        };

        localStorage.setItem("jobifyUser", JSON.stringify(user));
        localStorage.setItem("jobifyLoggedIn", "true");

        window.location.href = "profile.html";
    });
}

const profileForm = document.getElementById("profileForm");

if (profileForm) {
    const user = JSON.parse(localStorage.getItem("jobifyUser"));

    if (!user) {
        window.location.href = "register.html";
    } else {
        document.getElementById("profileFirstName").value = user.firstName || "";
        document.getElementById("profileLastName").value = user.lastName || "";
        document.getElementById("profileEmail").value = user.email || "";
        document.getElementById("profilePhone").value = user.phone || "";
        document.getElementById("profileLocation").value = user.location || "";
        document.getElementById("profileJobTitle").value = user.jobTitle || "";
        document.getElementById("profileSkills").value = user.skills || "";
        document.getElementById("profileAbout").value = user.about || "";
    }

    profileForm.addEventListener("submit", event => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem("jobifyUser"));

        user.firstName = document.getElementById("profileFirstName").value.trim();
        user.lastName = document.getElementById("profileLastName").value.trim();
        user.email = document.getElementById("profileEmail").value.trim();
        user.phone = document.getElementById("profilePhone").value.trim();
        user.location = document.getElementById("profileLocation").value.trim();
        user.jobTitle = document.getElementById("profileJobTitle").value.trim();
        user.skills = document.getElementById("profileSkills").value.trim();
        user.about = document.getElementById("profileAbout").value.trim();

        localStorage.setItem("jobifyUser", JSON.stringify(user));
    });
}

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("jobifyLoggedIn");
        window.location.href = "index.html";
    });
}
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", event => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const user = JSON.parse(localStorage.getItem("jobifyUser"));

        if (!user) {
            alert("No account found. Please register first.");
            return;
        }

        if (email !== user.email || password !== user.password) {
            alert("Invalid email or password.");
            return;
        }

        localStorage.setItem("jobifyLoggedIn", "true");

        window.location.href = "profile.html";
    });
}
const authLinks = document.getElementById("authLinks");
const isLoggedIn = localStorage.getItem("jobifyLoggedIn");

if (authLinks && isLoggedIn === "true") {
    authLinks.innerHTML = `
        <a href="profile.html" class="btn btn-outline-primary">Profile</a>
        <button class="btn btn-primary" id="navLogoutButton">Logout</button>
    `;

    document.getElementById("navLogoutButton").addEventListener("click", () => {
        localStorage.removeItem("jobifyLoggedIn");
        window.location.href = "index.html";
    });
}
